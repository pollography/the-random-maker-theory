# TRMT SEO Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the verified technical SEO gaps without publishing, inventing Search Console evidence, or starting outreach.

**Architecture:** Keep the existing combined XML/image sitemap as the single source of sitemap truth because Google treats embedded and separate image sitemaps equally. Add one global image-preview directive, distinguish podcast result titles from their paired articles, remove unsupported Google Indexing API submissions, and record current live evidence plus the remaining Search Console gate.

**Tech Stack:** SvelteKit, Svelte 5, Node test runner, Python automation scripts

## Global Constraints

- Do not commit, push, deploy, publish, submit a sitemap, or send indexing requests.
- Do not implement outreach.
- Do not merge, redirect, or retarget articles without Search Console query-to-page evidence.
- Treat Ubersuggest as supporting rank/audit evidence, not as Search Console data.

---

### Task 1: Google Images preview readiness

**Files:**
- Modify: `src/app.html`
- Test: `src/routes/image-seo-contract.test.js`

**Interfaces:**
- Consumes: the existing global HTML head and combined image sitemap
- Produces: a sitewide `max-image-preview:large` robots directive

- [x] Add a failing contract assertion for `<meta name="robots" content="max-image-preview:large" />`.
- [x] Run `node --test src/routes/image-seo-contract.test.js` and require the new assertion to fail for the missing directive.
- [x] Add the directive once in `src/app.html` without changing page-specific `noindex` rules.
- [x] Re-run the targeted test and require zero failures.

### Task 2: Distinct podcast result titles

**Files:**
- Modify: `src/routes/podcast/[slug]/+page.svelte`
- Create: `src/routes/podcast/podcast-seo.test.js`

**Interfaces:**
- Consumes: `data.episode.title`
- Produces: `Podcast: {episode title}` for title, Open Graph title, and Twitter title

- [x] Add a failing source contract that requires the `Podcast:` prefix in all three title surfaces.
- [x] Run `node --test src/routes/podcast/podcast-seo.test.js` and require failure against the duplicated current title.
- [x] Add the prefix without changing the visible episode H1.
- [x] Re-run the targeted test and require zero failures.

### Task 3: Remove unsupported Google Indexing API automation

**Files:**
- Modify: `scripts/index-notify.py`
- Modify: `scripts/deploy.py`
- Modify: `scripts/GSC-INDEXING-SETUP.md`
- Create: `scripts/seo-indexing-safety.test.js`

**Interfaces:**
- Consumes: the existing IndexNow notification workflow
- Produces: an IndexNow-only automation and a Search Console/sitemap Google workflow

- [x] Add a failing contract that rejects `indexing.googleapis.com`, Google publish helpers, service-account setup, and Google submission calls in both automation scripts.
- [x] Run `node --test scripts/seo-indexing-safety.test.js` and require failure against the current Google Indexing API code.
- [x] Remove only the Google Indexing API setup/submission path; retain IndexNow behavior unchanged.
- [x] Replace the setup note with the supported Google workflow and official scope warning.
- [x] Re-run the targeted test and require zero failures.

### Task 4: Evidence-backed handoff

**Files:**
- Create: `docs/seo/2026-09-03-trmt-seo-readiness.md`

**Interfaces:**
- Consumes: live sitemap/render checks, Ubersuggest audit/rank data, local overlap audit, and current Google documentation
- Produces: a PASS/PARTIAL/UNKNOWN handoff with exact Search Console follow-up steps

- [x] Record the existing 95-URL/611-image combined sitemap, 147 library images, responsive/render/schema signals, and the reason no duplicate image sitemap is added.
- [x] Record the four confirmed blog/podcast duplicate-title pairs and the local-only cannibalization candidates.
- [x] Record current Ubersuggest Germany/de rank evidence separately from Search Console.
- [x] Mark Search Console query/page and image-performance data `UNKNOWN` because the available browser is logged out.

### Task 5: Fresh verification

**Files:**
- Verify all changed files

**Interfaces:**
- Consumes: Tasks 1 through 4
- Produces: current regression, render, build, and diff evidence

- [x] Run all targeted tests and then `node --test`.
- [x] Render the app locally and verify the global preview directive, distinct podcast title, combined sitemap image counts, library image tags, and JSON-LD image objects.
- [x] Run `npm run check` and compare with the recorded unrelated baseline.
- [x] Run `npm run build` and distinguish application compilation from the known Windows Vercel-adapter symlink failure.
- [x] Run `git diff --check`, inspect the complete diff and status, and keep commit/push/deploy outside scope.

## Verification Record

- Targeted red phase: 4 expected failures for the missing preview directive, duplicated podcast titles, and unsupported Google API path.
- Targeted green phase: 11 of 11 tests passed.
- Full suite: 129 of 129 tests passed.
- Local render: preview directive, podcast metadata, sitemap counts, image elements, and image schema passed.
- Static check: unchanged baseline of 99 errors and 9 warnings in 10 unrelated files; no Sprint-file diagnostic.
- Build: application compiled; Vercel adapter then hit the known Windows `EPERM` symlink restriction.
- Diff check: passed with line-ending warnings only.
