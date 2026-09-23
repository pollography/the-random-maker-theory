# Claude Opus 5.5 ist da: Mehr Coding-Leistung, weniger Kosten als Opus 5 — QA report

| Area | Status | Current evidence | Required follow-up |
|---|---|---|---|
| Source completeness | PARTIAL, ACCEPTED FOR RADAR USE | Complete English captions and all 79 storyboard timeline samples were archived; the direct video stream returned HTTP 403. Every public factual claim was checked independently against the official Anthropic or OpenAI release page. | Preserve the partial boundary; do not claim full motion/audio inspection. |
| Claim fidelity | PASS | The claim ledger traces prices, benchmarks, availability, safeguards and caveats to primary sources. The creator headline claim was dropped, and the official 40 percent comparison is correctly limited to typical workloads versus Opus 5. | Recheck volatile prices and availability before any later publication approval. |
| Public provenance | PASS | The public article cites only Anthropic and OpenAI primary pages and does not mention or link the radar source. | None for draft. |
| Article structure | PASS | Frontmatter owns the only H1. The body starts with a two-sentence thesis, explains the result before specialist terms and uses one fictional online-shop example throughout. | None for draft. |
| Visual gate | PASS | Native 1600 x 900 hero plus independent 400 x 225 thumbnail exist. At actual thumbnail size, model, coding benefit and price comparison remain readable. No logo, copied screenshot, fake interface or real person is used. | None for draft. |
| Links and assets | PASS | Hero and thumbnail load from their frontmatter paths. Internal links resolve in the production preview; external citations point to the primary release pages. | Recheck external links before publication. |
| Desktop/mobile preview | PASS | Production preview checked at 1280 x 720 and 390 x 844 on `127.0.0.1:4189`. Exactly one H1, no page-level horizontal overflow, loaded 1600 x 900 hero, readable thesis and summary, and no console warnings or errors. Wide tables are self-scrollable on mobile. | Keep the local preview available for review. |
| Targeted tests | PASS | Article test: 3/3. Full suite: 178/178. `npm run check`: 0 errors and 0 warnings. `npm run build`: PASS. Dossier validation: PASS. | Re-run after the commit hook and final handoff update. |
| Release scope | PASS FOR DRAFT ONLY | One new draft article, one article test, one dossier, two images and generated image metadata are in scope. Draft PR #35 is open, mergeable and not published; its initial remote checks passed. No production publication or main-branch merge is authorized. | Keep the PR in Draft state until Pollo explicitly approves publication. |

## Known baseline failures

- `npm ci` reports 18 dependency vulnerabilities from the existing dependency graph. This draft neither changes dependencies nor runs an automatic audit fix.
- Direct video-stream retrieval returned HTTP 403. Complete captions and official storyboard sheets were available; all public claims were independently verified at primary sources.

## Final boundary

- Draft readiness: PASS. Local post-commit verification and the Draft PR's initial remote checks succeeded; the final dossier-only commit still requires a check readback.
- Publication readiness: NOT APPROVED. The article remains `draft: true`; volatile claims need a fresh check before any later publication decision.

