# TRMT notebooklm-py Article Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild and republish the existing TRMT article so `notebooklm-py` is the clear bridge between Codex or Claude Code and NotebookLM, while tested research results, planned media stages, cost boundaries, SEO intent, and publication state remain honest.

**Architecture:** Keep the existing public slug and change exactly one article plus its focused regression test and any deterministic metadata file changed by the normal prebuild. Lock the approved reader promise in a Node contract test, rewrite the Markdown from the verified source map, run an independent editorial and technical review, then use the existing push-to-main and Vercel deployment lane with a live readback.

**Tech Stack:** SvelteKit, mdsvex Markdown content, Node.js built-in test runner, npm/Vite, GitHub Actions, Vercel, Ubersuggest Germany data, primary GitHub and Google sources.

## Global Constraints

- Keep the public slug exactly `gemini-notebook-kostenlos-codex-content-workflow`.
- Edit only `src/content/blog/gemini-notebook-kostenlos-codex-content-workflow.md`, its new focused test, deterministic generated metadata if prebuild changes it, and the already approved spec/plan documents.
- Preserve `date: "2026-09-01"`, `category: "ki-tools"`, `draft: false`, and the existing empty image assignment; do not add or regenerate a hero image.
- Do not edit the homepage, neighboring articles, local/global skills, NotebookLM account state, or unrelated dirty worktrees.
- Do not run NotebookLM while the local login is expired; the article is based on the completed research pilot and verified v0.8.1 capabilities.
- Present the 62 found candidates and 50 cited candidates as the tested Research pilot. Present outline prompts, section briefs, final-article upload, and media generation as the technically verified target architecture, not as a completed end-to-end personal test.
- Never claim a measured percentage of token, time, or money savings. NotebookLM may reduce material carried in the writing agent's context; Codex and Claude Code are not thereby free.
- Describe `notebooklm-py` as unofficial Open Source under MIT, not as an official Google API.
- Keep public German natural and beginner-readable. Explain commands only where they prove the bridge; do not turn the article into a CLI reference.
- Use current primary sources for volatile product claims and separate `VERIFIED`, `INFERRED`, and `UNKNOWN` during review.
- Current clean baseline on this branch: `node --test` passes 66 of 66 tests. `npm run check` remains baseline-red with 78 errors and 9 warnings in 10 pre-existing files.
- On Windows, `npm run build` must complete Vite compilation; the known Vercel adapter symlink `EPERM` after compilation remains a separately reported platform boundary. Linux/Vercel deployment must pass before publication is called complete.

## File Map

- Modify: `src/content/blog/gemini-notebook-kostenlos-codex-content-workflow.md` — the one public article being corrected.
- Create: `src/content/blog/gemini-notebook-kostenlos-codex-content-workflow.test.js` — focused contract for metadata, angle, source links, intent boundaries, and tested-versus-planned wording.
- Regenerate if changed: `src/lib/data/blog-image-usage.generated.js` — deterministic image-usage map produced by `npm run prebuild`; the expected article value remains `[]`.
- Read only: `src/content/blog/meine-content-pipeline-ai-agents-2026.md` — owns the broad AI content-pipeline intent.
- Read only: `src/content/blog/claude-code-ultimate-setup-produktivitaet-2026.md` — owns Claude Code installation, setup, and general productivity.
- Read only: `docs/superpowers/specs/2026-09-01-trmt-notebooklm-py-article-redesign-design.md` — approved editorial and factual contract.
- Update after successful live deployment only: `D:\UserData\ObsidianVault\LifeOS-Pollo\01-projects\trmt\TRMT SEO Workflow Audit 2026-08-31.md` — durable release receipt outside the Git repository.

## SEO Intent Snapshot

Ubersuggest was authenticated and queried on 01.09.2026 with the verified Germany route `locId: 2276`, `language: "de"`.

- Exact emerging terms `notebooklm-py`, `notebooklm codex`, and `notebooklm claude code` returned no enriched volume data. They remain the article's narrow product and integration intent, not invented high-volume keywords.
- `notebooklm api`: volume 390, SEO difficulty 32. Use naturally in the explanatory H2 and clarify that the bridge is unofficial.
- `claude notebooklm`: volume 70, SEO difficulty 20; `claude code notebooklm`: volume 10, SEO difficulty 14. Use once in natural prose, not as repetitive stuffing.
- `notebooklm skill`: volume 10, SEO difficulty 20. Use when explaining the agent-skill installation route.
- Broader supporting terms include `notebooklm kosten` at volume 1600 and SEO difficulty 23, `notebooklm podcast` at 480/25, `notebooklm kostenlos` at 260/27, and `notebooklm video` at 110/36. They belong in the cost/media explanation, not in a generic feature-list title.
- `notebooklm mcp` has measurable demand but is excluded as a target because `notebooklm-py` is being presented here through its CLI, Python API, and agent skill; the article must not imply an MCP implementation it has not demonstrated.

---

### Task 1: Lock the approved article contract with a failing test

**Files:**
- Create: `src/content/blog/gemini-notebook-kostenlos-codex-content-workflow.test.js`
- Read: `src/content/blog/gemini-notebook-kostenlos-codex-content-workflow.md`

**Interfaces:**
- Consumes: the current published Markdown and the approved exact title/metadata from the design spec.
- Produces: a focused `node:test` contract that fails on the old NotebookLM-feature-first article and passes only when the bridge-first redesign is present.

- [ ] **Step 1: Create the focused regression test**

Create `src/content/blog/gemini-notebook-kostenlos-codex-content-workflow.test.js` with this complete content:

```js
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

	assert.match(article, /62[^.\n]{0,100}(?:Kandidaten|Quellen)/i);
	assert.match(article, /50[^.\n]{0,100}(?:Kandidaten|Quellen)/i);
	assert.match(article, /(?:Pilot|praktisch getestet)/i);
	assert.match(article, /(?:Zielarchitektur|Ausbaustufe|soll der komplette Workflow)/i);
	assert.match(article, /Audio/i);
	assert.match(article, /Video/i);
	assert.match(article, /Infografik/i);
	assert.match(article, /Slides|Slide Deck/i);
	assert.match(article, /source add-research/);
	assert.match(article, /research import/);
	assert.match(article, /ask --prompt-file/);
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
```

- [ ] **Step 2: Run the focused test and observe the intentional RED state**

Run:

```powershell
node --test src/content/blog/gemini-notebook-kostenlos-codex-content-workflow.test.js
```

Expected: FAIL because the current title is feature-first, `notebooklm-py` appears too late, the target headings are missing, and the v0.8.1 release/CLI links are absent.

- [ ] **Step 3: Confirm the failure is caused only by the old article**

Run:

```powershell
git diff --check
git status --short
```

Expected: only the new test plus the already committed spec/plan history; no source file has been changed by the RED test.

### Task 2: Rebuild the article around the notebooklm-py bridge

**Files:**
- Modify: `src/content/blog/gemini-notebook-kostenlos-codex-content-workflow.md:1-181`
- Test: `src/content/blog/gemini-notebook-kostenlos-codex-content-workflow.test.js`
- Regenerate if changed: `src/lib/data/blog-image-usage.generated.js`

**Interfaces:**
- Consumes: the Task 1 contract, the approved design, the v0.8.1 repository/release/CLI documentation, current Google product-help links, the 62/50 pilot evidence, and the Germany keyword snapshot above.
- Produces: one publishable German article with bridge-first intent, a compact command proof, explicit tested/planned separation, two scoped internal links, and no new media dependency.

- [ ] **Step 1: Replace the frontmatter exactly**

Use this frontmatter and retain no old title or description:

```yaml
---
title: "Der eigentliche NotebookLM-Hack: Codex verbindet Recherche und Medien mit notebooklm-py"
seoTitle: "notebooklm-py mit Codex: NotebookLM per Agent steuern"
description: "notebooklm-py verbindet Codex oder Claude Code mit NotebookLM. So steuert der Agent Deep Research, Artikel-Briefings und Medien in einem Workflow."
slug: "gemini-notebook-kostenlos-codex-content-workflow"
date: "2026-09-01"
tags: ["notebooklm-py", "notebooklm", "codex", "claude-code", "content-workflow", "deep-research"]
category: "ki-tools"
draft: false
titleAccent: "NotebookLM-Hack"
readingTime: 12
---
```

- [ ] **Step 2: Write a new opening and TL;DR that state the real hook**

Write three short opening paragraphs before the TL;DR:

1. Start with the desired user action: the author tells Codex or Claude Code which article is needed.
2. Name `notebooklm-py` within the first paragraph as the bridge that lets the agent start NotebookLM Deep Research instead of forcing the author to copy material between tools.
3. State immediately that the Research pilot is tested and the outline/media loop is the next, technically supported expansion.

Then use the existing `rf-block rf-tldr` component with exactly five reader-facing points:

- `notebooklm-py` connects the writing agent with NotebookLM through an unofficial CLI/Python/agent-skill layer.
- NotebookLM performs broad Deep Research and returns a controlled source core; Codex or Claude Code writes and verifies the final article.
- The real pilot found 62 candidates and selected 50 cited candidates, while also exposing a bad first source triage.
- The final article can become the single media master for Audio, Video, an infographic, and slides, but that final media loop has not yet been fully run here.
- NotebookLM's standard access can keep broad research outside paid agent context; it does not make Codex or Claude Code free and no percentage saving has been measured.

- [ ] **Step 3: Build the body with this exact heading sequence and claim map**

Use this Markdown structure without inserting another generic NotebookLM feature overview before the bridge:

```markdown
# Der eigentliche NotebookLM-Hack: Codex verbindet Recherche und Medien mit notebooklm-py

## Der eigentliche Hack ist die Brücke

## Ist notebooklm-py eine NotebookLM API?

## Was heute schon getestet ist

## So soll der komplette Workflow funktionieren

### 1. Der Auftrag startet im Content-Skill
### 2. notebooklm-py startet Deep Research
### 3. Aus Kandidaten wird ein geprüfter Quellenkern
### 4. NotebookLM baut Outline und Abschnittsbriefings
### 5. Codex oder Claude Code schreibt den Artikel
### 6. Der fertige Text wird zum Medien-Master
### 7. Audio, Video, Infografik und Slides entstehen danach

## Warum das günstiger sein kann – und was wirklich kostenlos ist

## Wo der Workflow bewusst stoppt

## Für wen sich die Kombination lohnt

## Fazit: NotebookLM macht die Fleißarbeit, Codex den Artikel

## Quellen und Einstiegspunkte
```

Fill those sections with the following exact responsibilities:

- `Der eigentliche Hack ist die Brücke`: explain the difference between manually using NotebookLM and having an agent create notebooks, add sources, ask structured questions, and start media tasks. Link “mein allgemeiner Content-Pipeline-Aufbau” once to `/blog/meine-content-pipeline-ai-agents-2026`.
- `Ist notebooklm-py eine NotebookLM API?`: answer “technisch eine inoffizielle Python-API plus CLI and agent skill, but not an official Google API”; mention MIT and v0.8.1; link the repository, release, and pinned CLI reference.
- `Was heute schon getestet ist`: give the three-start-source, 62-candidate, 50-cited-candidate pilot, the contradictory first import/triage result, and the resulting source-selection/original-check gate. Do not imply that article media were produced in that pilot.
- `So soll der komplette Workflow funktionieren`: describe the seven stages above as the target architecture. Outline and section briefs are ordinary `ask --prompt-file` calls, not dedicated NotebookLM artifact types. The writing agent composes the article locally; NotebookLM does not write directly into the public website.
- `Warum das günstiger sein kann`: explain that full raw-source reading is moved out of the writing agent context. The agent still receives curated evidence and uses paid context for planning, verification, prose, and integration. Keep the free NotebookLM standard tier and paid agent subscriptions distinct.
- `Wo der Workflow bewusst stoppt`: cover expired sessions, unofficial endpoints, quotas/rate limits, original-source verification, no automatic publishing, and full review of generated media.
- `Für wen sich die Kombination lohnt`: target solo creators already using Codex or Claude Code and wanting repeatable, source-grounded research. Link “mein Claude-Code-Setup” once to `/blog/claude-code-ultimate-setup-produktivitaet-2026` without re-explaining installation.
- `Fazit`: repeat that the bridge, not the raw NotebookLM feature count, creates the productivity gain.

- [ ] **Step 4: Add one compact command proof instead of a CLI tutorial**

In the API/bridge section, include this readable excerpt and explain each line in one plain-language sentence:

```powershell
notebooklm source add-research --prompt-file research-query.md --mode deep --no-wait -n $notebookId --json
notebooklm research import --run-id $runId --cited-only --max-sources 20 -n $notebookId --json
notebooklm ask --prompt-file outline.md -n $notebookId --json
```

Do not add installation boilerplate or a complete CLI reference. Link the pinned CLI documentation for readers who want every option.

- [ ] **Step 5: End with only primary and directly useful sources**

The final source list must include:

```markdown
- [`notebooklm-py` auf GitHub](https://github.com/teng-lin/notebooklm-py)
- [`notebooklm-py` Release v0.8.1](https://github.com/teng-lin/notebooklm-py/releases/tag/v0.8.1)
- [CLI-Referenz für v0.8.1](https://github.com/teng-lin/notebooklm-py/blob/v0.8.1/docs/cli-reference.md)
- [Google-Hilfe: Quellen finden und Deep Research](https://support.google.com/gemininotebook/answer/16215270?co=GENIE.Platform%3DDesktop&hl=en-GB)
- [Google-Hilfe: Standardzugang und Nutzungslimits](https://support.google.com/gemininotebook/answer/16213268?hl=en)
```

Keep another current Google link only if it supports a remaining concrete product claim in the final prose. Remove any source that no longer supports a used claim.

- [ ] **Step 6: Run the focused test and correct the article until GREEN**

Run:

```powershell
node --test src/content/blog/gemini-notebook-kostenlos-codex-content-workflow.test.js
```

Expected: 3 tests pass, 0 fail.

- [ ] **Step 7: Regenerate deterministic image metadata**

Run:

```powershell
npm run prebuild
git diff -- src/lib/data/blog-image-usage.generated.js
```

Expected: the slug remains mapped to `[]`. If the generator makes no semantic change, do not include the generated file in the commit.

- [ ] **Step 8: Commit the complete article slice**

Run:

```powershell
git add -- src/content/blog/gemini-notebook-kostenlos-codex-content-workflow.md src/content/blog/gemini-notebook-kostenlos-codex-content-workflow.test.js src/lib/data/blog-image-usage.generated.js
git diff --cached --check
git commit -m "fix: center notebooklm-py in Gemini Notebook workflow"
```

Expected: the commit contains the article and test, plus generated image metadata only when it actually changed.

### Task 3: Run independent editorial, SEO, and technical review

**Files:**
- Review: `src/content/blog/gemini-notebook-kostenlos-codex-content-workflow.md`
- Review: `src/content/blog/gemini-notebook-kostenlos-codex-content-workflow.test.js`
- Reference: `docs/superpowers/specs/2026-09-01-trmt-notebooklm-py-article-redesign-design.md`

**Interfaces:**
- Consumes: the green article slice from Task 2.
- Produces: a PASS or a concrete patch for factual, language, SEO, or contract defects; no unrelated article edits.

- [ ] **Step 1: Dispatch a fresh independent reviewer with this exact brief**

```text
Review exactly the notebooklm-py article and its focused test against the approved design. Check: bridge-first focus in title and first 100 words; tested Research pilot versus planned End-to-End architecture; v0.8.1 command accuracy; unofficial API wording; free NotebookLM versus possibly paid Codex/Claude; no measured savings claim; natural German without needless technical jargon; one distinct internal-link role for the broad pipeline article and one for the Claude Code setup article; no n8n; no slug or media change. Treat primary GitHub/Google sources as authority. Report findings by severity and do not edit files.
```

Expected: reviewer returns PASS or file-and-line-specific findings.

- [ ] **Step 2: Apply every material finding in the article or focused test**

Use `apply_patch` and change only the two Task 2 files. Do not weaken a truthful test merely to accept faulty copy. If the reviewer proposes a claim not supported by a primary source, omit that claim.

- [ ] **Step 3: Re-run the focused test after review corrections**

Run:

```powershell
node --test src/content/blog/gemini-notebook-kostenlos-codex-content-workflow.test.js
git diff --check HEAD
```

Expected: 3 tests pass and no whitespace errors.

- [ ] **Step 4: Commit review corrections only when a diff exists**

Run:

```powershell
git status --short
git add -- src/content/blog/gemini-notebook-kostenlos-codex-content-workflow.md src/content/blog/gemini-notebook-kostenlos-codex-content-workflow.test.js
git diff --cached --check
git commit -m "fix: tighten notebooklm-py article claims"
```

Expected: either one small correction commit or no commit when the reviewer returned PASS.

### Task 4: Verify, publish, and read back the corrected live article

**Files:**
- Verify: all files changed since `origin/main`
- Update after deployment: `D:\UserData\ObsidianVault\LifeOS-Pollo\01-projects\trmt\TRMT SEO Workflow Audit 2026-08-31.md`

**Interfaces:**
- Consumes: reviewed article commits with a clean worktree.
- Produces: a fast-forward push to `main`, a passing Linux/Vercel deployment, a live article containing the new bridge-first copy, and a durable local release receipt.

- [ ] **Step 1: Run the focused and complete Node test suites**

Run:

```powershell
node --test src/content/blog/gemini-notebook-kostenlos-codex-content-workflow.test.js
node --test
```

Expected: focused 3/3 and complete 69/69 after adding the three new tests.

- [ ] **Step 2: Compare Svelte diagnostics with the documented baseline**

Run:

```powershell
npm run check
```

Expected: command remains non-zero with the existing 78 errors and 9 warnings in 10 unrelated files. There must be no diagnostic in the edited article or its test. Any new diagnostic blocks publication.

- [ ] **Step 3: Run the production build and classify the Windows boundary correctly**

Run:

```powershell
npm run build
```

Expected: Vite compilation succeeds. If the command then ends at the already documented Windows Vercel-adapter symlink `EPERM`, record local build as PARTIAL and require the Linux deployment to pass. Any compile, mdsvex, route, or content error is a FAIL and blocks publication.

- [ ] **Step 4: Verify release scope and a clean branch**

Run:

```powershell
git diff --check origin/main...HEAD
git diff --name-status origin/main...HEAD
git status --short
```

Expected: only the approved spec/plan, one article, its focused test, and deterministic generated metadata if changed. Worktree status is empty.

- [ ] **Step 5: Rebase safely on the latest remote main**

Run:

```powershell
git fetch origin main
git rebase origin/main
git status --short
```

Expected: rebase completes without conflict and the worktree remains clean. If a conflict occurs, abort with `git rebase --abort` and stop publication for a deliberate conflict review; never force-push.

- [ ] **Step 6: Push the reviewed branch as a fast-forward main update**

Run:

```powershell
git push origin HEAD:main
```

Expected: a non-forced fast-forward update. Record the pushed SHA from `git rev-parse HEAD`.

- [ ] **Step 7: Wait for the deployment matching the pushed SHA**

Run:

```powershell
$pushedSha = git rev-parse HEAD
$runs = gh run list --workflow deploy.yml --branch main --limit 10 --json databaseId,headSha,status,conclusion,url | ConvertFrom-Json
$run = $runs | Where-Object { $_.headSha -eq $pushedSha } | Select-Object -First 1
if (-not $run) { throw "No deploy.yml run found for $pushedSha" }
gh run watch $run.databaseId --exit-status
```

Expected: the matching GitHub Actions/Vercel run concludes successfully. A run for another SHA is not acceptable evidence.

- [ ] **Step 8: Perform a live content, canonical, listing, sitemap, and RSS readback**

Run:

```powershell
$slug = 'gemini-notebook-kostenlos-codex-content-workflow'
$articleUrl = "https://therandommakertheory.com/blog/$slug"
$articleResponse = Invoke-WebRequest $articleUrl -UseBasicParsing
$articleHtml = $articleResponse.Content
if ($articleResponse.StatusCode -ne 200) { throw "Article HTTP $($articleResponse.StatusCode)" }
if ($articleHtml -notmatch 'notebooklm-py') { throw 'Live article lacks notebooklm-py' }
if ($articleHtml -notmatch 'Der eigentliche NotebookLM-Hack') { throw 'Live H1/title not updated' }
if ($articleHtml -notmatch [regex]::Escape("rel=\"canonical\" href=\"$articleUrl\"")) { throw 'Canonical mismatch' }
if ($articleHtml -match 'noindex') { throw 'Live article is noindex' }

$blogHtml = (Invoke-WebRequest 'https://therandommakertheory.com/blog' -UseBasicParsing).Content
$sitemapXml = (Invoke-WebRequest 'https://therandommakertheory.com/sitemap.xml' -UseBasicParsing).Content
$rssXml = (Invoke-WebRequest 'https://therandommakertheory.com/rss.xml' -UseBasicParsing).Content
foreach ($surface in @($blogHtml, $sitemapXml, $rssXml)) {
	if ($surface -notmatch [regex]::Escape($slug)) { throw "Missing $slug on a discovery surface" }
}
```

Expected: HTTP 200, new bridge-first title and `notebooklm-py` visible, exact canonical, no `noindex`, and the unchanged slug present in blog listing, sitemap, and RSS.

- [ ] **Step 9: Append the verified release receipt to the TRMT Obsidian note**

Append a dated subsection containing:

```markdown
## 2026-09-01 notebooklm-py article correction

- Public URL: https://therandommakertheory.com/blog/gemini-notebook-kostenlos-codex-content-workflow
- Focus corrected from a general Gemini Notebook feature overview to the `notebooklm-py` bridge controlled by Codex or Claude Code.
- Tested Research pilot and planned outline/media architecture are explicitly separated.
- Ubersuggest route: Germany `locId 2276`, language `de`; exact integration terms had no enriched volume, while `notebooklm api` supplied the strongest adjacent integration demand.
- Verification: focused and complete Node tests passed; Svelte diagnostics matched the documented baseline; local Windows build boundary and Linux deployment recorded separately.
- Release SHA and deployment run: record the exact values returned by the successful release commands.
- Live readback: HTTP 200, canonical/indexable, blog listing, sitemap, and RSS confirmed.
```

Replace the final “record the exact values” phrase with the actual SHA and run URL before saving the note. Do not store account email, cookies, tokens, or NotebookLM session data.

- [ ] **Step 10: Open the corrected live article for the user**

Open:

```text
https://therandommakertheory.com/blog/gemini-notebook-kostenlos-codex-content-workflow
```

Report PASS/PARTIAL/FAIL separately for content tests, global Svelte baseline, local Windows build, Linux deployment, and live readback.
