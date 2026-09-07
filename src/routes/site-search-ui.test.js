// @ts-nocheck
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { test } from 'node:test';

const read = (...parts) => readFile(join(process.cwd(), ...parts), 'utf8');

test('header mounts an accessible, lazy global-search dialog', async () => {
	const [header, search, results] = await Promise.all([
		read('src', 'lib', 'components', 'layout', 'Header.svelte'),
		read('src', 'lib', 'components', 'search', 'SiteSearch.svelte'),
		read('src', 'lib', 'components', 'search', 'SearchResults.svelte')
	]);

	assert.match(header, /import SiteSearch/);
	assert.match(header, /<SiteSearch\s*\/>[\s\S]*?<ThemeToggle/);
	assert.match(search, /aria-label="Website durchsuchen"/);
	assert.match(search, /<dialog[\s\S]*aria-labelledby="site-search-title"/);
	assert.match(search, /type="search"[\s\S]*maxlength="160"/);
	assert.match(search, /aria-label="Suche schließen"/);
	assert.match(search, /oncancel=/);
	assert.match(search, /triggerButton\?\.focus/);
	assert.match(search, /searchSiteIndex\(index, query, \{ limit: 12 \}\)/);
	assert.match(results, /aria-live="polite"/);
	assert.match(results, /Artikel/);
	assert.match(results, /Podcast/);
	assert.match(results, /Tool/);
	assert.doesNotMatch(results, /\{@html/);

	const openFunction = search.match(/async function openSearch\(\)[\s\S]*?\n\t}/)?.[0] ?? '';
	assert.match(openFunction, /loadIndex/);
	assert.doesNotMatch(search.split('<script>')[1]?.split('async function')[0] ?? '', /loadSearchIndex\(/);
});

test('search controls keep 44px targets and responsive layouts', async () => {
	const [search, results] = await Promise.all([
		read('src', 'lib', 'components', 'search', 'SiteSearch.svelte'),
		read('src', 'lib', 'components', 'search', 'SearchResults.svelte')
	]);

	assert.match(search, /\.search-trigger\s*\{[^}]*width:\s*44px;[^}]*height:\s*44px/s);
	assert.match(search, /@media \(max-width: 640px\)/);
	assert.match(search, /@media \(prefers-reduced-motion: reduce\)/);
	assert.match(results, /min-height:\s*44px/);
});

test('homepage editorial bridge clips its background with the shared rounded geometry', async () => {
	const homepage = await read('src', 'routes', '+page.svelte');
	const rule = homepage.match(/\.homepage-context\s*\{[^}]+\}/)?.[0] ?? '';

	assert.match(rule, /overflow:\s*hidden/);
	assert.match(rule, /border-radius:\s*var\(--radius-xl\)/);
});
