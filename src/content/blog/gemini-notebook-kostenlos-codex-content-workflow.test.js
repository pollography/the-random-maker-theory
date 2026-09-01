import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const articleUrl = new URL('./gemini-notebook-kostenlos-codex-content-workflow.md', import.meta.url);

async function readArticle() {
	return readFile(articleUrl, 'utf8');
}

function bodyWithoutFrontmatter(article) {
	return article.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim();
}

function sectionByHeading(article, heading) {
	const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const match = article.match(new RegExp(`${escapedHeading}\\r?\\n[\\s\\S]*?(?=\\r?\\n## |$)`));
	assert.ok(match, `missing section: ${heading}`);
	return match[0];
}

test('publishes the approved notebooklm-py bridge metadata and opening', async () => {
	const article = await readArticle();
	const body = bodyWithoutFrontmatter(article);
	const opening = body.slice(0, 1400);

	assert.match(
		article,
		/^title: "Der eigentliche NotebookLM-Hack: Codex verbindet Recherche und Medien mit notebooklm-py"$/m
	);
	assert.match(article, /^seoTitle: "notebooklm-py mit Codex: NotebookLM per Agent steuern"$/m);
	assert.match(article, /^slug: "gemini-notebook-kostenlos-codex-content-workflow"$/m);
	assert.match(article, /^date: "2026-09-01"$/m);
	assert.match(article, /^category: "ki-tools"$/m);
	assert.match(article, /^draft: false$/m);
	assert.match(
		body,
		/^# Der eigentliche NotebookLM-Hack: Codex verbindet Recherche und Medien mit notebooklm-py$/m
	);
	assert.match(opening, /notebooklm-py/i);
	assert.match(opening, /Codex|Claude Code/);
	assert.match(opening, /Deep Research/);

	const description = article.match(/^description: "([^"]+)"$/m)?.[1] ?? '';
	assert.ok(description.length >= 120 && description.length <= 160, `description has ${description.length} chars`);
});

test('separates the tested research pilot from the planned media architecture', async () => {
	const article = await readArticle();
	const pilot = sectionByHeading(article, '## Was heute schon getestet ist');
	const workflow = sectionByHeading(article, '## So soll der komplette Workflow funktionieren');
	const cost = sectionByHeading(article, '## Warum das günstiger sein kann – und was wirklich kostenlos ist');

	for (const heading of [
		'## Der eigentliche Hack ist die Brücke',
		'## Ist notebooklm-py eine NotebookLM API?',
		'## Was heute schon getestet ist',
		'## So soll der komplette Workflow funktionieren',
		'## Warum das günstiger sein kann – und was wirklich kostenlos ist',
		'## Wo der Workflow bewusst stoppt',
		'## Für wen sich die Kombination lohnt'
	]) {
		assert.match(article, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
	}

	assert.match(pilot, /62[^.\n]{0,100}(?:Kandidaten|Quellen)/i);
	assert.match(pilot, /50[^.\n]{0,100}(?:Kandidaten|Quellen)/i);
	assert.match(pilot, /(?:Pilot|praktisch getestet|Getestet wurde)/i);
	assert.match(pilot, /40[^.\n]{0,100}importiert/i);
	assert.match(pilot, /Quellenliste[^.\n]{0,100}52 Quellen/i);
	assert.match(pilot, /(?:keine|nicht)[^.\n]{0,100}(?:Artikelmedien|Audio|Video|Infografik|Slides)[^.\n]{0,100}(?:produziert|erzeugt)/i);
	assert.match(workflow, /(?:Zielarchitektur|Ausbaustufe|soll der komplette Workflow)/i);
	assert.match(workflow, /Audio/i);
	assert.match(workflow, /Video/i);
	assert.match(workflow, /Infografik/i);
	assert.match(workflow, /Slides|Slide Deck/i);
	assert.match(workflow, /notebooklm source add[^\n]*--type file/);
	assert.match(workflow, /-s \$finalArticleSourceId/);
	assert.match(cost, /Codex oder Claude Code[^.\n]{0,120}(?:nicht gratis|nicht kostenlos|kostenpflichtig)/i);
});

test('waits for Deep Research and scopes planned media to the final article source', async () => {
	const article = await readArticle();
	const bridge = sectionByHeading(article, '## Ist notebooklm-py eine NotebookLM API?');
	const workflow = sectionByHeading(article, '## So soll der komplette Workflow funktionieren');

	const researchStart = bridge.indexOf('notebooklm source add-research');
	const researchWait = bridge.indexOf('notebooklm research wait --timeout 1800 -n $notebookId --json');
	const researchImport = bridge.indexOf('notebooklm research import');
	assert.ok(researchStart >= 0, 'missing Deep Research command');
	assert.ok(researchWait > researchStart, 'Research wait must follow the Deep Research command');
	assert.ok(researchImport > researchWait, 'Research import must follow confirmed completion');
	assert.match(bridge, /\$runId[^.\n]{0,140}(?:erste|JSON).{0,80}(?:Antwort|response)/i);
	assert.match(bridge, /Status[^.\n]{0,120}abgeschlossen/i);
	assert.match(bridge, /Erst danach importiert/i);
	assert.match(workflow, /finalen Markdown-Artikel[^.\n]{0,120}notebooklm source add[^\n]*--type file/i);
	assert.match(workflow, /(?:Audio|Video|Infografik|Slides)/i);
	assert.match(workflow, /ausschließlich `-s \$finalArticleSourceId`/i);
});

test('keeps primary sources, internal intent roles, and honest claim boundaries', async () => {
	const article = await readArticle();

	for (const link of [
		'https://github.com/teng-lin/notebooklm-py',
		'https://github.com/teng-lin/notebooklm-py/releases/tag/v0.8.1',
		'https://github.com/teng-lin/notebooklm-py/blob/v0.8.1/docs/cli-reference.md',
		'/blog/meine-content-pipeline-ai-agents-2026',
		'/blog/claude-code-ultimate-setup-produktivitaet-2026'
	]) {
		assert.match(article, new RegExp(link.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
	}

	assert.match(article, /NotebookLM[- ]API/i);
	assert.match(article, /inoffiziell/i);
	assert.match(article, /MIT/);
	assert.match(article, /Claude Code und NotebookLM|NotebookLM mit Claude Code/i);
	assert.match(article, /nicht(?:[^.\n]{0,80})offizielle Google-API/i);
	assert.doesNotMatch(article, /\bn8n\b/i);
	assert.doesNotMatch(article, /\bkomplett kostenlos\b|\bsteuert alles\b|\bEin-Klick-Autopilot\b/i);
	assert.doesNotMatch(article, /\b(?:spart|senkt|reduziert)\b[^.\n]{0,50}\b\d+\s*(?:%|Prozent)/i);
});
