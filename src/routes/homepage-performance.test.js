import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { imageMetadata } from '../lib/data/image-metadata.generated.js';
import { CORE_TOPICS } from '../lib/data/core-topics.js';

const routesRoot = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(routesRoot, '..', '..');

test('homepage data is server-only and returns four latest posts plus real media records', async () => {
	assert.equal(existsSync(join(routesRoot, '+page.ts')), false);
	const loader = await readFile(join(routesRoot, '+page.server.ts'), 'utf8');
	assert.match(loader, /selectLatestHomepagePosts\(posts,\s*4\)/);
	assert.match(loader, /selectLatestEpisodeWithUrl\(episodes,\s*'videoUrl'\)/);
	assert.match(loader, /selectLatestEpisodeWithUrl\(episodes,\s*'audioUrl'\)/);
	assert.doesNotMatch(loader, /posts\.slice\(0,\s*6\)/);
	assert.match(loader, /totalCount:\s*posts\.length\s*\+\s*episodes\.length/);
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
	assert.match(card, /\(max-width: 768px\) calc\(100vw - 32px\)/);
	assert.match(card, /grid-template-columns:\s*minmax\(0, 1\.35fr\) minmax\(280px, \.65fr\)/);
	assert.match(card, /\.post-card\.featured\.without-image\s*\{\s*grid-template-columns:\s*1fr/);
});

test('video uses a local keyboard-operable facade before loading privacy-enhanced YouTube', async () => {
	const [page, player] = await Promise.all([
		readFile(join(routesRoot, '+page.svelte'), 'utf8'),
		readFile(join(projectRoot, 'src', 'lib', 'components', 'media', 'LiteYouTubePlayer.svelte'), 'utf8')
	]);
	assert.match(page, /<LiteYouTubePlayer/);
	assert.match(page, /latestVideo/);
	assert.match(player, /let activated = \$state\(false\)/);
	assert.match(player, /loading="lazy"/);
	assert.match(player, /type="button"/);
	assert.match(player, /Video abspielen:/);
	assert.match(player, /youtube-nocookie\.com\/embed\/\$\{videoId\}/);
	assert.match(player, /\{#if activated\}[\s\S]*<iframe/);
});

test('topic artwork stays within the homepage image budget', async () => {
	const topicsDir = join(projectRoot, 'static', 'images', 'homepage', 'topics');
	const page = await readFile(join(routesRoot, '+page.svelte'), 'utf8');
	assert.match(page, /\(max-width: 768px\) 72vw/);
	assert.match(page, /class="topic-image"[\s\S]*decoding="async"/);
	assert.match(page, /loading="lazy"/);
	assert.match(page, /width=\{topic\.imageSeo\.width \?\? 1200\}/);
	assert.match(page, /height=\{topic\.imageSeo\.height \?\? 675\}/);
	const expectedMasters = ['automatisierung', 'fotografie', 'ki-tech', 'maker-diy', 'produktivitaet']
		.map((name) => `${name}-landscape.webp`);
	const expectedThumbs = expectedMasters.map((file) => file.replace('.webp', '-thumb.webp'));
	const allFiles = await readdir(topicsDir);
	for (const file of [...expectedMasters, ...expectedThumbs]) {
		assert.ok(allFiles.includes(file), `${file} must exist`);
		const metadata = imageMetadata[`/images/homepage/topics/${file}`];
		assert.equal(metadata?.width, file.includes('-thumb.') ? 400 : 1200, `${file} width`);
		assert.equal(metadata?.height, file.includes('-thumb.') ? 225 : 675, `${file} height`);
	}
	assert.deepEqual(CORE_TOPICS.map((topic) => topic.image), [
		'/images/homepage/topics/ki-tech-landscape.webp',
		'/images/homepage/topics/maker-diy-landscape.webp',
		'/images/homepage/topics/automatisierung-landscape.webp',
		'/images/homepage/topics/fotografie-landscape.webp',
		'/images/homepage/topics/produktivitaet-landscape.webp'
	]);
	const thumbSizes = await Promise.all(expectedThumbs.map(async (file) => (await stat(join(topicsDir, file))).size));
	assert.ok(thumbSizes.reduce((sum, size) => sum + size, 0) <= 160 * 1024);
	assert.equal(existsSync(join(projectRoot, 'static', 'images', 'video', 'ki-bildbearbeitung-trmt-003.webp')), true);
	assert.equal(imageMetadata['/images/video/ki-bildbearbeitung-trmt-003.webp']?.width, 1280);
	assert.equal(imageMetadata['/images/video/ki-bildbearbeitung-trmt-003.webp']?.height, 720);
});
