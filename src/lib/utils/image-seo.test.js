// @ts-nocheck
import assert from 'node:assert/strict';
import test from 'node:test';

async function loadImageSeo() {
	try {
		return await import('./image-seo.js');
	} catch (error) {
		assert.fail(`Zentrale Bild-SEO-Hilfe fehlt oder ist nicht ladbar: ${error.message}`);
	}
}

test('returns intrinsic dimensions and a useful srcset for a known hero', async () => {
	const { getImageSeo } = await loadImageSeo();
	const result = getImageSeo(
		'/images/blog/ultimate-bildprompts-part-3-1.webp',
		'(max-width: 1200px) 100vw, 1200px'
	);

	assert.equal(result.width, 1200);
	assert.equal(result.height, 675);
	assert.match(result.srcset, /ultimate-bildprompts-part-3-1-thumb\.webp \d+w/);
	assert.match(result.srcset, /ultimate-bildprompts-part-3-1\.webp 1200w/);
	assert.equal(result.sizes, '(max-width: 1200px) 100vw, 1200px');
});

test('returns safe empty attributes for unknown or remote images', async () => {
	const { getImageSeo } = await loadImageSeo();

	assert.deepEqual(getImageSeo('/images/unknown.webp'), {});
	assert.deepEqual(getImageSeo('https://example.com/photo.webp'), {});
});
