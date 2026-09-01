// @ts-nocheck
import assert from 'node:assert/strict';
import test from 'node:test';

async function loadPlugin() {
	try {
		return await import('./rehype-image-seo.js');
	} catch (error) {
		assert.fail(`Rehype-Bild-SEO-Plugin fehlt oder ist nicht ladbar: ${error.message}`);
	}
}

test('adds dimensions, lazy loading and responsive sources to markdown images', async () => {
	const { rehypeImageSeo } = await loadPlugin();
	const tree = {
		type: 'root',
		children: [
			{
				type: 'element',
				tagName: 'img',
				properties: {
					src: '/images/blog/ultimate-bildprompts-part-3-1.webp',
					alt: '36 Bildprompt-Ergebnisse'
				},
				children: []
			}
		]
	};

	rehypeImageSeo()(tree);
	const image = tree.children[0].properties;

	assert.equal(image.width, 1200);
	assert.equal(image.height, 675);
	assert.equal(image.loading, 'lazy');
	assert.equal(image.decoding, 'async');
	assert.match(image.srcSet, /-thumb\.webp \d+w/);
	assert.match(image.sizes, /768px/);
});

test('preserves explicitly eager images', async () => {
	const { rehypeImageSeo } = await loadPlugin();
	const tree = {
		type: 'root',
		children: [{
			type: 'element',
			tagName: 'img',
			properties: {
				src: '/images/blog/ultimate-bildprompts-part-3-1.webp',
				loading: 'eager',
				decoding: 'sync'
			},
			children: []
		}]
	};

	rehypeImageSeo()(tree);
	assert.equal(tree.children[0].properties.loading, 'eager');
	assert.equal(tree.children[0].properties.decoding, 'sync');
});

test('adds the same SEO attributes to local images inside raw HTML grids', async () => {
	const { rehypeImageSeo } = await loadPlugin();
	const tree = {
		type: 'root',
		children: [{
			type: 'raw',
			value: '<div><img src="/images/blog/ki-bildprompts/04-action-poses.webp" alt="Actionposen" loading="lazy"/></div>'
		}]
	};

	rehypeImageSeo()(tree);
	assert.match(tree.children[0].value, /width="1200"/);
	assert.match(tree.children[0].value, /height="1007"/);
	assert.match(tree.children[0].value, /srcset="[^"]+thumbs\/04-action-poses\.webp 480w[^"]+"/);
	assert.equal((tree.children[0].value.match(/loading=/g) || []).length, 1);
});
