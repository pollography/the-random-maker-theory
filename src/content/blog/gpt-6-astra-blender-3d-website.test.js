import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { test } from 'node:test';
import { imageMetadata } from '../../lib/data/image-metadata.generated.js';

const article = readFileSync(new URL('./gpt-6-astra-blender-3d-website.md', import.meta.url), 'utf8');
const body = article.replace(/^---[\s\S]*?---\s*/, '');

test('3D website article has one routed H1 and a two-sentence beginner thesis', () => {
	const opening = body.split(/\n\s*\n/, 1)[0];
	const sentences = opening.match(/[.!?](?:\*\*)?(?:\s|$)/g) ?? [];
	assert.match(article, /^draft:\s*true$/m);
	assert.match(article, /^title: "GPT-6 Astra und Blender: So kommt ein 3D-Modell auf deine Website"$/m);
	assert.doesNotMatch(body, /^#\s+/m);
	assert.equal(sentences.length, 2);
	assert.match(opening, /Blender-Skripte/);
	assert.match(opening, /GLB-Datei/);
	assert.match(opening, /Three\.js/);
});

test('beginner gets the mechanism, original example, safe workflow and checks', () => {
	for (const required of [
		'Was passiert hier eigentlich?',
		'Pflanzensensor',
		'Blender',
		'GLB',
		'Three.js',
		'Oberschale',
		'390 Pixel Breite',
		'prefers-reduced-motion',
		'class="rf-block rf-tldr"',
		'```prompt',
		'Beispielwerte'
	]) assert.match(body, new RegExp(required.replaceAll('.', '\\.')));
	assert.match(body, /https:\/\/github\.com\/ifBars\/blender-agent-studio/);
	assert.match(body, /https:\/\/docs\.blender\.org/);
	assert.match(body, /https:\/\/threejs\.org/);
	assert.match(body, /https:\/\/openai\.com/);
	assert.doesNotMatch(body, /—|–/);
});

test('public copy is independent and actual image delivery is bounded', () => {
	assert.doesNotMatch(body, /Chase\s*AI|chaseai\.io|youtube\.com|Transkript|im Video/i);
	assert.doesNotMatch(body, /ich habe getestet|mein Test|meine Demo|in 12 Minuten/i);
	for (const { path, size, budget } of [
		{ path: '/images/blog/gpt-6-astra-blender-3d-website-1.webp', size: [1600, 900], budget: 180 * 1024 },
		{ path: '/images/blog/gpt-6-astra-blender-3d-website-1-thumb.webp', size: [400, 225], budget: 60 * 1024 }
	]) {
		assert.equal(existsSync(`static${path}`), true);
		assert.match(article, new RegExp(`^heroImage(?:Thumb)?: "${path}"$`, 'm'));
		assert.deepEqual([imageMetadata[path]?.width, imageMetadata[path]?.height], size);
		assert.ok(statSync(`static${path}`).size < budget);
	}
});

