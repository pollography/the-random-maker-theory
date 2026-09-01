import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const routesRoot = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(routesRoot, '..', '..');
/** @param {...string} parts */
const read = (...parts) => readFile(join(projectRoot, ...parts), 'utf8');

test('homepage merges its positioning into the hero and removes the old subtitle', async () => {
	const page = await read('src', 'routes', '+page.svelte');
	assert.doesNotMatch(page, /Content, den ich/);
	assert.match(page, /Entdecken\. Verstehen\. Und alles/);
	assert.match(page, /Tech, KI-Tools, Maker-Projekte, Automatisierung und Produktivität/);
	assert.match(page, /href="#latest-posts"/);
	assert.match(page, /href="#topics"/);
});

test('homepage exposes five concise topic links without emoji pillar copy', async () => {
	const page = await read('src', 'routes', '+page.svelte');
	assert.match(page, /id="topics"/);
	assert.match(page, /Womit willst du anfangen\?/);
	assert.match(page, /href="\/tags\/\{pillar\.tag\}"/);
	for (const tag of ['ki-tools', 'maker', 'automatisierung', 'fotografie', 'produktivitaet']) {
		assert.match(page, new RegExp(`tag: '${tag}'`));
	}
	assert.equal((page.match(/\/images\/homepage\/topics\//g) ?? []).length, 5);
	assert.doesNotMatch(page, /pillar\.desc|pillar\.highlights|pillar\.icon/);
});

test('homepage presents one featured and three compact article cards directly after topics', async () => {
	const [page, card] = await Promise.all([
		read('src', 'routes', '+page.svelte'),
		read('src', 'lib', 'components', 'blog', 'HomepagePostCard.svelte')
	]);
	assert.match(page, /id="latest-posts"/);
	assert.match(page, /Neu & handverlesen/);
	assert.match(page, /<HomepagePostCard post=\{posts\[0\]\} featured/);
	assert.match(page, /posts\.slice\(1\)/);
	assert.match(card, /featured = false/);
	assert.match(card, /loading="lazy"/);
	assert.match(card, /href="\/blog\/\{post\.slug\}"/);
});
