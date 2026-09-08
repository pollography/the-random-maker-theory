import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const articleUrl = new URL('./claude-code-codex-zweitmodell-review.md', import.meta.url);

async function readArticle() {
	return readFile(articleUrl, 'utf8');
}

/** @param {string} article */
function bodyWithoutFrontmatter(article) {
	return article.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim();
}

test('keeps the route-owned H1 and opens with a two-sentence thesis', async () => {
	const article = await readArticle();
	const body = bodyWithoutFrontmatter(article);
	const thesis = body.split(/\r?\n\r?\n/, 1)[0];

	assert.match(article, /^title: "GPT-6 Astra & Claude Fable 5\.1 kombinieren: Einer baut, einer prüft"$/m);
	assert.match(article, /^slug: "claude-code-codex-zweitmodell-review"$/m);
	assert.match(article, /^date: "2026-09-08"$/m);
	assert.match(article, /^category: "ki-tools"$/m);
	assert.match(article, /^draft: true$/m);
	assert.doesNotMatch(body, /^#\s+/m, 'the blog route owns the single public H1');
	assert.equal((thesis.match(/[.!?](?=\s|\*|$)/g) ?? []).length, 2);
	assert.match(thesis, /GPT-6 Astra/);
	assert.match(thesis, /Claude Fable 5\.1/);
	assert.match(thesis, /zusätzliche Kontrollschicht/);

	const description = article.match(/^description: "([^"]+)"$/m)?.[1] ?? '';
	assert.ok(description.length >= 120 && description.length <= 160, `description has ${description.length} chars`);
});

test('teaches a bounded builder-reviewer workflow with current primary sources', async () => {
	const article = await readArticle();
	const body = bodyWithoutFrontmatter(article);

	for (const heading of [
		'## Was wird hier überhaupt kombiniert?',
		'## Warum ein zweites Modell helfen kann',
		'## Was du vor dem ersten Lauf brauchst',
		'## Der Workflow in fünf Phasen',
		'## Die drei Regeln, die den Loop stabil halten',
		'## Wo der Ansatz oft scheitert',
		'## Brauchst du dafür wirklich Astra und Fable 5.1?',
		'## Fazit: Der zweite Agent ist ein Prüfer, kein Orakel'
	]) {
		assert.match(article, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
	}

	assert.match(article, /Ein Koordinator/);
	assert.match(article, /Genau ein Agent setzt/);
	assert.match(article, /Rundenlimit/);
	assert.match(article, /--sandbox read-only/);
	assert.match(article, /--tools "Read,Glob,Grep"/);
	assert.match(article, /FREIGEGEBEN, ÜBERARBEITEN oder BLOCKIERT/);
	assert.match(article, /anderer Anbieter bedeutet andere Perspektive, nicht automatisch Wahrheit/i);
	assert.match(article, /https:\/\/developers\.openai\.com\/codex\/noninteractive/);
	assert.match(article, /https:\/\/code\.claude\.com\/docs\/en\/headless/);
	assert.match(article, /https:\/\/aclanthology\.org\/2025\.emnlp-main\.86\//);
	assert.doesNotMatch(article, /chase|youtube|transkript/i);
	assert.doesNotMatch(body, /—/);
});

test('ships as a text-only draft without unapproved image claims', async () => {
	const article = await readArticle();
	assert.doesNotMatch(article, /^heroImage:/m);
	assert.doesNotMatch(article, /^heroImageThumb:/m);
	assert.doesNotMatch(article, /!\[[^\]]*\]\([^)]*\)/);
	assert.match(article, /<div class="rf-block rf-tldr" role="note" aria-label="Kurz gesagt">/);
	assert.match(article, /<span class="rf-label" aria-hidden="true">Kurz gesagt<\/span>/);
});
