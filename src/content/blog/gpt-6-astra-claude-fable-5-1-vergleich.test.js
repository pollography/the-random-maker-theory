import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const articlePath = new URL('./gpt-6-astra-claude-fable-5-1-vergleich.md', import.meta.url);

test('Astra comparison stays draft-only, source-bounded and scannable', () => {
	const article = readFileSync(articlePath, 'utf8');
	const body = article.replace(/^---[\s\S]*?---\s*/, '');
	const headings = body.match(/^##\s+.+/gm) ?? [];

	assert.match(article, /^draft:\s*true$/m);
	assert.doesNotMatch(body, /^#\s+/m, 'the route owns the single public H1');
	assert.match(body, /^\*\*OpenAI hat GPT-6 Astra veröffentlicht[\s\S]*?\*\*/);
	assert.ok(headings.length >= 9, `expected at least 9 H2 sections, received ${headings.length}`);
	assert.match(article, /class="rf-block rf-tldr"/);
	assert.match(article, /class="rf-block rf-takeaway"/);
	assert.match(article, /class="evidence-strip"/);
	assert.match(article, /class="benchmark-bars"/);
	assert.match(article, /class="decision-grid"/);
	assert.match(article, /https:\/\/openai\.com\/index\/gpt-6-astra\//);
	assert.match(article, /https:\/\/developers\.openai\.com\/api\/docs\/models\/gpt-6-astra/);
	assert.match(article, /https:\/\/openai\.com\/index\/safety-overview-gpt-6-astra\//);
	assert.match(article, /https:\/\/www\.anthropic\.com\/claude\/fable/);
	assert.match(article, /Herstellerangaben/);
	assert.match(article, /keine unabhängige Messung/);
	assert.doesNotMatch(article, /chase|youtube|mRiuhAjnPgI/i);
	assert.doesNotMatch(body, /(^|\s)#[^#\s]/m, 'no hashtag leakage');
	assert.doesNotMatch(article, /—/, 'TRMT public copy avoids em dashes');
});

test('Astra comparison states the price and benchmark counterevidence', () => {
	const article = readFileSync(articlePath, 'utf8');

	assert.match(article, /10 US-Dollar pro Million Input-Tokens/);
	assert.match(article, /50 US-Dollar pro Million Output-Tokens/);
	assert.match(article, /0,25 US-Dollar/);
	assert.match(article, /mehr als 272\.000 Input-Tokens/);
	assert.match(article, /AA Intelligence Index/);
	assert.match(article, /Humanity's Last Exam mit Tools/);
	assert.match(article, /Terminal-Bench 4\.0/);
	assert.match(article, /DeepSWE/);
	assert.match(article, /kein pauschaler Fable-Killer/);
});
