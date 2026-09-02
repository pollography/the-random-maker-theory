import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { after, before, test } from 'node:test';
import { createServer } from 'vite';

import { CORE_TOPICS } from '../../lib/data/core-topics.js';

const routesRoot = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(routesRoot, '..', '..', '..');
/** @param {string[]} parts */
const read = (...parts) => readFile(join(projectRoot, ...parts), 'utf8');

/** @type {import('vite').ViteDevServer} */
let vite;

before(async () => {
	vite = await createServer({
		root: projectRoot,
		appType: 'custom',
		logLevel: 'error',
		server: { middlewareMode: true, hmr: false }
	});
});

after(async () => {
	await vite?.close();
});

/** @param {string} head */
function jsonLdDocuments(head) {
	return Array.from(head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g), (match) => JSON.parse(match[1]));
}

/** @param {{ status?: number }} cause */
const isNotFound = (cause) => cause.status === 404;

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
	assert.match(archive, /font-size:\s*clamp\(2\.5rem,\s*6vw,\s*3\.5rem\)/);
	assert.match(archive, /\.topic-nav a, \.pagination a\s*\{[^}]*display:\s*inline-flex;[^}]*min-height:\s*44px/);
	assert.match(archive, />Zurück<\/a>/);
});

test('shared archive has one server-rendered article-card loop', async () => {
	const archive = await read('src', 'lib', 'components', 'blog', 'BlogArchive.svelte');

	assert.equal((archive.match(/<BlogCard \{post\} \/>/g) ?? []).length, 1);
	assert.match(archive, /\{#each posts as post \(post\.slug\)\}/);
});

test('real server loaders return bounded slices and reject noncanonical or out-of-range pages', async () => {
	const pageOneLoader = await vite.ssrLoadModule('/src/routes/blog/+page.server.ts');
	const pagedLoader = await vite.ssrLoadModule('/src/routes/blog/seite/[page]/+page.server.ts');
	/** @type {{ posts: import('$lib/utils/posts').Post[], currentPage: number, totalPages: number, totalCount: number }} */
	const pageOne = await pageOneLoader.load();
	/** @type {{ posts: import('$lib/utils/posts').Post[], currentPage: number, totalPages: number, totalCount: number }} */
	const pageTwo = await pagedLoader.load({ params: { page: '2' } });
	/** @type {{ page: string }[]} */
	const entries = await pagedLoader.entries();
	const entryPages = entries.map((entry) => entry.page);

	assert.ok(pageOne.posts.length <= 12);
	assert.ok(pageTwo.posts.length <= 12);
	assert.equal(pageOne.currentPage, 1);
	assert.equal(pageTwo.currentPage, 2);
	assert.equal(pageOne.posts.length, 12);
	assert.equal(pageTwo.posts.length, 12);
	assert.notDeepEqual(pageOne.posts.map((post) => post.slug), pageTwo.posts.map((post) => post.slug));
	assert.deepEqual(entryPages, Array.from({ length: pageOne.totalPages - 1 }, (_, index) => String(index + 2)));

	for (const page of ['1', '01', '0', String(pageOne.totalPages + 1)]) {
		await assert.rejects(() => pagedLoader.load({ params: { page } }), isNotFound);
	}
});

test('real SSR archive HTML exposes cards, links, canonicals, FAQ scope, and global ItemList positions', async () => {
	const pageOneLoader = await vite.ssrLoadModule('/src/routes/blog/+page.server.ts');
	const pagedLoader = await vite.ssrLoadModule('/src/routes/blog/seite/[page]/+page.server.ts');
	const archiveModule = await vite.ssrLoadModule('/src/lib/components/blog/BlogArchive.svelte');
	const svelteServer = await vite.ssrLoadModule('svelte/server');
	/** @type {{ posts: import('$lib/utils/posts').Post[], currentPage: number, totalPages: number, totalCount: number }} */
	const pageOne = await pageOneLoader.load();
	/** @type {{ posts: import('$lib/utils/posts').Post[], currentPage: number, totalPages: number, totalCount: number }} */
	const pageTwo = await pagedLoader.load({ params: { page: '2' } });
	const first = svelteServer.render(archiveModule.default, { props: { ...pageOne, showFaq: true } });
	const second = svelteServer.render(archiveModule.default, { props: { ...pageTwo, showFaq: false } });
	const firstArticleLinks = first.body.match(/href="\/blog\/[^"/?#]+"/g) ?? [];
	const secondArticleLinks = second.body.match(/href="\/blog\/[^"/?#]+"/g) ?? [];
	const firstDocuments = jsonLdDocuments(first.head);
	const secondDocuments = jsonLdDocuments(second.head);
	const firstCollection = firstDocuments.find((document) => document['@type'] === 'CollectionPage');
	const secondCollection = secondDocuments.find((document) => document['@type'] === 'CollectionPage');

	assert.equal(firstArticleLinks.length, pageOne.posts.length);
	assert.equal(secondArticleLinks.length, pageTwo.posts.length);
	for (const post of pageOne.posts) assert.match(first.body, new RegExp(`href="/blog/${post.slug}"`));
	for (const post of pageTwo.posts) assert.match(second.body, new RegExp(`href="/blog/${post.slug}"`));
	for (const topic of CORE_TOPICS) assert.match(first.body, new RegExp(`href="/tags/${topic.slug}"`));
	assert.match(first.body, /href="\/blog\/seite\/2"/);
	assert.match(second.body, /href="\/blog"/);
	assert.match(second.body, /href="\/blog\/seite\/3"/);
	assert.match(first.head, /rel="canonical" href="https:\/\/therandommakertheory\.com\/blog"/);
	assert.match(second.head, /rel="canonical" href="https:\/\/therandommakertheory\.com\/blog\/seite\/2"/);
	assert.match(first.body, /Häufige Fragen zum TRMT Blog/);
	assert.doesNotMatch(second.body, /Häufige Fragen zum TRMT Blog/);
	assert.equal(firstDocuments.filter((document) => document['@type'] === 'FAQPage').length, 1);
	assert.equal(secondDocuments.filter((document) => document['@type'] === 'FAQPage').length, 0);
	assert.deepEqual(firstCollection.mainEntity.itemListElement.map(/** @param {{ position: number }} item */ (item) => item.position), Array.from({ length: pageOne.posts.length }, (_, index) => index + 1));
	assert.deepEqual(secondCollection.mainEntity.itemListElement.map(/** @param {{ position: number }} item */ (item) => item.position), Array.from({ length: pageTwo.posts.length }, (_, index) => 13 + index));
});
