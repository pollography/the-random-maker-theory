# GPT-6 Astra für Motion Design: So wird aus einer Idee ein fertiger KI-Clip — QA report

| Area | Status | Current evidence | Required follow-up |
|---|---|---|---|
| Source completeness | PASS | 242 exact caption segments, 63 chronological storyboard frames across 08:41, full radar blog and current official primary sources reviewed. | None for the scoped architecture article. |
| Claim fidelity | PASS | Product, connection, duration, credit and MCP-boundary claims traced in `evidence-ledger.md`; vendor claims are labeled and plan-dependent limits are qualified. | Recheck dynamic product limits before later publication. |
| Public provenance | PASS | No creator, radar URL, transcript, borrowed prompt, demo or experience claim in public copy. Similarity scan found 0 shared 8-token windows against captions and creator blog. | None. |
| Article structure | PASS | H1 names product, transformation and result; two-sentence thesis explains the complete outcome; `Kurz gesagt` gives the four roles; Motion Design, Skill, MCP and Beat Sheet are explained in plain language at first use; one Kaffeetassen example carries the workflow. | None for the scoped draft. |
| Visual gate | PASS | Dedicated 1600-x-900 hero and 400-x-225 thumbnail show `GPT-6 ASTRA`, `VON DER IDEE ZUM KI-CLIP` and the idea-to-camera transformation. The actual thumbnail passed copy, topic, mechanism, crop and hygiene checks. | Human taste review remains welcome. |
| Links and assets | PASS | Both WebP files exist, dimensions and file budgets are test-enforced, and generated metadata plus article image usage include the new hero pair. | None. |
| Desktop/mobile preview | PASS | Fresh local desktop and 390-x-844 browser tabs: exactly one H1, hero natural size 1600 x 900, complete beginner summary, no horizontal overflow and no console warnings or errors. | Unauthenticated Vercel page viewing is `UNKNOWN` because deployment protection redirects to SSO; both Vercel deployment checks passed. |
| Targeted tests | PASS | Red phase: 0 of 3 under the old article. Green phase: 3 of 3. Full suite 173 of 173, `npm run check` 0 errors and 0 warnings, production build PASS. | None. |
| Release scope | PASS | Draft PR #18 is open, mergeable and still Draft; both Vercel checks passed. No merge or publication occurred. | Human review remains required before merge or release. |

## Known baseline failures

- `npm ci` reports 18 dependency vulnerabilities on the clean `origin/main` baseline (3 low, 4 moderate, 9 high, 2 critical). This article change neither introduces nor repairs them.
- Some full-suite subprocesses report that Vite HMR port 24678 is already in use. All 173 tests still pass; this warning is pre-existing environmental noise.

## Final boundary

- Draft readiness: PASS
- Publication readiness: PENDING explicit human review, merge and release decision
