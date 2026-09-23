import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { test } from 'node:test';
import { imageMetadata } from '../../lib/data/image-metadata.generated.js';

const article = readFileSync(new URL('./claude-opus-5-5-preis-vergleich.md', import.meta.url), 'utf8');
const body = article.replace(/^---[\s\S]*?---\s*/, '');

test('Opus 5.5 article has one routed H1 and a beginner-first thesis', () => {
	const opening = body.split(/\n\s*\n/, 1)[0];
	const sentences = opening.match(/[.!?](?:\*\*)?(?:\s|$)/g) ?? [];
	assert.match(article, /^draft:\s*true$/m);
	assert.match(article, /^title: "Claude Opus 5\.5 ist da: Mehr Coding-Leistung, weniger Kosten als Opus 5"$/m);
	assert.match(article, /^seoTitle: "Claude Opus 5\.5: Preis, Leistung und Vergleich erklärt"$/m);
	assert.doesNotMatch(body, /^#\s+/m);
	assert.equal(sentences.length, 2);
	assert.match(opening, /Anthropic hat Claude Opus 5\.5 veröffentlicht/);
	assert.match(opening, /kostet aber weniger als Opus 5/);
	assert.match(opening, /welches Modell für deine Aufgabe sinnvoll startet/);
});

test('a complete beginner gets release, price, limits, example and next action', () => {
	for (const required of [
		'Was ist Claude Opus 5.5?',
		'KI-Agent',
		'Was bedeutet „40 Prozent günstiger“ wirklich?',
		'Ein einfaches Kostenbeispiel',
		'0,1 × 4 $ + 0,02 × 20 $',
		'fiktiven Online-Shop',
		'Schlägt Opus 5.5 Fable und Astra?',
		'Warum „maximal denken“ nicht automatisch besser ist',
		'Ein fairer Vergleich mit deiner eigenen Aufgabe',
		'class="rf-block rf-tldr"',
		'aria-label="Kurz gesagt"'
	]) assert.ok(body.includes(required), `missing beginner cue: ${required}`);
	assert.match(body, /https:\/\/www\.anthropic\.com\/claude-opus-5-5/);
	assert.match(body, /https:\/\/www\.anthropic\.com\/claude\/fable/);
	assert.match(body, /https:\/\/openai\.com\/index\/gpt-6-astra\//);
	assert.doesNotMatch(body, /—|–/);
});

test('public copy is independent and image delivery is exact', () => {
	assert.doesNotMatch(body, /Chase\s*AI|chaseai\.io|youtube\.com|Transkript|im Video/i);
	assert.doesNotMatch(body, /ich habe getestet|mein Test|meine Demo|crushes|schlägt alles/i);
	for (const { path, size, budget } of [
		{ path: '/images/blog/claude-opus-5-5-preis-vergleich-1.webp', size: [1600, 900], budget: 180 * 1024 },
		{ path: '/images/blog/claude-opus-5-5-preis-vergleich-1-thumb.webp', size: [400, 225], budget: 60 * 1024 }
	]) {
		assert.equal(existsSync(`static${path}`), true);
		assert.match(article, new RegExp(`^heroImage(?:Thumb)?: "${path}"$`, 'm'));
		assert.deepEqual([imageMetadata[path]?.width, imageMetadata[path]?.height], size);
		assert.ok(statSync(`static${path}`).size < budget);
	}
});

