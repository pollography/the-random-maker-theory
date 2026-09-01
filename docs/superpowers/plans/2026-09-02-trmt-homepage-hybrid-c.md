# TRMT Homepage Hybrid C Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Verdichte die TRMT-Homepage zum bestaetigten Hybrid-C-Lesepfad und ersetze die Emoji-Themenkarten durch fuenf hochwertige, leichte Editorial-Motive, ohne SEO oder Performance gegen die frische Baseline zu verschlechtern.

**Architecture:** Der bestehende serverseitige Homepage-Loader bekommt eine kleine pure Auswahlfunktion fuer einen gepinnten Leitartikel und drei kategoriediverse Folgebeitraege. `+page.svelte` behaelt die vorhandenen Design-Tokens und unteren Inhaltssektionen, ersetzt aber Hero, Entdecken-/Pillar-Bloecke und Posts-Grid. Eine fokussierte `HomepagePostCard` kapselt nur die zwei Homepage-Dichten. Die fuenf statischen WebP-Motive werden ausserhalb des kritischen Hero-Pfads lazy geladen.

**Tech Stack:** SvelteKit 2, Svelte 5, JavaScript/JSDoc, Node Test Runner, bestehende HSL-Tokens, ImageGen, ImageMagick WebP, Lighthouse 12.8.2.

## Global Constraints

- Branch und Worktree bleiben `codex/trmt-homepage-hybrid-c` unter `D:\AI_Workspaces\Claude_Code\.release-worktrees\trmt-homepage-hybrid-c`.
- Keine Aenderung, Bereinigung oder Uebernahme aus anderen Worktrees.
- Kein Push, Merge, Deployment oder Produktionsschreiben.
- Die bestehende globale Baseline von 78 `svelte-check`-Fehlern und 9 Warnungen darf nicht schlechter werden; geaenderte Dateien duerfen keine neue Meldung erzeugen.
- Die 12 vorhandenen Homepage-A11y- und Performance-Tests muessen gruen bleiben.
- Die kontrollierte Lighthouse-Performance und der SEO-Score duerfen gegen den unveraenderten Basisstand nicht sinken.
- Die fuenf Themenmotive sind gemeinsam hoechstens 175 KiB, jeweils quadratisch und explizit dimensioniert.
- Keine neuen Laufzeit-Abhaengigkeiten, kein Slider, kein Client-Fetch und kein JavaScript fuer die Themenreihe.
- Genau eine H1; alle Themen und Artikel bleiben normale crawlbare Links.
- Bestehende Podcast-, Video-, Newsletter- und FAQ-Funktion bleibt unveraendert.

---

### Task 1: Frische Performance- und SEO-Baseline sichern

**Files:**
- Create locally, do not commit: `artifacts/homepage-hybrid-c/baseline-live-mobile-{1,2,3}.json`
- Create locally, do not commit: `artifacts/homepage-hybrid-c/baseline-live-desktop.json`
- Create locally, do not commit: `artifacts/homepage-hybrid-c/baseline-summary.json`

**Interfaces:**
- Consumes: unveraenderte Live-Homepage `https://therandommakertheory.com/` auf `origin/main` `9e5e36b`.
- Produces: feste Baseline fuer Performance Score, SEO Score, FCP, LCP, TBT, CLS, Transfer und Script-Bytes.

- [ ] **Step 1: Arbeitsbaum und Live-Revision pruefen**

Run:

```powershell
git status --short --branch
git ls-remote origin refs/heads/main
```

Expected: Branch ist nur wegen Spec/Plan ahead; Remote-Hash bleibt `9e5e36b55dd40556b30c63e40ca1914c4c65cce7`, sofern kein neuer autorisierter Release erfolgt ist. Bei Drift erst den neuen Basisstand read-only analysieren.

- [ ] **Step 2: Drei mobile und einen Desktop-Lauf mit identischer Lighthouse-Version speichern**

Run:

```powershell
New-Item -ItemType Directory -Force -Path artifacts\homepage-hybrid-c | Out-Null
npx --yes lighthouse@12.8.2 https://therandommakertheory.com/ --quiet --chrome-flags="--headless --disable-gpu" --only-categories=performance,seo,accessibility,best-practices --form-factor=mobile --output=json --output-path=artifacts/homepage-hybrid-c/baseline-live-mobile-1.json
npx --yes lighthouse@12.8.2 https://therandommakertheory.com/ --quiet --chrome-flags="--headless --disable-gpu" --only-categories=performance,seo,accessibility,best-practices --form-factor=mobile --output=json --output-path=artifacts/homepage-hybrid-c/baseline-live-mobile-2.json
npx --yes lighthouse@12.8.2 https://therandommakertheory.com/ --quiet --chrome-flags="--headless --disable-gpu" --only-categories=performance,seo,accessibility,best-practices --form-factor=mobile --output=json --output-path=artifacts/homepage-hybrid-c/baseline-live-mobile-3.json
npx --yes lighthouse@12.8.2 https://therandommakertheory.com/ --quiet --chrome-flags="--headless --disable-gpu" --only-categories=performance,seo,accessibility,best-practices --preset=desktop --output=json --output-path=artifacts/homepage-hybrid-c/baseline-live-desktop.json
```

Expected: vier JSON-Dateien mit `lighthouseVersion` `12.8.2`; kein Lauf endet ohne Performance- und SEO-Kategorie.

- [ ] **Step 3: Baseline kompakt auslesen**

Run this exact command. It reads all four reports, takes the median of every mobile metric and writes the shared comparison format:

```powershell
node -e "const fs=require('fs');const dir='artifacts/homepage-hybrid-c';const read=n=>JSON.parse(fs.readFileSync(dir+'/'+n,'utf8'));const pick=r=>({performance:r.categories.performance.score*100,seo:r.categories.seo.score*100,accessibility:r.categories.accessibility.score*100,bestPractices:r.categories['best-practices'].score*100,fcp:r.audits['first-contentful-paint'].numericValue,lcp:r.audits['largest-contentful-paint'].numericValue,tbt:r.audits['total-blocking-time'].numericValue,cls:r.audits['cumulative-layout-shift'].numericValue,transfer:r.audits['total-byte-weight'].numericValue});const mobile=[1,2,3].map(i=>pick(read('baseline-live-mobile-'+i+'.json')));const keys=Object.keys(mobile[0]);const median=Object.fromEntries(keys.map(k=>[k,mobile.map(x=>x[k]).sort((a,b)=>a-b)[1]]));const out={mobileMedian:median,desktop:pick(read('baseline-live-desktop.json'))};fs.writeFileSync(dir+'/baseline-summary.json',JSON.stringify(out,null,2));console.log(JSON.stringify(out,null,2));"
```

Expected: `baseline-summary.json` exists and the values are reported before implementation. The user-recalled score near 100 is replaced by measured evidence.

### Task 2: Post-Auswahl testgetrieben kapseln

**Files:**
- Create: `src/lib/utils/homepage-posts.js`
- Create: `src/lib/utils/homepage-posts.test.js`
- Modify: `src/routes/+page.server.ts`
- Modify: `src/routes/homepage-performance.test.js`

**Interfaces:**
- Consumes: chronologisch absteigende `Post[]` aus `getPosts()`.
- Produces: `selectHomepagePosts(posts, featuredSlug, limit = 4): Post[]` mit Leitartikel, Kategorien-Diversitaet und chronologischem Fallback.

- [ ] **Step 1: Failing Unit Tests fuer Auswahl schreiben**

Create fixtures with slugs `latest-ai`, `pinned-ai`, `maker`, `photo`, `automation`, categories `ki-tools`, `maker`, `fotografie`, `automatisierung`. Assert:

```js
assert.deepEqual(
  selectHomepagePosts(posts, 'pinned-ai').map((post) => post.slug),
  ['pinned-ai', 'maker', 'photo', 'automation']
);
assert.deepEqual(
  selectHomepagePosts(posts, 'missing', 4).map((post) => post.slug),
  ['latest-ai', 'maker', 'photo', 'automation']
);
assert.deepEqual(selectHomepagePosts([], 'missing'), []);
assert.deepEqual(selectHomepagePosts(posts, 'pinned-ai', 0), []);
```

- [ ] **Step 2: RED bestaetigen**

Run:

```powershell
node --test src/lib/utils/homepage-posts.test.js
```

Expected: FAIL because `homepage-posts.js` or its export does not exist.

- [ ] **Step 3: Pure Auswahlfunktion implementieren**

Implement exactly this algorithm:

```js
/**
 * @template {{ slug: string, category?: string }} T
 * @param {T[]} posts
 * @param {string} featuredSlug
 * @param {number} [limit]
 * @returns {T[]}
 */
export function selectHomepagePosts(posts, featuredSlug, limit = 4) {
  if (!Array.isArray(posts) || posts.length === 0 || limit <= 0) return [];

  const featured = posts.find((post) => post.slug === featuredSlug) ?? posts[0];
  const selected = [featured];
  const usedSlugs = new Set([featured.slug]);
  const usedCategories = new Set(featured.category ? [featured.category] : []);

  for (const post of posts) {
    if (selected.length >= limit) break;
    if (usedSlugs.has(post.slug) || !post.category || usedCategories.has(post.category)) continue;
    selected.push(post);
    usedSlugs.add(post.slug);
    usedCategories.add(post.category);
  }

  for (const post of posts) {
    if (selected.length >= limit) break;
    if (usedSlugs.has(post.slug)) continue;
    selected.push(post);
    usedSlugs.add(post.slug);
  }

  return selected;
}
```

- [ ] **Step 4: Loader auf vier Datensaetze umstellen**

In `+page.server.ts` importieren und verwenden:

```ts
import { selectHomepagePosts } from '$lib/utils/homepage-posts.js';

const FEATURED_POST_SLUG = 'gemini-notebook-kostenlos-codex-content-workflow';

return {
  posts: selectHomepagePosts(posts, FEATURED_POST_SLUG, 4),
  latestEpisode,
  totalCount: posts.length + (latestEpisode ? 1 : 0)
};
```

Update the performance contract from six sliced records to `selectHomepagePosts(..., 4)` while retaining server-only and `totalCount` assertions.

- [ ] **Step 5: GREEN bestaetigen und committen**

Run:

```powershell
node --test src/lib/utils/homepage-posts.test.js src/routes/homepage-performance.test.js
git diff --check
```

Expected: all selection and homepage-performance tests PASS.

Commit:

```powershell
git add src/lib/utils/homepage-posts.js src/lib/utils/homepage-posts.test.js src/routes/+page.server.ts src/routes/homepage-performance.test.js
git commit -m "feat: curate homepage post selection"
```

### Task 3: Hybrid-C-Struktur testgetrieben umsetzen

**Files:**
- Create: `src/lib/components/blog/HomepagePostCard.svelte`
- Create: `src/routes/homepage-hybrid.test.js`
- Modify: `src/routes/+page.svelte`

**Interfaces:**
- Consumes: vier `Post`-Metadaten in `data.posts`; `HomepagePostCard` Props `{ post, featured?: boolean }`.
- Produces: Hero, Themen-Navigator und Editorial-Postgrid in der Reihenfolge der Spec.

- [ ] **Step 1: Statischen RED-Vertrag schreiben**

`homepage-hybrid.test.js` reads `+page.svelte` and `HomepagePostCard.svelte`. Assert exact copy and structural markers:

```js
assert.doesNotMatch(page, /Content, den ich/);
assert.match(page, /Entdecken\. Verstehen\. Und alles/);
assert.match(page, /Tech, KI-Tools, Maker-Projekte, Automatisierung und Produktivität/);
assert.match(page, /id="topics"/);
assert.match(page, /id="latest-posts"/);
assert.match(page, /Womit willst du anfangen\?/);
assert.match(page, /Neu & handverlesen/);
assert.equal((page.match(/\/images\/homepage\/topics\//g) ?? []).length, 5);
for (const tag of ['ki-tools', 'maker', 'automatisierung', 'fotografie', 'produktivitaet']) {
  assert.match(page, new RegExp(`/tags/\\{?[^}]*${tag}|/tags/${tag}`));
}
assert.doesNotMatch(page, /pillar\.desc|pillar\.highlights|pillar\.icon/);
assert.match(card, /featured = false/);
assert.match(card, /loading="lazy"/);
```

- [ ] **Step 2: RED bestaetigen**

Run:

```powershell
node --test src/routes/homepage-hybrid.test.js
```

Expected: FAIL for old subtitle, missing IDs, missing assets and missing component.

- [ ] **Step 3: Pillar-Daten auf Navigator-Daten reduzieren**

Replace every `icon`, `desc`, and `highlights` entry with this shape:

```js
{
  title: 'KI & Tech',
  short: 'Tools · Tests · Trends',
  tag: 'ki-tools',
  image: '/images/homepage/topics/ki-tech.webp'
}
```

Use this complete array:

```js
const pillars = [
  { title: 'KI & Tech', short: 'Tools · Tests · Trends', tag: 'ki-tools', image: '/images/homepage/topics/ki-tech.webp' },
  { title: 'Maker & DIY', short: 'Bauen · Drucken · Löten', tag: 'maker', image: '/images/homepage/topics/maker-diy.webp' },
  { title: 'Automatisierung', short: 'Workflows · Scripts · APIs', tag: 'automatisierung', image: '/images/homepage/topics/automatisierung.webp' },
  { title: 'Fotografie', short: 'Editing · Gear · Ideen', tag: 'fotografie', image: '/images/homepage/topics/fotografie.webp' },
  { title: 'Produktivität', short: 'Systeme · Fokus · Ordnung', tag: 'produktivitaet', image: '/images/homepage/topics/produktivitaet.webp' }
];
```

- [ ] **Step 4: Hero und Section-Reihenfolge ersetzen**

Keep the existing brand H1 and replace the old subtitle/discover block with:

```svelte
<p class="hero-promise">Entdecken. Verstehen. Und alles <em class="hero-accent">Frei Schnauze.</em></p>
<p class="hero-intro">Tech, KI-Tools, Maker-Projekte, Automatisierung und Produktivität. Aufbereitet und erklärt, so dass es hängen bleibt. Für alle Neugierigen, die mehr wissen wollen!</p>
<div class="hero-actions">
  <a href="#latest-posts" class="btn-metallic btn-honey"><span>Aktuelle Beiträge</span></a>
  <a href="#topics" class="btn-metallic btn-teal"><span>Alle Themen</span></a>
</div>
```

Delete the separate discover section and long pillar list. Insert `#topics` before `#latest-posts`. Each topic is one `<a href="/tags/{pillar.tag}">` containing a 512 x 512 lazy image with `alt=""`, title and short copy. Keep the article section before all bottom sections.

- [ ] **Step 5: HomepagePostCard implementieren**

The component must use one crawlable anchor, `getImageSeo`, explicit image dimensions and these visibility rules:

```svelte
<a class:featured href="/blog/{post.slug}" class="homepage-post-card">
  {#if post.heroImage}
    <img src={thumbnailSrc} srcset={imageSeo.srcset} sizes={featured ? '(max-width: 768px) calc(100vw - 32px), 60vw' : '(max-width: 768px) calc(100vw - 32px), 32vw'} alt="" loading="lazy" decoding="async" width={imageSeo.width ?? 640} height={imageSeo.height ?? 360} />
  {/if}
  <div class="homepage-post-copy">
    <span class="homepage-post-category">{post.category}</span>
    <h3>{post.title}</h3>
    {#if featured}<p>{post.description}</p>{/if}
  </div>
</a>
```

Give the whole card a minimum 44-pixel target, visible `:focus-visible`, no eager image, and no animation under `prefers-reduced-motion`.

- [ ] **Step 6: Editorial Grid und responsive Verhalten implementieren**

Desktop uses two columns: featured card `minmax(0, 1.35fr)` and a right column containing three compact cards. At `max-width: 768px`, use one column. The topic row uses five columns on desktop and horizontal `grid-auto-flow: column`, `grid-auto-columns: minmax(156px, 42vw)`, `overflow-x: auto`, `scroll-snap-type: x mandatory` on mobile. Only the topic row scrolls horizontally; the page does not.

Replace `min-height: 85svh` with a bounded hero using `min-height: clamp(520px, 66svh, 680px)` on desktop and `min-height: auto` plus compact padding on mobile. Preserve the existing counter and scroll hint only if they do not push topics out of the early reading path; the counter stays, the decorative scroll hint is removed.

- [ ] **Step 7: GREEN, focused check and commit**

Run:

```powershell
node --test src/routes/homepage-hybrid.test.js src/routes/homepage-a11y.test.js src/routes/homepage-performance.test.js src/lib/utils/homepage-posts.test.js
npm run check 2>&1 | Tee-Object artifacts/homepage-hybrid-c/svelte-check-after-layout.txt
git diff --check
```

Expected: all focused tests PASS; global check is no worse than 78 errors and 9 warnings and has no new diagnostic in `+page.svelte`, `HomepagePostCard.svelte`, `+page.server.ts`, or `homepage-posts.js`.

Commit:

```powershell
git add src/routes/+page.svelte src/routes/homepage-hybrid.test.js src/lib/components/blog/HomepagePostCard.svelte
git commit -m "feat: surface content earlier on homepage"
```

### Task 4: Fuenf Editorial-Motive erzeugen und optimieren

**Files:**
- Create: `static/images/homepage/topics/ki-tech.webp`
- Create: `static/images/homepage/topics/maker-diy.webp`
- Create: `static/images/homepage/topics/automatisierung.webp`
- Create: `static/images/homepage/topics/fotografie.webp`
- Create: `static/images/homepage/topics/produktivitaet.webp`
- Modify generated: `src/lib/data/image-metadata.generated.js`

**Interfaces:**
- Consumes: die in Task 3 festgelegten Bildpfade.
- Produces: fuenf 512 x 512 WebP-Dateien, zusammen maximal 175 KiB.

- [ ] **Step 1: Gemeinsame Art Direction festsetzen**

Use this prefix for every generation:

```text
Square editorial still life for The Random Maker Theory, one central physical object, dark tactile studio background, deep charcoal and petrol teal shadows, restrained warm honey rim light, premium macro product photography, subtle analog grain, believable materials, strong silhouette at thumbnail size, no text, no letters, no logos, no brand marks, no people, no hands, no faces, no emoji, no robot head, no interface screenshot, no border, consistent 45-degree tabletop camera and lighting across a five-image series.
```

Append one exact subject per file:

```text
KI & Tech: a translucent computational core with fine copper circuit traces and a small refractive glass data crystal.
Maker & DIY: an exploded ESP32-like maker module with tiny screws, one teal wire, a brass spacer and a clearly 3D-printed structural part.
Automatisierung: a physical relay chain with routed cables and four luminous nodes passing one signal through the system.
Fotografie: a camera lens and optical prism producing one precise honey-and-teal caustic across the surface.
Produktivität: a modular index-card system with tabs, slots and thin connecting thread lines, organized but tactile and imperfect.
```

- [ ] **Step 2: Quellenbilder mit ImageGen einzeln erzeugen und visuell pruefen**

Generate one image per subject. Reject outputs containing text, hands, faces, logos, generic robot imagery, broken electronics or a mismatched camera angle. Keep the best source for each subject outside the committed tree until optimization.

- [ ] **Step 3: Mit ImageMagick auf WebP optimieren**

Save the accepted source images as `artifacts/homepage-hybrid-c/topic-sources/ki-tech.png`, `maker-diy.png`, `automatisierung.png`, `fotografie.png`, and `produktivitaet.png`. Run:

```powershell
New-Item -ItemType Directory -Force -Path static\images\homepage\topics | Out-Null
magick artifacts/homepage-hybrid-c/topic-sources/ki-tech.png -auto-orient -resize "512x512^" -gravity center -extent 512x512 -strip -define webp:method=6 -quality 72 static/images/homepage/topics/ki-tech.webp
magick artifacts/homepage-hybrid-c/topic-sources/maker-diy.png -auto-orient -resize "512x512^" -gravity center -extent 512x512 -strip -define webp:method=6 -quality 72 static/images/homepage/topics/maker-diy.webp
magick artifacts/homepage-hybrid-c/topic-sources/automatisierung.png -auto-orient -resize "512x512^" -gravity center -extent 512x512 -strip -define webp:method=6 -quality 72 static/images/homepage/topics/automatisierung.webp
magick artifacts/homepage-hybrid-c/topic-sources/fotografie.png -auto-orient -resize "512x512^" -gravity center -extent 512x512 -strip -define webp:method=6 -quality 72 static/images/homepage/topics/fotografie.webp
magick artifacts/homepage-hybrid-c/topic-sources/produktivitaet.png -auto-orient -resize "512x512^" -gravity center -extent 512x512 -strip -define webp:method=6 -quality 72 static/images/homepage/topics/produktivitaet.webp
```

If a file exceeds 35 KiB, rerun at quality 68, then 64. Do not reduce dimensions below 512 x 512 without a separate visual comparison.

- [ ] **Step 4: Assetvertrag und Metadaten pruefen**

Run:

```powershell
$files = Get-ChildItem static\images\homepage\topics\*.webp
$files | Select-Object Name,Length
if (($files | Measure-Object Length -Sum).Sum -gt 179200) { throw 'Topic image budget exceeded' }
npm run images:metadata
node --test scripts/image-manifest.test.js src/lib/utils/image-seo.test.js
```

Expected: five files, each 512 x 512, total at most 179200 bytes, metadata tests PASS.

- [ ] **Step 5: Assets committen**

```powershell
git add static/images/homepage/topics src/lib/data/image-metadata.generated.js
git commit -m "feat: add homepage topic artwork"
```

### Task 5: Browser-, Build-, SEO- und Performance-Gate

**Files:**
- Create locally, do not commit: `artifacts/homepage-hybrid-c/after-*.json`
- Create locally, do not commit: `artifacts/homepage-hybrid-c/screenshots/*`
- Modify only if a measured defect requires it: files from Tasks 2-4.

**Interfaces:**
- Consumes: completed Hybrid-C implementation and Task-1 baseline.
- Produces: final PASS/PARTIAL/FAIL evidence without deployment.

- [ ] **Step 1: Vollstaendige fokussierte Tests und Build ausfuehren**

Run:

```powershell
node --test src/routes/homepage-hybrid.test.js src/routes/homepage-a11y.test.js src/routes/homepage-performance.test.js src/lib/utils/homepage-posts.test.js scripts/image-manifest.test.js src/lib/utils/image-seo.test.js
npm run check
npm run build
git diff --check
git status --short
```

Expected: focused tests PASS; `svelte-check` no worse than 78/9 with zero new affected-file diagnostics; Vite client/server compilation succeeds. A later adapter-only Windows `EPERM` is reported separately and never converted to PASS.

- [ ] **Step 2: Produktionsnah lokal rendern**

Start exactly one local preview server:

```powershell
npm run preview -- --host 127.0.0.1 --port 4174
```

Open `http://127.0.0.1:4174/`. Inspect at 1440 x 1000 and 390 x 844 in Dark and Light Theme. Capture desktop and mobile screenshots under `artifacts/homepage-hybrid-c/screenshots/`. Verify:

- brand, promise and explanation are readable without scrolling,
- topic row appears immediately after hero,
- article section follows without long explanatory cards,
- featured and compact cards preserve title and link clarity,
- no horizontal page overflow,
- keyboard order equals visual order,
- every link target is at least 44 pixels,
- topic images remain crisp and do not dominate the article section.

- [ ] **Step 3: SEO DOM-Vertrag im gerenderten HTML pruefen**

Assert one H1, five topic links with descriptive text and href, four article links with full titles, unchanged canonical, visible topic copy, no emoji pillar text, and no image-only navigation. Confirm no `noindex` and no missing canonical.

- [ ] **Step 4: Kontrollierten A/B-Performancevergleich laufen lassen**

Create a detached, read-only baseline worktree at the exact approved base commit and install the same dependencies:

```powershell
git -C D:\AI_Workspaces\Claude_Code\the-random-maker-theory worktree add --detach D:\AI_Workspaces\Claude_Code\.release-worktrees\trmt-homepage-hybrid-c-baseline 9e5e36b55dd40556b30c63e40ca1914c4c65cce7
npm ci --prefix D:\AI_Workspaces\Claude_Code\.release-worktrees\trmt-homepage-hybrid-c-baseline
```

Build both worktrees. Run the baseline preview at `127.0.0.1:4173` and the changed preview at `127.0.0.1:4174`. Measure each URL three times with Lighthouse 12.8.2, identical mobile flags and output names `ab-base-mobile-{1,2,3}.json` and `ab-after-mobile-{1,2,3}.json`. Use the Step-3 summarizer with the matching prefixes and compare medians for Performance, SEO, LCP, CLS, TBT and transfer.

PASS requires:

```text
after.performance >= baseline.performance
after.seo >= baseline.seo
after.cls <= baseline.cls + 0.005
after.tbt <= baseline.tbt + 20 ms
after.lcp <= baseline.lcp * 1.05
after.transfer <= baseline.transfer
topic image total <= 175 KiB
```

If score or transfer regresses, first lower topic image bytes and confirm lazy loading; then remove avoidable CSS/markup weight. Keep the confirmed structure and rerun once as one bounded correction pass.

- [ ] **Step 5: Impeccable Layout-Scan und Abschlusscommit**

Run the required manual detector against affected UI files:

```powershell
node C:\Users\Pollo\.agents\skills\impeccable\scripts\detect.mjs --json --scope layout src/routes/+page.svelte src/lib/components/blog/HomepagePostCard.svelte
```

Resolve every finding or record why it is intentionally acceptable. Rerun focused tests and `git diff --check`, then commit only measured corrections:

```powershell
git add src/routes/+page.svelte src/lib/components/blog/HomepagePostCard.svelte src/routes/homepage-hybrid.test.js src/routes/homepage-performance.test.js src/lib/utils/homepage-posts.js src/lib/utils/homepage-posts.test.js src/routes/+page.server.ts static/images/homepage/topics src/lib/data/image-metadata.generated.js
git commit -m "fix: hold homepage quality gates"
```

Skip the commit if there are no correction changes.

- [ ] **Step 6: Ergebnis melden**

Report exact PASS/FAIL/PARTIAL values for tests, build, affected-file check, desktop/mobile visual inspection, image bytes, Lighthouse A/B, SEO structure and git status. State explicitly that production performance remains `UNKNOWN` until an independently authorized deployment and live remeasurement.
