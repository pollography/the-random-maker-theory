// @ts-nocheck
import assert from 'node:assert/strict';
import test from 'node:test';

async function loadSitemapHelpers() {
	try {
		return await import('./image-sitemap.js');
	} catch (error) {
		assert.fail(`Bild-Sitemap-Hilfe fehlt oder ist nicht ladbar: ${error.message}`);
	}
}

test('extracts and deduplicates local markdown and HTML image paths', async () => {
	const { extractLocalImagePaths } = await loadSitemapHelpers();
	const source = `
![Kontaktbogen](/images/blog/contact.webp)
<img src="/images/blog/detail.webp" alt="Detail" />
![Doppelt](/images/blog/contact.webp)
![Extern](https://example.com/external.webp)
`;

	assert.deepEqual(extractLocalImagePaths(source), [
		'/images/blog/contact.webp',
		'/images/blog/detail.webp'
	]);
});

test('renders escaped image sitemap entries with absolute URLs', async () => {
	const { renderImageEntries } = await loadSitemapHelpers();
	const xml = renderImageEntries(
		['/images/blog/a&b.webp', '/images/blog/a&b.webp'],
		'https://therandommakertheory.com'
	);

	assert.equal((xml.match(/<image:image>/g) || []).length, 1);
	assert.match(xml, /https:\/\/therandommakertheory\.com\/images\/blog\/a&amp;b\.webp/);
});
