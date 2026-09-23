# GPT-6 Sol oder Luna: Welches Modell spart dir wirklich Geld? - QA report

| Area | Status | Current evidence | Required follow-up |
|---|---|---|---|
| Source completeness | PARTIAL, ACCEPTED FOR RADAR USE | Complete English captions and all nine official storyboard sheets were inspected; the direct video stream returned HTTP 403. Every public factual claim was independently checked against OpenAI primary pages. | Preserve the partial boundary; do not claim full motion/audio inspection. |
| Claim fidelity | PASS | The claim ledger traces roles, prices, long-context rules, caching, availability and provider benchmarks to current primary sources. | Recheck volatile prices and availability before any later publication approval. |
| Public provenance | PASS | The public article cites only OpenAI primary pages and does not mention or link the radar source. | None for draft. |
| Article structure | PASS | Frontmatter owns the only H1. The body starts with a two-sentence thesis, explains the result before specialist terms and uses one fictional online-shop example throughout. The rendered route contains exactly one H1. | None for draft. |
| Visual gate | PASS | Native 1600 x 900 hero plus true 400 x 225 thumbnail exist. At actual thumbnail size, model names and the selection rule remain readable. No logo, copied screenshot, fake interface or real person is used. | None for draft. |
| Links and assets | PASS | Both frontmatter image paths load. The hero reports its native 1600 x 900 size and internal article links resolve in the production preview. | Recheck external links before publication. |
| Desktop/mobile preview | PASS | Production preview checked at 1280 x 720 and 390 x 844 on `127.0.0.1:4190`. Exactly one H1, no page-level horizontal overflow, readable title, thesis, summary and thumbnail message, and no console warnings or errors. Wide tables stay inside their horizontal scroll surface. | Keep the local preview available for review. |
| Targeted tests | PASS | Article test: 3/3. Full suite: 178/178. `npm run check`: 0 errors and 0 warnings. `npm run build`: PASS. Dossier validation and eight-word overlap check: PASS. | Re-run after the commit hook and final handoff update. |
| Release scope | PASS FOR DRAFT ONLY | One draft article, one regression test, one dossier, two images and generated image metadata are in scope. Draft PR #36 is open, mergeable and not published. | Wait for the final remote checks; keep the PR in Draft state and do not merge. |

## Known baseline failures

- `npm ci` reports 18 dependency vulnerabilities from the existing dependency graph. This draft does not change dependencies and does not run an automatic audit fix.
- Direct video-stream retrieval returned HTTP 403. Complete captions and official storyboard sheets were available; all public claims were independently verified at primary sources.

## Final boundary

- Draft readiness: PASS locally after commit. Tests, production build and rendered preview passed; final remote checks remain pending after the handoff snapshot.
- Publication readiness: NOT APPROVED. The article remains `draft: true`; volatile claims need a fresh check before any later publication decision.
