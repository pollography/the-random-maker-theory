import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { test } from 'node:test';

const contentRoot = new URL('./', import.meta.url);
const staticRoot = new URL('../../../static/images/blog/', import.meta.url);

const articles = [
	'ultimate-bildprompts-part-2.md',
	'bildprompts-spielzeug-sammlerstuecke.md',
	'bildprompts-miniaturwelten.md',
	'bildprompts-comics-retro.md',
	'bildprompts-stoff-knete-glas.md',
	'bildprompts-portraet-verbessern.md',
	'bildprompts-creator-ki-video.md'
];

const detailSlugs = articles.slice(1).map((file) => file.replace(/\.md$/, ''));

const resultAssets = [
	'51-starter-pack.webp',
	'52-bobblehead.webp',
	'53-designer-toy.webp',
	'54-desk-figurine.webp',
	'55-trading-card.webp',
	'56-pin-collection.webp',
	'57-mini-me.webp',
	'58-tiny-workers.webp',
	'59-diorama.webp',
	'60-snow-globe.webp',
	'61-paper-doll.webp',
	'62-gachapon.webp',
	'63-comic-strip.webp',
	'64-fantasy-newspaper.webp',
	'65-film-strip.webp',
	'66-travel-scrapbook.webp',
	'67-tarot-card.webp',
	'68-game-screen.webp',
	'69-scribble.webp',
	'70-claymation.webp',
	'71-plush-toy.webp',
	'72-amigurumi.webp',
	'73-embroidery.webp',
	'74-stained-glass.webp',
	'75-studio-headshot.webp',
	'76-color-analysis.webp',
	'77-hairstyle-grid.webp',
	'78-fix-lighting.webp',
	'79-cover-pack.webp',
	'80-career-caricature.webp',
	'81-brand-board.webp',
	'82-packaging-board.webp',
	'83-merch-mockup.webp',
	'84-contact-sheet.webp',
	'85-storyboard.webp',
	'86-first-last-frame.webp'
];

const heroSlugs = ['ultimate-bildprompts-part-2', ...detailSlugs];

test('part 2 publishes one hub and six mutually linked detail articles', async () => {
	const texts = new Map();
	for (const file of articles) {
		const text = await readFile(new URL(file, contentRoot), 'utf8');
		texts.set(file, text);
		assert.match(text, /```prompt[\s\S]+?```/, `${file} needs a copyable prompt block`);
		assert.doesNotMatch(text, /Pollo|—/, `${file} violates the TRMT public-copy contract`);
	}

	const hub = texts.get('ultimate-bildprompts-part-2.md');
	for (const slug of detailSlugs) assert.match(hub, new RegExp(`/blog/${slug}`));

	for (const file of articles.slice(1)) {
		const text = texts.get(file);
		assert.match(text, /\/blog\/ultimate-bildprompts-part-2/);
	}
});

test('part 2 references 36 distinct portrait results', async () => {
	const combined = (await Promise.all(articles.map((file) => readFile(new URL(file, contentRoot), 'utf8')))).join('\n');
	for (const asset of resultAssets) {
		assert.match(combined, new RegExp(`/images/blog/ki-bildprompts/${asset}`), `${asset} is not referenced`);
		await access(new URL(`ki-bildprompts/${asset}`, staticRoot));
	}
	assert.equal(resultAssets.length, 36);
});

test('part 2 has full and thumbnail hero assets for all seven articles', async () => {
	for (const slug of heroSlugs) {
		await access(new URL(`${slug}-1.webp`, staticRoot));
		await access(new URL(`${slug}-1-thumb.webp`, staticRoot));
	}
});
