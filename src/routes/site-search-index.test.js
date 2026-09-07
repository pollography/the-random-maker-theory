// @ts-nocheck
import assert from 'node:assert/strict';
import { gzipSync } from 'node:zlib';
import { after, before, test } from 'node:test';
import { createServer } from 'vite';

/** @type {import('vite').ViteDevServer} */
let vite;

before(async () => {
	vite = await createServer({
		root: process.cwd(),
		appType: 'custom',
		logLevel: 'error',
		server: { middlewareMode: true, hmr: false }
	});
});

after(async () => {
	await vite?.close();
});

test('real endpoint exposes only the bounded public search corpus', async () => {
	const endpoint = await vite.ssrLoadModule('/src/routes/search-index.json/+server.ts');
	const response = await endpoint.GET();
	const payload = await response.json();
	const serialized = JSON.stringify(payload);

	assert.equal(payload.version, 1);
	assert.ok(payload.records.some((item) => item.type === 'article'));
	assert.ok(payload.records.some((item) => item.type === 'podcast'));
	assert.deepEqual(
		payload.records.filter((item) => item.type === 'tool').map((item) => item.url),
		['/tools/bildprompt-library']
	);
	assert.equal(payload.records.some((item) => /impressum|datenschutz|preview/.test(item.url)), false);
	assert.equal(new Set(payload.records.map((item) => item.url)).size, payload.records.length);
	assert.ok(Buffer.byteLength(serialized) < 750 * 1024);
	assert.ok(gzipSync(serialized).length < 200 * 1024);
	assert.equal(response.headers.get('cache-control'), 'public, max-age=0, must-revalidate');
});

test('the index contains full-body terms and no drafts', async () => {
	const endpoint = await vite.ssrLoadModule('/src/routes/search-index.json/+server.ts');
	const response = await endpoint.GET();
	const payload = await response.json();
	const posts = await vite.ssrLoadModule('/src/lib/utils/posts.ts');
	const episodes = await vite.ssrLoadModule('/src/lib/utils/episodes.ts');
	const [publishedPosts, publishedEpisodes] = await Promise.all([posts.getPosts(), episodes.getEpisodes()]);

	assert.equal(payload.records.filter((item) => item.type === 'article').length, publishedPosts.length);
	assert.equal(payload.records.filter((item) => item.type === 'podcast').length, publishedEpisodes.length);
	assert.ok(payload.records.every((item) => item.bodyTokens.length > 0));
});
