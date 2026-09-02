import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const routesRoot = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(routesRoot, '..', '..');

test('homepage shows the square topic artwork without landscape cropping', async () => {
	const source = await readFile(join(routesRoot, '+page.svelte'), 'utf8');

	assert.match(source, /\.topic-image\s*\{[^}]*aspect-ratio:\s*1\s*\/\s*1/s);
	assert.doesNotMatch(source, /\.topic-image\s*\{\s*aspect-ratio:\s*2(?:\.3)?\s*\/\s*1/);
});

test('every homepage article thumbnail keeps a 16 by 9 frame', async () => {
	const source = await readFile(
		join(projectRoot, 'src', 'lib', 'components', 'blog', 'HomepagePostCard.svelte'),
		'utf8'
	);

	assert.match(source, /\.post-image\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*9/s);
	assert.doesNotMatch(source, /\.featured \.post-image\s*\{[^}]*aspect-ratio:\s*1(?:\s*\/\s*1)?\s*;/s);
});

test('footer closes with the full brand instead of a duplicate newsletter and loose acronym', async () => {
	const source = await readFile(
		join(projectRoot, 'src', 'lib', 'components', 'layout', 'Footer.svelte'),
		'utf8'
	);

	assert.doesNotMatch(source, /NewsletterSignup/);
	assert.doesNotMatch(source, /siteConfig\.shortName/);
	assert.match(source, /class="footer-wordmark"/);
	assert.match(source, /The\s*<em>Random<\/em>\s*Maker Theory/);
});
