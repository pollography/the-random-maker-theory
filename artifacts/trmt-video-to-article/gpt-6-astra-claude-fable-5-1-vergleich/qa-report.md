# GPT-6 Astra vs. Claude Fable 5.1 - QA report

| Area | Status | Current evidence | Required follow-up |
|---|---|---|---|
| Source completeness | PASS WITH LIMIT | Complete English captions, 11 official storyboard mosaics over the 7:34 runtime, four independent primary pages | Normal video download was HTTP 403; do not make fine-motion claims |
| Claim fidelity | PASS | E-001 to E-013 mapped to current OpenAI/Anthropic pages; mixed benchmark outcomes and pricing caveats retained | Recheck volatile prices and rollout before publication |
| Public provenance | PASS | Article contains no creator name, channel URL, video id, transcript framing or borrowed test claim | None |
| Similarity | PASS | Zero matching 8-token phrases between public article and complete English caption text | None |
| Article structure | PASS | Route-owned single H1, no Markdown H1, two-sentence opening thesis, TLDR, evidence strip, benchmark bars, decision grid, FAQ | None |
| Visual gate | PASS | V-001 passed motif, full-body scale, contact, humor, identity, context, hygiene and exact 16:9 checks | None |
| Links and assets | PASS | Two internal links; four primary-source links; hero 1600x900/108,920 B; thumbnail 800x450/33,090 B; metadata generated | None |
| Desktop/mobile preview | PASS | Local preview rendered at desktop and 390x844; one H1; hero loaded 1600x900; no document-level horizontal overflow; table has its own scroll area | None |
| Targeted tests | PASS | 2/2 article contract tests; draft QA 0 errors; 135/135 repository JS tests when node_modules is excluded | None |
| Production build | PASS WITH BASELINE WARNINGS | `npm run build` completed; Svelte emitted existing Card/MindMap warnings | Existing warnings are outside this article scope |
| Release scope | PASS | Diff contains only article, test, two generated images, generated metadata and dossier | Keep `draft: true`; do not merge/publish without human review |

## Known baseline failures

- `npm run check` remains at the unchanged baseline of 99 errors and 9 warnings in 10 existing project files. No diagnostic points to the new Markdown article or its test.
- Broad Python discovery runs 22 existing tests successfully but cannot collect three PDF-oriented modules because the local interpreter lacks `pypdf` and `reportlab`. Those modules are unrelated to this article.
- A naive recursive Node test command included third-party tests under `node_modules`; the corrected repository-only command passes 135/135.
- The draft QA checker warns that the article does not end with an em-dash signature. Current TRMT public-copy guidance explicitly avoids em dashes, so the warning is intentionally not "fixed".

## Final boundary

- Draft readiness: PASS
- Publication readiness: NOT REQUESTED. Requires human content review, volatile-source refresh and explicit release approval.
