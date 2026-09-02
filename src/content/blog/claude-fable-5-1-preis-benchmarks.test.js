import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const articlePath = new URL('./claude-fable-5-1-preis-benchmarks.md', import.meta.url);

test('pilot article is independently sourced, published and optimized for scanning', () => {
	const article = readFileSync(articlePath, 'utf8');
	const headings = article.match(/^##\s+.+/gm) ?? [];
	const body = article.replace(/^---[\s\S]*?---\s*/, '');

	assert.match(article, /^draft:\s*false$/m);
	assert.doesNotMatch(body, /^#\s+/m, 'the route owns the single public H1');
	assert.ok(headings.length >= 7, `expected at least 7 H2 sections, received ${headings.length}`);
	assert.ok(headings.filter((heading) => heading.endsWith('?')).length >= 5);
	assert.match(article, /class="rf-block rf-tldr"/);
	assert.match(article, /class="rf-block rf-takeaway"/);
	assert.match(article, /class="evidence-strip"/);
	assert.match(article, /class="benchmark-bars"/);
	assert.match(article, /https:\/\/www\.anthropic\.com\/claude-fable-and-mythos-5-1/);
	assert.match(article, /https:\/\/platform\.claude\.com\/docs\/en\/about-claude\/pricing/);
	assert.doesNotMatch(article, /chase/i);
	assert.doesNotMatch(article, /youtube|video|transkript/i);
	assert.doesNotMatch(article, /ich habe getestet|mein test/i);
});

test('the new scan grammar is implemented in the shared article surface', () => {
	const css = readFileSync('src/app.css', 'utf8');

	assert.match(css, /\.rf-takeaway/);
	assert.match(css, /\.evidence-strip/);
	assert.match(css, /\.benchmark-bars/);
	assert.match(css, /@media \(max-width: 640px\)/);
	assert.match(css, /\.prose table[\s\S]*overflow-x:\s*auto/);
});
