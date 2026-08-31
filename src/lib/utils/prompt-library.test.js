import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

import {
	filterPrompts,
	getCategoryCounts,
	getPublicPrompts,
	validatePromptLibrary
} from './prompt-library.js';

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(currentDirectory, '..', '..', '..');
const staticRoot = join(projectRoot, 'static');
/** @type {any} */
const data = JSON.parse(await readFile(join(projectRoot, 'src', 'lib', 'data', 'image-prompts.json'), 'utf8'));

const expectedCategoryIds = [
	'menschen-posen',
	'avatare-reaktionen',
	'alter-transformation',
	'technik-innenansichten',
	'infografiken-wissen',
	'welten-filmszenen',
	'spielzeug-sammlerstuecke',
	'miniaturwelten',
	'comics-retro',
	'stoff-knete-glas',
	'portraet-look',
	'creator-ki-video'
];

test('canonical library exposes exactly 87 tested prompts and keeps research ideas private', () => {
	const publicPrompts = getPublicPrompts(data);
	const allPrompts = /** @type {Array<{ status: string }>} */ (data.prompts);

	assert.equal(publicPrompts.length, 87);
	assert.ok(allPrompts.some((prompt) => prompt.status === 'idea'));
	assert.ok(publicPrompts.every((prompt) => prompt.status === 'tested' && prompt.image));
	assert.ok(publicPrompts.every((prompt) => prompt.command.startsWith('/')));
});

test('canonical library uses the twelve approved categories in their stable order', () => {
	const allCategories = /** @type {Array<{ id: string }>} */ (data.categories);
	assert.deepEqual(
		allCategories.map((category) => category.id),
		expectedCategoryIds
	);

	const publicCategories = new Set(getPublicPrompts(data).map((prompt) => prompt.category));
	assert.deepEqual([...publicCategories].sort(), [...expectedCategoryIds].sort());
});

test('canonical library has unique tested ids and commands with real local images', () => {
	const publicPrompts = getPublicPrompts(data);
	const ids = publicPrompts.map((prompt) => prompt.id);
	const commands = publicPrompts.map((prompt) => prompt.command);

	assert.equal(new Set(ids).size, ids.length);
	assert.equal(new Set(commands).size, commands.length);
	for (const prompt of publicPrompts) {
		assert.equal(
			existsSync(join(staticRoot, prompt.image.replace(/^\//, ''))),
			true,
			`${prompt.command} is missing ${prompt.image}`
		);
	}
});

test('validatePromptLibrary reports no structural or image errors for canonical data', () => {
	const errors = validatePromptLibrary(data, {
		imageExists: (imagePath) => existsSync(join(staticRoot, imagePath.replace(/^\//, '')))
	});

	assert.deepEqual(errors, []);
});

test('search finds commands, titles, category labels, and use cases without case sensitivity', () => {
	const publicPrompts = getPublicPrompts(data);

	assert.deepEqual(
		filterPrompts(publicPrompts, data.categories, 'POSEPACK', 'all').map((prompt) => prompt.command),
		['/posepack']
	);
	assert.ok(
		filterPrompts(publicPrompts, data.categories, 'YouTube', 'all').some(
			(prompt) => prompt.command === '/actionposes'
		)
	);
	assert.ok(
		filterPrompts(publicPrompts, data.categories, 'Miniaturwelten', 'all').every(
			(prompt) => prompt.category === 'miniaturwelten'
		)
	);
});

test('search and category filters compose deterministically', () => {
	const result = filterPrompts(
		getPublicPrompts(data),
		data.categories,
		'video',
		'menschen-posen'
	);

	assert.ok(result.some((prompt) => prompt.command === '/posepack'));
	assert.ok(result.every((prompt) => prompt.category === 'menschen-posen'));
	assert.deepEqual(filterPrompts(getPublicPrompts(data), data.categories, 'does-not-exist', 'all'), []);
});

test('category counts cover all tested prompts and preserve zero-safe output', () => {
	const publicPrompts = getPublicPrompts(data);
	const counts = getCategoryCounts(publicPrompts, data.categories);

	assert.equal(counts.all, 87);
	assert.equal(
		expectedCategoryIds.reduce((total, categoryId) => total + counts[categoryId], 0),
		87
	);
	for (const categoryId of expectedCategoryIds) assert.ok(counts[categoryId] > 0);
});

test('public Svelte surface exposes the approved search, copy, status, and download controls', async () => {
	const componentRoot = join(projectRoot, 'src', 'lib', 'components', 'prompt-library');
	const routeRoot = join(projectRoot, 'src', 'routes', 'tools', 'bildprompt-library');
	const [card, library, page] = await Promise.all([
		readFile(join(componentRoot, 'PromptCard.svelte'), 'utf8'),
		readFile(join(componentRoot, 'PromptLibrary.svelte'), 'utf8'),
		readFile(join(routeRoot, '+page.svelte'), 'utf8')
	]);

	assert.match(card, /Prompt kopieren/);
	assert.match(card, /aria-live="polite"/);
	assert.match(card, /copyPromptText/);
	assert.match(library, /type="search"/);
	assert.match(library, /Prompt suchen/);
	assert.match(library, /filterPrompts/);
	assert.match(page, /Bildprompt-Library/);
	assert.match(page, /PDF-Cheat-Sheet/);
	assert.match(page, /\/downloads\/trmt-bildprompt-cheatsheet\.pdf/);
	assert.match(page, /@media \(max-width: 760px\)[\s\S]*h1 \{ font-size:/);
});

test('sticker previews use transparent display derivatives while canonical originals stay unchanged', () => {
	const prompts = /** @type {Array<Record<string, any>>} */ (data.prompts);
	const promptsById = new Map(prompts.map((prompt) => [prompt.id, prompt]));
	const sticker = promptsById.get('sticker');
	const stickerPack = promptsById.get('sticker-pack');
	assert.ok(sticker);
	assert.ok(stickerPack);

	assert.equal(sticker.image, '/images/blog/ki-bildprompts/11-sticker.webp');
	assert.equal(sticker.displayImage, '/images/blog/ki-bildprompts/11-sticker-transparent.webp');
	assert.equal(stickerPack.image, '/images/blog/ki-bildprompts/12-sticker-pack.webp');
	assert.equal(stickerPack.displayImage, '/images/blog/ki-bildprompts/12-sticker-pack-transparent.webp');
	assert.equal(
		existsSync(join(staticRoot, sticker.displayImage.replace(/^\//, ''))),
		true,
		'single sticker display derivative is missing'
	);
	assert.equal(
		existsSync(join(staticRoot, stickerPack.displayImage.replace(/^\//, ''))),
		true,
		'sticker-pack display derivative is missing'
	);
});

test('prompt images open a shared in-page dialog and return focus without a new tab', async () => {
	const componentRoot = join(projectRoot, 'src', 'lib', 'components', 'prompt-library');
	const [card, library, lightbox] = await Promise.all([
		readFile(join(componentRoot, 'PromptCard.svelte'), 'utf8'),
		readFile(join(componentRoot, 'PromptLibrary.svelte'), 'utf8'),
		readFile(join(componentRoot, 'PromptLightbox.svelte'), 'utf8')
	]);

	assert.doesNotMatch(card, /target="_blank"/);
	assert.match(card, /class:transparent-preview/);
	assert.match(card, /prompt\.displayImage \?\? prompt\.image/);
	assert.match(card, /onPreview/);
	assert.match(library, /<PromptLightbox/);
	assert.match(library, /returnFocusElement/);
	assert.match(library, /\.focus\(\)/);
	assert.match(lightbox, /<dialog/);
	assert.match(lightbox, /aria-modal="true"/);
	assert.match(lightbox, /oncancel/);
	assert.match(lightbox, /event\.key === 'Escape'/);
	assert.match(lightbox, /event\.target === dialog/);
	assert.match(lightbox, /document\.body\.style\.overflow = 'hidden'/);
	assert.match(lightbox, /Schließen/);
});

test('image controls use a two-tone focus ring that stays visible over arbitrary artwork', async () => {
	const componentRoot = join(projectRoot, 'src', 'lib', 'components', 'prompt-library');
	const [card, lightbox] = await Promise.all([
		readFile(join(componentRoot, 'PromptCard.svelte'), 'utf8'),
		readFile(join(componentRoot, 'PromptLightbox.svelte'), 'utf8')
	]);
	const twoToneInsetRing = /box-shadow:\s*inset 0 0 0 3px #fff,\s*inset 0 0 0 6px #111/;

	assert.match(card, twoToneInsetRing);
	assert.match(lightbox, twoToneInsetRing);
});

test('prompt cards serve compact local thumbnails and defer offscreen rendering', async () => {
	const card = await readFile(
		join(projectRoot, 'src', 'lib', 'components', 'prompt-library', 'PromptCard.svelte'),
		'utf8'
	);
	const publicPrompts = getPublicPrompts(data);

	assert.match(card, /getPromptThumbnail/);
	assert.match(card, /loading=\{priority \? 'eager' : 'lazy'\}/);
	assert.match(card, /fetchpriority=\{priority \? 'high' : 'auto'\}/);
	assert.match(card, /content-visibility: auto/);
	for (const prompt of publicPrompts) {
		const previewImage = prompt.displayImage ?? prompt.image;
		const thumbnailPath = `/images/blog/ki-bildprompts/thumbs/${previewImage.split('/').at(-1)}`;
		assert.equal(
			existsSync(join(staticRoot, thumbnailPath.replace(/^\//, ''))),
			true,
			`${prompt.command} is missing ${thumbnailPath}`
		);
	}
});

test('library controls keep visible labels in their accessible names and contrast', async () => {
	const [card, page] = await Promise.all([
		readFile(join(projectRoot, 'src', 'lib', 'components', 'prompt-library', 'PromptCard.svelte'), 'utf8'),
		readFile(join(projectRoot, 'src', 'routes', 'tools', 'bildprompt-library', '+page.svelte'), 'utf8')
	]);

	assert.match(card, /aria-label="Prompt kopieren: \{prompt\.command\}"/);
	assert.doesNotMatch(card, /aria-label="\{prompt\.command\} kopieren"/);
	assert.match(page, /\.download-button small \{[^}]*color: var\(--color-on-accent\);[^}]*opacity: 1;/s);
	assert.doesNotMatch(page, /border-left:\s*[2-9]px/);
});

test('the public library is discoverable from navigation and the sitemap', async () => {
	const [header, footer, sitemap] = await Promise.all([
		readFile(join(projectRoot, 'src', 'lib', 'components', 'layout', 'Header.svelte'), 'utf8'),
		readFile(join(projectRoot, 'src', 'lib', 'components', 'layout', 'Footer.svelte'), 'utf8'),
		readFile(join(projectRoot, 'src', 'routes', 'sitemap.xml', '+server.ts'), 'utf8')
	]);

	assert.equal((header.match(/href="\/tools\/bildprompt-library"/g) ?? []).length, 2);
	assert.match(header, /function isActive\(path\)[\s\S]*pathname === path \|\| pathname\.startsWith\(`\$\{path\}\/`\)/);
	assert.match(footer, /href="\/tools\/bildprompt-library"[^>]*>Bildprompt-Library<\/a>/);
	assert.match(sitemap, /\$\{siteConfig\.url\}\/tools\/bildprompt-library/);
});
