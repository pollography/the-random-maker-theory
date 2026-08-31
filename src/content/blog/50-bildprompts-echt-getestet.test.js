import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const articleUrl = new URL('./50-bildprompts-echt-getestet.md', import.meta.url);
const layoutUrl = new URL('../../lib/components/layout/BlogLayout.svelte', import.meta.url);

test('master article previews all six prompt categories', async () => {
	const article = await readFile(articleUrl, 'utf8');
	const layout = await readFile(layoutUrl, 'utf8');
	const cards = article.match(/class="prompt-result-card"/g) ?? [];
	const expectedRoutes = [
		'/blog/kuerzeste-bildprompts-menschen-posen',
		'/blog/kuerzeste-bildprompts-avatare-reaktionen',
		'/blog/kuerzeste-bildprompts-alter-transformation',
		'/blog/kuerzeste-bildprompts-technik-innenansichten',
		'/blog/kuerzeste-bildprompts-infografiken-wissen',
		'/blog/kuerzeste-bildprompts-welten-filmszenen'
	];

	assert.equal(cards.length, 6);
	for (const route of expectedRoutes) assert.match(article, new RegExp(route));
	assert.match(layout, /\.prompt-result-grid/);
	assert.match(layout, /grid-template-columns:\s*repeat\(3/);
	assert.match(layout, /@media \(max-width: 64rem\)/);
});

test('master article demonstrates three finished prompt use cases', async () => {
	const article = await readFile(articleUrl, 'utf8');
	const expectedAssets = [
		'usecase-youtube-thumbnail.webp',
		'usecase-profilbild.webp',
		'usecase-ki-video-referenz.webp'
	];

	assert.match(article, /## Vom Mini-Prompt zum fertigen Asset/);
	for (const asset of expectedAssets) assert.match(article, new RegExp(asset));
	assert.match(article, /1 FOTO\. 1 WORT\./);
	assert.match(article, /Das Videomodell muss Bildreferenzen unterstützen/);
});
