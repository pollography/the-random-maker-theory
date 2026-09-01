import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = process.cwd();
const modulePath = new URL('./generate-image-metadata.mjs', import.meta.url);

async function loadGenerator() {
	try {
		return await import(modulePath.href);
	} catch (error) {
		assert.fail(`Bildmetadaten-Generator fehlt oder ist nicht ladbar: ${error.message}`);
	}
}

test('reads real WebP dimensions without an external binary', async () => {
	const { readImageDimensions } = await loadGenerator();
	const result = readImageDimensions(join(root, 'static/images/blog/ultimate-bildprompts-part-3-1.webp'));

	assert.deepEqual(result, { width: 1200, height: 675, format: 'webp' });
});

test('builds a public manifest with intrinsic dimensions and existing responsive variants', async () => {
	const { buildImageMetadata } = await loadGenerator();
	const manifest = buildImageMetadata(join(root, 'static/images'));
	const hero = manifest['/images/blog/ultimate-bildprompts-part-3-1.webp'];
	const prompt = manifest['/images/blog/ki-bildprompts/04-action-poses.webp'];

	assert.equal(hero.width, 1200);
	assert.equal(hero.height, 675);
	assert.ok(hero.variants.some((variant) => variant.src.endsWith('-thumb.webp')));
	assert.ok(hero.variants.some((variant) => variant.src === '/images/blog/ultimate-bildprompts-part-3-1.webp'));
	assert.ok(prompt.variants.some((variant) => variant.src.includes('/thumbs/04-action-poses.webp')));
	assert.ok(existsSync(join(root, 'static', prompt.variants[0].src.replace(/^\//, ''))));
});

test('builds compact per-article image usage without importing rendered posts', async () => {
	const { buildBlogImageUsage } = await loadGenerator();
	const usage = buildBlogImageUsage(join(root, 'src/content/blog'));
	const images = usage['ultimate-bildprompts-part-3'];

	assert.equal(images[0], '/images/blog/ultimate-bildprompts-part-3-1.webp');
	assert.ok(images.includes('/images/blog/ki-bildprompts/87-behind-the-scenes.webp'));
	assert.equal(images.length, new Set(images).size);
});

test('never mixes cropped thumbnails with originals in one responsive srcset', async () => {
	const { buildImageMetadata } = await loadGenerator();
	const manifest = buildImageMetadata(join(root, 'static/images'));
	const square = manifest['/images/blog/ki-bildprompts/100-wire-portrait.webp'];
	const matching = manifest['/images/blog/ki-bildprompts/04-action-poses.webp'];

	assert.deepEqual(square.variants, [
		{ src: '/images/blog/ki-bildprompts/100-wire-portrait.webp', width: 512 }
	]);
	assert.ok(matching.variants.some((variant) => variant.src.includes('/thumbs/')));
});
