# Svelte Check Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove all 99 existing `svelte-check` errors and all 9 warnings without suppressing diagnostics or changing the visible TRMT experience.

**Architecture:** Keep the JavaScript runtime and public component APIs intact. Add precise JSDoc where Node must execute `.mjs`/`.js` directly, use typed Svelte scripts for complex components, and fix the two real semantic defects: invalid `{@const}` placement and a clickable non-interactive card container. Preserve generated-file formats and the current article/media behavior.

**Tech Stack:** SvelteKit 5, TypeScript/JSDoc checked JavaScript, Node test runner, Vite, Canvas 2D.

## Global Constraints

- Work only in `D:\AI_Workspaces\Claude_Code\.release-worktrees\trmt-svelte-check-cleanup-20260907` on `codex/trmt-svelte-check-cleanup-20260907`.
- Do not use `@ts-nocheck`, diagnostic ignores, relaxed `tsconfig`, `any` escapes, or file exclusions.
- Do not mix the separately reported 17 dependency vulnerabilities into this change.
- Keep current routes, copy, styling, animation, generated data shape, and public component behavior.
- Acceptance: `svelte-check` reports `0 errors and 0 warnings`; 169 Node tests and production build pass; the two MindMap articles, blog detail lightbox, blog cards, podcast cards, theme toggle, and generated image metadata work in a production preview.
- Error cases: missing/unknown tags, absent click handlers, no optional article update date, malformed image files, empty comparison items, missing MindMap data, reduced motion, and unavailable 2D canvas context remain safe.
- Security/load: public data stays escaped, no new external requests or dependencies, event listeners are cleaned up, and Canvas animation stops on component teardown.

---

### Task 1: Lock the regression contract

**Files:**
- Create: `src/routes/svelte-check-cleanup.test.js`

**Interfaces:**
- Consumes: source files named in the baseline diagnostic.
- Produces: source-level contracts for semantic card interaction, standard line clamping, reactive MindMap fallback, accessible Canvas naming, and article `updated` metadata.

- [ ] **Step 1: Write the failing regression test**

Create assertions that require `Card.svelte` to render a button only when `onclick` exists without `href`, require standard `line-clamp`, require the MindMap image role on a wrapper instead of the canvas, require `$derived` SEO nodes, and require `Post.updated` to be read from metadata.

- [ ] **Step 2: Run the test to verify RED**

Run: `node --test src/routes/svelte-check-cleanup.test.js`

Expected: FAIL on the unchanged legacy sources.

### Task 2: Type the image metadata generator

**Files:**
- Modify: `scripts/generate-image-metadata.mjs`
- Test: `scripts/image-manifest.test.js`

**Interfaces:**
- Consumes: `Buffer`, filesystem paths, and `extractLocalImagePaths(source)`.
- Produces: `ImageDimensions`, `ImageMetadata`, `ImageVariant`, `Record<string, ImageMetadata>`, and `Record<string, string[]>` through JSDoc while preserving all existing exports.

- [ ] **Step 1: Add concrete JSDoc types**

Define `ImageDimensions`, `ImageVariant`, and `ImageMetadata`; annotate every parameter, recursive return, record, map, and destructured write option. Keep the `.mjs` filename because Node executes it during `prebuild`.

- [ ] **Step 2: Verify the generator slice**

Run: `node --test scripts/image-manifest.test.js`

Expected: all image-manifest tests PASS and no `generate-image-metadata.mjs` diagnostic remains.

### Task 3: Fix typed data helpers and shared primitives

**Files:**
- Modify: `src/lib/data/tagDescriptions.js`
- Modify: `src/lib/stores/theme.js`
- Modify: `src/lib/components/design-system/Card.svelte`
- Modify: `src/lib/components/design-system/Button.svelte`
- Modify: `src/lib/components/blog/BlogCard.svelte`
- Modify: `src/lib/components/podcast/EpisodeCard.svelte`
- Test: `src/routes/svelte-check-cleanup.test.js`
- Test: `src/routes/homepage-a11y.test.js`

**Interfaces:**
- Consumes: arbitrary tag strings, `Theme = 'dark' | 'light'`, optional card click handlers, and Svelte `Snippet` children.
- Produces: typed fallback tag descriptions, `Writable<Theme>`, optional card/button props, semantic button rendering for clickable cards, and compatible line-clamp declarations.

- [ ] **Step 1: Add narrow helper and prop types**

Use JSDoc for `tagDescriptions` and `theme`; use `<script lang="ts">` plus explicit prop unions for `Card` and `Button`. Make `loadingClass` derived. Branch `Card` as link, button, or passive div so the passive div never owns an event handler.

- [ ] **Step 2: Add standard CSS properties**

Add `line-clamp: 3` in `BlogCard` and `line-clamp: 2` in both clamped `EpisodeCard` rules while keeping `-webkit-line-clamp`.

- [ ] **Step 3: Verify the shared slice**

Run: `node --test src/routes/svelte-check-cleanup.test.js src/routes/homepage-a11y.test.js`

Expected: tests PASS and no diagnostics remain in these six files.

### Task 4: Repair comparison-table markup and types

**Files:**
- Modify: `src/lib/components/blog/ComparisonTable.svelte`
- Test: `src/routes/svelte-check-cleanup.test.js`

**Interfaces:**
- Consumes: typed `ComparisonItem[]` with optional badge, image, rating, price, features, pros, cons, CTA, and affiliate flag.
- Produces: the same rendered card grid and `renderStars(number)` result.

- [ ] **Step 1: Type props and move the const tag**

Convert the script to TypeScript, define `ComparisonItem`, and place `{@const stars = renderStars(item.rating ?? 0)}` directly under the keyed `{#each}` before the card element.

- [ ] **Step 2: Verify the comparison slice**

Run: `node --test src/routes/svelte-check-cleanup.test.js`

Expected: PASS and no `ComparisonTable.svelte` diagnostics.

### Task 5: Preserve article update metadata and type lightbox actions

**Files:**
- Modify: `src/lib/utils/posts.ts`
- Modify: `src/routes/blog/[slug]/+page.svelte`
- Test: `src/routes/svelte-check-cleanup.test.js`

**Interfaces:**
- Consumes: optional `updated` frontmatter date and DOM image nodes.
- Produces: `Post.updated?: string`, mapped metadata, typed ISO conversion, typed lightbox handlers, and a typed Svelte action cleanup function.

- [ ] **Step 1: Extend the canonical Post type**

Add `updated?: string` to `Post` and set `updated: metadata.updated` in `getPosts()`.

- [ ] **Step 2: Annotate route helpers and clean up listeners**

Add JSDoc parameter types for dates, image paths, keyboard events, and the action node. Return `destroy()` from `initProseImages` to remove exactly the listeners it adds.

- [ ] **Step 3: Verify article behavior contracts**

Run: `node --test src/routes/svelte-check-cleanup.test.js src/routes/image-seo-contract.test.js`

Expected: PASS and no blog-detail route diagnostics.

### Task 6: Type and harden MindMap3D

**Files:**
- Modify: `src/lib/components/blog/MindMap3D.svelte`
- Test: `src/routes/svelte-check-cleanup.test.js`

**Interfaces:**
- Consumes: recursive `MindMapNode { name: string; children?: MindMapNode[] }`.
- Produces: typed projected nodes, links, pulses and particles; a reactive SEO fallback; an accessible image wrapper; and cleaned Canvas, ResizeObserver, timeout and pointer listeners.

- [ ] **Step 1: Convert the script to explicit TypeScript**

Define recursive node, flat node, projected node, link, pulse, particle and point interfaces. Bind a definite `HTMLCanvasElement`, guard a missing 2D context, and use typed event handlers.

- [ ] **Step 2: Make state and accessibility valid**

Use `$derived(data ? flattenForSEO(data) : [])`; move `role="img"` and the accessible name to a wrapper; mark the drawing canvas `aria-hidden="true"`; preserve the screen-reader HTML fallback.

- [ ] **Step 3: Make teardown complete**

Store cascade timeout IDs, remove every named event listener, disconnect the observer, and cancel the animation frame on destroy.

- [ ] **Step 4: Verify the final diagnostic target**

Run: `npm run check`

Expected: `svelte-check found 0 errors and 0 warnings`.

### Task 7: Full verification and review

**Files:**
- Verify only: entire branch diff and production preview.

**Interfaces:**
- Consumes: the completed branch.
- Produces: release evidence, with no deployment until separately authorized.

- [ ] **Step 1: Run deterministic verification**

Run: `node --test`

Expected: all 170 tests PASS, including the new regression contract.

Run: `npm run check`

Expected: 0 errors, 0 warnings.

Run: `npm run build -- --logLevel warn`

Expected: exit 0 without Svelte warnings.

Run: `git diff --check`

Expected: exit 0.

- [ ] **Step 2: Run real-browser verification**

Open a local production preview and verify both MindMap articles, blog and podcast card links, theme switching, image lightbox, desktop/mobile layout, reduced-motion behavior, no horizontal overflow, and no console errors.

- [ ] **Step 3: Review and commit**

Inspect the complete diff for suppression comments, unrelated churn, generated-file drift, listener leaks, and public API changes. Commit independently verified slices, then prepare a pull request without merging or deploying.
