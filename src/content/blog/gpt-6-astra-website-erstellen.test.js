import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { test } from 'node:test';
import { imageMetadata } from '../../lib/data/image-metadata.generated.js';

const articlePath = new URL('./gpt-6-astra-website-erstellen.md', import.meta.url);

/** @param {string} article */
function articleBody(article) {
	return article.replace(/^---[\s\S]*?---\s*/, '');
}

test('website draft starts with a novice-readable thesis and leaves the H1 to the route', () => {
	const article = readFileSync(articlePath, 'utf8');
	const body = articleBody(article);
	const firstParagraph = body.split(/\n\s*\n/, 1)[0];
	const sentenceCount = (firstParagraph.match(/[.!?](?:\*\*)?(?:\s|$)/g) ?? []).length;

	assert.match(article, /^draft:\s*true$/m);
	assert.match(
		article,
		/^title: "Website mit GPT-6 Astra erstellen: Vom Vorbild zum eigenen Entwurf"$/m
	);
	assert.match(article, /^seoTitle: "Website mit GPT-6 Astra erstellen: Anleitung für Einsteiger"$/m);
	assert.doesNotMatch(body, /^#\s+/m, 'the route owns the single public H1');
	assert.ok(sentenceCount >= 1 && sentenceCount <= 2, `expected a 1-2 sentence thesis, received ${sentenceCount}`);
	assert.match(firstParagraph, /OpenAI hat GPT-6 Astra veröffentlicht/);
	assert.match(firstParagraph, /ohne Vorwissen/);
	assert.match(firstParagraph, /nicht automatisch/);
});

test('website article explains the whole path before specialist details', () => {
	const article = readFileSync(articlePath, 'utf8');
	const body = articleBody(article);
	const headings = body.match(/^##\s+.+/gm) ?? [];

	assert.ok(headings.length >= 8, `expected at least 8 H2 sections, received ${headings.length}`);
	assert.equal(headings[0], '## Worum geht es hier überhaupt?');
	assert.match(body, /Codex ist OpenAIs Arbeitsumgebung/);
	assert.match(body, /Landingpage ist eine einzelne Webseite/);
	assert.match(body, /Ein Skill ist eine gespeicherte Arbeitsanweisung/);
	assert.match(body, /Röstpost/);
	assert.match(body, /Deine Eingabe/);
	assert.match(body, /Was du danach sehen solltest/);
	assert.match(body, /class="rf-block rf-tldr"/);
	assert.match(body, /class="rf-block rf-takeaway"/);
	assert.match(body, /https:\/\/openai\.com\/index\/gpt-6-astra\//);
	assert.match(body, /https:\/\/openai\.com\/index\/introducing-chatgpt-images-2-5\//);
	assert.match(body, /https:\/\/openai\.com\/academy\/chatgpt-sites\//);
	assert.match(body, /\/blog\/v0-bolt-lovable-websites-ohne-code-2026/);
	assert.match(body, /\/blog\/perfekt-prompten-llm-guide/);
	assert.doesNotMatch(body, /—|–/);
});

test('public draft hides radar provenance and ships a real 16:9 hero plus thumbnail', () => {
	const article = readFileSync(articlePath, 'utf8');
	const body = articleBody(article);
	const master = '/images/blog/gpt-6-astra-website-erstellen-1.webp';
	const thumb = '/images/blog/gpt-6-astra-website-erstellen-1-thumb.webp';

	assert.doesNotMatch(body, /Chase\s*AI|chaseai\.io|youtube\.com|Transkript|10\.000-Dollar-Website/i);
	assert.doesNotMatch(body, /ich habe (?:es )?getestet|mein Test|meine Demo/i);
	assert.match(article, new RegExp(`^heroImage: "${master}"$`, 'm'));
	assert.match(article, new RegExp(`^heroImageThumb: "${thumb}"$`, 'm'));
	assert.equal(existsSync(`static${master}`), true);
	assert.equal(existsSync(`static${thumb}`), true);
	assert.deepEqual(
		{ width: imageMetadata[master]?.width, height: imageMetadata[master]?.height },
		{ width: 1600, height: 900 }
	);
	assert.deepEqual(
		{ width: imageMetadata[thumb]?.width, height: imageMetadata[thumb]?.height },
		{ width: 400, height: 225 }
	);
	assert.ok(statSync(`static${master}`).size <= 180 * 1024, 'hero should stay within the 180 KB budget');
	assert.ok(statSync(`static${thumb}`).size <= 60 * 1024, 'thumbnail should stay within the 60 KB budget');
});
