import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { test } from 'node:test';
import {
	createSearchRecord,
	extractSearchDocument,
	isSearchRecord,
	normalizeSearchText,
	searchSiteIndex
} from './site-search.js';

const records = [
	{
		type: 'article',
		slug: 'esp32',
		url: '/blog/esp32',
		title: 'ESP32 Einstieg',
		description: 'Sensor bauen',
		tags: ['maker'],
		category: 'Maker & DIY',
		headings: ['WLED verbinden'],
		bodyTokens: 'esp32 sensor wled verbinden',
		date: '2026-09-02'
	},
	{
		type: 'podcast',
		slug: 'ki-foto',
		url: '/podcast/ki-foto',
		title: 'KI Bildbearbeitung',
		description: 'Direkt anhören',
		tags: [],
		category: 'Podcast',
		headings: [],
		bodyTokens: 'lightroom workflow fotografie',
		date: '2026-09-03'
	},
	{
		type: 'tool',
		slug: 'bildprompt-library',
		url: '/tools/bildprompt-library',
		title: 'Bildprompt-Library',
		description: '147 Prompts durchsuchen',
		tags: ['ki-tools'],
		category: 'Tool',
		headings: [],
		bodyTokens: 'bild prompt kopieren',
		date: ''
	}
];

test('normalizes German text and bounds hostile input as plain text', () => {
	assert.equal(normalizeSearchText('ÜBER Größe & Spaß'), 'uber grosse spass');
	assert.doesNotMatch(normalizeSearchText('<script>alert(1)</script>'), /[<>]/);
});

test('extracts headings and searchable body tokens without frontmatter, code, or HTML', () => {
	const document = extractSearchDocument('---\ndraft: true\n---\n## Kamera & Licht\nText mit Größe.\n```js\nalert(1)\n```\n<script>bad()</script>');
	assert.deepEqual(document.headings, ['Kamera & Licht']);
	assert.match(document.bodyTokens, /kamera licht text mit grosse/);
	assert.doesNotMatch(document.bodyTokens, /draft|alert|bad/);
});

test('ranks title ahead of body and applies type and topic filters', () => {
	assert.equal(searchSiteIndex(records, 'ESP32')[0].slug, 'esp32');
	assert.deepEqual(searchSiteIndex(records, 'workflow', { types: ['podcast'] }).map((item) => item.slug), ['ki-foto']);
	assert.deepEqual(searchSiteIndex(records, 'sensor', { types: ['article'], tag: 'maker' }).map((item) => item.slug), ['esp32']);
	assert.deepEqual(searchSiteIndex(records, 'sensor', { tag: 'ki-tools' }), []);
});

test('creates and validates only allowed public records', () => {
	assert.equal(createSearchRecord(records[0]).slug, 'esp32');
	assert.equal(isSearchRecord({ title: '<script>' }), false);
	assert.throws(() => createSearchRecord({ ...records[0], url: '/preview/esp32' }), /Invalid public search record/);
});

test('handles empty, overlong, malformed, and large inputs deterministically', () => {
	assert.deepEqual(searchSiteIndex(records, ''), []);
	assert.equal(searchSiteIndex(records, 'x'.repeat(500)).length, 0);
	const corpus = Array.from({ length: 1000 }, (_, index) => ({ ...records[0], slug: `p-${index}`, url: `/blog/p-${index}` }));
	const start = performance.now();
	const result = searchSiteIndex(corpus, 'sensor', { limit: 12 });
	assert.equal(result.length, 12);
	// The full Node suite runs several SvelteKit builds in parallel. Keep this
	// guard strict enough to catch accidental quadratic work without making it
	// depend on short-lived CPU contention from those build processes.
	assert.ok(performance.now() - start < 100);
});
