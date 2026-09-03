# Claude Fable 5.1 markiert Texte: Was das Wasserzeichen wirklich erkennt — QA report

| Area | Status | Current evidence | Required follow-up |
|---|---|---|---|
| Source completeness | PASS | Captions and eight visible frames inventoried; current Anthropic, EU, DeepMind and Nature sources checked. | Recheck only if sources change before publication. |
| Claim fidelity | PASS | Evidence ledger separates vendor claims, published research, EU rules and omitted radar claims. | Human editorial review before merge. |
| Public provenance | PASS | Public copy links primary sources, contains no creator/video attribution and shares zero exact eight-token windows with the English radar transcript. | None for draft. |
| Article structure | PASS | No body H1; 1–2 sentence thesis; scan block, responsive proof cards, practical sequence and FAQ present. | Human editorial review before merge. |
| Visual gate | PASS | Original 16:9 keyed-scanner hero uses one complete approximately 59%-high Mini-Pollo, one readable cause-and-effect, physical contact and no text/logo/interface contamination. | None. |
| Links and assets | PASS | Primary and internal links are explicit; 1200 × 675 hero and 400 × 225 thumbnail exist and are present in generated metadata. | None. |
| Desktop/mobile preview | PASS | Fresh browser readback at 1440 px and 390 px found exactly one H1 and no page-level overflow. The hero renders at 736 × 414 px and 326 × 183 px; both crops were visually inspected. | Repeat against the live URL after merge. |
| Targeted tests | PASS | Fable and NotebookLM publication/hero contracts passed 9/9 after the required RED state; the complete suite passed 126/126. | None. |
| Build and static check | TEILWEISE | Vite compiled complete client and server bundles. The Vercel adapter then hit the known Windows `EPERM` symlink restriction. `svelte-check` reports 99 existing errors and 9 warnings in ten unchanged files, with no diagnostic in the article or its test. | Let remote CI run in the Draft PR; do not claim a clean project-wide check. |
| Release scope | PASS | User approved the exact article plus Fable hero and NotebookLM hero replacement; the article is `draft: false` in the isolated branch and the dirty main checkout remains untouched. | Merge only after final local and remote checks pass. |

## Known baseline failures

- `npm run check`: 99 errors and 9 warnings in unchanged generator, data, store, component and route files. No changed article/dossier/test file appears in the diagnostics.
- `npm run build`: Vite client/server compilation passes, then `@sveltejs/adapter-vercel` cannot create a symlink on this Windows host (`EPERM`).

## Final boundary

- Draft readiness: PASS.
- Publication readiness: PASS for the approved scope, subject to remote deployment and live-URL verification.
