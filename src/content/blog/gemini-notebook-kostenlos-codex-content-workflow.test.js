import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { readImageDimensions } from '../../../scripts/generate-image-metadata.mjs';

const articleUrl = new URL('./gemini-notebook-kostenlos-codex-content-workflow.md', import.meta.url);
const heroUrl = new URL('../../../static/images/blog/gemini-notebook-kostenlos-codex-content-workflow-2.webp', import.meta.url);
const thumbUrl = new URL('../../../static/images/blog/gemini-notebook-kostenlos-codex-content-workflow-2-thumb.webp', import.meta.url);
const inlineImageUrls = [
	new URL('../../../static/images/blog/gemini-notebook-kostenlos-codex-content-workflow-bridge.webp', import.meta.url),
	new URL('../../../static/images/blog/gemini-notebook-kostenlos-codex-content-workflow-source-check.webp', import.meta.url)
];
const inlineThumbUrls = [
	new URL('../../../static/images/blog/gemini-notebook-kostenlos-codex-content-workflow-bridge-thumb.webp', import.meta.url),
	new URL('../../../static/images/blog/gemini-notebook-kostenlos-codex-content-workflow-source-check-thumb.webp', import.meta.url)
];

async function readArticle() {
	return readFile(articleUrl, 'utf8');
}

/** @param {string} article */
function bodyWithoutFrontmatter(article) {
	return article.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim();
}

/**
 * @param {string} article
 * @param {string} heading
 */
function sectionByHeading(article, heading) {
	const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const match = article.match(new RegExp(`${escapedHeading}\\r?\\n[\\s\\S]*?(?=\\r?\\n## |$)`));
	assert.ok(match, `missing section: ${heading}`);
	return match[0];
}

test('ships a native 16:9 hero and matching thumbnail', async () => {
	const article = await readArticle();
	const heroPath = fileURLToPath(heroUrl);
	const thumbPath = fileURLToPath(thumbUrl);

	assert.match(
		article,
		/^heroImage: "\/images\/blog\/gemini-notebook-kostenlos-codex-content-workflow-2\.webp"$/m
	);
	assert.match(
		article,
		/^heroImageThumb: "\/images\/blog\/gemini-notebook-kostenlos-codex-content-workflow-2-thumb\.webp"$/m
	);
	assert.deepEqual(readImageDimensions(heroPath), { width: 1200, height: 675, format: 'webp' });
	assert.deepEqual(readImageDimensions(thumbPath), { width: 400, height: 225, format: 'webp' });
	assert.ok((await stat(heroPath)).size <= 180 * 1024, 'hero should stay within the 180 KB budget');
	assert.ok((await stat(thumbPath)).size <= 60 * 1024, 'thumbnail should stay within the 60 KB budget');
});

test('places two responsive 16:9 explanations in their matching sections', async () => {
	const article = await readArticle();
	const bridge = sectionByHeading(article, '## Der eigentliche Hack ist die Brücke');
	const pilot = sectionByHeading(article, '## Was heute schon getestet ist');
	const inlineImages = article.match(
		/^!\[[^\]]+\]\(\/images\/blog\/gemini-notebook-kostenlos-codex-content-workflow-(?:bridge|source-check)\.webp\)$/gm
	) ?? [];

	assert.equal(inlineImages.length, 2, 'the article should contain exactly two explanatory images');
	assert.match(
		bridge,
		/!\[Miniaturfigur trägt einen geprüften Quellenstapel über eine Brücke vom Rechercheberg zur Schreibseite\]\(\/images\/blog\/gemini-notebook-kostenlos-codex-content-workflow-bridge\.webp\)/
	);
	assert.match(
		pilot,
		/!\[Miniaturfigur prüft eine Quellenkarte unter einer großen Lupe; daneben liegen Rohmaterial und geprüfter Quellenkern\]\(\/images\/blog\/gemini-notebook-kostenlos-codex-content-workflow-source-check\.webp\)/
	);

	for (const imageUrl of inlineImageUrls) {
		const imagePath = fileURLToPath(imageUrl);
		assert.deepEqual(readImageDimensions(imagePath), { width: 1200, height: 675, format: 'webp' });
		assert.ok((await stat(imagePath)).size <= 180 * 1024, `${imagePath} exceeds the 180 KB budget`);
	}
	for (const thumbUrl of inlineThumbUrls) {
		const thumbPath = fileURLToPath(thumbUrl);
		assert.deepEqual(readImageDimensions(thumbPath), { width: 400, height: 225, format: 'webp' });
		assert.ok((await stat(thumbPath)).size <= 60 * 1024, `${thumbPath} exceeds the 60 KB budget`);
	}
});

test('uses the route-owned H1 and opens with a two-sentence main thesis', async () => {
	const article = await readArticle();
	const body = bodyWithoutFrontmatter(article);
	const opening = body.slice(0, 1400);
	const thesis = body.split(/\r?\n\r?\n/, 1)[0];

	assert.match(
		article,
		/^title: "Free Deep Research via notebooklm-py: Content-Workflow für Claude Code & Codex"$/m
	);
	assert.match(article, /^seoTitle: "notebooklm-py: Kostenlose NotebookLM-Recherche für Claude Code & Codex"$/m);
	assert.match(article, /^titleAccent: "Free Deep Research"$/m);
	assert.match(article, /^slug: "gemini-notebook-kostenlos-codex-content-workflow"$/m);
	assert.match(article, /^date: "2026-09-01"$/m);
	assert.match(article, /^category: "ki-tools"$/m);
	assert.match(article, /^draft: false$/m);
	assert.doesNotMatch(body, /^#\s+/m, 'the blog route owns the single public H1');
	assert.equal(
		(thesis.match(/[.!?](?=\s|$)/g) ?? []).length,
		2,
		'the opening thesis should make the situation and article payoff scannable in two sentences'
	);
	assert.match(thesis, /Breite Webrecherche[^.]+(?:Kontext|kostenpflichtigen Agentenkontext)/i);
	assert.match(thesis, /Gemini Notebook[^.]+kostenlosen Standardzugang/i);
	assert.match(thesis, /dieser Artikel zeigt/i);
	assert.match(opening, /notebooklm-py/i);
	assert.match(opening, /Codex|Claude Code/);
	assert.match(opening, /Deep Research/);
	assert.match(opening, /NotebookLM heißt seit dem 16\. Juli 2026 offiziell Gemini Notebook/);

	const description = article.match(/^description: "([^"]+)"$/m)?.[1] ?? '';
	assert.ok(description.length >= 120 && description.length <= 160, `description has ${description.length} chars`);
	assert.match(description, /Gemini Notebook/);
	assert.match(description, /Agenten bleiben kostenpflichtig/);
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
	assert.match(workflow, /Zielarchitektur/i);
	assert.match(workflow, /(?:geplant|Ausbaustufe)/i);
	assert.match(workflow, /nicht[^.\n]{0,120}vollständiger End-to-End-Medien-Loop getestet/i);
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
	assert.match(bridge, /\$researchStart\s*=\s*notebooklm source add-research[^\n]*--json\s*\|\s*ConvertFrom-Json/);
	assert.match(bridge, /\$researchStart\.poll_task_id/);
	assert.match(bridge, /\$researchStart\.task_id/);
	assert.match(bridge, /\$runId[^.\n]{0,140}(?:lokal|Variable)/i);
	assert.match(bridge, /Status[^.\n]{0,120}abgeschlossen/i);
	assert.match(bridge, /Erst danach importiert/i);
	assert.match(workflow, /\$finalSource\s*=\s*notebooklm source add[^\n]*--type file[^\n]*--json\s*\|\s*ConvertFrom-Json/);
	assert.match(workflow, /\$finalArticleSourceId\s*=\s*\$finalSource\.source\.id/);
	assert.match(workflow, /notebooklm source wait \$finalArticleSourceId -n \$notebookId --json/);
	assert.ok(
		workflow.indexOf('notebooklm source wait $finalArticleSourceId -n $notebookId --json') > workflow.indexOf('$finalArticleSourceId = $finalSource.source.id'),
		'Source wait must use the assigned final article source ID'
	);
	assert.match(workflow, /(?:Audio|Video|Infografik|Slides)/i);
	assert.match(workflow, /ausschließlich `-s \$finalArticleSourceId`/i);
	assert.match(bridge, /Über notebooklm-py erhalten Claude Code oder Codex eine kontrollierbare Recherche-Verbindung zu NotebookLM\./);
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
	assert.match(article, /Über notebooklm-py erhalten Claude Code oder Codex eine kontrollierbare Recherche-Verbindung zu NotebookLM\.|Codex oder Claude Code[^.\n]{0,120}NotebookLM/i);
	assert.match(article, /nicht(?:[^.\n]{0,80})offizielle Google-API/i);
	assert.doesNotMatch(article, /\bn8n\b/i);
	assert.doesNotMatch(article, /\bkomplett kostenlos\b|\bsteuert alles\b|\bEin-Klick-Autopilot\b/i);
	assert.doesNotMatch(article, /\b(?:spart|senkt|reduziert)\b[^.\n]{0,50}\b\d+\s*(?:%|Prozent)/i);
});
