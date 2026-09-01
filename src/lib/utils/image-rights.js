import { siteConfig } from '../config.ts';

/** @param {string | null | undefined} src */
function normalizeLocalImagePath(src) {
	if (typeof src !== 'string' || !src.startsWith('/images/')) return null;
	return src.split(/[?#]/, 1)[0];
}

/**
 * Build the rights metadata Google Images reads from an ImageObject.
 * Only local TRMT images are attributed; remote images remain untouched.
 *
 * @param {string | null | undefined} src
 * @param {string | null | undefined} [caption]
 */
export function buildImageObject(src, caption) {
	const path = normalizeLocalImagePath(src);
	if (!path) return null;

	const creator = {
		'@type': 'Person',
		name: siteConfig.imageRights.creatorName
	};

	return {
		'@type': 'ImageObject',
		contentUrl: new URL(path, siteConfig.url).toString(),
		creator,
		copyrightHolder: creator,
		copyrightYear: 2026,
		creditText: siteConfig.imageRights.creditText,
		copyrightNotice: siteConfig.imageRights.copyrightNotice,
		license: siteConfig.imageRights.licenseUrl,
		acquireLicensePage: siteConfig.imageRights.acquireLicensePage,
		...(caption ? { caption } : {})
	};
}

/**
 * @param {Array<string | null | undefined>} paths
 * @param {string | null | undefined} [caption]
 */
export function buildImageObjects(paths, caption) {
	const uniquePaths = [...new Set(
		paths
			.map(normalizeLocalImagePath)
			.filter(Boolean)
	)];
	return uniquePaths.map((path) => buildImageObject(path, caption)).filter(Boolean);
}
