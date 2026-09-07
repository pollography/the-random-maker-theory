# TRMT Sitewide Search Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one lazy, accessible search system to the global header, blog overview, and topic pages, and round the homepage editorial bridge consistently.

**Architecture:** A prerendered JSON endpoint builds a public search index from published blog and podcast sources plus an explicit tool registry. Pure client utilities normalize and rank that index; a single cached loader fetches it only after interaction. Header and inline article-search components reuse the same result renderer while applying different type and topic filters.

**Tech Stack:** SvelteKit 2, Svelte 5 runes, Vite `import.meta.glob`, native `fetch`/`AbortController`, Node test runner, existing TRMT CSS tokens.

## Global Constraints

- Search surfaces: header, `/blog`, and every `/tags/<tag>` page.
- Header scope: published articles, podcast episodes, and public tools.
- Blog scope: all published articles, including posts not yet loaded by infinite scroll.
- Topic scope: published articles carrying the active topic tag.
- Search fields: title, description, tags/category, headings, and normalized deduplicated body tokens.
- Exclude drafts, previews, legal pages, technical pages, and arbitrary routes.
- No search-index request before the first search interaction.
- Query length: maximum 160 characters.
- Initial header results: maximum 12; inline results: maximum 24.
- Index budget: below 750 KiB uncompressed and 200 KiB gzip for the current corpus.
- Representative complete-index query: below 50 ms in the unit benchmark environment.
- All controls: minimum 44-pixel targets, German accessible names, visible focus in dark/light themes.
- Existing infinite scroll, canonical pages, structured data, media lazy loading, and public content remain unchanged outside search mode.
- The dirty canonical checkout must remain untouched; release through the isolated branch and a normal pull request.

---

## File map

- Create `src/lib/utils/site-search.js`: normalization, extraction, validation, scoring, filtering, excerpts.
- Create `src/lib/utils/site-search.test.js`: pure search, malformed input, security, limits, ordering, and timing.
- Create `src/lib/data/search-tools.js`: explicit allowlist of public searchable tools.
- Create `src/lib/server/search-index.js`: build published records from source modules.
- Create `src/routes/search-index.json/+server.ts`: prerender and cache the JSON response.
- Create `src/routes/site-search-index.test.js`: exercise the real Vite endpoint and corpus budgets.
- Create `src/lib/utils/search-index-client.js`: one lazy retryable fetch with timeout.
- Create `src/lib/utils/search-index-client.test.js`: no eager fetch, malformed response, timeout, and retry.
- Create `src/lib/components/search/SearchResults.svelte`: shared accessible results/states.
- Create `src/lib/components/search/SiteSearch.svelte`: header trigger and modal dialog.
- Create `src/lib/components/search/ArticleSearch.svelte`: inline article search and active-state callback.
- Create `src/routes/site-search-ui.test.js`: SSR/source contracts for header, dialog, inline integrations, and radius.
- Modify `src/lib/components/layout/Header.svelte`: mount global search action.
- Modify `src/lib/components/blog/BlogArchive.svelte`: mount article search and pause archive UI during search.
- Modify `src/routes/tags/[tag]/+page.svelte`: mount topic-filtered article search and hide normal topic lists during search.
- Modify `src/routes/+page.svelte`: add `--radius-xl` to `.homepage-context`.

---

### Task 1: Pure search engine and safe content extraction

**Files:**
- Create: `src/lib/utils/site-search.js`
- Create: `src/lib/utils/site-search.test.js`

**Interfaces:**
- Produces: `normalizeSearchText(value)`, `extractSearchDocument(source)`, `createSearchRecord(input)`, `isSearchRecord(value)`, and `searchSiteIndex(records, query, options)`.
- `searchSiteIndex` returns result records extended with `score` and `excerpt`.

- [ ] **Step 1: Write failing tests for normalization, extraction, filtering, ranking, limits, and hostile input**

```js
import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { test } from 'node:test';
import {
  extractSearchDocument,
  isSearchRecord,
  normalizeSearchText,
  searchSiteIndex
} from './site-search.js';

const records = [
  { type: 'article', slug: 'esp32', url: '/blog/esp32', title: 'ESP32 Einstieg', description: 'Sensor bauen', tags: ['maker'], category: 'Maker & DIY', headings: ['WLED verbinden'], bodyTokens: 'esp32 sensor wled verbinden', date: '2026-09-02' },
  { type: 'podcast', slug: 'ki-foto', url: '/podcast/ki-foto', title: 'KI Bildbearbeitung', description: 'Direkt anhören', tags: [], category: 'Podcast', headings: [], bodyTokens: 'lightroom workflow fotografie', date: '2026-09-03' },
  { type: 'tool', slug: 'bildprompt-library', url: '/tools/bildprompt-library', title: 'Bildprompt-Library', description: '147 Prompts durchsuchen', tags: ['ki-tools'], category: 'Tool', headings: [], bodyTokens: 'bild prompt kopieren', date: '' }
];

test('normalizes German text and bounds hostile input as plain text', () => {
  assert.equal(normalizeSearchText('ÜBER Größe & Spaß'), 'uber grosse spass');
  assert.doesNotMatch(normalizeSearchText('<script>alert(1)</script>'), /[<>]/);
});

test('extracts headings and searchable body tokens without frontmatter, code, or HTML', () => {
  const document = extractSearchDocument('---\ndraft: true\n---\n## Kamera & Licht\nText mit Größe.\n```js\nalert(1)\n```\n<script>bad()</script>');
  assert.deepEqual(document.headings, ['Kamera & Licht']);
  assert.match(document.bodyTokens, /kamera licht text grosse/);
  assert.doesNotMatch(document.bodyTokens, /draft|alert|bad/);
});

test('ranks title ahead of body and applies type and topic filters', () => {
  assert.equal(searchSiteIndex(records, 'ESP32')[0].slug, 'esp32');
  assert.deepEqual(searchSiteIndex(records, 'workflow', { types: ['podcast'] }).map((item) => item.slug), ['ki-foto']);
  assert.deepEqual(searchSiteIndex(records, 'sensor', { types: ['article'], tag: 'maker' }).map((item) => item.slug), ['esp32']);
  assert.deepEqual(searchSiteIndex(records, 'sensor', { tag: 'ki-tools' }), []);
});

test('handles empty, overlong, malformed, and large inputs deterministically', () => {
  assert.deepEqual(searchSiteIndex(records, ''), []);
  assert.equal(searchSiteIndex(records, 'x'.repeat(500)).length, 0);
  assert.equal(isSearchRecord({ title: '<script>' }), false);
  const corpus = Array.from({ length: 1000 }, (_, index) => ({ ...records[0], slug: `p-${index}`, url: `/blog/p-${index}` }));
  const start = performance.now();
  const result = searchSiteIndex(corpus, 'sensor', { limit: 12 });
  assert.equal(result.length, 12);
  assert.ok(performance.now() - start < 50);
});
```

- [ ] **Step 2: Run the tests and confirm RED**

Run: `node --test src/lib/utils/site-search.test.js`

Expected: FAIL because `site-search.js` does not exist.

- [ ] **Step 3: Implement the pure utility**

```js
export const SEARCH_QUERY_MAX_LENGTH = 160;
const VALID_TYPES = new Set(['article', 'podcast', 'tool']);

export function normalizeSearchText(value) {
  return String(value ?? '')
    .slice(0, SEARCH_QUERY_MAX_LENGTH * 200)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractSearchDocument(source) {
  const withoutPrivate = String(source ?? '')
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ');
  const headings = Array.from(withoutPrivate.matchAll(/^#{2,6}\s+(.+)$/gm), (match) => match[1].replace(/[*_`]/g, '').trim());
  const plain = withoutPrivate
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, ' $1 ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, ' $1 ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`~|\-]+/g, ' ');
  const bodyTokens = [...new Set(normalizeSearchText(plain).split(' ').filter((token) => token.length > 1))].join(' ');
  return { headings, bodyTokens };
}

export function isSearchRecord(value) {
  return Boolean(value && VALID_TYPES.has(value.type) && typeof value.slug === 'string' && /^\/(blog|podcast|tools)\//.test(value.url) && typeof value.title === 'string' && typeof value.description === 'string' && Array.isArray(value.tags) && Array.isArray(value.headings) && typeof value.bodyTokens === 'string');
}

export function createSearchRecord(input) {
  const record = {
    type: input.type,
    slug: String(input.slug),
    url: String(input.url),
    title: String(input.title),
    description: String(input.description ?? ''),
    tags: Array.isArray(input.tags) ? input.tags.map(String) : [],
    category: String(input.category ?? ''),
    headings: Array.isArray(input.headings) ? input.headings.map(String) : [],
    bodyTokens: String(input.bodyTokens ?? ''),
    date: String(input.date ?? '')
  };
  if (!isSearchRecord(record)) throw new TypeError('Invalid public search record');
  return record;
}

export function searchSiteIndex(records, query, { types, tag, limit = 12 } = {}) {
  const normalizedQuery = normalizeSearchText(String(query ?? '').slice(0, SEARCH_QUERY_MAX_LENGTH));
  if (!normalizedQuery) return [];
  const tokens = normalizedQuery.split(' ');
  const typeSet = types ? new Set(types) : null;
  return records
    .filter(isSearchRecord)
    .filter((record) => !typeSet || typeSet.has(record.type))
    .filter((record) => !tag || record.tags.includes(tag))
    .map((record) => {
      const title = normalizeSearchText(record.title);
      const tags = normalizeSearchText(`${record.tags.join(' ')} ${record.category}`);
      const headings = normalizeSearchText(record.headings.join(' '));
      const description = normalizeSearchText(record.description);
      const body = record.bodyTokens;
      const fields = [title, tags, headings, description, body];
      if (!tokens.every((token) => fields.some((field) => field.includes(token)))) return null;
      let score = title === normalizedQuery ? 160 : title.startsWith(normalizedQuery) ? 120 : 0;
      for (const token of tokens) {
        if (title.includes(token)) score += 40;
        if (tags.includes(token)) score += 24;
        if (headings.includes(token)) score += 18;
        if (description.includes(token)) score += 12;
        if (body.split(' ').includes(token)) score += 4;
      }
      const matchedHeading = record.headings.find((heading) => tokens.some((token) => normalizeSearchText(heading).includes(token)));
      return { ...record, score, excerpt: matchedHeading || record.description };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || String(b.date).localeCompare(String(a.date)) || a.title.localeCompare(b.title, 'de') || a.url.localeCompare(b.url))
    .slice(0, Math.max(0, Math.min(Number(limit) || 12, 24)));
}
```

- [ ] **Step 4: Run the focused tests and confirm GREEN**

Run: `node --test src/lib/utils/site-search.test.js`

Expected: all pure-search tests PASS.

- [ ] **Step 5: Commit**

Run:

```powershell
git add src/lib/utils/site-search.js src/lib/utils/site-search.test.js
git commit -m "feat: add deterministic site search engine"
```

---

### Task 2: Build and prerender the public search index

**Files:**
- Create: `src/lib/data/search-tools.js`
- Create: `src/lib/server/search-index.js`
- Create: `src/routes/search-index.json/+server.ts`
- Create: `src/routes/site-search-index.test.js`

**Interfaces:**
- Consumes: Task 1 `extractSearchDocument` and `createSearchRecord`.
- Produces: `PUBLIC_SEARCH_TOOLS` and async `buildSiteSearchIndex()`; HTTP `GET /search-index.json` returns `{ version: 1, records: SearchRecord[] }`.

- [ ] **Step 1: Write the real-endpoint RED test**

The test must start a middleware Vite server, load `/src/routes/search-index.json/+server.ts`, call `GET()`, and assert:

```js
assert.equal(payload.version, 1);
assert.ok(payload.records.some((item) => item.type === 'article'));
assert.ok(payload.records.some((item) => item.type === 'podcast'));
assert.deepEqual(payload.records.filter((item) => item.type === 'tool').map((item) => item.url), ['/tools/bildprompt-library']);
assert.equal(payload.records.some((item) => /impressum|datenschutz|preview/.test(item.url)), false);
assert.equal(new Set(payload.records.map((item) => item.url)).size, payload.records.length);
assert.ok(Buffer.byteLength(JSON.stringify(payload)) < 750 * 1024);
assert.ok(gzipSync(JSON.stringify(payload)).length < 200 * 1024);
assert.equal(response.headers.get('cache-control'), 'public, max-age=0, must-revalidate');
```

- [ ] **Step 2: Run the endpoint test and confirm RED**

Run: `node --test src/routes/site-search-index.test.js`

Expected: FAIL because the endpoint does not exist.

- [ ] **Step 3: Add the explicit public tool registry**

```js
export const PUBLIC_SEARCH_TOOLS = Object.freeze([
  {
    slug: 'bildprompt-library',
    url: '/tools/bildprompt-library',
    title: 'Bildprompt-Library',
    description: '147 getestete Bildprompts mit Beispielen, kontrollierten Vorlagen und Copy-Funktion.',
    tags: ['ki-tools', 'fotografie', 'bildprompts'],
    category: 'Tool',
    headings: ['Bildprompts durchsuchen und kopieren'],
    bodyTokens: 'bildprompt bildprompts prompts bilder ki fotografie vorlage kopieren library'
  }
]);
```

- [ ] **Step 4: Implement the server-side builder and endpoint**

Use eager raw glob imports only in `src/lib/server/search-index.js`, join sources to metadata by frontmatter slug or filename, and build records only from `getPosts()` and `getEpisodes()` so draft filtering remains canonical. Sort records by type, descending date, title, and URL. The endpoint is:

```ts
import { json } from '@sveltejs/kit';
import { buildSiteSearchIndex } from '$lib/server/search-index.js';

export const prerender = true;

export async function GET() {
  return json(
    { version: 1, records: await buildSiteSearchIndex() },
    { headers: { 'cache-control': 'public, max-age=0, must-revalidate' } }
  );
}
```

- [ ] **Step 5: Run endpoint plus pure tests and confirm GREEN**

Run: `node --test src/lib/utils/site-search.test.js src/routes/site-search-index.test.js`

Expected: both suites PASS and reported sizes stay under both budgets.

- [ ] **Step 6: Commit**

```powershell
git add src/lib/data/search-tools.js src/lib/server/search-index.js src/routes/search-index.json/+server.ts src/routes/site-search-index.test.js
git commit -m "feat: prerender public search index"
```

---

### Task 3: Add the lazy, retryable client loader

**Files:**
- Create: `src/lib/utils/search-index-client.js`
- Create: `src/lib/utils/search-index-client.test.js`

**Interfaces:**
- Produces: `createSearchIndexLoader({ fetchImpl, timeoutMs, url })` returning `load()` and `reset()`; singleton `loadSearchIndex()`.
- Resolves to validated `SearchRecord[]`; rejects on HTTP, timeout, malformed schema, or empty non-array payload.

- [ ] **Step 1: Write RED tests**

Cover zero fetches at construction, one shared fetch for concurrent `load()` calls, HTTP failure, malformed JSON, timeout abort, and a successful retry after failure.

```js
const loader = createSearchIndexLoader({ fetchImpl, timeoutMs: 10, url: '/search-index.json' });
assert.equal(calls, 0);
await Promise.all([loader.load(), loader.load()]);
assert.equal(calls, 1);
```

- [ ] **Step 2: Run and confirm RED**

Run: `node --test src/lib/utils/search-index-client.test.js`

Expected: FAIL because the loader does not exist.

- [ ] **Step 3: Implement the loader**

The loader creates `AbortController`, starts one timeout, validates `payload.version === 1` and every record with `isSearchRecord`, caches only the in-flight/success promise, clears cache on rejection, and exposes `reset()` for tests. Export a singleton using native `fetch` without executing it at module import.

- [ ] **Step 4: Run and confirm GREEN**

Run: `node --test src/lib/utils/search-index-client.test.js`

Expected: all loader tests PASS, including retry after timeout and malformed payload.

- [ ] **Step 5: Commit**

```powershell
git add src/lib/utils/search-index-client.js src/lib/utils/search-index-client.test.js
git commit -m "feat: lazy load search index"
```

---

### Task 4: Build the shared results and header search dialog

**Files:**
- Create: `src/lib/components/search/SearchResults.svelte`
- Create: `src/lib/components/search/SiteSearch.svelte`
- Modify: `src/lib/components/layout/Header.svelte`
- Create: `src/routes/site-search-ui.test.js`

**Interfaces:**
- Consumes: `loadSearchIndex()` and `searchSiteIndex()`.
- `SearchResults` props: `{ query, results, loading, error, totalLabel }`.
- `SiteSearch` owns the 44-pixel trigger, native dialog, focus lifecycle, global search state, and 12-result limit.

- [ ] **Step 1: Write the SSR/source RED contract**

Assert that Header renders the search trigger; the trigger has `aria-label="Website durchsuchen"`; the dialog has `aria-labelledby`, a labelled search input, close button, live region, Escape handling, and no eager module-level loader call. Assert source uses the 12-result limit and `type` labels.

- [ ] **Step 2: Run and confirm RED**

Run: `node --test src/routes/site-search-ui.test.js`

Expected: FAIL because the components and Header integration do not exist.

- [ ] **Step 3: Implement `SearchResults.svelte`**

Render these mutually exclusive states in one `aria-live="polite"` region:

- loading: `Suche wird geladen …`
- error: `Die Suche konnte gerade nicht geladen werden.` plus `Erneut versuchen`
- empty query: context guidance
- no matches: `Keine Treffer für „{query}“.`
- results: count plus links with German type labels `Artikel`, `Podcast`, `Tool`, title, and escaped excerpt.

Use only Svelte text interpolation for record fields; never `{@html}`.

- [ ] **Step 4: Implement `SiteSearch.svelte` and mount it in Header**

On trigger click, call `dialog.showModal()`, then `loadSearchIndex()`, then focus the input. Limit input with `maxlength="160"`. Update results synchronously through `searchSiteIndex(index, query, { limit: 12 })`. Close on native dialog close, Escape, or explicit close button; return focus to the trigger. Add reduced-motion-safe TRMT styling and a one-column mobile layout.

In `Header.svelte`, import and render `<SiteSearch />` before `<ThemeToggle variant="icon" />`.

- [ ] **Step 5: Run UI, loader, and engine tests**

Run: `node --test src/lib/utils/site-search.test.js src/lib/utils/search-index-client.test.js src/routes/site-search-ui.test.js`

Expected: PASS.

- [ ] **Step 6: Commit**

```powershell
git add src/lib/components/search/SearchResults.svelte src/lib/components/search/SiteSearch.svelte src/lib/components/layout/Header.svelte src/routes/site-search-ui.test.js
git commit -m "feat: add global header search"
```

---

### Task 5: Integrate article search into blog and topic pages

**Files:**
- Create: `src/lib/components/search/ArticleSearch.svelte`
- Modify: `src/lib/components/blog/BlogArchive.svelte`
- Modify: `src/routes/tags/[tag]/+page.svelte`
- Modify: `src/routes/blog/blog-archive.test.js`
- Modify: `src/routes/tag-hubs.test.js`

**Interfaces:**
- `ArticleSearch` props: `{ topic = null, totalCount, onActiveChange }`.
- It renders its own `SearchResults` with article-only filters and limit 24.
- It calls `onActiveChange(true)` for a non-empty query and `onActiveChange(false)` when cleared.

- [ ] **Step 1: Extend archive and tag tests for RED**

Assert `/blog` SSR contains a labelled `Blogartikel durchsuchen` field. Assert the blog component imports `ArticleSearch`, passes no topic, and hides feed/sentinel while search is active. Assert tag SSR contains `Dieses Thema durchsuchen`, passes `topic={data.tag}`, and does not render starter/remaining article sections while search is active.

- [ ] **Step 2: Run and confirm RED**

Run: `node --test src/routes/blog/blog-archive.test.js src/routes/tag-hubs.test.js src/routes/site-search-ui.test.js`

Expected: new assertions FAIL.

- [ ] **Step 3: Implement `ArticleSearch.svelte`**

Use one labelled input with `maxlength="160"`. Do not fetch on mount or empty focus. On the first non-empty input, call `loadSearchIndex()`, filter with `searchSiteIndex(index, query, { types: ['article'], tag: topic, limit: 24 })`, and render through `SearchResults`. Clear resets local state and notifies the parent without touching the archive loader.

- [ ] **Step 4: Integrate blog behavior**

Add `let searchActive = $state(false);` and place `<ArticleSearch totalCount={totalCount} onActiveChange={(active) => searchActive = active} />` between topic navigation and posts. Wrap posts, feed status, and numbered fallback in `{#if !searchActive}`. Do not change existing infinite-scroll state or structured data.

- [ ] **Step 5: Integrate topic behavior**

Place `<ArticleSearch topic={data.tag} totalCount={data.posts.length} onActiveChange={(active) => searchActive = active} />` after the topic header. Wrap starter/remaining or thin-tag grids in `{#if !searchActive}` while leaving related topics and FAQ available below.

- [ ] **Step 6: Run focused tests and confirm GREEN**

Run: `node --test src/routes/blog/blog-archive.test.js src/routes/tag-hubs.test.js src/routes/site-search-ui.test.js src/lib/utils/site-search.test.js src/lib/utils/search-index-client.test.js src/routes/site-search-index.test.js`

Expected: all focused tests PASS.

- [ ] **Step 7: Commit**

```powershell
git add src/lib/components/search/ArticleSearch.svelte src/lib/components/blog/BlogArchive.svelte src/routes/tags/[tag]/+page.svelte src/routes/blog/blog-archive.test.js src/routes/tag-hubs.test.js
git commit -m "feat: search blog and topic pages"
```

---

### Task 6: Round the editorial bridge and complete local verification

**Files:**
- Modify: `src/routes/+page.svelte`
- Modify: `src/routes/site-search-ui.test.js`

**Interfaces:**
- No new interface; visual geometry change only.

- [ ] **Step 1: Add a failing radius assertion**

Assert `.homepage-context` includes both `overflow: hidden` and `border-radius: var(--radius-xl)`.

- [ ] **Step 2: Run and confirm RED**

Run: `node --test src/routes/site-search-ui.test.js`

Expected: FAIL on the missing radius.

- [ ] **Step 3: Add the radius**

Add `border-radius: var(--radius-xl);` to the existing `.homepage-context` block without changing gradient, dividers, or spacing.

- [ ] **Step 4: Run all automated verification**

Run:

```powershell
node --test
npm run build
git diff --check
```

Expected: all tests PASS, production build exit 0, and no whitespace errors. Run `npm run check` once and compare any diagnostics to the established baseline; no new diagnostic may involve a changed file.

- [ ] **Step 5: Verify real local browser flows**

Start the dev or production preview on a free localhost port. Check desktop and 360-pixel mobile in dark and light themes:

1. rounded homepage bridge,
2. header dialog open/close/Escape/focus return,
3. zero `/search-index.json` requests before interaction,
4. article, podcast, and tool results after a global query,
5. all-blog result beyond the first twelve posts,
6. topic result never escaping the active topic,
7. empty/no-match states,
8. simulated failed index request and successful retry,
9. no global horizontal overflow or console errors.

- [ ] **Step 6: Commit**

```powershell
git add src/routes/+page.svelte src/routes/site-search-ui.test.js
git commit -m "fix: round homepage editorial bridge"
```

---

### Task 7: Release, production verification, and durable handoff

**Files:**
- Modify after successful live verification: `D:\UserData\ObsidianVault\LifeOS-Pollo\01-projects\trmt\TRMT.md`

**Interfaces:**
- Production target: `https://therandommakertheory.com/`.

- [ ] **Step 1: Recheck remote drift and branch state**

Fetch `origin/main`, verify the branch remains clean, and inspect merge-base. If main advanced, rebase or merge only after reviewing the exact incoming diff and rerunning affected tests.

- [ ] **Step 2: Push and open a normal pull request**

Push `codex/trmt-site-search-20260907`, create a PR summarizing scope and fresh evidence, and wait for every required preview check.

- [ ] **Step 3: Verify preview and merge**

Run the same search flows against the Vercel preview. Merge only when checks pass and GitHub reports a clean merge state.

- [ ] **Step 4: Verify production deployment**

Wait for the production deployment to reach `Ready`, then test the canonical domain with a merge-commit cache buster. Confirm the live index contains only public records, lazy loading still holds, header/blog/topic searches work, and the bridge is rounded on desktop/mobile and dark/light.

- [ ] **Step 5: Record the verified release**

Append a concise Obsidian section with PR, merge commit, production deployment, index counts/sizes, automated results, live browser results, remaining `UNKNOWN`s, risks, and the preserved dirty-checkout boundary.

- [ ] **Step 6: Final report contract**

Report in German with the required fields: `Status`, `Fehlerfälle`, `Beleg`, `UNKNOWN`, `Risiken`, `Warum`, and `Schwachstelle/Nächster Schritt`. Do not claim completion if any relevant acceptance criterion is not PASS.
