# TRMT sitewide search and editorial-bridge rounding

Date: 2026-09-07

## Goal

TRMT receives one consistent search system in three places:

1. a global search action in the header,
2. an article search on the blog overview,
3. an article search on every topic page.

The header search covers all useful published content: blog articles, podcast episodes, and public tools. Blog and topic searches remain article-only. The homepage editorial bridge also receives the same rounded geometry as the surrounding cards.

## Confirmed product decisions

- The header uses a 44-pixel search icon next to the theme action.
- The icon opens a large responsive search dialog with instant results.
- Blog and topic pages show an always-visible search field above their article lists.
- Topic-page results stay restricted to the active topic.
- Search covers titles, descriptions, tags, headings, and body text.
- Legal, technical, private, preview, and draft pages are excluded.
- The search index is loaded only after the user opens or uses search.
- The result ships with the radius correction and is published after verification.

## User experience

### Header search

The search icon is a real button with an accessible German label. Activating it opens a modal dialog, focuses the input, and keeps focus inside the dialog. Escape and the close button dismiss it and return focus to the trigger.

Before a query, the dialog explains what can be found. During typing, it shows up to twelve ranked results grouped by content type. Each result has a type label, title, short contextual excerpt, and canonical link. A visible result count makes the scope clear. Empty and no-result states are explicit rather than blank.

### Blog and topic search

The blog overview places a labelled search field before the archive. A non-empty query switches from the chronological infinite-scroll archive to matching published article results from the complete index, including posts not yet loaded by scrolling. Clearing the field restores the unchanged chronological archive.

Topic pages reuse the same component but pass the current canonical topic as a filter. Their results therefore never escape the current topic.

### Visual language

The dialog and inputs reuse TRMT typography, teal focus treatment, honey highlights, `--radius-lg`/`--radius-xl`, and existing surface tokens. Mobile results use one column and keep 44-pixel controls. Desktop avoids widening the existing header: only the icon is persistent.

The homepage `.homepage-context` bridge gains `border-radius: var(--radius-xl)` while retaining `overflow: hidden`, its border, gradient, dividers, and current spacing.

## Architecture

### Static search index

A prerendered `search-index.json` endpoint builds a compact public index at production build time. It reads source content only during the build and emits normalized records containing:

- `type`: `article`, `podcast`, or `tool`,
- `slug` and canonical `url`,
- `title`, `description`, and optional category/tags,
- headings and sanitized plain-text search content,
- date for deterministic tie-breaking.

Drafts and non-public routes are rejected before serialization. Markdown, HTML tags, scripts, style blocks, and frontmatter are stripped from searchable text. The browser renders every field as text, never as raw HTML.

### Lazy client loader

A small shared client module owns a single cached fetch promise. No request for the index occurs during initial page load. Header, blog, and topic components call the loader only on first search interaction. A failed fetch clears the cached promise so a later retry is possible.

### Ranking

A pure search utility normalizes case, German diacritics, punctuation, and repeated whitespace. It scores exact and prefix matches before token matches using this priority:

1. title,
2. tags/category and headings,
3. description,
4. body text.

All query tokens must match at least one indexed field. Score, publication date, title, and URL provide deterministic ordering. The utility also chooses a short text excerpt around the strongest body or heading match.

### Shared components

- `SiteSearchDialog`: global multimodal search used by the header.
- `ArticleSearch`: inline article-only search used by blog and topic pages.
- `SearchResults`: accessible result count, states, and result links shared by both surfaces.

Search logic remains independent from presentation, so index validation and ranking can be tested without rendering Svelte components.

## Failure and robustness contract

| Case | Expected behavior | Verification |
| --- | --- | --- |
| Normal query | Relevant public records appear in deterministic order | Unit tests plus browser flow |
| Empty query | Dialog guidance or unchanged archive; no misleading zero-results state | Unit and component contract tests |
| No matches | Explicit German no-result message and clear action | Component/browser test |
| Missing or malformed index | Non-destructive error message with retry; archive/navigation remain usable | Loader tests and browser interception |
| Draft/private content | Never serialized or returned | Index contract test |
| HTML/script-like input | Treated as plain text; no HTML injection | Search and render contract tests |
| Long query | Input is bounded and search remains responsive | Unit test with maximum-length query |
| Large result set | Ranking scans the complete current corpus but renders only the configured first page | Corpus/performance test |
| Network timeout | Abort with a readable retry state; retry starts a fresh request | Loader test with timeout/abort |
| Permissions | N/A: all indexed routes are already public and search performs no authenticated action | Route inventory check |
| Development vs production | Same prerendered schema and behavior in dev, production build, and deployed runtime | Build, preview, and live readback |

## Performance limits

- Zero search-index requests and zero added content payload on initial homepage load.
- The generated JSON must remain below 750 KiB uncompressed and 200 KiB gzip for the current corpus.
- A representative query over the complete index should finish within 50 ms in the unit benchmark environment.
- The dialog renders at most twelve initial results; inline search renders at most twenty-four with a clear count.
- Input is capped at 160 characters and debounced only if measurement shows synchronous filtering is visibly expensive.

## Accessibility

- Search controls have visible labels or accessible names and at least 44-pixel targets.
- The dialog uses native dialog semantics, labelled title, focus management, Escape handling, and focus return.
- Result counts and load/error states use a polite live region.
- Keyboard users can reach every result without a pointer.
- Focus rings remain visible in dark and light themes; reduced-motion preferences remove non-essential transitions.

## Security and privacy

- Search is read-only and sends only a bounded query to local browser code; queries are not persisted or logged by a new endpoint.
- No credentials, unpublished content, preview routes, or legal pages enter the index.
- Generated excerpts are escaped as text.
- URLs are generated from known route types rather than accepted from query input.

## Acceptance criteria

1. The homepage editorial bridge is visibly rounded like the other TRMT cards in dark/light and mobile/desktop views.
2. The header search finds published articles, podcast episodes, and tools without loading its index before interaction.
3. Blog search covers every published article, not only the currently loaded infinite-scroll batch, and clearing restores the archive.
4. Topic search returns only articles from the active canonical topic.
5. Empty, unmatched, malformed-index, timeout, long-query, and script-like input paths behave as specified.
6. Drafts and excluded routes are absent from the generated index.
7. Keyboard, focus, screen-reader labels, mobile layout, and both themes pass browser QA.
8. Full automated tests, production build, prerendered index checks, and the real deployed user flows pass before completion is claimed.

## Release and rollback

Implementation is isolated from the dirty canonical checkout. After local verification, the branch is pushed, preview checks must pass, and the authorized change is merged through a normal pull request. The production deployment is then verified on the canonical domain. Rollback is the normal revert of the merge commit; the existing archive and routes remain independently functional throughout.
