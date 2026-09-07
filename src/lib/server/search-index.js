import { PUBLIC_SEARCH_TOOLS } from '$lib/data/search-tools.js';
import { getEpisodes } from '$lib/utils/episodes.ts';
import { getPosts } from '$lib/utils/posts.ts';
import { createSearchRecord, extractSearchDocument } from '$lib/utils/site-search.js';

const blogSources = import.meta.glob('/src/content/blog/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});
const podcastSources = import.meta.glob('/src/content/podcast/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

function indexSourcesBySlug(sourceModules) {
	const sources = new Map();

	for (const [path, rawValue] of Object.entries(sourceModules)) {
		const raw = String(rawValue ?? '');
		const filenameSlug = path.split('/').at(-1)?.replace(/\.md$/, '');
		const frontmatterSlug = raw.match(/^slug:\s*["']?([^"'\r\n]+)["']?\s*$/m)?.[1]?.trim();
		if (filenameSlug) sources.set(filenameSlug, raw);
		if (frontmatterSlug) sources.set(frontmatterSlug, raw);
	}

	return sources;
}

function recordFromContent(item, type, source, extra = {}) {
	const document = extractSearchDocument(source);
	return createSearchRecord({
		type,
		slug: item.slug,
		url: `/${type === 'article' ? 'blog' : 'podcast'}/${item.slug}`,
		title: item.title,
		description: item.description,
		tags: item.tags ?? [],
		category: item.category ?? (type === 'podcast' ? 'Podcast' : ''),
		headings: document.headings,
		bodyTokens: document.bodyTokens,
		date: item.date,
		...extra
	});
}

export async function buildSiteSearchIndex() {
	const [posts, episodes] = await Promise.all([getPosts(), getEpisodes()]);
	const blogsBySlug = indexSourcesBySlug(blogSources);
	const podcastsBySlug = indexSourcesBySlug(podcastSources);
	const records = [
		...posts.map((post) => recordFromContent(post, 'article', blogsBySlug.get(post.slug) ?? '')),
		...episodes.map((episode) => recordFromContent(
			episode,
			'podcast',
			podcastsBySlug.get(episode.slug) ?? '',
			{ bodyTokens: extractSearchDocument(`${podcastsBySlug.get(episode.slug) ?? ''}\n${(episode.transcript ?? []).join(' ')}`).bodyTokens }
		)),
		...PUBLIC_SEARCH_TOOLS.map((tool) => createSearchRecord({ ...tool, type: 'tool' }))
	];

	const typeOrder = { article: 0, podcast: 1, tool: 2 };
	return records.sort((a, b) =>
		typeOrder[a.type] - typeOrder[b.type]
		|| String(b.date).localeCompare(String(a.date))
		|| a.title.localeCompare(b.title, 'de')
		|| a.url.localeCompare(b.url)
	);
}
