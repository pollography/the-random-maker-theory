import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const srcUrl = new URL('../', import.meta.url);

const seoTitles = {
	'50-bildprompts-echt-getestet.md': '50 KI-Bilder-Prompts: getestete Beispiele',
	'ein-foto-vier-slash-befehle-ki-bilder.md': 'Posepack & Character Sheet: 4 KI-Bildprompts im Test',
	'kuerzeste-bildprompts-menschen-posen.md': 'Kurze KI-Bildprompts für Menschen & Posen',
	'kuerzeste-bildprompts-avatare-reaktionen.md': 'Kurze KI-Bildprompts für Avatare & Reaktionen',
	'kuerzeste-bildprompts-alter-transformation.md': 'KI-Bildprompts für Alter & Transformation',
	'kuerzeste-bildprompts-technik-innenansichten.md': 'KI-Bildprompts für Technik & Innenansichten',
	'kuerzeste-bildprompts-infografiken-wissen.md': 'KI-Bildprompts für Infografiken & Wissen',
	'kuerzeste-bildprompts-welten-filmszenen.md': 'KI-Bildprompts für Welten & Filmszenen',
	'ultimate-bildprompts-part-2.md': '36 KI-Bildprompts für Creator & Miniwelten',
	'praezise-bildprompts-weniger-zufall.md': '24 präzise Bildprompts mit echten Beispielen',
	'bildprompts-spielzeug-sammlerstuecke.md': 'KI-Bildprompts für Sammelfiguren & Spielzeug',
	'bildprompts-miniaturwelten.md': 'KI-Bildprompts für Miniaturwelten',
	'bildprompts-comics-retro.md': 'KI-Bildprompts für Comics & Retro-Looks',
	'bildprompts-stoff-knete-glas.md': 'KI-Bildprompts für Stoff, Knete & Glas',
	'bildprompts-portraet-verbessern.md': 'KI-Bildprompts für Porträts: 6 echte Beispiele',
	'bildprompts-creator-ki-video.md': 'KI-Bildprompts für Creator & KI-Videos'
};

/** @param {string} path */
async function readRepoFile(path) {
	return readFile(new URL(path, srcUrl), 'utf8');
}

test('blog metadata supports a separate SEO title without replacing the visible H1', async () => {
	const posts = await readRepoFile('lib/utils/posts.ts');
	const page = await readRepoFile('routes/blog/[slug]/+page.svelte');

	assert.match(posts, /seoTitle\?: string/);
	assert.match(posts, /seoTitle: metadata\.seoTitle/);
	assert.match(page, /data\.post\.seoTitle \|\| data\.post\.title/);
	assert.match(page, /<h1 class="article-title">/);
	assert.match(page, /titleParts\(\)/);
	assert.match(page, /data\.post\.title\.indexOf\(accent\)/);
});

test('all 16 image-prompt articles have distinct, compact search titles', async () => {
	const seen = new Set();

	for (const [filename, expected] of Object.entries(seoTitles)) {
		const article = await readRepoFile(`content/blog/${filename}`);
		assert.match(article, new RegExp(`^seoTitle: "${expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"$`, 'm'));
		assert.ok(expected.length + ' | TRMT'.length <= 65, `${filename} title is too long`);
		assert.ok(!seen.has(expected), `${filename} duplicates another SEO title`);
		seen.add(expected);
	}
});

test('the prompt hubs connect readers with the filterable library', async () => {
	for (const filename of [
		'50-bildprompts-echt-getestet.md',
		'ultimate-bildprompts-part-2.md',
		'praezise-bildprompts-weniger-zufall.md',
		'ein-foto-vier-slash-befehle-ki-bilder.md'
	]) {
		const article = await readRepoFile(`content/blog/${filename}`);
		assert.match(article, /\]\(\/tools\/bildprompt-library\)/, `${filename} has no library link`);
	}

	const slashArticle = await readRepoFile('content/blog/ein-foto-vier-slash-befehle-ki-bilder.md');
	assert.match(slashArticle, /\]\(\/blog\/50-bildprompts-echt-getestet\)/);
	assert.match(slashArticle, /\]\(\/blog\/kuerzeste-bildprompts-menschen-posen\)/);

	const hub = await readRepoFile('content/blog/50-bildprompts-echt-getestet.md');
	const people = await readRepoFile('content/blog/kuerzeste-bildprompts-menschen-posen.md');
	assert.match(hub, /\]\(\/blog\/ein-foto-vier-slash-befehle-ki-bilder\)/);
	assert.match(people, /\]\(\/blog\/ein-foto-vier-slash-befehle-ki-bilder\)/);
});

test('the filterable library links to both editorial hubs and the explainer', async () => {
	const library = await readRepoFile('routes/tools/bildprompt-library/+page.svelte');
	for (const route of [
		'/blog/50-bildprompts-echt-getestet',
		'/blog/ultimate-bildprompts-part-2',
		'/blog/ein-foto-vier-slash-befehle-ki-bilder'
	]) {
		assert.match(library, new RegExp(`href="${route}"`));
	}
});
