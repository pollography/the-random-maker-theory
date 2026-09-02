import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const routesRoot = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(routesRoot, '..', '..', '..');
/** @param {string[]} parts */
const read = (...parts) => readFile(join(projectRoot, ...parts), 'utf8');

test('page one uses a server loader and the shared crawlable archive', async () => {
	const [loader, page] = await Promise.all([
		read('src', 'routes', 'blog', '+page.server.ts'),
		read('src', 'routes', 'blog', '+page.svelte')
	]);

	assert.match(loader, /createArchivePageData/);
	assert.match(loader, /getPosts/);
	assert.match(page, /BlogArchive/);
	assert.match(page, /showFaq=\{true\}/);
});

test('later archive pages have strict 404 validation and prerender entries', async () => {
	const [loader, page] = await Promise.all([
		read('src', 'routes', 'blog', 'seite', '[page]', '+page.server.ts'),
		read('src', 'routes', 'blog', 'seite', '[page]', '+page.svelte')
	]);

	assert.match(loader, /export async function entries\(\)/);
	assert.match(loader, /page: String\(index \+ 2\)/);
	assert.match(loader, /\^\[1-9\]\\d\*\$/);
	assert.match(loader, /pageNumber < 2/);
	assert.match(loader, /error\(404\)/);
	assert.match(page, /BlogArchive/);
	assert.match(page, /showFaq=\{false\}/);
});

test('shared archive renders normal topic and pagination links with page-specific metadata', async () => {
	const archive = await read('src', 'lib', 'components', 'blog', 'BlogArchive.svelte');

	assert.match(archive, /CORE_TOPICS/);
	assert.match(archive, /aria-label="Blogthemen"/);
	assert.match(archive, /href=\{`\/tags\/\$\{topic\.slug\}`\}/);
	assert.match(archive, /aria-label="Blogseiten"/);
	assert.match(archive, /href=\{pageHref\(currentPage - 1\)\}/);
	assert.match(archive, /href=\{pageHref\(currentPage \+ 1\)\}/);
	assert.match(archive, /aria-current=\{pageNumber === currentPage \? 'page' : undefined\}/);
	assert.match(archive, /rel="canonical" href=\{canonicalUrl\}/);
	assert.match(archive, /'@type': 'CollectionPage'/);
	assert.match(archive, /mainEntity:\s*\{\s*'@type': 'ItemList'/);
	assert.match(archive, /\(currentPage - 1\) \* 12 \+ index \+ 1/);
	assert.match(archive, /\{#if showFaq\}/);
});

test('shared archive keeps the desktop header compact and groups its summary on the right', async () => {
	const archive = await read('src', 'lib', 'components', 'blog', 'BlogArchive.svelte');

	assert.match(archive, /<div class="blog-header-copy">/);
	assert.match(archive, /<div class="blog-header-meta">[\s\S]*?blog-intro[\s\S]*?blog-count/);
	assert.match(archive, /\.blog-header\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s+minmax\(280px,\s*360px\)/);
	assert.match(archive, />Zurück<\/a>/);
});

test('shared archive has one server-rendered article-card loop', async () => {
	const archive = await read('src', 'lib', 'components', 'blog', 'BlogArchive.svelte');

	assert.equal((archive.match(/<BlogCard \{post\} \/>/g) ?? []).length, 1);
	assert.match(archive, /\{#each posts as post \(post\.slug\)\}/);
});
