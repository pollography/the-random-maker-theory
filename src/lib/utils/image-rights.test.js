// @ts-nocheck
import assert from 'node:assert/strict';
import test from 'node:test';

async function loadImageRights() {
	try {
		return await import('./image-rights.js');
	} catch (error) {
		assert.fail(`Zentrale Bildrechte-Hilfe fehlt oder ist nicht ladbar: ${error.message}`);
	}
}

test('publishes just.pollo as creator and TRMT as credit for local images', async () => {
	const { buildImageObject } = await loadImageRights();
	const image = buildImageObject('/images/blog/example.webp', 'Ein getestetes Bildprompt-Ergebnis');

	assert.equal(image['@type'], 'ImageObject');
	assert.equal(image.contentUrl, 'https://therandommakertheory.com/images/blog/example.webp');
	assert.deepEqual(image.creator, { '@type': 'Person', name: 'just.pollo' });
	assert.deepEqual(image.copyrightHolder, { '@type': 'Person', name: 'just.pollo' });
	assert.equal(image.creditText, 'The Random Maker Theory / just.pollo');
	assert.equal(image.copyrightNotice, '© 2026 just.pollo. Alle Rechte vorbehalten.');
	assert.equal(image.license, 'https://therandommakertheory.com/bildrechte');
	assert.equal(image.acquireLicensePage, 'https://therandommakertheory.com/bildrechte');
	assert.equal(image.caption, 'Ein getestetes Bildprompt-Ergebnis');
});

test('deduplicates local images and never claims rights metadata for remote images', async () => {
	const { buildImageObject, buildImageObjects } = await loadImageRights();

	assert.equal(buildImageObject('https://example.com/photo.webp'), null);
	assert.equal(buildImageObject('/downloads/guide.pdf'), null);
	const images = buildImageObjects([
		'/images/blog/a.webp',
		'/images/blog/a.webp?size=small',
		'https://example.com/b.webp'
	]);
	assert.equal(images.length, 1);
	assert.equal(images[0].contentUrl, 'https://therandommakertheory.com/images/blog/a.webp');
	assert.equal(images[0].creator.name, 'just.pollo');
});
