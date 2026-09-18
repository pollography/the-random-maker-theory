import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { test } from 'node:test';
import { imageMetadata } from '../../lib/data/image-metadata.generated.js';

const article = readFileSync(new URL('./union-alpha-ist-pareto.md', import.meta.url), 'utf8');
const body = article.replace(/^---[\s\S]*?---\s*/, '');

test('Union Alpha article has one routed H1 and a beginner-first thesis', () => {
	const opening = body.split(/\n\s*\n/, 1)[0];
	const sentences = opening.match(/[.!?](?:\*\*)?(?:\s|$)/g) ?? [];
	assert.match(article, /^draft:\s*true$/m);
	assert.match(article, /^title: "Union Alpha heißt jetzt Pareto: Was das Ende des Gratis-Tests für dich bedeutet"$/m);
	assert.doesNotMatch(body, /^#\s+/m);
	assert.equal(sentences.length, 2);
	assert.match(opening, /kostenloser, anonymer KI-Test/);
	assert.match(opening, /heißt Pareto/);
	assert.match(opening, /ohne sensible Daten fair prüfst/);
});

test('a complete beginner gets the change, mechanism, price, example and limits', () => {
	for (const required of [
		'Was ist aus Union Alpha geworden?',
		'Stealth-Modell',
		'zusammengesetztes KI-Modell',
		'Was bedeuten 262.144 Tokens?',
		'0,02 × 2,50 $ + 0,002 × 7,50 $ = 0,065 $',
		'fiktiven Sportverein',
		'Warum du keine sensiblen Daten zum Testen brauchst',
		'class="rf-block rf-tldr"',
		'aria-label="Kurz gesagt"'
	]) assert.ok(body.includes(required), `missing beginner cue: ${required}`);
	assert.match(body, /https:\/\/openrouter\.ai\/stealth\/union-alpha\//);
	assert.match(body, /https:\/\/openrouter\.ai\/unbiased\/pareto/);
	assert.match(body, /https:\/\/unbiased\.ai\/terms\//);
	assert.doesNotMatch(body, /—|–/);
});

test('public copy is independent and image delivery is exact', () => {
	assert.doesNotMatch(body, /Chase\s*AI|chaseai\.io|youtube\.com|Transkript|im Video/i);
	assert.doesNotMatch(body, /ich habe getestet|mein Test|meine Demo|gleich gut wie Opus|besser als Fable/i);
	for (const { path, size, budget } of [
		{ path: '/images/blog/union-alpha-ist-pareto-1.webp', size: [1600, 900], budget: 180 * 1024 },
		{ path: '/images/blog/union-alpha-ist-pareto-1-thumb.webp', size: [400, 225], budget: 60 * 1024 }
	]) {
		assert.equal(existsSync(`static${path}`), true);
		assert.match(article, new RegExp(`^heroImage(?:Thumb)?: "${path}"$`, 'm'));
		assert.deepEqual([imageMetadata[path]?.width, imageMetadata[path]?.height], size);
		assert.ok(statSync(`static${path}`).size < budget);
	}
});
