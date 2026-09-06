# TRMT Homepage, Media and Continuous Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved A3 homepage, click-to-load YouTube and Spotify media, a chronological infinite blog archive, five native 16:9 topic artworks, and a new Fable cache hero, then publish the verified branch.

**Architecture:** Keep all content selection server-only and derive homepage posts/media from local metadata. Progressive-enhance the crawlable 12-post archive with an IntersectionObserver feed while retaining paginated routes. Put each third-party player behind a local facade so no YouTube or Spotify request exists before an intentional click.

**Tech Stack:** SvelteKit 2, Svelte 5 runes, Node test runner, mdsvex metadata, WebP assets, YouTube privacy-enhanced iframe, Spotify Embed iframe API, Vite/Vercel.

## Global Constraints

- Work only in `D:\AI_Workspaces\Claude_Code\.release-worktrees\trmt-homepage-blog-final-20260906` until the verified release commit is ready.
- Preserve `D:\AI_Workspaces\Claude_Code\the-random-maker-theory` and all of its dirty files unchanged.
- The homepage sends only four posts, one real video record, and one record with a non-empty audio URL to the browser.
- No YouTube or Spotify network request may occur before the corresponding user click.
- The first blog response contains at most 12 posts; following pages load sequentially and automatically.
- Existing paginated blog routes remain crawlable and usable without JavaScript.
- Topic artwork and article cards use native 16:9 files; do not crop the old square topics.
- Add no npm runtime dependency and do not run `npm audit fix`.
- Keep Dark/Light themes, local fonts, Honey/Teal brand tokens, one homepage H1, visible focus, and reduced-motion behavior.
- Publication is authorized only for the reviewed files from this branch; exclude unrelated drafts and artifacts.

---

### Task 1: Make homepage selection strictly chronological and media-aware

**Files:**
- Modify: `src/lib/utils/homepage-posts.js`
- Modify: `src/lib/utils/homepage-posts.test.js`
- Create: `src/lib/utils/homepage-media.js`
- Create: `src/lib/utils/homepage-media.test.js`
- Modify: `src/routes/+page.server.ts`
- Modify: `src/routes/homepage-performance.test.js`

**Interfaces:**
- Produces: `selectLatestHomepagePosts(posts, limit = 4): T[]`
- Produces: `selectLatestEpisodeWithUrl(episodes, field): Episode | null`
- Loader output: `{ posts, latestVideo, latestAudio, totalCount }`

- [ ] **Step 1: Write failing selection tests**

```js
test('returns only the newest posts in stable chronological order', () => {
  const posts = [
    { slug: 'z', date: '2026-09-01' },
    { slug: 'b', date: '2026-09-03' },
    { slug: 'a', date: '2026-09-03' },
    { slug: 'c', date: '2026-09-02' },
    { slug: 'old', date: '2026-08-01' }
  ];
  assert.deepEqual(selectLatestHomepagePosts(posts, 4).map((post) => post.slug), ['a', 'b', 'c', 'z']);
});

test('selects the newest episode that has the requested URL', () => {
  const episodes = [
    { slug: 'new-empty', date: '2026-09-03', audioUrl: '' },
    { slug: 'playable', date: '2026-09-02', audioUrl: 'https://open.spotify.com/episode/id' }
  ];
  assert.equal(selectLatestEpisodeWithUrl(episodes, 'audioUrl')?.slug, 'playable');
});
```

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `node --test src/lib/utils/homepage-posts.test.js src/lib/utils/homepage-media.test.js src/routes/homepage-performance.test.js`

Expected: FAIL because the new exports and loader contract do not exist.

- [ ] **Step 3: Implement the pure selectors and server loader**

```js
export function selectLatestHomepagePosts(posts, limit = 4) {
  if (!Array.isArray(posts) || limit <= 0) return [];
  return sortArchivePosts(posts).slice(0, limit);
}

export function selectLatestEpisodeWithUrl(episodes, field) {
  return [...episodes]
    .filter((episode) => typeof episode?.[field] === 'string' && episode[field].trim())
    .sort((left, right) => {
      const delta = new Date(right.date).getTime() - new Date(left.date).getTime();
      return delta || String(left.slug).localeCompare(String(right.slug));
    })[0] ?? null;
}
```

Update `+page.server.ts` to call `getPosts()` and `getEpisodes()` once, return `selectLatestHomepagePosts(posts, 4)`, and derive `latestVideo`/`latestAudio` with fields `videoUrl`/`audioUrl`.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run: `node --test src/lib/utils/homepage-posts.test.js src/lib/utils/homepage-media.test.js src/routes/homepage-performance.test.js`

Expected: all focused tests PASS.

- [ ] **Step 5: Commit task 1**

```powershell
git add src/lib/utils/homepage-posts.js src/lib/utils/homepage-posts.test.js src/lib/utils/homepage-media.js src/lib/utils/homepage-media.test.js src/routes/+page.server.ts src/routes/homepage-performance.test.js
git commit -m "feat: choose current homepage posts and media"
```

---

### Task 2: Add the automatic progressive blog feed

**Files:**
- Create: `src/lib/utils/blog-feed.js`
- Create: `src/lib/utils/blog-feed.test.js`
- Create: `src/routes/api/blog/seite/[page]/+server.ts`
- Modify: `src/lib/components/blog/BlogArchive.svelte`
- Modify: `src/routes/blog/blog-archive.test.js`

**Interfaces:**
- Produces: `appendUniquePosts(current, incoming): Post[]`
- Produces: `createBlogFeedLoader(state, fetchPage): () => Promise<void>`
- API response: `{ posts, currentPage, totalPages, totalCount }`

- [ ] **Step 1: Write failing utility and archive-contract tests**

```js
test('appends unseen slugs once and preserves order', () => {
  assert.deepEqual(
    appendUniquePosts([{ slug: 'a' }], [{ slug: 'a' }, { slug: 'b' }]).map((post) => post.slug),
    ['a', 'b']
  );
});

test('loads one page at a time and stops at the end', async () => {
  const state = { visiblePosts: [{ slug: 'a' }], nextPage: 2, isLoading: false, loadFailed: false, liveMessage: '' };
  const loadNext = createBlogFeedLoader(state, async () => ({ ok: true, json: async () => ({ posts: [{ slug: 'b' }], currentPage: 2, totalPages: 2, totalCount: 2 }) }));
  await loadNext();
  assert.deepEqual(state.visiblePosts.map((post) => post.slug), ['a', 'b']);
  assert.equal(state.nextPage, null);
});
```

Add archive source assertions for `IntersectionObserver`, a 600-900px `rootMargin`, `aria-live`, `Alle Artikel geladen`, retry UI, a no-script continuation, and no visible numbered pagination on page one.

- [ ] **Step 2: Run focused tests and verify RED**

Run: `node --test src/lib/utils/blog-feed.test.js src/routes/blog/blog-archive.test.js`

Expected: FAIL because the feed utility, API route, and automatic observer are absent.

- [ ] **Step 3: Implement the loader and bounded JSON route**

```js
export function appendUniquePosts(current, incoming) {
  const slugs = new Set(current.map((post) => post.slug));
  return [...current, ...incoming.filter((post) => !slugs.has(post.slug) && slugs.add(post.slug))];
}

export function createBlogFeedLoader(state, fetchPage) {
  return async function loadNext() {
    if (state.isLoading || state.nextPage === null) return;
    const requestedPage = state.nextPage;
    state.isLoading = true;
    state.loadFailed = false;
    try {
      const response = await fetchPage(requestedPage);
      if (!response.ok) throw new Error(`Blog page request failed: ${response.status}`);
      const payload = await response.json();
      state.visiblePosts = appendUniquePosts(state.visiblePosts, payload.posts);
      state.nextPage = requestedPage < payload.totalPages ? requestedPage + 1 : null;
      state.liveMessage = state.nextPage === null ? 'Alle Artikel geladen.' : `${state.visiblePosts.length} von ${payload.totalCount} Artikeln geladen.`;
    } catch {
      state.loadFailed = true;
      state.liveMessage = 'Weitere Artikel konnten nicht geladen werden.';
    } finally {
      state.isLoading = false;
    }
  };
}
```

The API validates canonical positive page integers, calls `createArchivePageData(await getPosts(), page)`, and returns JSON. `BlogArchive.svelte` observes a bound sentinel only on page one, uses `rootMargin: '800px 0px'`, disconnects at the end, exposes a retry button on failure, and leaves normal pagination on direct paginated routes.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run: `node --test src/lib/utils/blog-feed.test.js src/routes/blog/blog-archive.test.js`

Expected: feed and real-loader tests PASS.

- [ ] **Step 5: Commit task 2**

```powershell
git add src/lib/utils/blog-feed.js src/lib/utils/blog-feed.test.js src/routes/api/blog/seite src/lib/components/blog/BlogArchive.svelte src/routes/blog/blog-archive.test.js
git commit -m "feat: load blog archive continuously"
```

---

### Task 3: Build reusable click-to-load media components

**Files:**
- Create: `src/lib/components/media/LiteYouTubePlayer.svelte`
- Create: `src/lib/components/media/SpotifyEpisodePlayer.svelte`
- Create: `src/lib/utils/spotify-embed.js`
- Create: `src/routes/homepage-media.test.js`

**Interfaces:**
- `LiteYouTubePlayer`: props `{ videoId, title, poster, youtubeUrl }`
- `SpotifyEpisodePlayer`: props `{ title, description, duration, audioUrl, spotifyUrl }`
- `loadSpotifyIframeApi(): Promise<SpotifyIFrameAPI>` loads the official script once after activation.

- [ ] **Step 1: Write failing component-contract tests**

```js
test('YouTube remains local until the play button is activated', async () => {
  const source = await read('src', 'lib', 'components', 'media', 'LiteYouTubePlayer.svelte');
  assert.match(source, /let activated = \$state\(false\)/);
  assert.match(source, /youtube-nocookie\.com\/embed\/\$\{videoId\}/);
  assert.match(source, /video-frame--youtube/);
  assert.match(source, /Auf YouTube öffnen/);
});

test('Spotify loads its API only after activation and retains native fallback controls', async () => {
  const source = await read('src', 'lib', 'components', 'media', 'SpotifyEpisodePlayer.svelte');
  assert.match(source, /loadSpotifyIframeApi/);
  assert.match(source, /onclick=\{activate\}/);
  assert.match(source, /controller\.play\(\)/);
  assert.match(source, /Auf Spotify öffnen/);
});
```

- [ ] **Step 2: Run the contract test and verify RED**

Run: `node --test src/routes/homepage-media.test.js`

Expected: FAIL because both components are absent.

- [ ] **Step 3: Implement local facades and deferred embeds**

The YouTube component renders a local poster and red `2px` frame. `activated` switches to:

```svelte
<iframe
  src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`}
  title={title}
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
```

`loadSpotifyIframeApi()` injects `https://open.spotify.com/embed/iframe-api/v1` once, resolves from `window.onSpotifyIframeApiReady`, and rejects on script error. The podcast component calls it only from an activated effect, creates an episode controller, and calls `controller.play()` after `ready`; the official Embed remains visible when autoplay is blocked.

- [ ] **Step 4: Run the contract test and verify GREEN**

Run: `node --test src/routes/homepage-media.test.js`

Expected: all media contract tests PASS.

- [ ] **Step 5: Commit task 3**

```powershell
git add src/lib/components/media src/lib/utils/spotify-embed.js src/routes/homepage-media.test.js
git commit -m "feat: add deferred video and podcast players"
```

---

### Task 4: Implement the approved A3 homepage composition

**Files:**
- Modify: `src/routes/+page.svelte`
- Modify: `src/lib/components/blog/HomepagePostCard.svelte`
- Modify: `src/lib/components/NewsletterSignup.svelte`
- Modify: `src/routes/homepage-hybrid.test.js`
- Modify: `src/routes/homepage-ia.test.js`
- Modify: `src/routes/homepage-performance.test.js`
- Modify: `src/routes/homepage-a11y.test.js`

**Interfaces:**
- Consumes loader data `{ posts, latestVideo, latestAudio, totalCount }`.
- Consumes the two media components from task 3.
- `HomepagePostCard` keeps `featured` and renders 16:9 image over copy for non-featured cards.

- [ ] **Step 1: Rewrite homepage tests for the approved copy and layout**

Assert exactly one `/blog` hero CTA labelled `Zum Blog`, no `href="#topics"`, no visible `Womit willst du anfangen?`, section title `Das Neueste aus der Werkstatt`, one featured plus `posts.slice(1)`, full-width 16:9 compact images, and direct newsletter email/button UI.

```js
assert.match(page, /<span>Zum Blog<\/span>/);
assert.doesNotMatch(page, /Themen wählen|Womit willst du anfangen\?/);
assert.match(page, /Das Neueste aus der Werkstatt/);
assert.match(page, /<LiteYouTubePlayer/);
assert.match(page, /<SpotifyEpisodePlayer/);
```

- [ ] **Step 2: Run homepage tests and verify RED**

Run: `node --test src/routes/homepage-hybrid.test.js src/routes/homepage-ia.test.js src/routes/homepage-performance.test.js src/routes/homepage-a11y.test.js src/routes/homepage-media.test.js`

Expected: FAIL on old CTA, old heading, curated selection, compact side thumbnails, and old media cards.

- [ ] **Step 3: Implement the accepted section order and responsive CSS**

Use the approved visible copy only. Structure:

```svelte
<section class="hero">...</section>
<section class="topics-section" aria-labelledby="topics-label">
  <h2 id="topics-label" class="sr-only">Themen</h2>
  <div class="topics-grid">...</div>
</section>
<section id="latest-posts" class="posts-section">
  <header><h2>Das Neueste aus der Werkstatt</h2><a href="/blog">Alle Beiträge →</a></header>
  <HomepagePostCard post={posts[0]} featured />
  <div class="secondary-posts">{#each posts.slice(1) as post}<HomepagePostCard {post} />{/each}</div>
</section>
<div class="homepage-context">...</div>
<section class="media-section">...</section>
<section class="faq-card">...</section>
```

Desktop gives the lead card a wide image/copy split and the three following cards a three-column row. Mobile stacks them. Preserve the existing design tokens and remove obsolete CSS rather than layering overrides.

- [ ] **Step 4: Run homepage tests and verify GREEN**

Run the same five homepage test files. Expected: PASS.

- [ ] **Step 5: Commit task 4**

```powershell
git add src/routes/+page.svelte src/lib/components/blog/HomepagePostCard.svelte src/lib/components/NewsletterSignup.svelte src/routes/homepage-*.test.js
git commit -m "feat: implement approved TRMT homepage"
```

---

### Task 5: Produce and integrate the six approved TRMT artworks

**Files:**
- Modify: `src/lib/data/core-topics.js`
- Modify: `src/content/blog/claude-fable-5-1-preis-benchmarks.md`
- Create: `static/images/homepage/topics/*-landscape.webp`
- Create: `static/images/homepage/topics/*-landscape-thumb.webp`
- Create: `static/images/blog/claude-fable-5-1-preis-benchmarks-cache-v2.webp`
- Create: `static/images/blog/claude-fable-5-1-preis-benchmarks-cache-v2-thumb.webp`
- Create: `static/images/video/ki-bildbearbeitung-trmt-003.webp`
- Modify generated metadata files via `npm run images:metadata`
- Modify: `src/routes/homepage-performance.test.js`
- Modify: `src/content/blog/claude-fable-5-1-preis-benchmarks.test.js`

**Interfaces:**
- `CORE_TOPICS[*].image` points to the new landscape masters.
- Fable frontmatter points to the new cache-v2 master and thumbnail.
- Video media data maps ID `l-PP-PrOdAs` to the local poster path.

- [ ] **Step 1: Add failing image contract assertions**

Assert all five topic master/thumb pairs are 16:9, thumbnails are exactly 400 x 225, combined topic thumbnails are at most 160 KiB, the new Fable pair exists at 1200 x 675 and 400 x 225, and frontmatter references the new pair.

- [ ] **Step 2: Run image contract tests and verify RED**

Run: `node --test src/routes/homepage-performance.test.js src/content/blog/claude-fable-5-1-preis-benchmarks.test.js`

Expected: FAIL because the new files and references do not exist.

- [ ] **Step 3: Generate native 16:9 masters with the approved TRMT visual profile**

Use the imagegen skill with the canonical material, character, and comedy references. Generate one coherent master for each topic and the cache-return Fable scene. Reject text errors, cropped head/hands/shoes, passive Mini-Pollo, weak one-second topic readability, or reused old compositions.

- [ ] **Step 4: Create deterministic WebP derivatives and local video poster**

Convert accepted masters to 1200 x 675 and 400 x 225 WebP with no automatic semantic crop. Acquire the current own-channel YouTube thumbnail for `l-PP-PrOdAs` once, convert it to a local 1280 x 720 WebP, and ensure runtime never references `ytimg`.

- [ ] **Step 5: Update references and regenerate metadata**

Run: `npm run images:metadata`

Expected: generated metadata contains every new master and thumbnail with exact dimensions.

- [ ] **Step 6: Run image tests and verify GREEN**

Run: `node --test src/routes/homepage-performance.test.js src/content/blog/claude-fable-5-1-preis-benchmarks.test.js`

Expected: all image contracts PASS.

- [ ] **Step 7: Commit task 5**

```powershell
git add src/lib/data/core-topics.js src/content/blog/claude-fable-5-1-preis-benchmarks.md src/content/blog/claude-fable-5-1-preis-benchmarks.test.js src/routes/homepage-performance.test.js static/images/homepage/topics static/images/blog/claude-fable-5-1-preis-benchmarks-cache-v2* static/images/video/ki-bildbearbeitung-trmt-003.webp src/lib/data/image-metadata.generated.js static/images/image-rights.json
git commit -m "feat: refresh TRMT homepage and Fable artwork"
```

---

### Task 6: Verify functionality, visual fidelity, and performance locally

**Files:**
- Create temporarily outside Git: screenshots and Lighthouse reports under `C:\Users\Pollo\Documents\ChatGPT\TRMT\artifacts\homepage-blog-final-2026-09-06\`
- Create: `docs/superpowers/verification/2026-09-06-trmt-homepage-blog-continuous-media.md`

**Interfaces:**
- Produces a release evidence ledger with test, build, network, responsive, media, image, and concept-fidelity results.

- [ ] **Step 1: Run complete automated verification**

Run:

```powershell
node --test
npm run check
npm run build
git diff --check origin/main...HEAD
```

Expected: 133 baseline tests plus new tests PASS; changed files have no new Svelte diagnostics; Vite/SvelteKit compilation succeeds; any Windows Vercel symlink `EPERM` is recorded separately.

- [ ] **Step 2: Start the local production preview**

Run: `npm run build` followed by `npm run preview -- --host 127.0.0.1 --port 4173` when the adapter output supports local preview; otherwise use `npm run dev -- --host 127.0.0.1 --port 5173` and record the fallback.

- [ ] **Step 3: Verify desktop and mobile in Browser/IAB**

Check 1440 x 1000, 390 x 844, 320 px width, Dark and Light themes, keyboard focus, reduced motion, horizontal overflow, the full blog feed, retry state, newsletter UI, YouTube click, Spotify click, and console errors.

- [ ] **Step 4: Verify network gates and performance**

Before clicks, assert zero requests to YouTube, `ytimg`, Google Ads, and Spotify. After each click, assert only the chosen platform loads. Compare controlled Lighthouse medians with the unchanged `origin/main` baseline using identical version and viewports; fix any LCP, CLS, TBT, script, or transfer regression.

- [ ] **Step 5: Perform the required visual fidelity comparison**

Use `view_image` on the accepted A3 concept screenshot and the newest desktop/mobile implementation screenshots. Record at least copy, first-viewport rhythm, topic strip, article image geometry, media framing, typography, and spacing in the fidelity ledger. Repair every fixable mismatch before proceeding.

- [ ] **Step 6: Commit verification evidence**

```powershell
git add docs/superpowers/verification/2026-09-06-trmt-homepage-blog-continuous-media.md
git commit -m "docs: verify TRMT homepage and blog release"
```

---

### Task 7: Review and publish the exact verified scope

**Files:**
- Review all branch changes against `origin/main`.
- Do not add local reports, generated source PNGs, credentials, unrelated drafts, or main-checkout changes.

- [ ] **Step 1: Audit the release diff**

Run:

```powershell
git status --short
git diff --stat origin/main...HEAD
git diff --check origin/main...HEAD
git log --oneline origin/main..HEAD
```

Expected: only the approved homepage, blog feed, media, image, test, spec, plan, and verification files appear.

- [ ] **Step 2: Push the feature branch and open a pull request**

```powershell
git push -u origin codex/trmt-homepage-blog-final-20260906
gh pr create --base main --head codex/trmt-homepage-blog-final-20260906 --title "TRMT Homepage und fortlaufendes Blogarchiv" --body "Setzt die freigegebene A3-Homepage um: strikt chronologische Artikel, native 16:9-Themenbilder, Klick-zu-Laden-Player fuer YouTube und Spotify sowie ein automatisch fortlaufendes, crawlbares Blogarchiv. Enthaelt das neue Fable-Cache-Hero und die zugehoerigen Regressionstests. Kein fremder Draft- oder Pipeline-Inhalt."
```

- [ ] **Step 3: Wait for CI and merge only on green**

Use `gh pr checks --watch`. If all required checks pass, merge the exact head commit with the repository's normal squash/merge policy. Do not force or bypass protection.

- [ ] **Step 4: Verify production deployment and live behavior**

Wait for the production GitHub/Vercel run. Verify `/`, `/blog`, enough scrolling to reach the final article batch, the Fable article, image URLs, video facade before/after click, podcast facade before/after click, newsletter form presence, sitemap, console, network gates, mobile overflow, and HTTP status.

- [ ] **Step 5: Record the durable TRMT handoff**

Add the verified release commit, deployment run, live URLs, PASS/PARTIAL/UNKNOWN boundaries, and rollback reference to the canonical TRMT Obsidian project note without copying credentials or temporary artifacts.
