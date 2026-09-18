# Union Alpha heißt jetzt Pareto: Was das Ende des Gratis-Tests für dich bedeutet — QA report

| Area | Status | Current evidence | Required follow-up |
|---|---|---|---|
| Source completeness | PASS | Video captions and all 17 official storyboard sheets were checked; current product, price, terms and data handling were independently checked against OpenRouter and Unbiased primary sources. | Recheck volatile price and terms immediately before publication. |
| Claim fidelity | PASS | Evidence ledger E-001 to E-013 maps every material claim; vendor benchmarks remain identified as vendor claims and are not used as universal performance proof. | None for draft. |
| Public provenance | PASS | Public copy cites OpenRouter and Unbiased only; the topic-radar creator, transcript and creator-specific tests are absent. Eight-word transcript overlap scan found zero matches. | None. |
| Article structure | PASS | Frontmatter owns the single H1; the body begins with a two-sentence thesis, then beginner TLDR, definitions and one continuous sports-club example. | None. |
| Visual gate | PASS | Native 1600 x 900 hero and true 400 x 225 thumbnail exist. The 400 x 225 blind test communicates Union Alpha, Pareto and the end of the free phase without logo, copied UI or brand imitation. | None. |
| Links and assets | PASS | Both image paths resolve, metadata was regenerated and every public citation points to an official product, terms or data page. | None. |
| Desktop/mobile preview | PASS | Production preview checked on 127.0.0.1:4190. Desktop: 1280 x 720, one H1, no horizontal overflow, complete 1600 x 900 hero. Mobile: true 390 x 844 iframe viewport, one H1, no overflow, complete hero, thesis and preview banner present. Browser console had no warnings or errors. | Reopen after any later content or asset change. |
| Targeted tests | PASS | Article contract 3/3, dossier validation PASS, full node suite 178/178, svelte-check 0 errors/0 warnings, production build PASS and git diff check PASS. | Re-run after final dossier metadata update. |
| Release scope | PASS | Only the article, article test, two image assets, generated image maps and its dossier are in scope. Article remains `draft: true`; no merge or publication is authorized. | Draft PR only. |

## Known baseline warnings

- `npm ci` reports 18 dependency audit findings from the existing lockfile: 3 low, 4 moderate, 9 high and 2 critical. This article change adds no dependency.
- The production build reports that `caniuse-lite` is seven months old.
- Some existing tests report that local port 24678 is already occupied; all 178 tests still pass.
- Local Vercel Web Analytics returns 404 under Vite preview, as expected outside Vercel; the page itself logs no browser warning or error.

## Final boundary

- Draft readiness: PASS
- Publication readiness: PENDING explicit publication approval and a fresh volatile-source recheck

