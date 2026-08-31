import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { test } from 'node:test';

const contentRoot = new URL('./', import.meta.url);
const staticRoot = new URL('../../../static/', import.meta.url);
const articleFile = new URL('ultimate-bildprompts-part-3.md', contentRoot);

const resultAssets = [
	'87-behind-the-scenes.webp', '88-relighting-grid.webp', '89-lens-grid.webp',
	'90-viseme-sheet.webp', '91-walk-cycle.webp', '92-shot-breakdown.webp',
	'93-thermography.webp', '94-schlieren.webp', '95-scanography.webp',
	'96-photogram.webp', '97-chemigram.webp', '98-slit-scan.webp',
	'99-string-art.webp', '100-wire-portrait.webp', '101-pressed-flowers.webp',
	'102-sand-sculpture.webp', '103-ice-sculpture.webp', '104-fore-edge-painting.webp',
	'105-drone-light-show.webp', '106-cymatics.webp', '107-pcb-portrait.webp',
	'108-oscilloscope-portrait.webp', '109-lenticular-portrait.webp', '110-hologram.webp',
	'111-raw-phone-night.webp', '112-point-and-shoot.webp', '113-digicam-2003.webp',
	'114-soft-mist-portrait.webp', '115-direct-flash.webp', '116-equirectangular-360.webp',
	'117-crowd-search.webp', '118-creator-livestream.webp', '119-product-angle-grid.webp',
	'120-product-detail-page.webp', '121-museum-breakdown.webp', '122-premium-product-ad.webp'
];

test('part 3 publishes all 36 tested prompts with honest verdicts and copyable prompt blocks', async () => {
	const article = await readFile(articleFile, 'utf8');

	assert.match(article, /title: "Ultimate Bildprompts: 36 neue Tests"/);
	assert.match(article, /draft: false/);
	assert.match(article, /32.{0,8}PASS/s);
	assert.match(article, /4.{0,8}TEILWEISE/s);
	assert.equal((article.match(/```prompt/g) ?? []).length, 36);
	assert.equal((article.match(/\*\*PASS\*\*/g) ?? []).length, 32);
	assert.equal((article.match(/\*\*TEILWEISE\*\*/g) ?? []).length, 4);
	assert.doesNotMatch(article, /Pollo|—/);
	assert.match(article, /\/tools\/bildprompt-library/);
	assert.match(article, /\/downloads\/trmt-ultimate-bildprompts-part-3\.pdf/);
});

test('part 3 references 36 unique optimized results and their compact library thumbnails', async () => {
	const article = await readFile(articleFile, 'utf8');

	assert.equal(new Set(resultAssets).size, 36);
	for (const asset of resultAssets) {
		assert.match(article, new RegExp(`/images/blog/ki-bildprompts/${asset}`));
		await access(new URL(`images/blog/ki-bildprompts/${asset}`, staticRoot));
		await access(new URL(`images/blog/ki-bildprompts/thumbs/${asset}`, staticRoot));
	}
});

test('part 3 has complete hero, overview, source and PDF assets', async () => {
	for (const asset of [
		'images/blog/ultimate-bildprompts-part-3-1.webp',
		'images/blog/ultimate-bildprompts-part-3-1-thumb.webp',
		'images/blog/ultimate-bildprompts-part-3-overview.webp',
		'images/blog/ultimate-bildprompts-part-3-camera-source.webp',
		'downloads/trmt-ultimate-bildprompts-part-3.pdf'
	]) await access(new URL(asset, staticRoot));
});
