# TRMT Homepage Technical Performance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Repair the approved TRMT homepage accessibility defects and remove its three measured performance bottlenecks without changing the hero, editorial content, section order, or brand identity.

**Architecture:** Keep the current SvelteKit page and components, but move the homepage loader to the server-only boundary, self-host the existing fonts, and replace the eager YouTube iframe with a local click-to-load facade. Add source-contract tests before every production change, then verify the generated client graph and rendered behavior independently.

**Tech Stack:** SvelteKit 2, Svelte 5 runes, Vite 7, CSS custom properties, Node `node:test`, Lighthouse 13.

## Global Constraints

- Base is `origin/main` commit `9f6f19ab72e09dbc17ae7a752cc8fc59d1ca1084` in linked worktree `codex/trmt-homepage-a11y`.
- Do not change hero copy, editorial content, section order, visible card count, visual identity, SEO metadata, Pollography, n8n, NotebookLM, deployment, publishing, or global skills.
- Do not commit, push, deploy, or publish. The user has not authorized those actions.
- Preserve the known baseline of 79 `svelte-check` errors and 9 warnings outside touched files; introduce no new diagnostics in touched files.
- Preserve the known Windows Vercel-adapter `EPERM` symlink boundary after successful Vite client and SSR compilation.
- No new runtime or test dependency.
- Use local, licensed WOFF2 files and a local video poster; no Google Fonts or YouTube-family request before video activation.
- Mobile target: Lighthouse median at least 85, FCP and LCP below 2.5 seconds, CLS at most 0.05, initial transfer below 300 KiB.
- Homepage client target: at most 20 first-party script requests, at most 100 KiB first-party JavaScript, and no blog or podcast Markdown modulepreloads.
- Desktop target: Lighthouse at least 90 and initial transfer below 600 KiB.

---

### Task 1: Server-only data and critical third-party removal

**Files:**
- Create: `src/routes/homepage-performance.test.js`
- Move: `src/routes/+page.ts` to `src/routes/+page.server.ts`
- Modify: `src/routes/+page.server.ts`
- Modify: `src/app.css`
- Modify: `src/app.html`
- Modify: `src/routes/+page.svelte`
- Create: `static/fonts/instrument-serif-regular.woff2`
- Create: `static/fonts/instrument-serif-italic.woff2`
- Create: `static/fonts/inter-latin-variable.woff2`
- Create: `static/fonts/jetbrains-mono-latin-variable.woff2`
- Create: `static/fonts/OFL-Instrument-Serif.txt`
- Create: `static/fonts/OFL-Inter.txt`
- Create: `static/fonts/OFL-JetBrains-Mono.txt`
- Create: `static/images/video/prompt-engineering-trmt-002.webp`

**Interfaces:**
- Consumes: existing `getPosts()` and `getLatestEpisode()` server-compatible utilities.
- Produces: the unchanged page-data shape `{ posts, latestEpisode, totalCount }`, with `posts` already limited to six.

- [ ] **Step 1: Write the failing performance contract**

Create `src/routes/homepage-performance.test.js` with Node source-contract tests that assert:

```js
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const routesRoot = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(routesRoot, '..', '..');

test('homepage data is server-only and returns only six post records', async () => {
  assert.equal(existsSync(join(routesRoot, '+page.ts')), false);
  const loader = await readFile(join(routesRoot, '+page.server.ts'), 'utf8');
  assert.match(loader, /posts:\s*posts\.slice\(0,\s*6\)/);
  assert.match(loader, /totalCount:\s*posts\.length/);
});

test('fonts are local and both LCP display faces are preloaded', async () => {
  const [css, html] = await Promise.all([
    readFile(join(projectRoot, 'src', 'app.css'), 'utf8'),
    readFile(join(projectRoot, 'src', 'app.html'), 'utf8')
  ]);
  assert.doesNotMatch(css, /fonts\.(googleapis|gstatic)\.com/);
  assert.doesNotMatch(html, /fonts\.(googleapis|gstatic)\.com/);
  for (const file of [
    'instrument-serif-regular.woff2',
    'instrument-serif-italic.woff2',
    'inter-latin-variable.woff2',
    'jetbrains-mono-latin-variable.woff2'
  ]) {
    assert.equal(existsSync(join(projectRoot, 'static', 'fonts', file)), true, file);
  }
  assert.match(html, /instrument-serif-regular\.woff2/);
  assert.match(html, /instrument-serif-italic\.woff2/);
});

test('video uses a local keyboard-operable facade before loading privacy-enhanced YouTube', async () => {
  const page = await readFile(join(routesRoot, '+page.svelte'), 'utf8');
  assert.match(page, /let videoLoaded = \$state\(false\)/);
  assert.match(page, /type="button"/);
  assert.match(page, /Video abspielen:/);
  assert.match(page, /youtube-nocookie\.com\/embed\/KWIH_InMQZ8/);
  assert.match(page, /\{#if videoLoaded\}[\s\S]*<iframe/);
  assert.equal(
    existsSync(join(projectRoot, 'static', 'images', 'video', 'prompt-engineering-trmt-002.webp')),
    true
  );
});
```

- [ ] **Step 2: Verify RED**

Run `node --test src/routes/homepage-performance.test.js` and confirm failures are caused by the existing universal loader, external fonts, eager iframe, and absent local assets.

- [ ] **Step 3: Move the loader behind the server boundary**

Create `+page.server.ts` from the current loader and return only the visible posts while retaining the full count:

```ts
import { getPosts } from '$lib/utils/posts';
import { getLatestEpisode } from '$lib/utils/episodes';

export const prerender = true;

export async function load() {
  const [posts, latestEpisode] = await Promise.all([getPosts(), getLatestEpisode()]);

  return {
    posts: posts.slice(0, 6),
    latestEpisode,
    totalCount: posts.length + (latestEpisode ? 1 : 0)
  };
}
```

Remove `+page.ts`. Do not change `posts.ts`, `episodes.ts`, ordering, or count semantics.

- [ ] **Step 4: Self-host the four current font faces**

Use these exact current font assets and matching OFL license texts:

```text
Instrument Serif regular:
https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-6zUTjnTLgNs.woff2
Instrument Serif italic:
https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjjH7Motmp5g.woff2
Inter variable:
https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7W0Q5nw.woff2
JetBrains Mono variable:
https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwgknk-4.woff2
Licenses:
https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentserif/OFL.txt
https://raw.githubusercontent.com/google/fonts/main/ofl/inter/OFL.txt
https://raw.githubusercontent.com/google/fonts/main/ofl/jetbrainsmono/OFL.txt
```

Replace the Google CSS import at the top of `app.css` with:

```css
@font-face {
  font-family: 'Instrument Serif';
  src: url('/fonts/instrument-serif-regular.woff2') format('woff2');
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: 'Instrument Serif';
  src: url('/fonts/instrument-serif-italic.woff2') format('woff2');
  font-style: italic;
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-latin-variable.woff2') format('woff2');
  font-style: normal;
  font-weight: 300 800;
  font-display: swap;
}

@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/jetbrains-mono-latin-variable.woff2') format('woff2');
  font-style: normal;
  font-weight: 400 600;
  font-display: swap;
}
```

Replace the two Google preconnects in `app.html` with preloads for both Instrument Serif files using `rel="preload"`, `as="font"`, `type="font/woff2"`, and `crossorigin`.

- [ ] **Step 5: Replace the eager iframe with a local facade**

Download `https://i.ytimg.com/vi_webp/KWIH_InMQZ8/maxresdefault.webp` to the exact local poster path. Add `let videoLoaded = $state(false);` and use this shape in the existing video container:

```svelte
{#if videoLoaded}
  <iframe
    src="https://www.youtube-nocookie.com/embed/KWIH_InMQZ8?autoplay=1"
    title="Prompt Engineering: So holst du ALLES aus ChatGPT, Claude & Gemini | TRMT #002"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
{:else}
  <button
    type="button"
    class="video-facade"
    aria-label="Video abspielen: Prompt Engineering: So holst du ALLES aus ChatGPT, Claude & Gemini"
    onclick={() => (videoLoaded = true)}
  >
    <img
      src="/images/video/prompt-engineering-trmt-002.webp"
      alt=""
      width="1280"
      height="720"
      loading="lazy"
    />
    <span class="video-play" aria-hidden="true">▶</span>
  </button>
{/if}
```

Style `.video-facade`, its image, and `.video-play` within the existing absolute 16:9 container. Give the facade a visible `:focus-visible` outline. Preserve the section title, external channel link, visible video title, dimensions, and position.

- [ ] **Step 6: Verify GREEN and generated client graph**

Run:

```powershell
node --test src/routes/homepage-performance.test.js
npm run build
```

The Node contract must pass. The Vite client and SSR compilation stages must complete. The known Windows adapter symlink `EPERM` may still make the final build exit non-zero. Inspect `.svelte-kit/output/client` and generated HTML to confirm no homepage modulepreloads point at blog or podcast Markdown chunks.

---

### Task 2: Accessible status, navigation, focus, contrast, and motion

**Files:**
- Create: `src/routes/homepage-a11y.test.js`
- Modify: `src/lib/components/NewsletterSignup.svelte`
- Modify: `src/lib/components/layout/Header.svelte`
- Modify: `src/lib/components/layout/Footer.svelte`
- Modify: `src/lib/components/design-system/ThemeToggle.svelte`
- Modify: `src/lib/design-system/tokens.css`
- Modify: `src/app.css`
- Modify: `src/routes/+layout.svelte`
- Modify: `src/routes/+page.svelte`

**Interfaces:**
- Consumes: the existing newsletter endpoint, Svelte `$page` store, theme store, and unchanged homepage data.
- Produces: uniquely labelled newsletter instances, programmatic navigation state, keyboard escape/click-outside behavior, skip navigation, semantic foreground tokens, and a reduced-motion path.

- [ ] **Step 1: Write the failing accessibility contract**

Create one Node test file that reads the touched sources and separately asserts:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const routesRoot = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(routesRoot, '..', '..');
const read = (...parts) => readFile(join(projectRoot, ...parts), 'utf8');

test('layout exposes a keyboard skip link and focusable main target', async () => {
  const layout = await read('src', 'routes', '+layout.svelte');
  assert.match(layout, /href="#main-content"/);
  assert.match(layout, /<main[^>]*id="main-content"/);
  assert.match(layout, /<main[^>]*tabindex="-1"/);
});

test('newsletter gives each input a real label and announces every request state', async () => {
  const source = await read('src', 'lib', 'components', 'NewsletterSignup.svelte');
  assert.match(source, /\$props\.id\(\)/);
  assert.match(source, /<label[^>]*for=\{emailId\}[^>]*>\s*E-Mail-Adresse\s*<\/label>/);
  assert.match(source, /id=\{emailId\}/);
  assert.match(source, /autocomplete="email"/);
  assert.match(source, /aria-busy=\{status === 'loading'\}/);
  assert.match(source, /Wird angemeldet…/);
  assert.match(source, /role="status"/);
  assert.match(source, /aria-live="polite"/);
  assert.match(source, /role="alert"/);
});

test('navigation exposes current page and a controllable mobile disclosure', async () => {
  const source = await read('src', 'lib', 'components', 'layout', 'Header.svelte');
  assert.match(source, /function isActive\(path\)/);
  assert.match(source, /startsWith\(`\$\{path\}\/`\)/);
  assert.match(source, /aria-current=\{[^}]*\? 'page' : undefined\}/);
  assert.match(source, /aria-controls="mobile-navigation"/);
  assert.match(source, /Menü öffnen/);
  assert.match(source, /Menü schließen/);
  assert.match(source, /event\.key === 'Escape'/);
  assert.match(source, /burgerButton\?\.focus\(\)/);
  assert.match(source, /composedPath\(\)/);
});

test('theme action is German, stateful, and at least 44px', async () => {
  const source = await read('src', 'lib', 'components', 'design-system', 'ThemeToggle.svelte');
  assert.doesNotMatch(source, /Toggle theme|Switch to/);
  assert.match(source, /Helles Design aktivieren/);
  assert.match(source, /Dunkles Design aktivieren/);
  assert.match(source, /aria-pressed=/);
  assert.match(source, /width:\s*44px/);
  assert.match(source, /height:\s*44px/);
});

test('focus and reduced motion are explicit without a global animation kill', async () => {
  const [css, page, header] = await Promise.all([
    read('src', 'app.css'),
    read('src', 'routes', '+page.svelte'),
    read('src', 'lib', 'components', 'layout', 'Header.svelte')
  ]);
  assert.match(css, /:focus-visible/);
  assert.match(css, /outline:/);
  assert.match(css, /outline-offset:/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(css, /0\.01ms/);
  assert.match(page, /typeof window\.matchMedia === 'function'/);
  assert.match(page, /matchMedia\('\(prefers-reduced-motion: reduce\)'\)\.matches/);
  assert.match(page, /@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*?\.scroll-arrow\s*\{[^}]*animation:\s*none/);
  assert.match(header, /@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*?\.nav-mobile\s*\{[^}]*animation:\s*none/);
});

test('neutral text tokens meet 4.5 to 1 in both themes', async () => {
  const [tokens, page, header, footer, toggle, newsletter] = await Promise.all([
    read('src', 'lib', 'design-system', 'tokens.css'),
    read('src', 'routes', '+page.svelte'),
    read('src', 'lib', 'components', 'layout', 'Header.svelte'),
    read('src', 'lib', 'components', 'layout', 'Footer.svelte'),
    read('src', 'lib', 'components', 'design-system', 'ThemeToggle.svelte'),
    read('src', 'lib', 'components', 'NewsletterSignup.svelte')
  ]);
  assert.match(tokens, /--color-text-muted:\s*#9a9186/);
  assert.match(tokens, /--color-text-dim:\s*#8d857b/);
  assert.match(tokens, /\[data-theme='light'\][\s\S]*--color-text-muted:\s*#5a534b/);
  assert.match(tokens, /\[data-theme='light'\][\s\S]*--color-text-dim:\s*#625c56/);
  for (const token of [
    '--color-accent-honey-foreground:',
    '--color-accent-teal-foreground:',
    '--color-danger-foreground:',
    '--color-focus:'
  ]) assert.equal(tokens.split(token).length - 1, 2, `${token} must exist in both themes`);
  assert.match(page, /var\(--color-accent-(honey|teal)-foreground\)/);
  assert.match(header, /var\(--color-accent-honey-foreground\)/);
  assert.match(footer, /var\(--color-accent-honey-foreground\)/);
  assert.match(toggle, /var\(--color-accent-honey-foreground\)/);
  assert.match(newsletter, /var\(--color-(accent-teal|danger)-foreground\)/);
});

test('small navigation and section links expose 44px targets', async () => {
  const [header, footer, page] = await Promise.all([
    read('src', 'lib', 'components', 'layout', 'Header.svelte'),
    read('src', 'lib', 'components', 'layout', 'Footer.svelte'),
    read('src', 'routes', '+page.svelte')
  ]);
  assert.match(header, /\.nav-link\s*\{[\s\S]*?min-height:\s*44px/);
  assert.match(footer, /\.footer-link\)[^{]*\{[\s\S]*?min-height:\s*44px/);
  assert.match(page, /\.section-link\s*\{[\s\S]*?min-height:\s*44px/);
});
```

- [ ] **Step 2: Verify RED**

Run `node --test src/routes/homepage-a11y.test.js` and confirm the six tests fail because their individual approved behaviors are absent.

- [ ] **Step 3: Implement newsletter semantics**

Derive a stable instance-local `emailId` from `$props.id()`. Add a visually hidden real label, `id`, `name="email"`, and `autocomplete="email"`. Put `aria-busy={status === 'loading'}` on the form, display `Wird angemeldet…`, render success with `role="status" aria-live="polite"`, and render errors with `role="alert"`. Keep the endpoint, copy, validation, and success flow unchanged.

- [ ] **Step 4: Implement navigation, skip link, and theme semantics**

In `Header.svelte`, implement a segment-boundary `isActive(path)` helper. Add `aria-current="page"` to the matching desktop/mobile link and to the logo only at `/`. Bind the header and burger elements, add `aria-controls="mobile-navigation"`, dynamic German action names, Escape close with focus return, and composed-path click-outside close. Keep the disclosure nonmodal and do not add a focus trap. Add explicit JSDoc types so the touched file introduces no diagnostics:

```js
/** @type {HTMLElement | null} */
let headerElement = $state(null);
/** @type {HTMLButtonElement | null} */
let burgerButton = $state(null);
/** @param {KeyboardEvent} event */
function handleKeydown(event) {
  if (event.key === 'Escape' && mobileOpen) {
    mobileOpen = false;
    requestAnimationFrame(() => burgerButton?.focus());
  }
}
/** @param {MouseEvent | PointerEvent} event */
function handleOutsideClick(event) {
  if (mobileOpen && headerElement && !event.composedPath().includes(headerElement)) {
    mobileOpen = false;
  }
}
```

In `+layout.svelte`, place `<a class="skip-link" href="#main-content">Zum Inhalt springen</a>` before `Header` and give `main` the exact `id` and `tabindex`. In `ThemeToggle.svelte`, use a state-derived German next-action label/title, `aria-pressed={$theme === 'light'}`, and 44 by 44 pixels. In `NewsletterSignup.svelte`, type the submit event and the finite status union while touching the existing untyped handler.

- [ ] **Step 5: Implement semantic contrast and focus tokens**

Use the exact neutral values from the test. Add `--color-accent-honey-foreground`, `--color-accent-teal-foreground`, `--color-danger-foreground`, and `--color-focus` in both themes. Dark foreground tokens may match existing accents; light foreground tokens must be dark enough for normal text on the rendered light surfaces. Set light `--color-on-accent: #111111`. Change only text/icon uses in Homepage, Header, Footer, ThemeToggle, and Newsletter to the foreground tokens; leave accent backgrounds, gradients, glows, and shadows unchanged.

Add global skip-link and `:focus-visible` styling with a two-pixel outline and visible offset. Ensure the theme toggle, nav/footer links, and homepage section links expose at least a 44-pixel target without changing the 56-pixel header geometry.

- [ ] **Step 6: Implement targeted reduced motion**

Use the guarded expression `typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches` inside the client-side counter effect. When true, set the final count and do not call `requestAnimationFrame`. Under `@media (prefers-reduced-motion: reduce)`, disable smooth scrolling, scroll-arrow bounce, mobile-menu entry, and decorative lift/zoom transitions in the touched homepage components. Do not use a global blanket animation-duration rule.

- [ ] **Step 7: Verify GREEN**

Run:

```powershell
node --test src/routes/homepage-a11y.test.js
node --test
npm run check
```

The new test and full Node suite must pass. `svelte-check` must not exceed 79 errors and 9 warnings, and touched files must have no newly introduced diagnostics.

Runtime acceptance is intentionally centralized in Task 3: Task 2 is not finally accepted until the browser gate there verifies actual focus transfer, Escape focus return, click-outside, two unique newsletter IDs/live regions, computed 44-pixel bounding boxes, and reduced-motion behavior.

---

### Task 3: Whole-scope integration and measurable verification

**Files:**
- Modify only if a failing verifier identifies an in-scope defect in files already listed above.
- Record evidence outside production source; do not commit generated Lighthouse reports.

**Interfaces:**
- Consumes: completed Tasks 1 and 2.
- Produces: fresh PASS/FAIL/PARTIAL/UNKNOWN evidence for every approved success criterion.

- [ ] **Step 1: Run deterministic source and build gates**

Run `node --test`, `npm run check`, `npm run build`, and `git diff --check`. Compare check/build output to the documented baseline rather than claiming global green when the old errors or Windows adapter boundary remain.

- [ ] **Step 2: Run browser behavior checks**

Start the local production preview. Check desktop and 390 by 844 pixels in dark and light themes. Verify first-tab skip link and focus transfer, current navigation state, mobile Escape/click-outside/focus return, both unique newsletter labels/live regions without a real submission, dynamic theme name and 44-pixel bounds, facade keyboard activation, and reduced-motion counter/bounce behavior.

- [ ] **Step 3: Re-measure network and Lighthouse**

Run three mobile Lighthouse passes and one desktop pass against the same local production preview. Use the mobile median. Record score, FCP, LCP, TBT, CLS, first-party script count/bytes, total transfer, modulepreloads, render-blocking savings, and initial external domains. Before video activation the counts for Google Fonts, YouTube, ytimg, DoubleClick, and Google Ads must all be zero.

- [ ] **Step 4: Scope and independent review**

Compare `git status --short` and the full diff against the approved spec. Confirm there is no hero copy, editorial, section-order, SEO, Pollography, n8n, NotebookLM, publish, deployment, or global-skill change. Obtain independent accessibility and performance reviews; fix Critical or Important in-scope findings using a new failing test before implementation, then rerun the covering gates.

- [ ] **Step 5: Report honest status**

Report each target as `PASS`, `FAIL`, `PARTIAL`, or `UNKNOWN`. Do not call performance complete if a numeric target is missed, even when it materially improves. Leave the branch uncommitted, unpushed, and undeployed for the user's explicit next decision.
