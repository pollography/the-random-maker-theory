import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const articlePath = new URL('./claude-fable-5-1-text-wasserzeichen.md', import.meta.url);

test('watermark article stays draft-only, independently sourced and useful without becoming an evasion guide', () => {
	const article = readFileSync(articlePath, 'utf8');
	const body = article.replace(/^---[\s\S]*?---\s*/, '');
	const headings = body.match(/^##\s+.+/gm) ?? [];
	const opening = body.split(/\r?\n\r?\n/, 1)[0];

	assert.match(article, /^title: "Claude Fable 5\.1 markiert Texte: Was das Wasserzeichen wirklich erkennt"$/m);
	assert.match(article, /^seoTitle: "Claude Fable 5\.1 Wasserzeichen: Funktion und Grenzen"$/m);
	assert.match(article, /^slug: "claude-fable-5-1-text-wasserzeichen"$/m);
	assert.match(article, /^date: "2026-09-03"$/m);
	assert.match(article, /^draft:\s*true$/m);
	assert.doesNotMatch(body, /^#\s+/m, 'the route owns the single public H1');
	assert.ok(opening.length >= 180 && opening.length <= 520, `opening thesis length was ${opening.length}`);
	assert.match(opening, /Claude Fable 5\.1/);
	assert.match(opening, /Wasserzeichen/);
	assert.match(opening, /zeigt|erklärt/);
	assert.ok(headings.length >= 7, `expected at least 7 H2 sections, received ${headings.length}`);
	assert.match(article, /class="rf-block rf-tldr"/);
	assert.match(article, /class="decision-grid"/);
	assert.doesNotMatch(article, /^\| Aussage \|/m, 'the proof boundary must stack cleanly on mobile');
	assert.match(article, /https:\/\/www\.anthropic\.com\/news\/claude-text-watermark/);
	assert.match(article, /https:\/\/www\.anthropic\.com\/claude-fable-and-mythos-5-1/);
	assert.match(article, /https:\/\/digital-strategy\.ec\.europa\.eu\/en\/policies\/guidelines-ai-transparency-obligations/);
	assert.match(article, /https:\/\/deepmind\.google\/blog\/watermarking-ai-generated-text-and-video-with-synthid/);
	assert.match(article, /\/blog\/claude-fable-5-1-preis-benchmarks/);
	assert.doesNotMatch(article, /chase|youtube|slePq-H-TMA|transkript/i);
	assert.doesNotMatch(article, /ollama|lokales modell|detektor austricksen|watermark entfernen/i);
	assert.doesNotMatch(article, /ich habe getestet|mein test|wir haben/i);
});

test('watermark article distinguishes signal, authorship and legal disclosure', () => {
	const article = readFileSync(articlePath, 'utf8');

	assert.match(article, /keine versteckten Zeichen/i);
	assert.match(article, /kein Beweis/i);
	assert.match(article, /kleine[nr]? Text/i);
	assert.match(article, /Code/);
	assert.match(article, /C2PA/);
	assert.match(article, /2\. August 2026/);
	assert.match(article, /menschliche Überprüfung|redaktionelle Verantwortung/i);
});
