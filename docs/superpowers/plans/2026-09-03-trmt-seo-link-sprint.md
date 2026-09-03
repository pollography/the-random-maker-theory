# TRMT SEO Link Sprint Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the Bildprompt-Library descriptive article anchors and make the two currently article-orphaned prompt collections discoverable from the established prompt hubs.

**Architecture:** Keep the existing 147-card library and four editorial hubs intact. Improve only visible anchor copy in `PromptCard.svelte`, then add a compact forward path from the existing 50-prompt and Part-2 hubs to Part 3 and the 24 precise prompts. Cross-link the two detailed-prompt collections where it answers the reader's natural next question.

**Tech Stack:** Svelte 5, Markdown/mdsvex, Node test runner

## Global Constraints

- Do not add a glossary, generated definition pages, or new routes.
- Do not change article metadata, test claims, hero images, or prompt data.
- Public German copy uses the current TRMT profile, contains no internal name and no em dash.
- Do not commit, push, publish, or deploy.

---

### Task 1: Descriptive library-card anchors

**Files:**
- Modify: `src/lib/components/prompt-library/PromptCard.svelte`
- Test: `src/lib/utils/prompt-library.test.js`

**Interfaces:**
- Consumes: existing `prompt.title` and `prompt.articleSlug` card properties
- Produces: a visible article link whose text identifies the exact prompt

- [x] **Step 1: Write the failing test**

Add an assertion that the card renders `{prompt.title}: Beispiel & Anwendung` inside the existing `/blog/{prompt.articleSlug}` link and no longer renders the generic anchor alone.

- [x] **Step 2: Run the test to verify it fails**

Run: `node --test src/lib/utils/prompt-library.test.js`

Expected: FAIL because `PromptCard.svelte` still contains only `Beispiel &amp; Anwendung`.

- [x] **Step 3: Write the minimal implementation**

Change the existing link body to `{prompt.title}: Beispiel &amp; Anwendung`. Do not alter its destination or surrounding card layout.

- [x] **Step 4: Run the test to verify it passes**

Run: `node --test src/lib/utils/prompt-library.test.js`

Expected: PASS.

### Task 2: Prompt-series navigation

**Files:**
- Modify: `src/content/blog/50-bildprompts-echt-getestet.md`
- Modify: `src/content/blog/ultimate-bildprompts-part-2.md`
- Modify: `src/content/blog/ultimate-bildprompts-part-3.md`
- Modify: `src/content/blog/praezise-bildprompts-weniger-zufall.md`
- Test: `src/routes/trmt-image-prompts-seo.test.js`

**Interfaces:**
- Consumes: the four existing published article routes and the existing Bildprompt-Library route
- Produces: descriptive, contextual paths from the established hubs to both detailed-prompt collections and a reciprocal next-step link between them

- [x] **Step 1: Write the failing tests**

Require the 50-prompt hub and Part 2 to link to both `/blog/ultimate-bildprompts-part-3` and `/blog/praezise-bildprompts-weniger-zufall`. Require Part 3 and the precise-prompt article to link to each other.

- [x] **Step 2: Run the test to verify it fails**

Run: `node --test src/routes/trmt-image-prompts-seo.test.js`

Expected: FAIL because those forward links do not exist yet.

- [x] **Step 3: Add the minimal contextual copy**

Add one short continuation sentence near the existing series navigation in each article. Use natural destination descriptions and preserve all existing claims and sections.

- [x] **Step 4: Run the targeted test to verify it passes**

Run: `node --test src/routes/trmt-image-prompts-seo.test.js`

Expected: PASS.

### Task 3: Fresh verification

**Files:**
- Verify all changed files

**Interfaces:**
- Consumes: Tasks 1 and 2
- Produces: current regression, build, and diff evidence

- [x] Run `node --test` and require zero failures.
- [x] Run `npm run build` and record the actual exit state.
- [x] Run `npm run check`; compare any findings with the recorded 99-error baseline and require no new diagnostics in changed files.
- [x] Run `git diff --check` and inspect `git diff --stat`, `git diff`, and `git status --short`.
- [x] Report Google ranking impact as `UNKNOWN` until Search Console supplies post-release evidence.

**Verification record:** `node --test` passed 124/124. All changed pages returned HTTP 200 locally, and the rendered library contained 147 descriptive card anchors with zero generic card anchors. Vite compiled the application, then the Vercel adapter failed on the known Windows symlink `EPERM`. `svelte-check` remained at the pre-change baseline of 99 errors and 9 warnings in ten unrelated files, with no diagnostic in a changed file.
