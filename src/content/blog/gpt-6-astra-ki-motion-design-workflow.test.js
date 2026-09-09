import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const articlePath = new URL('./gpt-6-astra-ki-motion-design-workflow.md', import.meta.url);

/** @param {string} article */
function articleBody(article) {
	return article.replace(/^---[\s\S]*?---\s*/, '');
}

test('motion-design draft opens with one focused thesis and leaves the H1 to the route', () => {
	const article = readFileSync(articlePath, 'utf8');
	const body = articleBody(article);
	const firstParagraph = body.split(/\n\s*\n/, 1)[0];
	const sentenceCount = (firstParagraph.match(/[.!?](?:\*\*)?(?:\s|$)/g) ?? []).length;

	assert.match(article, /^draft:\s*true$/m);
	assert.doesNotMatch(body, /^#\s+/m, 'the route owns the single public H1');
	assert.ok(sentenceCount >= 1 && sentenceCount <= 2, `expected a 1-2 sentence thesis, received ${sentenceCount}`);
	assert.match(firstParagraph, /GPT-6 Astra/);
	assert.match(firstParagraph, /Stilbibliothek/);
});

test('motion-design article is independently sourced and makes the system boundaries scannable', () => {
	const article = readFileSync(articlePath, 'utf8');
	const body = articleBody(article);
	const headings = body.match(/^##\s+.+/gm) ?? [];

	assert.ok(headings.length >= 8, `expected at least 8 H2 sections, received ${headings.length}`);
	assert.ok(headings.filter((heading) => heading.endsWith('?')).length >= 5);
	assert.match(body, /class="rf-block rf-tldr"/);
	assert.match(body, /class="rf-block rf-takeaway"/);
	assert.match(body, /class="evidence-strip"/);
	assert.match(body, /class="decision-grid"/);
	assert.match(body, /Stoppe danach\. Starte keine kostenpflichtige Generierung/);
	assert.match(body, /https:\/\/developers\.openai\.com\/api\/docs\/models\/gpt-6-astra/);
	assert.match(body, /https:\/\/higgsfield\.ai\/mcp/);
	assert.match(body, /https:\/\/modelcontextprotocol\.io\/specification\/2025-06-18\/server\/tools/);
	assert.match(body, /\/blog\/perfekt-prompten-llm-guide/);
	assert.match(body, /\/blog\/ki-video-tools-2026-sora-runway-kling/);
});

test('public draft excludes radar provenance, borrowed experience and unapproved visual assets', () => {
	const article = readFileSync(articlePath, 'utf8');
	const body = articleBody(article);

	assert.doesNotMatch(body, /Chase\s*AI|chaseai\.io|youtube\.com|Transkript/i);
	assert.doesNotMatch(body, /ich habe (?:es )?getestet|mein Test|meine Demos/i);
	assert.doesNotMatch(article, /^heroImage(?:Thumb)?:/m);
	assert.doesNotMatch(body, /—|–/);
});
