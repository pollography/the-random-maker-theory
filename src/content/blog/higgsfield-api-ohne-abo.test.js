import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { test } from 'node:test';
import { imageMetadata } from '../../lib/data/image-metadata.generated.js';

const article = readFileSync(new URL('./higgsfield-api-ohne-abo.md', import.meta.url), 'utf8');
const body = article.replace(/^---[\s\S]*?---\s*/, '');

test('Higgsfield API article has one routed H1 and a two-sentence beginner thesis', () => {
	const opening = body.split(/\n\s*\n/, 1)[0];
	const normalizedOpening = opening.replace(/\b\d{1,2}\.\s+[A-ZÄÖÜ][a-zäöü]+\s+\d{4}/g, 'DATUM');
	const sentences = normalizedOpening.match(/[.!?](?:\*\*)?(?:\s|$)/g) ?? [];
	assert.match(article, /^draft:\s*true$/m);
	assert.match(article, /^title: "Higgsfield API ohne Abo: KI-Bilder und Videos nur bei Nutzung bezahlen"$/m);
	assert.doesNotMatch(body, /^#\s+/m);
	assert.equal(sentences.length, 2);
	assert.match(opening, /16\. September 2026/);
	assert.match(opening, /ohne Higgsfield-Abo/);
	assert.match(opening, /Kosten sowie Zugangsdaten/);
});

test('beginner gets the distinction, worked example, safeguards and checks', () => {
	for (const required of [
		'Was passiert hier eigentlich?',
		'API** steht für Programmierschnittstelle',
		'Abo, API, MCP und CLI sind nicht dasselbe',
		'fiktives Produkt: eine kleine Schreibtischlampe',
		'4 × Bildpreis + 15 × Videopreis',
		'Kostenschätzung',
		'Umgebungsvariable',
		'class="rf-block rf-tldr"',
		'aria-label="Kurz gesagt"',
		'```prompt',
		'Beispielwerte aus diesem Artikel'
	]) assert.ok(body.includes(required), `missing required beginner cue: ${required}`);
	assert.match(body, /https:\/\/higgsfield\.ai\/higgsfield-api/);
	assert.match(body, /https:\/\/docs\.higgsfield\.ai/);
	assert.match(body, /https:\/\/github\.com\/higgsfield-ai\/higgsfield-js/);
	assert.doesNotMatch(body, /—|–/);
});

test('public copy is independent and actual image delivery is bounded', () => {
	assert.doesNotMatch(body, /Chase\s*AI|chaseai\.io|youtube\.com|Transkript|im Video/i);
	assert.doesNotMatch(body, /ich habe getestet|mein Test|meine Demo|unter 5 Dollar|15 Prozent billiger/i);
	for (const { path, size, budget } of [
		{ path: '/images/blog/higgsfield-api-ohne-abo-1.webp', size: [1600, 900], budget: 180 * 1024 },
		{ path: '/images/blog/higgsfield-api-ohne-abo-1-thumb.webp', size: [400, 225], budget: 60 * 1024 }
	]) {
		assert.equal(existsSync(`static${path}`), true);
		assert.match(article, new RegExp(`^heroImage(?:Thumb)?: "${path}"$`, 'm'));
		assert.deepEqual([imageMetadata[path]?.width, imageMetadata[path]?.height], size);
		assert.ok(statSync(`static${path}`).size < budget);
	}
});
