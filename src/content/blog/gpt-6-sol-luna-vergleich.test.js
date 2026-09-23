import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { test } from 'node:test';
import { imageMetadata } from '../../lib/data/image-metadata.generated.js';

const article = readFileSync(new URL('./gpt-6-sol-luna-vergleich.md', import.meta.url), 'utf8');
const body = article.replace(/^---[\s\S]*?---\s*/, '');

test('Sol and Luna article has one routed H1 and a beginner-first thesis', () => {
	const opening = body.split(/\n\s*\n/, 1)[0];
	const sentences = opening.match(/[.!?](?:\*\*)?(?:\s|$)/g) ?? [];
	assert.match(article, /^draft:\s*true$/m);
	assert.match(article, /^title: "GPT-6 Sol oder Luna: Welches Modell spart dir wirklich Geld\?"$/m);
	assert.match(article, /^seoTitle: "GPT-6 Sol vs\. Luna: Preise und Unterschiede einfach erklärt"$/m);
	assert.doesNotMatch(body, /^#\s+/m);
	assert.equal(sentences.length, 2);
	assert.match(opening, /OpenAI hat mit GPT-6 Sol und GPT-6 Luna zwei günstigere KI-Modelle veröffentlicht/);
	assert.match(opening, /Sol soll schwierige Aufgaben lösen/);
	assert.match(opening, /welches Modell du zuerst wählen solltest/);
});

test('a complete beginner gets release, prices, one example and a safe next action', () => {
	for (const required of [
		'Was ist bei GPT-6 Sol und Luna neu?',
		'KI-Modell',
		'Sol oder Luna: Die einfache Entscheidung',
		'kleinen Online-Shop',
		'Was kosten Sol und Luna wirklich?',
		'0,1 × 0,10 $ + 0,02 × 0,50 $',
		'Was bedeutet „50 Prozent günstiger“?',
		'Benchmark',
		'Denkaufwand',
		'Ein fairer Test für deine eigene Aufgabe',
		'class="rf-block rf-tldr"',
		'aria-label="Kurz gesagt"'
	]) assert.ok(body.includes(required), `missing beginner cue: ${required}`);
	assert.match(body, /https:\/\/openai\.com\/index\/introducing-gpt-6-sol-and-luna\//);
	assert.match(body, /https:\/\/developers\.openai\.com\/api\/docs\/models\/gpt-6-sol/);
	assert.match(body, /https:\/\/developers\.openai\.com\/api\/docs\/models\/gpt-6-luna/);
	assert.doesNotMatch(body, /—|–/);
});

test('public copy is independent and image delivery is exact', () => {
	assert.doesNotMatch(body, /Chase\s*AI|chaseai\.io|youtube\.com|Transkript|im Video/i);
	assert.doesNotMatch(body, /ich habe getestet|mein Test|meine Demo|crushes|schlägt alles/i);
	for (const { path, size, budget } of [
		{ path: '/images/blog/gpt-6-sol-luna-vergleich-1.webp', size: [1600, 900], budget: 180 * 1024 },
		{ path: '/images/blog/gpt-6-sol-luna-vergleich-1-thumb.webp', size: [400, 225], budget: 60 * 1024 }
	]) {
		assert.equal(existsSync(`static${path}`), true);
		assert.match(article, new RegExp(`^heroImage(?:Thumb)?: "${path}"$`, 'm'));
		assert.deepEqual([imageMetadata[path]?.width, imageMetadata[path]?.height], size);
		assert.ok(statSync(`static${path}`).size < budget);
	}
});
