# Claude Code und Codex kombinieren: Ein Modell baut, das andere prüft — QA report

| Area | Status | Current evidence | Required follow-up |
|---|---|---|---|
| Source completeness | PASS | Exact captions, all 17 storyboard sheets, source repository, official provider docs, and one peer-reviewed study inspected. | Recheck volatile model and CLI facts before publication. |
| Claim fidelity | PASS | Public claims are narrower than the creator source and explicitly separate model review from proof; final 8-token scan found 0 matches across 2,033 article tokens. | N/A for Draft PR. |
| Public provenance | PASS | Public article links only actual primary sources and contains no creator attribution; all seven external source URLs returned HTTP 200. | Recheck volatile links before publication. |
| Article structure | PASS | Rendered preview has exactly one route-owned H1, a two-sentence opening thesis, `Kurz gesagt`, clear H2/H3 scan grammar, prompts, failure modes, and source section. | N/A for Draft PR. |
| Visual gate | PASS | Visual marked not-needed after concept gate; no unapproved image or borrowed screenshot is included. | N/A unless editorial review later requests a hero. |
| Links and assets | PASS | Seven external links returned HTTP 200; all three internal article targets exist; generated image usage records the intentional empty asset set. | N/A for Draft PR. |
| Desktop/mobile preview | PASS | Desktop preview inspected at 1,265 px. A real 390 px device-metrics run reported `innerWidth`, `clientWidth`, `scrollWidth`, and `bodyScrollWidth` all as 390, exactly one H1, and the preview banner; screenshot inspection showed readable wrapping and the mobile navigation. | N/A for Draft PR. |
| Targeted tests | PASS | Article-specific test passes 3/3; full suite passes 173/173; `npm run check`, `npm run build`, `git diff --check`, and dossier validation pass. | N/A for Draft PR. |
| Release scope | PASS | Draft PR 16 is open, mergeable, and had two passing Vercel checks at verification; no merge or publication occurred. Issue 14 links the PR and no longer has `research-needed`. | Human editorial review; merge or publish only after separate approval. |

## Known baseline failures

- Fresh `origin/main` baseline before article changes: `npm run check` PASS with 0 errors and 0 warnings; `node --test` PASS 170/170; `npm run build` PASS.
- `npm ci` reports 17 dependency vulnerabilities (3 low, 3 moderate, 9 high, 2 critical). This pre-existing dependency state is outside the article-only change and remains a repository risk.
- The full test run passed but emitted existing infrastructure warnings about stale Browserslist data, Vite config overrides, shared WebSocket port use, and one dependency-optimization rename race. No test failed; the article-specific test output was clean.

## Final boundary

- Draft readiness: PASS
- Publication readiness: UNKNOWN
