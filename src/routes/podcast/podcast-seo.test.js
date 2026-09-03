// @ts-nocheck
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const page = readFileSync('src/routes/podcast/[slug]/+page.svelte', 'utf8');

test('podcast detail pages distinguish their result titles from paired articles', () => {
	assert.match(page, /<title>Podcast: \{data\.episode\.title\} \| TRMT<\/title>/);
	assert.match(page, /property="og:title" content=\{`Podcast: \$\{data\.episode\.title\}`\}/);
	assert.match(page, /name="twitter:title" content=\{`Podcast: \$\{data\.episode\.title\}`\}/);
});

test('the visible episode heading remains the editorial title', () => {
	assert.match(page, /<h1[^>]*>[\s\S]*\{data\.episode\.title\}[\s\S]*<\/h1>/);
});
