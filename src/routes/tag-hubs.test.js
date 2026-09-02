// @ts-nocheck
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { after, before, test } from 'node:test';
import { createServer } from 'vite';

import { CORE_TOPICS, CORE_TOPIC_SLUGS } from '../lib/data/core-topics.js';
import { tagFAQs } from '../lib/data/tagFAQs.js';

const tagPagePath = 'src/routes/tags/[tag]/+page.svelte';
const serverLoaderPath = 'src/routes/tags/[tag]/+page.server.ts';
const legacyLoaderPath = 'src/routes/tags/[tag]/+page.ts';
const sitemapPath = 'src/routes/sitemap.xml/+server.ts';
const isNotFound = (cause) => cause.status === 404;

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

function loaderModulePath() {
	return existsSync(serverLoaderPath)
		? '/src/routes/tags/[tag]/+page.server.ts'
		: '/src/routes/tags/[tag]/+page.ts';
}

test('five configured core topics own the tag hub and sitemap contracts', () => {
	const tagPageSource = readFileSync(tagPagePath, 'utf8');
	const sitemapSource = readFileSync(sitemapPath, 'utf8');

	assert.equal(CORE_TOPIC_SLUGS.length, 5);
	assert.ok(existsSync(serverLoaderPath), 'tag loader must be server-only');
	assert.match(tagPageSource, /content={isCoreTopic \? 'index,follow' : 'noindex,follow'}/);
	assert.match(tagPageSource, /BreadcrumbList/);
	assert.match(tagPageSource, /CollectionPage/);
	assert.match(tagPageSource, /Weitere Themen/);
	assert.match(sitemapSource, /CORE_TOPIC_SLUGS/);
});

test('every configured starter exists, has its canonical core tag, and stays in configured order', async () => {
	const postsModule = await vite.ssrLoadModule('/src/lib/utils/posts.ts');
	const loader = await vite.ssrLoadModule(loaderModulePath());
	const posts = await postsModule.getPosts();

	for (const topic of CORE_TOPICS) {
		const data = await loader.load({ params: { tag: topic.slug } });
		const configuredStarters = topic.starterSlugs.map((slug) => {
			const post = posts.find((candidate) => candidate.slug === slug);
			assert.ok(post, `configured starter ${slug} exists`);
			assert.ok(post.tags.includes(topic.slug), `configured starter ${slug} carries ${topic.slug}`);
			return post;
		});

		assert.ok(Array.isArray(data.starterPosts), `${topic.slug} exposes starterPosts`);
		assert.ok(Array.isArray(data.remainingPosts), `${topic.slug} exposes remainingPosts`);
		assert.deepEqual(data.starterPosts.map((post) => post.slug), topic.starterSlugs);
		assert.equal(new Set(data.remainingPosts.map((post) => post.slug)).size, data.remainingPosts.length);
		for (const starter of configuredStarters) {
			assert.ok(!data.remainingPosts.some((post) => post.slug === starter.slug));
		}
	}
});

test('known non-core tags stay reachable but are not indexable hubs', async () => {
	const loader = await vite.ssrLoadModule(loaderModulePath());
	const data = await loader.load({ params: { tag: 'tutorial' } });

	assert.equal(data.isCoreTopic, false);
	assert.equal(data.topic, null);
	assert.deepEqual(data.starterPosts, []);
	assert.deepEqual(data.remainingPosts.map((post) => post.slug), data.posts.map((post) => post.slug));
});

test('unknown tags receive a genuine 404', async () => {
	const loader = await vite.ssrLoadModule(loaderModulePath());

	await assert.rejects(() => loader.load({ params: { tag: 'does-not-exist' } }), isNotFound);
});

test('real SSR distinguishes an indexable core hub from a thin tag page', async () => {
	const [loader, tagPage, svelteServer] = await Promise.all([
		vite.ssrLoadModule(loaderModulePath()),
		vite.ssrLoadModule('/src/routes/tags/[tag]/+page.svelte'),
		vite.ssrLoadModule('svelte/server')
	]);
	const { siteConfig } = await vite.ssrLoadModule('/src/lib/config.ts');
	const coreTopic = CORE_TOPICS[0];
	const [coreData, thinData] = await Promise.all([
		loader.load({ params: { tag: coreTopic.slug } }),
		loader.load({ params: { tag: 'tutorial' } })
	]);
	const core = svelteServer.render(tagPage.default, { props: { data: coreData } });
	const thin = svelteServer.render(tagPage.default, { props: { data: thinData } });
	const jsonLd = (head) => Array.from(
		head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
		(match) => JSON.parse(match[1])
	);
	const coreDocuments = jsonLd(core.head);
	const thinDocuments = jsonLd(thin.head);
	const coreArticleSlugs = Array.from(core.body.matchAll(/href="\/blog\/([^"/?#]+)"/g), (match) => match[1]);
	const visibleCorePosts = [...coreData.starterPosts, ...coreData.remainingPosts];

	assert.match(core.head, /name="robots" content="index,follow"/);
	assert.match(core.head, new RegExp(`rel="canonical" href="${siteConfig.url}/tags/${coreTopic.slug}"`));
	assert.match(core.body, /aria-label="Breadcrumb"/);
	assert.match(core.body, /Hier anfangen/);
	assert.match(core.body, /Weitere Themen/);
	assert.equal(coreArticleSlugs.length, coreData.posts.length);
	assert.deepEqual(new Set(coreArticleSlugs), new Set(coreData.posts.map((post) => post.slug)));
	assert.deepEqual(coreArticleSlugs.slice(0, coreTopic.starterSlugs.length), coreTopic.starterSlugs);
	assert.equal((core.body.match(/href="\/tags\//g) ?? []).length, 4);
	assert.equal(coreDocuments.filter((document) => document['@type'] === 'BreadcrumbList').length, 1);
	const collection = coreDocuments.find((document) => document['@type'] === 'CollectionPage');
	assert.ok(collection);
	assert.deepEqual(collection.mainEntity.itemListElement.map((item) => item.position), visibleCorePosts.map((_, index) => index + 1));
	assert.deepEqual(collection.mainEntity.itemListElement.map((item) => item.item['@id']), visibleCorePosts.map((post) => `${siteConfig.url}/blog/${post.slug}`));

	if (tagFAQs[coreTopic.slug]?.length) {
		assert.match(core.body, /Häufige Fragen zu/);
		assert.equal(coreDocuments.filter((document) => document['@type'] === 'FAQPage').length, 1);
	} else {
		assert.doesNotMatch(core.body, /Häufige Fragen zu/);
		assert.equal(coreDocuments.filter((document) => document['@type'] === 'FAQPage').length, 0);
	}

	assert.match(thin.head, /name="robots" content="noindex,follow"/);
	assert.match(thin.head, new RegExp(`rel="canonical" href="${siteConfig.url}/tags/tutorial"`));
	assert.equal(thinDocuments.some((document) => document['@type'] === 'CollectionPage'), false);
	assert.equal(thinDocuments.some((document) => document['@type'] === 'FAQPage'), false);
	assert.doesNotMatch(thin.body, /Häufige Fragen zu/);
});

test('real sitemap response lists only the five core tag URLs and retains articles and episodes', async () => {
	const [sitemap, postsModule, episodesModule] = await Promise.all([
		vite.ssrLoadModule('/src/routes/sitemap.xml/+server.ts'),
		vite.ssrLoadModule('/src/lib/utils/posts.ts'),
		vite.ssrLoadModule('/src/lib/utils/episodes.ts')
	]);
	const { siteConfig } = await vite.ssrLoadModule('/src/lib/config.ts');
	const response = await sitemap.GET();
	const xml = await response.text();
	const tagSlugs = Array.from(xml.matchAll(/<loc>[^<]+\/tags\/([^<]+)<\/loc>/g), (match) => match[1]);
	const [posts, episodes] = await Promise.all([postsModule.getPosts(), episodesModule.getEpisodes()]);

	assert.equal(response.headers.get('content-type'), 'application/xml');
	assert.deepEqual(tagSlugs, CORE_TOPIC_SLUGS);
	assert.doesNotMatch(xml, /\/blog\/seite\//);
	for (const post of posts) assert.match(xml, new RegExp(`<loc>${siteConfig.url}/blog/${post.slug}</loc>`));
	for (const episode of episodes) assert.match(xml, new RegExp(`<loc>${siteConfig.url}/podcast/${episode.slug}</loc>`));
});
