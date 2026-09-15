# After Effects mit GPT-6 Astra: Animationen als bearbeitbares Projekt — QA report

| Area | Status | Current evidence | Required follow-up |
|---|---|---|---|
| Source completeness | PASS | 267 caption segments and 36 full-range video frames; companion article and ten entries in `source-inventory.json`; vendor, Adobe and OpenAI primary sources read on 2026-09-15 | Do not publish the private source transcript or creator frames. |
| Claim fidelity | PASS for sourced draft; live AE quality UNKNOWN | `evidence-ledger.md` isolates local bridge from ChatGPT plugin, license and quota from open bridge, and fictional example from tested operation | A firsthand AE result needs an actual licensed installation and project readback. |
| Public provenance | PASS for bounded public copy | No creator transcript, foreign timing/demo, unattributed screenshot, personal test claim or close source outline; creator topic stays private in dossier | Human publication review remains separate. |
| Article structure | PASS | One rendered H1; opening states named product, editable benefit and prerequisites in two sentences; short TLDR, beginner explanation, example, checks and primary links | Editorial polish is possible before publication, not a draft blocker. |
| Visual gate | PASS for draft | Crafted Editorial hero 1600 x 900 and native 400 x 225 thumbnail: After Effects + GPT-6 Astra + editable animation legible in both actual page and small export, no fake UI or copied logo | Publication rights review still required. |
| Links and assets | PASS for local draft | Page and both native images returned HTTP 200; generated metadata reflects 1600 x 900 and 400 x 225, native image loaded in browser; primary target locators checked on 2026-09-15 | External pages may change before publication. |
| Desktop/mobile preview | PASS | Vite production build served on 127.0.0.1:4189; desktop 1275 px and mobile 390 x 844 visual inspections; no document horizontal overflow, one H1, hero loaded, zero console errors; mobile table has internal horizontal scroller | Keep local server running for user review. |
| Targeted tests | PASS | Three article/image tests; complete `node --test --test-concurrency=1 --test-reporter=dot` exit 0; `npm run check` 0 errors/0 warnings; `npm run build` exit 0 after pre-commit migration; Vercel PR checks pass | A future publish should revalidate changing external sources. |
| Release scope | PASS for Draft PR only | Isolated origin/main worktree, exact 16 staged files, `draft: true`; Draft PR #25 is OPEN, `isDraft: true`, base `main`; issue #23 linked and `research-needed` label removed after checks; no merge or public site deployment | Human publication gate unchanged. |

## Known baseline failures

- First `npm run check` identified a type-inference error in the new test tuple; corrected to named objects and freshly rechecked with zero diagnostics. Browserslist freshness warning does not fail the build.

## Final boundary

- Draft readiness: PASS; https://github.com/pollography/the-random-maker-theory/pull/25 is a verified Draft PR with passing remote checks and a working local preview.
- Publication readiness: UNKNOWN: no editorial/publication authorization, no real Adobe After Effects run, no public deployment requested.
