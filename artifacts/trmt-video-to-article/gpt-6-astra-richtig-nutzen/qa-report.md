# GPT-6 Astra richtig nutzen: 5 Fehler, die Zeit und Ergebnisse kosten — QA report

| Area | Status | Current evidence | Required follow-up |
|---|---|---|---|
| Source completeness | PASS | The complete 17:47 video, 995 English caption cues, the paired source article and 56 frames across the full runtime were acquired and inspected. | Recheck only if the source changes before editorial approval. |
| Claim fidelity | PASS | The evidence ledger separates source leads from current OpenAI documentation; unverified personal benchmark and price claims were omitted. | Human editorial review before any publication decision. |
| Public provenance | PASS | The public article contains no creator, video, transcript or source-blog reference and shares zero exact eight-token windows with the English captions. Claims are supported by primary OpenAI links. | None for the draft. |
| Article structure | PASS | The route owns the only H1. The body starts with a two-sentence beginner thesis, then gives a scan block, five clearly named errors, quick fixes, a diagnostic grid and a ten-minute test. | Human editorial review before merge. |
| Visual gate | PASS | The original 16:9 hero has one clear message, exactly five countable correction controls, a topic-specific Astra star and no people, fake interface or stray text. The 400 px derivative keeps all three title lines readable. | None for the draft. |
| Links and assets | PASS | Both internal links and the preview route returned HTTP 200. The 1600 x 900 hero and 400 x 225 thumbnail returned HTTP 200 and are registered in generated metadata. All five official OpenAI source URLs were read back current; three Help Center URLs reject direct scripted requests with 403 but remain readable through normal web access. | Recheck live links after publication. |
| Desktop/mobile preview | PASS | Fresh local production-preview checks at 1280 x 720 and 390 x 844 found exactly one H1, no page-level horizontal overflow, a loaded 1600 x 900 hero, visible opening thesis and no console warnings or errors. The top, body and article end were visually inspected; lazy related-card images loaded without failures after scrolling. | Repeat against the live URL only after an approved merge. |
| Targeted tests | PASS | The article contract passed 3/3 and the complete repository suite passed 173/173. `npm run check` reported 0 errors and 0 warnings; `npm run build` completed with the Vercel adapter. | None. |
| Release scope | PASS | Draft PR 22 is open and mergeable with both Vercel checks green. Radar issue 21 links to it and no longer has `research-needed`. The canonical dirty checkout was not modified; private radar source files remain untracked and outside commit scope. | Keep `draft: true`; do not merge or publish without explicit approval. |

## Known baseline warnings

- The complete test run prints existing Vite-option, stale Browserslist-data and occupied WebSocket-port warnings; all 173 tests still pass.
- `npm ci` reports 18 existing dependency advisories. This draft does not change dependencies or the lockfile.

## Final boundary

- Draft readiness: PASS.
- Publication readiness: UNKNOWN because publication was neither requested nor approved.
