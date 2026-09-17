# GPT-6 Astra, Blender und 3D-Websites: QA report

| Area | Status | Current evidence | Required follow-up |
|---|---|---|---|
| Source completeness | PASS | 333 complete caption segments and 130 chronological official-storyboard frames across 00:00-10:35; companion article and thirteen inventory entries checked | Do not publish private captions, creator material or source frames. |
| Claim fidelity | PASS for sourced draft; live Blender result UNKNOWN | `evidence-ledger.md` separates OpenAI capability, Blender automation, GLB export and Three.js loading from the fictional teaching example | A firsthand speed or quality claim needs a real Blender and browser build. |
| Public provenance | PASS for bounded public copy | No creator, video, companion site, transcript, copied runtime, copied demo or public source screenshot; public links are independent primary references | Human publication review remains separate. |
| Article structure | PASS | One rendered H1; opening explains the mechanism in two sentences; short TLDR, plain definitions, original example, checks and two internal links | Editorial polish is possible before publication, not a draft blocker. |
| Visual gate | PASS for draft | Crafted Editorial hero 1600 x 900 and native 400 x 225 thumbnail: exact `ASTRA + BLENDER` and `3D-MODELL AUF DEINER WEBSITE` copy, one model visibly passes from faceted construction into a browser object | Publication rights review still required. |
| Links and assets | PASS for local draft | Page and both images return HTTP 200; generated metadata is 1600 x 900 and 400 x 225; all non-OpenAI public links returned HTTP 200. OpenAI pages were read successfully through the web research route but reject direct curl with 403 | External pages and Astra availability can change before publication. |
| Desktop/mobile preview | PASS | Vite production build on 127.0.0.1:4190; visual desktop and 390 x 844 checks; one H1, hero 1600 x 900 loaded, no document overflow, no creator text, zero browser warning/error logs | Keep local server running for review. |
| Targeted tests | PASS | Three article/image tests; complete `node --test --test-concurrency=1 --test-reporter=dot` exit 0; `npm run check` 0 errors/0 warnings; fresh `npm run build` exit 0; draft QA status `ok` | The QA checker retains its generic signature warning because the TRMT style rule forbids the requested dash form. |
| Release scope | PASS for Draft PR | Isolated worktree from fresh `origin/main` commit `007468d`; Draft PR #27 is open, marked draft, mergeable and its Vercel checks pass; issue #26 links the deliverables and no longer has `research-needed`; no merge or production deployment occurred | Human editorial and publication review remain separate. |

## Known baseline observations

- `npm ci` reports 18 existing dependency vulnerabilities; this change adds no package and does not modify the lockfile.
- The production preview requests Vercel Analytics locally and receives the expected local 404; the browser console remains clean.

## Current boundary

- Local draft readiness: PASS.
- Draft PR readiness: PASS. PR #27 is open, marked draft, mergeable and its remote checks pass.
- Publication readiness: UNKNOWN because no live Blender project was built and no editorial or production-release approval was granted.
