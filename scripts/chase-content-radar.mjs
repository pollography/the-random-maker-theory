#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const DEFAULT_CONFIG = new URL('../config/chase-content-radar.json', import.meta.url);
const FETCH_TIMEOUT_MS = 20_000;
const MAX_TITLE_LENGTH = 180;

const TITLE_STOPWORDS = new Set([
	'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'ever', 'for', 'from', 'how',
	'in', 'into', 'is', 'it', 'new', 'of', 'on', 'or', 'should', 'than', 'that', 'the',
	'this', 'to', 'try', 'use', 'user', 'users', 'what', 'why', 'with', 'you', 'your'
]);

function decodeXml(value = '') {
	return value
		.replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/i, '$1')
		.replace(/&#(\d+);/g, (_match, number) => String.fromCodePoint(Number(number)))
		.replace(/&#x([0-9a-f]+);/gi, (_match, number) => String.fromCodePoint(Number.parseInt(number, 16)))
		.replace(/&quot;/g, '"')
		.replace(/&apos;/g, "'")
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');
}

function stripTags(value = '') {
	return decodeXml(value).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function tagValue(block, tagName) {
	const match = block.match(new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`, 'i'));
	return match ? stripTags(match[1]) : '';
}

function attrValue(tag, attribute) {
	const match = tag.match(new RegExp(`${attribute}=["']([^"']+)["']`, 'i'));
	return match ? decodeXml(match[1]).trim() : '';
}

function cleanTitle(title) {
	return stripTags(title).replace(/[\u0000-\u001f\u007f]/g, '').slice(0, MAX_TITLE_LENGTH);
}

function isoDate(value, fieldName) {
	const timestamp = Date.parse(value);
	if (!Number.isFinite(timestamp)) throw new Error(`${fieldName} must be a valid date`);
	return new Date(timestamp).toISOString();
}

function titleTokens(title) {
	return new Set(
		title
			.toLowerCase()
			.normalize('NFKD')
			.replace(/[^a-z0-9.]+/g, ' ')
			.split(/\s+/)
			.filter((token) => token.length > 1 && !TITLE_STOPWORDS.has(token))
	);
}

function titleSimilarity(left, right) {
	const a = titleTokens(left);
	const b = titleTokens(right);
	if (!a.size || !b.size) return 0;
	const overlap = [...a].filter((token) => b.has(token)).length;
	return overlap / Math.min(a.size, b.size);
}

export function parseYouTubeAtom(xml, expectedChannelId) {
	if (typeof xml !== 'string' || !xml.includes('<feed')) throw new Error('YouTube feed is not valid Atom XML');
	const entries = [...xml.matchAll(/<entry\b[^>]*>([\s\S]*?)<\/entry>/gi)];

	return entries.flatMap((match) => {
		const block = match[1];
		const id = tagValue(block, '(?:yt:)?videoId');
		const channelId = tagValue(block, '(?:yt:)?channelId');
		const alternateTag = [...block.matchAll(/<link\b[^>]*>/gi)]
			.map((item) => item[0])
			.find((tag) => attrValue(tag, 'rel') === 'alternate');
		const url = alternateTag ? attrValue(alternateTag, 'href') : '';
		const published = tagValue(block, 'published');

		if (!id || !url || !published || channelId !== expectedChannelId) return [];
		if (!/^https:\/\/www\.youtube\.com\/watch\?v=[A-Za-z0-9_-]+/.test(url)) return [];

		return [{
			type: 'youtube',
			id,
			key: `youtube:${id}`,
			title: cleanTitle(tagValue(block, 'title')),
			url,
			published: isoDate(published, 'YouTube published date')
		}];
	});
}

export function parseBlogRss(xml) {
	if (typeof xml !== 'string' || !xml.includes('<rss')) throw new Error('Blog feed is not valid RSS XML');
	const entries = [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)];

	return entries.flatMap((match) => {
		const block = match[1];
		const rawUrl = tagValue(block, 'guid') || tagValue(block, 'link');
		const published = tagValue(block, 'pubDate');
		if (!rawUrl || !published) return [];

		let canonicalUrl;
		try {
			const parsed = new URL(rawUrl);
			if (!['chaseai.io', 'www.chaseai.io'].includes(parsed.hostname)) return [];
			parsed.protocol = 'https:';
			parsed.hostname = 'chaseai.io';
			parsed.hash = '';
			parsed.search = '';
			canonicalUrl = parsed.toString().replace(/\/$/, '');
		} catch {
			return [];
		}

		return [{
			type: 'blog',
			id: canonicalUrl,
			key: `blog:${canonicalUrl}`,
			title: cleanTitle(tagValue(block, 'title')),
			description: stripTags(tagValue(block, 'description')).slice(0, 600),
			url: canonicalUrl,
			published: isoDate(published, 'Blog published date')
		}];
	});
}

export function pairBlogWithVideos(posts, videos, { maxHours = 168, minSimilarity = 0.4 } = {}) {
	return posts.map((post) => {
		let best = null;
		for (const video of videos) {
			const distanceHours = Math.abs(Date.parse(post.published) - Date.parse(video.published)) / 3_600_000;
			if (distanceHours > maxHours) continue;
			const similarity = titleSimilarity(post.title, video.title);
			if (similarity < minSimilarity || (best && similarity <= best.similarity)) continue;
			best = { video, similarity };
		}
		return best ? { ...post, relatedVideoId: best.video.id } : post;
	});
}

export function collectCandidates({ youtubeXml, blogXml, channelId, notBefore }) {
	if (!channelId) throw new Error('channelId is required');
	const boundary = Date.parse(notBefore);
	if (!Number.isFinite(boundary)) throw new Error('notBefore must be a valid date');

	const videos = parseYouTubeAtom(youtubeXml, channelId);
	const posts = pairBlogWithVideos(parseBlogRss(blogXml), videos);
	const candidates = [...videos, ...posts]
		.filter((candidate) => Date.parse(candidate.published) > boundary)
		.sort((left, right) => Date.parse(left.published) - Date.parse(right.published));

	return {
		sourceCounts: { youtube: videos.length, blog: posts.length },
		candidates
	};
}

export function buildIssueBody(candidate) {
	const relatedMarker = candidate.relatedVideoId
		? `\n<!-- chase-related-youtube:${candidate.relatedVideoId} -->`
		: '';
	const summary = candidate.description ? `\n**Feed-Zusammenfassung:** ${candidate.description}\n` : '';

	return `<!-- chase-source:${candidate.key} -->${relatedMarker}
# Neuer Themenhinweis

- **Typ:** ${candidate.type === 'youtube' ? 'YouTube-Langvideo' : 'Blogbeitrag'}
- **Titel:** ${candidate.title}
- **Veröffentlicht:** ${candidate.published}
- **Quelle:** ${candidate.url}
${summary}
## Verbindlicher Redaktionsrahmen

- Diese Quelle ist **nur Themenradar**, nicht Textvorlage.
- Keine Übersetzung und keine enge Paraphrase.
- Tatsachen aus aktuellen Primärquellen unabhängig prüfen.
- Keine fremden Tests, Screenshots, Hooks oder Erfahrungen als eigene ausgeben.
- Artikelstruktur und Visualisierungen aus dem Leserproblem und den geprüften Daten neu bauen.
- Keine automatische Veröffentlichung. Erst Fakten-, Rechte-, Ähnlichkeits- und Darstellungsprüfung abschließen.

## Arbeitsfolge

- [ ] Primärquellen und Aktualität geprüft
- [ ] Aussagen mit Quellenstellen dokumentiert
- [ ] relevante Bildinhalte separat geprüft
- [ ] eigenständiger deutscher Entwurf erstellt
- [ ] Scan-Grammatik und mobile Darstellung geprüft
- [ ] Ähnlichkeits- und Eigenerfahrungsprüfung bestanden
- [ ] Releaseumfang ausdrücklich freigegeben
`;
}

async function fetchXml(url, label) {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
	try {
		const response = await fetch(url, {
			headers: { 'user-agent': 'TRMT-Chase-Content-Radar/1.0 (+https://therandommakertheory.com)' },
			signal: controller.signal
		});
		if (!response.ok) throw new Error(`${label} returned HTTP ${response.status}`);
		const xml = await response.text();
		if (!xml.trim()) throw new Error(`${label} returned an empty response`);
		return xml;
	} finally {
		clearTimeout(timeout);
	}
}

async function main() {
	const configFlag = process.argv.indexOf('--config');
	const configUrl = configFlag >= 0
		? pathToFileURL(process.argv[configFlag + 1])
		: DEFAULT_CONFIG;
	const config = JSON.parse(await readFile(configUrl, 'utf8'));
	const [youtubeXml, blogXml] = await Promise.all([
		fetchXml(config.youtubeFeed, 'YouTube feed'),
		fetchXml(config.blogFeed, 'Blog feed')
	]);
	const result = collectCandidates({
		youtubeXml,
		blogXml,
		channelId: config.channelId,
		notBefore: config.notBefore
	});
	const candidates = result.candidates.map((candidate) => ({
		...candidate,
		issueTitle: `[Chase-Radar] ${candidate.title}`.slice(0, 200),
		issueBody: buildIssueBody(candidate)
	}));

	process.stdout.write(`${JSON.stringify({
		generatedAt: new Date().toISOString(),
		notBefore: isoDate(config.notBefore, 'notBefore'),
		sourceCounts: result.sourceCounts,
		candidateCount: candidates.length,
		candidates
	}, null, 2)}\n`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
	main().catch((error) => {
		console.error(`[chase-content-radar] ${error.message}`);
		process.exitCode = 1;
	});
}
