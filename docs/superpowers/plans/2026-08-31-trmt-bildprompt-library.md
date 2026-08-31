# TRMT Bildprompt-Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a public TRMT image-prompt library with 87 tested examples, search, category filters, one-click copying, article links, and a six-page downloadable PDF generated from the same data.

**Architecture:** Store categories, tested entries, and hidden research ideas in one JSON file. Pure JavaScript selectors provide validation and deterministic public filtering to Svelte components. A local ReportLab script reads the same JSON and writes a six-page PDF to both the ignored QA output and the public static download directory.

**Tech Stack:** SvelteKit 2, Svelte 5 runes, JavaScript/JSON, Node 22 built-in test runner, Python 3 + ReportLab/Pillow/pypdf, existing TRMT CSS tokens.

## Global Constraints

- Public route is exactly `/tools/bildprompt-library`.
- The public UI is read-only and requires no login, database, CMS, API, or paid service.
- Only entries with `status: "tested"` and an existing result image may be rendered or exported.
- The public count is exactly 87 tested prompts.
- Research ideas remain in the canonical data with `status: "idea"` and are never public.
- The PDF has exactly six A4 landscape pages.
- Newsletter gating and browser-based administration are out of scope.
- Do not deploy or push without a separate user instruction.
- Preserve the unrelated untracked plan `docs/superpowers/plans/2026-08-31-ultimate-bildprompts-part-2.md` and `.superpowers/` session files.

---

### Task 1: Canonical prompt data and public selectors

**Files:**
- Create: `src/lib/data/image-prompts.json`
- Create: `src/lib/utils/prompt-library.js`
- Create: `src/lib/utils/prompt-library.test.js`

**Interfaces:**
- Consumes: existing images under `static/images/blog/ki-bildprompts/`
- Produces: `validatePromptLibrary(data, staticRoot)`, `getPublicPrompts(data)`, `filterPrompts(prompts, categories, query, categoryId)`, and `getCategoryCounts(prompts, categories)`

- [ ] **Step 1: Write the failing data and selector tests**

Test the exact public count, hidden ideas, unique identifiers and commands, valid categories, existing tested images, all twelve categories, representative search matches, combined category/search behavior, and counts. Use Node's built-in test runner and real filesystem access.

```js
test('canonical library exposes exactly 87 tested prompts and hides ideas', () => {
  const publicPrompts = getPublicPrompts(data);
  assert.equal(publicPrompts.length, 87);
  assert.ok(data.prompts.some((prompt) => prompt.status === 'idea'));
  assert.ok(publicPrompts.every((prompt) => prompt.status === 'tested'));
});

test('search and category filters compose', () => {
  const result = filterPrompts(
    getPublicPrompts(data),
    data.categories,
    'video',
    'menschen-posen'
  );
  assert.ok(result.some((prompt) => prompt.command === '/posepack'));
  assert.ok(result.every((prompt) => prompt.category === 'menschen-posen'));
});
```

- [ ] **Step 2: Run the tests and verify RED**

Run:

```powershell
node --test src/lib/utils/prompt-library.test.js
```

Expected: FAIL because the data and selector module do not exist.

- [ ] **Step 3: Create the canonical JSON**

Add these twelve category IDs in this order:

```text
menschen-posen
avatare-reaktionen
alter-transformation
technik-innenansichten
infografiken-wissen
welten-filmszenen
spielzeug-sammlerstuecke
miniaturwelten
comics-retro
stoff-knete-glas
portraet-look
creator-ki-video
```

Add the 87 unique tested commands mapped to the existing numbered assets: `/turnaround`, `/expression`, `/expressions`, `/posepack`, `/actionposes`, `/characterSheet`, `/emotionGrid`, `/bodylanguage`, `/outfitVariants`, `/sticker`, `/stickerPack`, `/emojiPack`, `/reactionPack`, `/avatarPack`, `/miniature`, `/giantify`, `/ageprogression`, `/characterEvolution`, `/cloneScene`, `/multiverse`, `/evolution`, `/beforeAfter`, `/timeTravel`, `/futureVersion`, `/pastVersion`, `/alternateReality`, `/cutaway`, `/explodedView`, `/blueprint`, `/xray`, `/anatomy`, `/crossSection`, `/assembly`, `/disassembly`, `/howItWorks`, `/mindMap`, `/flashcard`, `/infographic`, `/timeline`, `/visualGuide`, `/comparison`, `/environmentExpand`, `/worldBuild`, `/underwater`, `/spaceScene`, `/cyberpunk`, `/postApocalypse`, `/portal`, `/dreamscape`, `/doubleExposure`, `/movieScene`, `/starterPack`, `/bobblehead`, `/designerToy`, `/deskFigurine`, `/tradingCard`, `/pinCollection`, `/miniMe`, `/tinyWorkers`, `/diorama`, `/snowGlobe`, `/paperDoll`, `/gachapon`, `/comicStrip`, `/fantasyNewspaper`, `/filmStrip`, `/travelScrapbook`, `/tarotCard`, `/gameScreen`, `/scribble`, `/claymation`, `/plushToy`, `/amigurumi`, `/embroidery`, `/stainedGlass`, `/studioHeadshot`, `/colorAnalysis`, `/hairstyleGrid`, `/fixLighting`, `/coverPack`, `/careerCaricature`, `/brandBoard`, `/packagingBoard`, `/merchMockup`, `/contactSheet`, `/storyboard`, `/firstLastFrame`.

Use `extra-expressions-plural.webp` for `/expressions`; map all remaining tested entries to numbered files `01` through `86`. Add internally sourced research ideas such as paparazzi portrait, long-exposure portrait, fashion triptych, yearbook, photo-booth strip, paper mosaic, typographic portrait, giant avatar, chrome sculpture, papercraft, shadow box, collectible coin, postage stamp, character select, and story sequence with `status: "idea"` and no image.

- [ ] **Step 4: Implement minimal pure selectors and validation**

```js
export function getPublicPrompts(data) {
  return data.prompts.filter((prompt) => prompt.status === 'tested' && prompt.image);
}

export function filterPrompts(prompts, categories, query = '', categoryId = 'all') {
  const categoryLabels = new Map(categories.map((category) => [category.id, category.label]));
  const term = query.trim().toLocaleLowerCase('de-DE');
  return prompts.filter((prompt) => {
    if (categoryId !== 'all' && prompt.category !== categoryId) return false;
    if (!term) return true;
    const haystack = [prompt.command, prompt.title, categoryLabels.get(prompt.category), ...prompt.useCases]
      .join(' ')
      .toLocaleLowerCase('de-DE');
    return haystack.includes(term);
  });
}
```

- [ ] **Step 5: Run tests and verify GREEN**

Run:

```powershell
node --test src/lib/utils/prompt-library.test.js
```

Expected: PASS with all canonical-data and selector tests green.

- [ ] **Step 6: Commit the data layer**

```powershell
git add -- src/lib/data/image-prompts.json src/lib/utils/prompt-library.js src/lib/utils/prompt-library.test.js
git commit -m "feat: add canonical image prompt library data"
```

### Task 2: Public library UI

**Files:**
- Create: `src/lib/components/prompt-library/PromptCard.svelte`
- Create: `src/lib/components/prompt-library/PromptLibrary.svelte`
- Create: `src/routes/tools/bildprompt-library/+page.svelte`
- Modify: `src/lib/utils/prompt-library.test.js`

**Interfaces:**
- Consumes: canonical JSON, selectors, and `copyPromptText()` from `src/lib/utils/prompt-actions.js`
- Produces: accessible public page with real search, category, reset, image, article, copy, and download controls

- [ ] **Step 1: Add a failing source-contract test**

Read the three Svelte files and assert the required visible labels and semantic hooks exist: `Bildprompt-Library`, `Prompt suchen`, `Prompt kopieren`, `PDF-Cheat-Sheet`, `aria-live`, `type="search"`, and the canonical PDF path.

- [ ] **Step 2: Run tests and verify RED**

Run:

```powershell
node --test src/lib/utils/prompt-library.test.js
```

Expected: FAIL because the Svelte files are absent.

- [ ] **Step 3: Implement `PromptCard.svelte`**

Use real markup and local state. The copy action must call:

```js
await copyPromptText(prompt.command, navigator.clipboard, document);
```

Expose the full image through an anchor, render up to three usecase tags, and link to `/blog/${prompt.articleSlug}`. Use `aria-live="polite"` for `Kopiert` and error feedback.

- [ ] **Step 4: Implement `PromptLibrary.svelte`**

Use Svelte 5 runes for query and category state, pure selectors for the derived result list, a desktop sidebar, horizontal mobile filter rail, result count, reset button, and a responsive card grid. Do not duplicate filtering logic in the component.

- [ ] **Step 5: Implement the route and SEO head**

The route imports JSON, passes only `getPublicPrompts(data)` to the component, and sets:

```text
Title: 87 Bildprompts mit Beispielen | Kostenlose Library | TRMT
H1: Bildprompt-Library
Canonical: https://therandommakertheory.com/tools/bildprompt-library
Download: /downloads/trmt-bildprompt-cheatsheet.pdf
```

- [ ] **Step 6: Run tests and Svelte check**

```powershell
node --test src/lib/utils/prompt-library.test.js src/lib/utils/prompt-actions.test.js
npm run check
```

Expected: library tests PASS. Record any pre-existing project-wide check failures separately and require zero new errors in the three new Svelte files.

- [ ] **Step 7: Commit the UI**

```powershell
git add -- src/lib/components/prompt-library src/routes/tools/bildprompt-library src/lib/utils/prompt-library.test.js
git commit -m "feat: add public image prompt library"
```

### Task 3: Six-page PDF from canonical data

**Files:**
- Create: `scripts/generate-prompt-cheatsheet.py`
- Create: `scripts/test_generate_prompt_cheatsheet.py`
- Create: `static/downloads/trmt-bildprompt-cheatsheet.pdf`
- Generate ignored QA copy: `output/pdf/trmt-bildprompt-cheatsheet.pdf`
- Generate temporary page renders: `tmp/pdfs/trmt-bildprompt-cheatsheet-*.png`

**Interfaces:**
- Consumes: `src/lib/data/image-prompts.json` and tested WebP assets
- Produces: exactly six landscape A4 pages and a stable public PDF URL

- [ ] **Step 1: Start the PDF artifact operation once**

```powershell
node container_tools/mark_artifact_operation_started.mjs --operation-kind create --expected-output-count 1 --output-format pdf
```

- [ ] **Step 2: Write failing Python unit tests**

Test that `build_page_groups()` returns six groups, covers every tested prompt exactly once, contains no idea entries, and never puts more than 18 cards on a page.

- [ ] **Step 3: Run tests and verify RED**

```powershell
python -m unittest scripts/test_generate_prompt_cheatsheet.py
```

Expected: FAIL because the generator module does not exist.

- [ ] **Step 4: Implement the ReportLab generator**

Use A4 landscape, dark TRMT background `#0B0B0B`, Honey `#D4893E`, Teal `#3AB0A2`, white text, dynamic grids of 3 to 6 columns, real WebP images, page titles, page numbers, and `therandommakertheory.com/tools/bildprompt-library` in the footer. Validate all image paths before drawing and write identical bytes to the QA and static destinations.

- [ ] **Step 5: Run tests and generate the PDF**

```powershell
python -m unittest scripts/test_generate_prompt_cheatsheet.py
python scripts/generate-prompt-cheatsheet.py
```

Expected: tests PASS and both PDF files are created.

- [ ] **Step 6: Verify PDF structure and text**

Use `pypdf` to require six pages and one occurrence of every tested command in extracted text. Require zero idea commands.

- [ ] **Step 7: Render and visually inspect all pages**

```powershell
pdftoppm -png -r 120 output/pdf/trmt-bildprompt-cheatsheet.pdf tmp/pdfs/trmt-bildprompt-cheatsheet
```

Create a contact sheet of all six pages, inspect it with `view_image`, then inspect any questionable page at original resolution. Fix overlap, unreadable type, clipping, or broken image rendering before continuing.

- [ ] **Step 8: Commit generator and website PDF**

```powershell
git add -- scripts/generate-prompt-cheatsheet.py scripts/test_generate_prompt_cheatsheet.py static/downloads/trmt-bildprompt-cheatsheet.pdf
git commit -m "feat: add downloadable prompt cheat sheet"
```

### Task 4: Navigation, sitemap, and public discovery

**Files:**
- Modify: `src/lib/components/layout/Header.svelte`
- Modify: `src/lib/components/layout/Footer.svelte`
- Modify: `src/routes/sitemap.xml/+server.ts`
- Modify: `src/lib/utils/prompt-library.test.js`

**Interfaces:**
- Consumes: `/tools/bildprompt-library`
- Produces: header `Tools` link, footer `Bildprompt-Library` link, and sitemap URL

- [ ] **Step 1: Add failing navigation and sitemap tests**

Read all three sources and assert the exact route is present. Require desktop and mobile header links and one footer link.

- [ ] **Step 2: Run tests and verify RED**

```powershell
node --test src/lib/utils/prompt-library.test.js
```

Expected: FAIL because the navigation and sitemap do not yet contain the route.

- [ ] **Step 3: Add navigation and sitemap entries**

Use `Tools` in desktop/mobile header navigation, active for `$page.url.pathname.startsWith('/tools')`; use `Bildprompt-Library` in the footer. Add sitemap priority `0.8`, weekly change frequency, and `latestPostDate` as last modification date.

- [ ] **Step 4: Run tests and verify GREEN**

```powershell
node --test src/lib/utils/prompt-library.test.js
```

Expected: PASS.

- [ ] **Step 5: Commit discovery integration**

```powershell
git add -- src/lib/components/layout/Header.svelte src/lib/components/layout/Footer.svelte src/routes/sitemap.xml/+server.ts src/lib/utils/prompt-library.test.js
git commit -m "feat: surface the prompt library across TRMT"
```

### Task 5: Browser fidelity, regression checks, and handoff

**Files:**
- Create: `docs/verification/2026-08-31-trmt-prompt-library-qa.md`
- Modify: `D:\UserData\ObsidianVault\LifeOS-Pollo\01-projects\trmt\TRMT.md`

**Interfaces:**
- Consumes: completed feature, accepted visual concept, and test outputs
- Produces: reproducible verification evidence and durable project handoff

- [ ] **Step 1: Run complete automated verification**

```powershell
node --test src/lib/utils/prompt-library.test.js src/lib/utils/prompt-actions.test.js src/content/blog/50-bildprompts-echt-getestet.test.js src/content/blog/ultimate-bildprompts-part-2.test.js
python -m unittest scripts/test_generate_prompt_cheatsheet.py
npm run check
npm run build
git diff --check HEAD
```

Record exact exit codes and distinguish new regressions from the known project baseline.

- [ ] **Step 2: Start the local site and verify the core workflow in Browser/IAB**

At desktop and mobile width, verify search, category filter, combined filtering, reset, copy status, full image link, article link, PDF download, theme switch, keyboard focus, and no horizontal overflow.

- [ ] **Step 3: Capture implementation screenshots**

Capture desktop at the accepted concept width and mobile at approximately 390 px. Inspect the accepted concept and implementation screenshots with `view_image` in one QA pass.

- [ ] **Step 4: Write the fidelity ledger**

Compare at least these points: visible copy, sidebar/category density, three-column desktop grid, image crop behavior, Honey/Teal palette, UI typography, copy-button state, mobile collapse, and PDF CTA. List every mismatch and its fix or intentional reason.

- [ ] **Step 5: Re-run verification after visual fixes**

Repeat the affected automated commands and browser checks. Do not claim completion until fresh output supports it.

- [ ] **Step 6: Record the durable TRMT handoff**

Append the route, canonical data path, generator command, public PDF path, tested count, verification results, commit IDs, and the explicit not-deployed status to the TRMT Obsidian project note.

- [ ] **Step 7: Commit QA documentation**

```powershell
git add -- docs/verification/2026-08-31-trmt-prompt-library-qa.md
git commit -m "docs: verify TRMT prompt library"
```

- [ ] **Step 8: Inspect final branch state**

```powershell
git status --short
git log -8 --oneline --decorate
```

Expected: only the preserved unrelated untracked plan and `.superpowers/` remain; no feature file is uncommitted. Do not push or deploy.
