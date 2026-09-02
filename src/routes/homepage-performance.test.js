import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { imageMetadata } from '../lib/data/image-metadata.generated.js';

const routesRoot = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(routesRoot, '..', '..');

test('homepage data is server-only and returns four curated post records', async () => {
	assert.equal(existsSync(join(routesRoot, '+page.ts')), false);
	const loader = await readFile(join(routesRoot, '+page.server.ts'), 'utf8');
	assert.match(loader, /selectHomepagePosts\(posts,\s*FEATURED_POST_SLUG,\s*4\)/);
	assert.doesNotMatch(loader, /posts\.slice\(0,\s*6\)/);
	assert.match(loader, /totalCount:\s*posts\.length\s*\+\s*\(latestEpisode\s*\?\s*1\s*:\s*0\)/);
});

test('fonts are local and both LCP display faces are preloaded', async () => {
	const [css, html] = await Promise.all([
		readFile(join(projectRoot, 'src', 'app.css'), 'utf8'),
		readFile(join(projectRoot, 'src', 'app.html'), 'utf8')
	]);
	assert.doesNotMatch(css, /fonts\.(googleapis|gstatic)\.com/);
	assert.doesNotMatch(html, /fonts\.(googleapis|gstatic)\.com/);
	for (const file of [
		'instrument-serif-regular.woff2',
		'instrument-serif-italic.woff2',
		'inter-latin-variable.woff2',
		'jetbrains-mono-latin-variable.woff2'
	]) {
		assert.equal(existsSync(join(projectRoot, 'static', 'fonts', file)), true, file);
	}
	assert.match(html, /instrument-serif-regular\.woff2/);
	assert.match(html, /instrument-serif-italic\.woff2/);
});

test('critical hero copy avoids a count-up repaint during LCP', async () => {
	const page = await readFile(join(routesRoot, '+page.svelte'), 'utf8');
	assert.match(page, /class="counter-number">\{totalCount\}/);
	assert.doesNotMatch(page, /displayCount|animateCount|counterRef/);
});

test('the now-visible featured article image is eager and high priority', async () => {
	const card = await readFile(join(projectRoot, 'src', 'lib', 'components', 'blog', 'HomepagePostCard.svelte'), 'utf8');
	assert.match(card, /loading=\{featured \? 'eager' : 'lazy'\}/);
	assert.match(card, /fetchpriority=\{featured \? 'high' : undefined\}/);
	assert.match(card, /\(max-width: 768px\) 132px/);
	assert.match(card, /grid-template-columns:\s*clamp\(96px, 24vw, 132px\) minmax\(0, 1fr\)/);
	assert.match(card, /\.post-card\.featured\.without-image\s*\{\s*grid-template-columns:\s*1fr/);
});

test('video uses a local keyboard-operable facade before loading privacy-enhanced YouTube', async () => {
	const page = await readFile(join(routesRoot, '+page.svelte'), 'utf8');
	assert.match(page, /let videoLoaded = \$state\(false\)/);
	assert.match(page, /let videoPosterReady = \$state\(false\)/);
	assert.match(page, /rootMargin:\s*'200px'/);
	assert.match(page, /\{#if videoPosterReady\}[\s\S]*prompt-engineering-trmt-002\.webp/);
	assert.match(page, /type="button"/);
	assert.match(page, /Video abspielen:/);
	assert.match(page, /youtube-nocookie\.com\/embed\/KWIH_InMQZ8/);
	assert.match(page, /\{#if videoLoaded\}[\s\S]*<iframe/);
	assert.equal(
		existsSync(join(projectRoot, 'static', 'images', 'video', 'prompt-engineering-trmt-002.webp')),
		true
	);
});

test('topic artwork stays within the homepage image budget', async () => {
	const topicsDir = join(projectRoot, 'static', 'images', 'homepage', 'topics');
	const page = await readFile(join(routesRoot, '+page.svelte'), 'utf8');
	assert.match(page, /\(max-width: 768px\) 42vw/);
	assert.match(page, /class="topic-image"[\s\S]*decoding="sync"/);
	assert.match(page, /loading="lazy"/);
	assert.match(page, /width=\{topic\.imageSeo\.width \?\? 512\}/);
	assert.match(page, /height=\{topic\.imageSeo\.height \?\? 512\}/);
	const files = (await readdir(topicsDir)).filter((file) => file.endsWith('.webp')).sort();
	assert.deepEqual(files, [
		'automatisierung-thumb.webp',
		'automatisierung.webp',
		'fotografie-thumb.webp',
		'fotografie.webp',
		'ki-tech-thumb.webp',
		'ki-tech.webp',
		'maker-diy-thumb.webp',
		'maker-diy.webp',
		'produktivitaet-thumb.webp',
		'produktivitaet.webp'
	]);

	const sizes = await Promise.all(files.map(async (file) => (await stat(join(topicsDir, file))).size));
	for (const [index, size] of sizes.entries()) {
		const limit = files[index].includes('-thumb.') ? 15 * 1024 : 35 * 1024;
		assert.ok(size <= limit, `${files[index]} is ${size} bytes`);
		if (files[index].includes('-thumb.')) {
			const metadata = imageMetadata[`/images/homepage/topics/${files[index]}`];
			assert.equal(metadata.width, 320, `${files[index]} width`);
			assert.equal(metadata.height, 320, `${files[index]} height`);
		}
	}
	assert.ok(sizes.reduce((sum, size) => sum + size, 0) <= 165 * 1024);
});
