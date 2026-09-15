import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { test } from 'node:test';
import { imageMetadata } from '../../lib/data/image-metadata.generated.js';

const articlePath = new URL('./gpt-6-astra-richtig-nutzen.md', import.meta.url);

/** @param {string} article */
function articleBody(article) {
	return article.replace(/^---[\s\S]*?---\s*/, '');
}

test('Astra draft opens with the reader problem and leaves the H1 to the route', () => {
	const article = readFileSync(articlePath, 'utf8');
	const body = articleBody(article);
	const firstParagraph = body.split(/\n\s*\n/, 1)[0];
	const sentenceCount = (firstParagraph.match(/[.!?](?:\*\*)?(?:\s|$)/g) ?? []).length;

	assert.match(article, /^draft:\s*true$/m);
	assert.match(
		article,
		/^title: "GPT-6 Astra richtig nutzen: 5 Fehler, die Zeit und Ergebnisse kosten"$/m
	);
	assert.match(article, /^seoTitle: "GPT-6 Astra richtig nutzen: 5 Fehler und schnelle Lösungen"$/m);
	assert.doesNotMatch(body, /^#\s+/m, 'the route owns the single public H1');
	assert.ok(sentenceCount >= 1 && sentenceCount <= 2, `expected a 1-2 sentence thesis, received ${sentenceCount}`);
	assert.match(firstParagraph, /GPT-6 Astra/);
	assert.match(firstParagraph, /nicht automatisch/);
	assert.match(firstParagraph, /fünf/);
});

test('Astra article explains the diagnosis and five fixes in beginner language', () => {
	const article = readFileSync(articlePath, 'utf8');
	const body = articleBody(article);
	const headings = body.match(/^##\s+.+/gm) ?? [];

	assert.ok(headings.length >= 9, `expected at least 9 H2 sections, received ${headings.length}`);
	assert.equal(headings[0], '## Warum liefert das stärkere Modell nicht automatisch das bessere Ergebnis?');
	assert.match(body, /Codex ist OpenAIs Arbeitsumgebung/);
	assert.match(body, /Reasoning-Stufe/);
	assert.match(body, /Browser Use/);
	assert.match(body, /Computer Use/);
	assert.match(body, /Ein Skill ist eine gespeicherte Arbeitsanweisung/);
	assert.match(body, /Sprachmodus/);
	assert.match(body, /prüfbares Zwischenergebnis/);
	assert.match(body, /class="rf-block rf-tldr"/);
	assert.match(body, /class="rf-block rf-takeaway"/);
	assert.match(body, /https:\/\/developers\.openai\.com\/api\/docs\/guides\/latest-model/);
	assert.match(body, /https:\/\/help\.openai\.com\/en\/articles\/20001516/);
	assert.match(body, /https:\/\/help\.openai\.com\/en\/articles\/20001275/);
	assert.match(body, /\/blog\/perfekt-prompten-llm-guide/);
	assert.doesNotMatch(body.replace(/\n— TRMT\s*$/, ''), /—|–/);
});

test('public draft hides radar provenance and ships a real 16:9 hero plus thumbnail', () => {
	const article = readFileSync(articlePath, 'utf8');
	const body = articleBody(article);
	const master = '/images/blog/gpt-6-astra-richtig-nutzen-1.webp';
	const thumb = '/images/blog/gpt-6-astra-richtig-nutzen-1-thumb.webp';

	assert.doesNotMatch(body, /Chase\s*AI|chaseai\.io|youtube\.com|Transkript/i);
	assert.doesNotMatch(body, /ich habe (?:es )?getestet|mein Test|meine Demo/i);
	assert.match(article, new RegExp(`^heroImage: "${master}"$`, 'm'));
	assert.match(article, new RegExp(`^heroImageThumb: "${thumb}"$`, 'm'));
	assert.equal(existsSync(`static${master}`), true);
	assert.equal(existsSync(`static${thumb}`), true);
	assert.deepEqual(
		{ width: imageMetadata[master]?.width, height: imageMetadata[master]?.height },
		{ width: 1600, height: 900 }
	);
	assert.deepEqual(
		{ width: imageMetadata[thumb]?.width, height: imageMetadata[thumb]?.height },
		{ width: 400, height: 225 }
	);
	assert.ok(statSync(`static${master}`).size <= 180 * 1024, 'hero should stay within the 180 KB budget');
	assert.ok(statSync(`static${thumb}`).size <= 60 * 1024, 'thumbnail should stay within the 60 KB budget');
});
