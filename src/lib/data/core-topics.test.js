import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { CORE_TOPICS, CORE_TOPIC_SLUGS, getCoreTopic, normalizeTopicFamily } from './core-topics.js';

test('defines exactly the five approved core topics', () => {
	assert.deepEqual(CORE_TOPIC_SLUGS, ['ki-tools', 'maker', 'automatisierung', 'fotografie', 'produktivitaet']);
});

test('normalizes visible category aliases before homepage selection', () => {
	for (const [category, family] of Object.entries({
		'ki-tools': 'ki-tools',
		'ki-news': 'ki-tools',
		tools: 'ki-tools',
		ai: 'ki-tools',
		maker: 'maker',
		'maker-projekt': 'maker',
		diy: 'maker',
		'smart-home': 'maker',
		'3d-druck': 'maker',
		automatisierung: 'automatisierung',
		automation: 'automatisierung',
		fotografie: 'fotografie',
		photography: 'fotografie',
		produktivitaet: 'produktivitaet',
		productivity: 'produktivitaet'
	})) {
		assert.equal(normalizeTopicFamily(category), family);
	}
	assert.equal(normalizeTopicFamily('General'), 'other:general');
	assert.equal(normalizeTopicFamily(), 'other:unknown');
});

test('keeps the approved starter posts and aliases in immutable topic records', () => {
	assert.deepEqual(CORE_TOPICS.map(({ slug, starterSlugs }) => ({ slug, starterSlugs })), [
		{
			slug: 'ki-tools',
			starterSlugs: ['perfekt-prompten-llm-guide', '50-bildprompts-echt-getestet', 'gemini-notebook-kostenlos-codex-content-workflow']
		},
		{
			slug: 'maker',
			starterSlugs: ['esp32-projekte-anfaenger-2026', '3d-druck-einstieg-welcher-drucker-2026', 'home-assistant-einrichten-2026']
		},
		{
			slug: 'automatisierung',
			starterSlugs: ['n8n-tutorial-deutsch-2026', 'n8n-workflow-beispiele-2026', 'n8n-chatgpt-workflow-2026']
		},
		{
			slug: 'fotografie',
			starterSlugs: ['ki-fotografie-2026-was-wirklich-funktioniert', 'ki-bildbearbeitung-workflow-fotograf-2026', 'aftershoot-alternative-ai-photo-culling']
		},
		{
			slug: 'produktivitaet',
			starterSlugs: ['obsidian-fuer-adhs-system-2026', 'claude-code-ultimate-setup-produktivitaet-2026', 'beste-chatgpt-prompts-2026']
		}
	]);
	assert.equal(getCoreTopic('maker'), CORE_TOPICS[1]);
	assert.equal(getCoreTopic('unknown'), undefined);
	assert.equal(Object.isFrozen(CORE_TOPICS), true);
	assert.equal(Object.isFrozen(CORE_TOPICS[0]), true);
	assert.equal(Object.isFrozen(CORE_TOPICS[0].starterSlugs), true);
	assert.equal(Object.isFrozen(CORE_TOPICS[0].categoryAliases), true);
});

test('points every configured starter post at an existing matching core topic tag', () => {
	for (const topic of CORE_TOPICS) {
		for (const slug of topic.starterSlugs) {
			const source = readFileSync(new URL(`../../content/blog/${slug}.md`, import.meta.url), 'utf8');
			const tags = source.match(/^tags:\s*(?:\[[\s\S]*?\]|\r?\n(?:[ \t]+[^\r\n]*(?:\r?\n|$))*)/m)?.[0] ?? '';

			assert.match(tags, new RegExp(`\\b${topic.slug}\\b`), `${slug} must carry ${topic.slug}`);
		}
	}
});
