# GPT-6 Astra für Motion Design: So wird aus einer Idee ein fertiger KI-Clip — QA report

| Area | Status | Current evidence | Required follow-up |
|---|---|---|---|
| Source completeness | PASS | 242 exact caption segments, 63 chronological storyboard frames across 08:41, full radar blog and current official primary sources reviewed. | None for the scoped architecture article. |
| Claim fidelity | PASS | Product, connection, duration, credit and MCP-boundary claims traced in `evidence-ledger.md`; vendor claims are labeled and plan-dependent limits are qualified. | Recheck dynamic product limits before later publication. |
| Public provenance | PASS | No creator, radar URL, transcript, borrowed prompt, demo or experience claim in public copy. Similarity scan found 0 shared 8-token windows against captions and creator blog. | None. |
| Article structure | PENDING | Draft was rebuilt from the beginner reader question and now introduces technical terms only after the simple result is clear. | Re-run rendered-page and full-suite checks. |
| Visual gate | PENDING | Dedicated 16:9 hero and 400-x-225 thumbnail created with context anchor, insight line and visible idea-to-film transformation. | Inspect final files alone and in the rendered desktop/mobile page. |
| Links and assets | PENDING | Two new WebP files and the generated image maps are present. | Re-run link and asset checks. |
| Desktop/mobile preview | PENDING | Previous text-only preview passed. | Re-check revised title, hero, first screen, H1 count and overflow. |
| Targeted tests | PENDING | Regression test was changed first and failed on all three missing requirements; current draft passes 2 of 3 before the final scan block addition. | Run targeted and complete checks. |
| Release scope | PENDING | Changes remain local on the Draft-PR branch. No merge or publication occurred. | Verify and push only to Draft PR #18. |

## Known baseline failures

- `npm ci` reports 18 dependency vulnerabilities on the clean `origin/main` baseline (3 low, 4 moderate, 9 high, 2 critical). This article change neither introduces nor repairs them.
- Some full-suite subprocesses report that Vite HMR port 24678 is already in use. All 173 tests still pass; this warning is pre-existing environmental noise.

## Final boundary

- Draft readiness: PASS
- Publication readiness: PENDING explicit human review, merge and release decision
