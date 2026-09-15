import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { test } from 'node:test';
import { imageMetadata } from '../../lib/data/image-metadata.generated.js';

const article = readFileSync(new URL('./gpt-6-astra-after-effects-bearbeitbar.md', import.meta.url), 'utf8');
const body = article.replace(/^---[\s\S]*?---\s*/, '');

test('new AE article promises the named tool and editable result with a two-sentence thesis', () => {
	const opening = body.split(/\n\s*\n/, 1)[0];
	const sentences = opening.match(/[.!?](?:\*\*)?(?:\s|$)/g) ?? [];
	assert.match(article, /^draft:\s*true$/m);
	assert.match(article, /^title: "GPT-6 Astra steuert After Effects: Animationen erstellen, die du ändern kannst"$/m);
	assert.match(article, /^seoTitle: "After Effects mit GPT-6 Astra bedienen: Animationen zum Weiterbearbeiten"$/m);
	assert.doesNotMatch(body, /^#\s+/m);
	assert.equal(sentences.length, 2);
	assert.match(opening, /Higgsfield/);
	assert.match(opening, /After Effects/);
	assert.match(opening, /bearbeitbar/);
});

test('beginner reader gets the difference, prerequisites, example and verification', () => {
	assert.match(body, /Motion Design: Eine Aussage/);
	assert.match(body, /MCP-Verbindung/);
	assert.match(body, /siebentägige Testversion/);
	assert.match(body, /fiktives Intro für ein 3D-Druck-Tutorial/);
	assert.match(body, /0 bis 3 Sekunden/);
	assert.match(body, /ae_project_info/);
	assert.match(body, /ae_catalog/);
	assert.match(body, /Projektprüfung/);
	assert.match(body, /Bildprüfung/);
	assert.match(body, /class="rf-block rf-tldr"/);
	assert.match(body, /Kurz gesagt/);
	assert.match(body, /```prompt/);
	assert.match(body, /Beispielwerte aus diesem Artikel/);
	assert.match(body, /https:\/\/github\.com\/higgsfield-ai\/fnf-local-pluging-bridge-mcp/);
	assert.match(body, /https:\/\/helpx\.adobe\.com/);
	assert.match(body, /https:\/\/help\.openai\.com/);
	assert.doesNotMatch(body, /—|–/);
});

test('public provenance and actual image delivery stay in the bounded draft', () => {
	assert.doesNotMatch(body, /Chase\s*AI|chaseai\.io|youtube\.com|Transkript|im Video/i);
	assert.doesNotMatch(body, /ich habe getestet|mein Test|meine Demo/i);
	for (const { path, size, budget } of [
		{ path: '/images/blog/gpt-6-astra-after-effects-bearbeitbar-1.webp', size: [1600, 900], budget: 180 * 1024 },
		{ path: '/images/blog/gpt-6-astra-after-effects-bearbeitbar-1-thumb.webp', size: [400, 225], budget: 60 * 1024 }
	]) {
		assert.equal(existsSync(`static${path}`), true);
		assert.match(article, new RegExp(`^heroImage(?:Thumb)?: "${path}"$`, 'm'));
		assert.deepEqual([imageMetadata[path]?.width, imageMetadata[path]?.height], size);
		assert.ok(statSync(`static${path}`).size < budget);
	}
});
