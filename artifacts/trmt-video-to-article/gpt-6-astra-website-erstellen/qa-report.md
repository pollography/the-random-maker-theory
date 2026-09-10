# Website mit GPT-6 Astra erstellen: Vom Vorbild zum eigenen Entwurf — QA report

| Area | Status | Current evidence | Required follow-up |
|---|---|---|---|
| Source completeness | PARTIAL | Full captions and 126 storyboard frames cover the complete 19:57 timeline; direct video stream returned HTTP 403. | Keep this limit in PR handoff. |
| Claim fidelity | PASS | Material public claims map to current OpenAI primary sources; unsupported monetary value and star counts were dropped. | Refresh volatile availability before publication. |
| Public provenance | PASS | Public Markdown contains no creator, video, transcript, or adaptation-process reference and no copied screenshots. An exact normalized eight-token-window comparison against the complete caption track found 0 matches across 2,291 article tokens and 8,473 unique caption windows. | None for Draft PR. |
| Article structure | PASS | One route-owned H1, two-sentence thesis, `Kurz gesagt`, full plain-language overview, defined terms, and one Röstpost example through the whole path. Browser readback found exactly one H1 with the expected title. | None for Draft PR. |
| Visual gate | PASS | Native hero is 1600 x 900 at 64,726 bytes; the actual thumbnail is 400 x 225 at 9,392 bytes. Both carry the exact context/insight copy and one clear transformation, without people, logos, fake UI, or pseudo-text. The rendered hero loaded at its full natural dimensions. | None for Draft PR. |
| Links and assets | PASS | Both internal article routes returned HTTP 200. All five current OpenAI primary pages were readable in the current web readback; direct anonymous curl was blocked with HTTP 403 by three openai.com pages, so availability was verified through the browser/web reader instead. Image metadata was regenerated and the production build resolved the article and assets. | Recheck volatile product availability before publication. |
| Desktop/mobile preview | PASS | Local production preview checked at 1280 px and a real 390 x 844 browser viewport. Title, hero, thesis, and `Kurz gesagt` render in order; hero is responsive; no horizontal overflow; browser console returned 0 error-level entries. | Remote Vercel preview may still require account access. |
| Targeted and repository tests | PASS | Red state was 0/3 because the article was absent; green article test is 3/3. Full `node --test` result is 173/173; `npm run check` reports 0 errors and 0 warnings; `npm run build` completed successfully. | None for Draft PR. |
| Release scope | PASS | Isolated issue-19 worktree; draft-only files; main checkout untouched. | Review final diff before commit and PR. |

## Known baseline limits

- `npm ci` reports 18 dependency advisories in the current lockfile baseline: 3 low, 4 moderate, 9 high, and 2 critical. This draft adds no dependency and does not change the lockfile.
- The local preview logs the expected Vercel Web Analytics message because analytics is not active on localhost; it is a log entry, not a console error.
- Direct video-stream download remains unavailable because YouTube returned HTTP 403. Complete captions plus 126 official storyboard samples cover the source timeline for this draft.

## Final boundary

- Draft readiness: PASS
- Publication readiness: UNKNOWN
