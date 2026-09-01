// @ts-nocheck
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(path, 'utf8');

test('mdsvex uses the central responsive image plugin', () => {
	const config = read('svelte.config.js');
	assert.match(config, /rehypeImageSeo/);
	assert.match(config, /rehypePlugins/);
});

test('sitemap declares and emits Google image entries', () => {
	const sitemap = read('src/routes/sitemap.xml/+server.ts');
	assert.match(sitemap, /xmlns:image="http:\/\/www\.google\.com\/schemas\/sitemap-image\/1\.1"/);
	assert.match(sitemap, /renderImageEntries/);
});

test('podcast and tag pages publish explicit social preview images', () => {
	const podcast = read('src/routes/podcast/[slug]/+page.svelte');
	const tags = read('src/routes/tags/[tag]/+page.svelte');
	assert.match(podcast, /property="og:image"/);
	assert.match(podcast, /name="twitter:image"/);
	assert.match(tags, /name="twitter:image"/);
});

test('image-heavy cards publish intrinsic dimensions and responsive sources', () => {
	const promptCard = read('src/lib/components/prompt-library/PromptCard.svelte');
	const blogCard = read('src/lib/components/blog/BlogCard.svelte');
	for (const source of [promptCard, blogCard]) {
		assert.match(source, /getImageSeo/);
		assert.match(source, /srcset=/);
		assert.match(source, /width=/);
		assert.match(source, /height=/);
	}
});
