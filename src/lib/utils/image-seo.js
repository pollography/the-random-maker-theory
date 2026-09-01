import { imageMetadata } from '../data/image-metadata.generated.js';

/** @param {string | null | undefined} src */
function normalizeLocalImagePath(src) {
	if (typeof src !== 'string' || !src.startsWith('/images/')) return null;
	return src.split(/[?#]/, 1)[0];
}

/**
 * @param {string | null | undefined} src
 * @param {string | undefined} [sizes]
 * @returns {{ width?: number; height?: number; srcset?: string; sizes?: string }}
 */
export function getImageSeo(src, sizes) {
	const path = normalizeLocalImagePath(src);
	if (!path) return {};
	const metadata = imageMetadata[path];
	if (!metadata) return {};

	/** @type {{ width?: number; height?: number; srcset?: string; sizes?: string }} */
	const result = {
		width: metadata.width,
		height: metadata.height
	};
	if (metadata.variants?.length > 1) {
		result.srcset = metadata.variants
			.map((variant) => `${variant.src} ${variant.width}w`)
			.join(', ');
		if (sizes) result.sizes = sizes;
	}
	return result;
}
