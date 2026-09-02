# TRMT Informationsarchitektur Variante A Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Homepage verdichten, `/blog` vollstaendig serverseitig paginieren, fuenf bestehende Kern-Tagseiten als Hubs ausbauen und alle anderen Tags aus dem Index/Sitemap-Tagbereich nehmen.

**Architecture:** Eine client-sichere Kern-Themenkonfiguration ist die einzige Quelle fuer Navigation, Familiennormalisierung und Hub-Metadaten. Eine pure Pagination-Utility sortiert stabil und liefert Seitenmodelle an server-only SvelteKit-Loader. Homepage, Blogarchiv und Tagroute rendern normale Links; Sitemap und Robots-Logik verwenden dieselbe Kernliste.

**Tech Stack:** Svelte 5, SvelteKit 2, JavaScript/TypeScript, Node `node:test`, statisches Prerendering, vorhandene CSS-Tokens, Lighthouse/Browser-QA.

## Global Constraints

- Basis ist `167a5f7840df6205a3c68c174450151f2d70b48b` auf Branch `codex/trmt-ia-variant-a`.
- Keine neuen npm-Abhaengigkeiten und keine neuen oder geaenderten Bilddateien.
- Die fuenf Kern-Hubs sind exakt `ki-tools`, `maker`, `automatisierung`, `fotografie`, `produktivitaet`.
- `/blog` zeigt exakt 12 Artikel pro servergerenderter Seite; Sortierung `date DESC, slug ASC`.
- Nur die zwei Artikel `50-bildprompts-echt-getestet` und `gemini-notebook-kostenlos-codex-content-workflow` erhalten zusaetzlich den Tag `ki-tools`; sonst kein Artikeltext-/Frontmatter-Eingriff.
- Kern-Hubs sind `index,follow`; alle anderen bekannten Tags sind `noindex,follow`; unbekannte Tags liefern 404.
- Die bestehenden Themenbilder und ihre Pfade bleiben unveraendert.
- Die geaenderten UI-Wege funktionieren als normale Links ohne Client-JavaScript.
- Keine neue `/themen`-Route und keine Podcast-/Video-/Newsletter-Aenderung.
- Performance-/SEO-Median, LCP, CLS, TBT, Transfer und eigener JS-Graph duerfen gegen dieselbe lokale Basis nicht regressieren.
- Bestehende `svelte-check`-Diagnosen werden als normalisierte Menge verglichen; geaenderte Dateien duerfen keine neue Diagnose erzeugen.
- Push und Produktion erst nach vollstaendigen lokalen Gates, unabhaengiger Review und explizit bereits erteilter Produktionsfreigabe.

---

### Task 1: Kern-Themenmodell und diverse Homepage-Auswahl

**Files:**
- Create: `src/lib/data/core-topics.js`
- Modify: `src/lib/utils/homepage-posts.js`
- Modify: `src/lib/utils/homepage-posts.test.js`
- Modify: `src/content/blog/50-bildprompts-echt-getestet.md`
- Modify: `src/content/blog/gemini-notebook-kostenlos-codex-content-workflow.md`
- Test: `src/lib/data/core-topics.test.js`

**Interfaces:**
- Produces: `CORE_TOPICS`, `CORE_TOPIC_SLUGS`, `getCoreTopic(slug)`, `normalizeTopicFamily(category)`.
- Preserves: `selectHomepagePosts(posts, featuredSlug, limit = 4)`.

- [x] **Step 1: Write failing configuration and selection tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { CORE_TOPIC_SLUGS, normalizeTopicFamily } from './core-topics.js';

test('defines exactly the five approved core topics', () => {
  assert.deepEqual(CORE_TOPIC_SLUGS, ['ki-tools', 'maker', 'automatisierung', 'fotografie', 'produktivitaet']);
});

test('normalizes visible category aliases before homepage selection', () => {
  assert.equal(normalizeTopicFamily('ki-news'), 'ki-tools');
  assert.equal(normalizeTopicFamily('automation'), 'automatisierung');
  assert.equal(normalizeTopicFamily('smart-home'), 'maker');
  assert.equal(normalizeTopicFamily('photography'), 'fotografie');
  assert.equal(normalizeTopicFamily('productivity'), 'produktivitaet');
  assert.equal(normalizeTopicFamily('General'), 'other:general');
  assert.equal(normalizeTopicFamily(), 'other:unknown');
});
```

Extend `homepage-posts.test.js` with posts whose raw categories differ but normalized families collide; assert the result contains at most one post per family until all available families are exhausted.

- [x] **Step 2: Run RED**

Run: `node --test src/lib/data/core-topics.test.js src/lib/utils/homepage-posts.test.js`
Expected: FAIL because `core-topics.js` and normalized selection do not exist.

- [x] **Step 3: Implement the core configuration and normalized selection**

`core-topics.js` exports frozen records containing `slug`, `name`, `short`, `image`, `starterSlugs`, and `categoryAliases`. Implement `normalizeTopicFamily` with the exact alias families from the spec and `other:<value>` fallback. Update `selectHomepagePosts` to store normalized families instead of raw categories.

The `ki-tools` starter slugs are:

```js
['perfekt-prompten-llm-guide', '50-bildprompts-echt-getestet', 'gemini-notebook-kostenlos-codex-content-workflow']
```

Use the other twelve exact starter slugs from the approved spec. Add `ki-tools` once to each of the two approved article tag arrays without changing any other frontmatter or body line.

- [x] **Step 4: Run GREEN and focused regressions**

Run: `node --test src/lib/data/core-topics.test.js src/lib/utils/homepage-posts.test.js src/routes/homepage-hybrid.test.js src/routes/homepage-performance.test.js`
Expected: all tests PASS.

- [x] **Step 5: Commit**

```powershell
git add src/lib/data/core-topics.js src/lib/data/core-topics.test.js src/lib/utils/homepage-posts.js src/lib/utils/homepage-posts.test.js src/content/blog/50-bildprompts-echt-getestet.md src/content/blog/gemini-notebook-kostenlos-codex-content-workflow.md
git commit -m "feat: define TRMT core topic model"
```

---

### Task 2: Servergerendertes Blogarchiv mit stabiler Pagination

**Files:**
- Create: `src/lib/utils/blog-pagination.js`
- Test: `src/lib/utils/blog-pagination.test.js`
- Create: `src/lib/components/blog/BlogArchive.svelte`
- Rename: `src/routes/blog/+page.ts` to `src/routes/blog/+page.server.ts`
- Modify: `src/routes/blog/+page.svelte`
- Create: `src/routes/blog/seite/[page]/+page.server.ts`
- Create: `src/routes/blog/seite/[page]/+page.svelte`
- Test: `src/routes/blog/blog-archive.test.js`

**Interfaces:**
- Produces: `sortArchivePosts(posts)`, `paginatePosts(posts, page, pageSize = 12)`, `createArchivePageData(posts, page)`.
- Page data: `{ posts, currentPage, totalPages, totalCount }`.
- `BlogArchive.svelte` consumes page data plus `showFaq` and owns archive markup/head model shared by page 1 and later pages.

- [x] **Step 1: Write failing pagination tests**

```js
test('sorts by date descending and slug ascending', () => {
  const result = sortArchivePosts([
    { slug: 'z', date: '2026-01-01' },
    { slug: 'a', date: '2026-01-01' },
    { slug: 'new', date: '2026-02-01' }
  ]);
  assert.deepEqual(result.map((post) => post.slug), ['new', 'a', 'z']);
});

test('splits thirteen posts into twelve plus one without overlap', () => {
  const posts = Array.from({ length: 13 }, (_, index) => ({ slug: `p-${index}`, date: `2026-01-${String(index + 1).padStart(2, '0')}` }));
  const first = paginatePosts(posts, 1);
  const second = paginatePosts(posts, 2);
  assert.equal(first.posts.length, 12);
  assert.equal(second.posts.length, 1);
  assert.equal(new Set([...first.posts, ...second.posts].map((post) => post.slug)).size, 13);
});
```

Add cases for 0, 1 and 12 posts plus invalid pages. Invalid pages must throw `RangeError` from the pure utility.

- [x] **Step 2: Run RED**

Run: `node --test src/lib/utils/blog-pagination.test.js src/routes/blog/blog-archive.test.js`
Expected: FAIL because utility, routes and component do not exist.

- [x] **Step 3: Implement pagination utility and server loaders**

`paginatePosts` must clone/sort the input, calculate `totalPages = Math.max(1, Math.ceil(totalCount / pageSize))`, reject non-integer/out-of-range pages, and return only the page slice. Page 1 imports it from `+page.server.ts`. Dynamic `entries()` calculates and returns only strings `2..N`; `load()` accepts only `/^[1-9]\d*$/` and page number >= 2, translating invalid/range errors to SvelteKit `error(404)`.

- [x] **Step 4: Implement shared archive UI**

Replace the stateful load-more button with real links. `BlogArchive.svelte` renders:

```svelte
<nav class="topic-nav" aria-label="Blogthemen">
  {#each CORE_TOPICS as topic}
    <a href={`/tags/${topic.slug}`}>{topic.name}</a>
  {/each}
</nav>

<nav class="pagination" aria-label="Blogseiten">
  {#if currentPage > 1}<a href={pageHref(currentPage - 1)}>Zurueck</a>{/if}
  {#each visiblePages as pageNumber}
    <a href={pageHref(pageNumber)} aria-current={pageNumber === currentPage ? 'page' : undefined}>{pageNumber}</a>
  {/each}
  {#if currentPage < totalPages}<a href={pageHref(currentPage + 1)}>Weiter</a>{/if}
</nav>
```

Page 1 passes `showFaq={true}`; later pages pass `false`. Canonical and title are self-referential. The JSON-LD `ItemList` uses global positions `(currentPage - 1) * 12 + index + 1`.

- [x] **Step 5: Run GREEN and route-contract regressions**

Run: `node --test src/lib/utils/blog-pagination.test.js src/routes/blog/blog-archive.test.js`
Expected: all tests PASS, including exactly one server-rendered archive link per published slug and canonical handling.

- [x] **Step 6: Commit**

```powershell
git add src/lib/utils/blog-pagination.js src/lib/utils/blog-pagination.test.js src/lib/components/blog/BlogArchive.svelte src/routes/blog src/routes/blog/seite
git commit -m "feat: add crawlable blog pagination"
```

---

### Task 3: Homepage verdichten und Orientierungstext ergaenzen

**Files:**
- Modify: `src/routes/+page.svelte`
- Modify: `src/routes/homepage-hybrid.test.js`
- Modify: `src/routes/homepage-performance.test.js`
- Test: `src/routes/homepage-ia.test.js`

**Interfaces:**
- Consumes: `CORE_TOPICS` for all five navigator cards.
- Preserves: current topic image paths, video facade, podcast, newsletter, FAQ and four-post payload.

- [x] **Step 1: Record controlled Lighthouse/payload baseline**

Record Lighthouse version, three cold-cache mobile runs, three cold-cache desktop runs, and medians for score/LCP/CLS/TBT/transfer/own JS. Record homepage HTML/Page-Data raw+gzip and initial image requests/bytes. Store only the compact numeric result in the implementation report outside committed source.

- [x] **Step 2: Write failing homepage contract tests**

Assert source contains:

```js
assert.match(source, /href="\/blog"[^>]*>\s*<span>Alle Beiträge<\/span>/);
assert.match(source, /href="#topics"[^>]*>\s*<span>Themen wählen<\/span>/);
assert.match(source, /class="homepage-context"/);
assert.doesNotMatch(source, /const pillars = \[/);
```

Assert all five unchanged image paths still come from `CORE_TOPICS`, all images remain lazy/dimensioned, and the exact approved orientation copy is present.

- [x] **Step 3: Run RED**

Run: `node --test src/routes/homepage-ia.test.js src/routes/homepage-hybrid.test.js src/routes/homepage-performance.test.js`
Expected: FAIL on old CTAs, local pillar duplication and missing orientation block.

- [x] **Step 4: Implement compact homepage**

Import `CORE_TOPICS`, derive image SEO metadata without duplicating topic facts, change CTA labels/destinations, render the exact approved paragraph under the four-post grid, and reduce layout height. Desktop topic images use a compact landscape aspect; mobile cards remain horizontally scrollable. The image-less featured card uses content height rather than stretching to the right column.

No static image file changes are permitted.

- [x] **Step 5: Run GREEN and focused regressions**

Run: `node --test src/routes/homepage-ia.test.js src/routes/homepage-hybrid.test.js src/routes/homepage-performance.test.js src/routes/homepage-a11y.test.js src/lib/utils/homepage-posts.test.js`
Expected: all tests PASS.

- [x] **Step 6: Commit**

```powershell
git add src/routes/+page.svelte src/routes/homepage-ia.test.js src/routes/homepage-hybrid.test.js src/routes/homepage-performance.test.js
git commit -m "feat: surface TRMT articles earlier"
```

---

### Task 4: Kern-Hubs, Thin-Tag-Indexierung und Sitemap

**Files:**
- Rename: `src/routes/tags/[tag]/+page.ts` to `src/routes/tags/[tag]/+page.server.ts`
- Modify: `src/routes/tags/[tag]/+page.svelte`
- Modify: `src/routes/sitemap.xml/+server.ts`
- Test: `src/routes/tag-hubs.test.js`
- Modify: `src/routes/image-seo-contract.test.js` only if its sitemap expectations require the approved five-tag rule.

**Interfaces:**
- Consumes: `CORE_TOPICS`, `CORE_TOPIC_SLUGS`, `getCoreTopic`.
- Tag page data adds `{ isCoreTopic, topic, starterPosts, remainingPosts }`.

- [x] **Step 1: Write failing hub and sitemap tests**

Tests must assert:

```js
assert.equal(CORE_TOPIC_SLUGS.length, 5);
assert.match(tagPageSource, /content={isCoreTopic \? 'index,follow' : 'noindex,follow'}/);
assert.match(tagPageSource, /BreadcrumbList/);
assert.match(tagPageSource, /CollectionPage/);
assert.match(tagPageSource, /Weitere Themen/);
assert.match(sitemapSource, /CORE_TOPIC_SLUGS/);
```

Load every configured starter slug and assert existence plus exact canonical core tag. Assert an unknown tag throws 404 and a known non-core tag returns `isCoreTopic: false`.

- [x] **Step 2: Run RED**

Run: `node --test src/routes/tag-hubs.test.js src/routes/image-seo-contract.test.js`
Expected: FAIL because hub data, robots logic and five-tag sitemap filter do not exist.

- [x] **Step 3: Implement server tag loader**

Fetch all published tags and reject missing params with `error(404)`. For core topics, resolve configured starter posts in configured order and remove those slugs from the dated remainder. Return only serializable metadata. For non-core tags, return the existing exact-tag post list with empty starter data.

- [x] **Step 4: Implement hub and thin-tag render paths**

Core hubs render `index,follow`, unique metadata, Self-Canonical, breadcrumb, `Hier anfangen`, remaining posts, related core topics, visible FAQ when available, `BreadcrumbList` and `CollectionPage.mainEntity` -> `ItemList`. Non-core tags render `noindex,follow`, no structured collection/FAQ schema, compact header and ordinary post grid. Remove the visible emoji icon from core hub headers only.

- [x] **Step 5: Restrict sitemap tag URLs**

Replace `getAllTags()` for sitemap tag generation with `CORE_TOPIC_SLUGS`. Keep all valid article and episode URLs unchanged. Do not add paginated archive URLs.

- [x] **Step 6: Run GREEN and regressions**

Run: `node --test src/routes/tag-hubs.test.js src/routes/image-seo-contract.test.js src/routes/trmt-image-prompts-seo.test.js`
Expected: all tests PASS and sitemap tag count is exactly five.

- [x] **Step 7: Commit**

```powershell
git add src/routes/tags src/routes/sitemap.xml/+server.ts src/routes/tag-hubs.test.js src/routes/image-seo-contract.test.js
git commit -m "feat: strengthen core topic hubs"
```

---

### Task 5: Integration, rendered QA and release

**Files:**
- Modify only files already listed if a failing verification requires a scoped fix with a reproducing test.
- Update: `docs/superpowers/plans/2026-09-02-trmt-ia-variant-a.md` checkboxes after each verified task.

**Interfaces:**
- Consumes the complete branch.
- Produces release evidence and a production deployment only after all gates pass.

- [x] **Step 1: Run complete focused Node suite**

Run all repository `*.test.js` files with `node --test`. Expected: 0 failures.

- [x] **Step 2: Compare Svelte diagnostics as a normalized set**

Run `npm run check` and parse diagnostics into `file|severity|message`. Expected: no new diagnostics relative to the recorded 78-error/9-warning baseline and none in changed files.

- [x] **Step 3: Build and crawl**

Run `npm run build`. Local Vite/SvelteKit compilation must finish; if Windows ends at the known adapter symlink `EPERM`, do not call this a full build. Before production, require a green Linux GitHub Actions/Vercel build. Crawl the built/preview routes with JavaScript disabled and assert page 1 through N expose every published article slug exactly once, invalid pages/tags return 404, and no primary path requires hydration.

- [x] **Step 4: Browser QA**

Use the in-app Browser workflow against a local preview. Check homepage, `/blog`, `/blog/seite/2`, one core hub and one non-core tag at 1440 x 1000, 390 x 844 and 320 CSS pixels/200 percent text zoom. Verify page identity, meaningful DOM, no framework overlay, console health, screenshots, CTA/pagination interactions, no horizontal page overflow, focus and `aria-current`.

- [x] **Step 5: Run Impeccable detector**

Run once after UI completion:

```powershell
node C:\Users\Pollo\.agents\skills\impeccable\scripts\detect.mjs --json --scope layout src/routes/+page.svelte src/lib/components/blog/BlogArchive.svelte src/routes/blog/+page.svelte src/routes/tags/[tag]/+page.svelte
```

Expected: no unexplained blocking finding.

- [ ] **Step 6: Repeat controlled performance comparison**

Repeat the pinned-version three-run mobile and desktop Lighthouse profiles with cold cache. Expected: median Performance and SEO scores, LCP, CLS, TBT, transfer and own JS do not regress. Compare deterministic HTML/Page-Data raw+gzip and image requests/bytes.

- [x] **Step 7: Independent whole-branch review**

Create a review package from merge base `167a5f7` through HEAD. Reviewer must return both spec-compliance and code-quality approval; fix Critical/Important findings with reproducing tests and re-review.

- [x] **Step 8: Scope and cleanliness gate**

Run `git diff --check`, `git diff --cached --check`, `git status --short`, untracked inventory, and `git diff --stat 167a5f7...HEAD`. Expected: only approved files, no image assets, no secrets, no unrelated canonical-checkout changes.

- [ ] **Step 9: Push and production verification**

Push only the verified feature branch, integrate linearly into `origin/main` without taking dirty canonical-checkout state, and wait for the Linux GitHub Actions/Vercel run to pass. Then verify live HTTP 200/404 behavior, canonical/robots/schema, sitemap five-tag set, crawlable pagination, CTA targets, responsive first viewport and PageSpeed/Lighthouse evidence. If production verification fails, stop rollout or make a scoped tested fix; never report completion from deployment start alone.

- [ ] **Step 10: Record durable handoff**

Update the TRMT Obsidian audit note with final SHAs, test counts, performance comparison, deployment URL/status, live checks and any explicit UNKNOWN. Do not write global memory files.
