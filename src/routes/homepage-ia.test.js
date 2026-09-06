import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

import { CORE_TOPICS } from '../lib/data/core-topics.js';

const routesRoot = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(routesRoot, '..', '..');
const readHomepage = () => readFile(join(projectRoot, 'src', 'routes', '+page.svelte'), 'utf8');

test('homepage surfaces the blog and topic choices in the hero', async () => {
	const source = await readHomepage();

	assert.match(source, /href="\/blog"[^>]*>\s*<span>Zum Blog<\/span>/);
	assert.doesNotMatch(source, /href="#topics"|Themen wählen/);
});

test('homepage navigator derives all five topic assets from CORE_TOPICS', async () => {
	const source = await readHomepage();

	assert.match(source, /import \{ CORE_TOPICS \} from '\$lib\/data\/core-topics\.js';/);
	assert.match(source, /const topics = CORE_TOPICS\.map\(/);
	assert.doesNotMatch(source, /const pillars = \[/);
	assert.doesNotMatch(source, /['"]\/images\/homepage\/topics\//);
	assert.equal(CORE_TOPICS.length, 5);
	for (const topic of CORE_TOPICS) {
		assert.match(topic.image, /^\/images\/homepage\/topics\/.+\.webp$/);
	}
	assert.match(source, /loading="lazy"/);
	assert.match(source, /width=\{topic\.imageSeo\.width \?\? 1200\}/);
	assert.match(source, /height=\{topic\.imageSeo\.height \?\? 675\}/);
});

test('homepage keeps the approved orientation copy and links all five hubs below the posts', async () => {
	const source = await readHomepage();

	assert.match(source, /class="homepage-context"/);
	assert.match(source, /Worum geht es hier\?/);
	for (const slug of ['ki-tools', 'maker', 'automatisierung', 'fotografie', 'produktivitaet']) {
		assert.match(source, new RegExp(`href="/tags/${slug}"`));
	}
	for (const phrase of [
		'TRMT bündelt praktische Artikel, nachvollziehbare Anleitungen und persönliche Einordnungen rund um',
		'Tech und digitale Workflows.',
		'geht es um ESP32, 3D-Druck und Smart Home; bei',
		'um n8n, Skripte und verbundene Tools.',
		'bündelt Bildbearbeitung, KI-Workflows und Technik aus der Praxis.',
		'findest du Systeme für Wissen, Fokus und digitale Ordnung.',
		'Wähle ein Thema oder spring direkt ins vollständige Blogarchiv - alle Beiträge bleiben frei zugänglich und lassen sich ohne Anmeldung lesen.'
	]) {
		assert.match(source, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
	}
});

test('automation topic stays on one concise metadata line', () => {
	const automation = CORE_TOPICS.find((topic) => topic.slug === 'automatisierung');

	assert.equal(automation?.short, 'Workflows · Scripts');
});

test('homepage latest section uses the approved lead plus three-card row', async () => {
	const source = await readHomepage();

	assert.match(source, /\.secondary-posts\s*\{[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/);
	assert.match(source, /posts\.slice\(1\)/);
});
