# Higgsfield API ohne Abo: KI-Bilder und Videos nur bei Nutzung bezahlen — QA report

| Area | Status | Current evidence | Required follow-up |
|---|---|---|---|
| Source completeness | PASS | Full 413-second radar source covered by 395 captions and 10 official storyboard sheets; nine inventory records; primary-source set complete | None for explanatory draft |
| Claim fidelity | PASS | E-001 through E-014 verified against official Higgsfield help, docs and SDK repositories; volatile prices omitted | Recheck volatile product facts before publication |
| Public provenance | PASS | Public article links only official primary sources; no creator, video or transcript mention; zero shared normalized 8-word sequences with the English transcript | None |
| Article structure | PASS | Route-owned H1 only; two-sentence thesis; TLDR; beginner definition; one continuous desk-lamp example; terms introduced before use | None |
| Visual gate | PASS | Native 1600x900 hero and separate 400x225 thumbnail; exact thumbnail blind test carries topic and benefit; no logo, person, screenshot or fake UI | Publication approval remains separate |
| Links and assets | PASS | Both image URLs return HTTP 200; browser loaded hero at native 1600x900; frontmatter references both paths | None |
| Desktop/mobile preview | PASS | Production preview at 1280x720 and 390x844: one H1, no horizontal overflow, hero loaded, thesis and preview banner visible; no console warnings/errors | Keep local server running for review |
| Targeted tests | PASS | Article tests 3/3; repository tests 178/178; Svelte check 0 errors/0 warnings; production build passed; dossier validation passed; diff check passed | Remote PR checks still required |
| Release scope | PASS | `draft: true`; isolated worktree from origin/main; no main checkout mutation; no merge or publication | Draft PR and issue handoff pending |

## Known baseline failures

- `npm ci` reports 18 dependency audit findings (3 low, 4 moderate, 9 high, 2 critical). They pre-existed on `origin/main` and are unrelated to this content-only change.
- Browserslist reports that its local `caniuse-lite` snapshot is seven months old. Build and tests still pass.

## Final boundary

- Draft readiness: PASS locally; remote Draft-PR checks pending.
- Publication readiness: PENDING explicit Pollo approval; this run must not merge or publish.
