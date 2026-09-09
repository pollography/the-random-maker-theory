# GPT-6 Astra für Motion Design: Der Einzeiler ist nicht der Workflow — QA report

| Area | Status | Current evidence | Required follow-up |
|---|---|---|---|
| Source completeness | PASS | 242 exact caption segments, 63 chronological storyboard frames across 08:41, full radar blog and current official primary sources reviewed. | None for the scoped architecture article. |
| Claim fidelity | PASS | Product, connection, duration, credit and MCP-boundary claims traced in `evidence-ledger.md`; vendor claims are labeled and plan-dependent limits are qualified. | Recheck dynamic product limits before later publication. |
| Public provenance | PASS | No creator, radar URL, transcript, borrowed prompt, demo or experience claim in public copy. Similarity scan found 0 shared 8-token windows against captions and creator blog. | None. |
| Article structure | PASS | Route-owned H1; one opening thesis paragraph with 2 sentences; 9 H2 sections plus scan blocks, table and copyable original brief. | None. |
| Visual gate | PASS | `visual-brief.md` rejects three generic concepts; article stays text-only because none passed the required text-free 400 x 225 topic blind test. | No image generation required. |
| Links and assets | PASS | 8 of 8 external sources returned HTTP 200 with a standard browser user agent; 2 of 2 internal article targets exist. Empty image usage map generated. | None. |
| Desktop/mobile preview | PASS | Local preview at desktop and 390 x 844: exactly one H1, preview banner visible, `scrollWidth == clientWidth`, no console warnings or errors. | None. |
| Targeted tests | PASS | New article tests 3 of 3; full suite 173 of 173; `npm run check` 0 errors and 0 warnings; production build PASS. | None. |
| Release scope | PASS | Draft PR #18 is open, marked Draft and mergeable. Vercel deployment and Preview Comments checks passed. No merge or publication occurred. | Human review remains required before merge or release. |

## Known baseline failures

- `npm ci` reports 18 dependency vulnerabilities on the clean `origin/main` baseline (3 low, 4 moderate, 9 high, 2 critical). This article change neither introduces nor repairs them.
- Some full-suite subprocesses report that Vite HMR port 24678 is already in use. All 173 tests still pass; this warning is pre-existing environmental noise.

## Final boundary

- Draft readiness: PASS
- Publication readiness: PENDING explicit human review, merge and release decision
