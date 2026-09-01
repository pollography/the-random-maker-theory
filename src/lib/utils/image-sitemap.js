/** @param {string | number | boolean} value */
export function escapeXml(value) {
	return String(value).replace(/[<>&'"]/g, (character) => ({
		'<': '&lt;',
		'>': '&gt;',
		'&': '&amp;',
		"'": '&apos;',
		'"': '&quot;'
	})[/** @type {'<' | '>' | '&' | "'" | '"'} */ (character)] ?? character);
}

/** @param {string} source */
export function extractLocalImagePaths(source) {
	/** @type {string[]} */
	const paths = [];
	const markdownImage = /!\[[^\]]*\]\((\/images\/[^)\s]+)(?:\s+['"][^'"]*['"])?\)/g;
	const htmlImage = /<img\b[^>]*\bsrc\s*=\s*(['"])(\/images\/.*?)\1/gi;
	let match;
	while ((match = markdownImage.exec(source))) paths.push(match[1]);
	while ((match = htmlImage.exec(source))) paths.push(match[2]);
	return [...new Set(paths)];
}

/**
 * @param {Array<string | null | undefined>} paths
 * @param {string} siteUrl
 */
export function renderImageEntries(paths, siteUrl) {
	const localPaths = /** @type {string[]} */ (
		paths.filter((path) => typeof path === 'string' && path.startsWith('/images/'))
	);
	return [...new Set(localPaths)]
		.map((path) => `\n    <image:image>\n      <image:loc>${escapeXml(new URL(path, siteUrl).toString())}</image:loc>\n    </image:image>`)
		.join('');
}
