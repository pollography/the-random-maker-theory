import { getImageSeo } from './image-seo.js';

const ARTICLE_IMAGE_SIZES = '(max-width: 768px) calc(100vw - 32px), 768px';

/**
 * @param {string} tag
 * @param {string} name
 * @param {string | number | undefined} value
 */
function addRawAttribute(tag, name, value) {
	if (new RegExp(`\\s${name}\\s*=`, 'i').test(tag) || value == null) return tag;
	const ending = tag.endsWith('/>') ? '/>' : '>';
	return `${tag.slice(0, -ending.length)} ${name}="${String(value).replace(/"/g, '&quot;')}"${ending}`;
}

/** @param {string} value */
function enhanceRawImages(value) {
	return value.replace(/<img\b[^>]*>/gi, (tag) => {
		const src = tag.match(/\ssrc\s*=\s*(["'])(\/images\/.*?)\1/i)?.[2];
		if (!src) return tag;
		const seo = getImageSeo(src, ARTICLE_IMAGE_SIZES);
		let enhanced = tag;
		enhanced = addRawAttribute(enhanced, 'width', seo.width);
		enhanced = addRawAttribute(enhanced, 'height', seo.height);
		enhanced = addRawAttribute(enhanced, 'srcset', seo.srcset);
		enhanced = addRawAttribute(enhanced, 'sizes', seo.sizes);
		enhanced = addRawAttribute(enhanced, 'loading', 'lazy');
		enhanced = addRawAttribute(enhanced, 'decoding', 'async');
		return enhanced;
	});
}

/** @param {any} node */
function visitImages(node) {
	if (!node || typeof node !== 'object') return;
	if (node.type === 'raw' && typeof node.value === 'string') {
		node.value = enhanceRawImages(node.value);
	}
	if (node.type === 'element' && node.tagName === 'img') {
		node.properties ??= {};
		const seo = getImageSeo(node.properties.src, ARTICLE_IMAGE_SIZES);
		if (seo.width && node.properties.width == null) node.properties.width = seo.width;
		if (seo.height && node.properties.height == null) node.properties.height = seo.height;
		if (seo.srcset && node.properties.srcSet == null) node.properties.srcSet = seo.srcset;
		if (seo.sizes && node.properties.sizes == null) node.properties.sizes = seo.sizes;
		if (node.properties.loading == null) node.properties.loading = 'lazy';
		if (node.properties.decoding == null) node.properties.decoding = 'async';
	}
	for (const child of node.children ?? []) visitImages(child);
}

export function rehypeImageSeo() {
	/** @param {any} tree */
	return (tree) => visitImages(tree);
}
