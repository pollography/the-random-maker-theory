# Claude Fable 5.1 markiert Texte: Was das Wasserzeichen wirklich erkennt — QA report

| Area | Status | Current evidence | Required follow-up |
|---|---|---|---|
| Source completeness | PASS | Captions and eight visible frames inventoried; current Anthropic, EU, DeepMind and Nature sources checked. | Recheck only if sources change before publication. |
| Claim fidelity | PASS | Evidence ledger separates vendor claims, published research, EU rules and omitted radar claims. | Human editorial review before merge. |
| Public provenance | PASS | Public copy links primary sources, contains no creator/video attribution and shares zero exact eight-token windows with the English radar transcript. | None for draft. |
| Article structure | PASS | No body H1; 1–2 sentence thesis; scan block, responsive proof cards, practical sequence and FAQ present. | Human editorial review before merge. |
| Visual gate | PASS | No visual is necessary; no screenshot or generated image included. | None for draft. |
| Links and assets | PASS | Primary and internal links are explicit; article has no asset dependency. | Check rendered links during browser QA. |
| Desktop/mobile preview | PASS | Browser readback at 1440 px and 390 px found exactly one H1, no page-level overflow and six responsive proof cards; both layouts were visually inspected. | None for draft. |
| Targeted tests | PASS | Focused test passed 2/2 after a verified missing-file RED state; complete suite passed 125/125. | None for draft. |
| Build and static check | TEILWEISE | Vite compiled complete client and server bundles. The Vercel adapter then hit the known Windows `EPERM` symlink restriction. `svelte-check` reports 99 existing errors and 9 warnings in ten unchanged files, with no diagnostic in the article or its test. | Let remote CI run in the Draft PR; do not claim a clean project-wide check. |
| Release scope | PASS | Isolated branch; article remains `draft: true`; main checkout untouched. | Push branch and create Draft PR only. |

## Known baseline failures

- `npm run check`: 99 errors and 9 warnings in unchanged generator, data, store, component and route files. No changed article/dossier/test file appears in the diagnostics.
- `npm run build`: Vite client/server compilation passes, then `@sveltejs/adapter-vercel` cannot create a symlink on this Windows host (`EPERM`).

## Final boundary

- Draft readiness: PASS with the two project-baseline limitations above recorded for remote CI and human review.
- Publication readiness: UNKNOWN; human review and explicit merge/publication approval remain required.
