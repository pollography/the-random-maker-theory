# QA: TRMT precise image prompts

Date: 2026-09-01

Release branch: `codex/trmt-specific-prompts-release-20260901`

Release worktree: `D:\\AI_Workspaces\\Claude_Code\\.release-worktrees\\trmt-specific-prompts-release-20260901`

Base: `origin/main` at `7c5142e730c611bb5ea3e9f2b2d36ea86bfab3ac`

## Verdict

**PASS as a production release candidate.** The earlier 24-prompt package was rebased by semantic integration, not by overwriting current files. The 123 entries from the already published Part-3 release and all image-SEO changes from the current main branch remain present.

The only partially successful visual experiment is the two-layer moiré portrait. It remains clearly labeled `EXPERIMENT · TEILWEISE` in the PDF and is described honestly in the article.

## Delivered scope

- One German TRMT article with 24 complete Creative Briefs and three reusable follow-up prompts.
- Public library extended from 123 to **147** tested entries: 87 short prompts, 36 existing detailed Part-3 prompts and 24 new precise prompts.
- Existing **18 categories** preserved. The 24 new entries are assigned to the established Fotoexperimente, Material & Handwerk, Maker & Tech and Welten & Filmszenen categories.
- Twenty-four square result images, four family boards, one hero image, one article thumbnail and 24 compact library thumbnails.
- Separate 13-page landscape PDF containing all 24 full prompts and their result images.
- Existing six-page short-prompt PDF and twelve-page Part-3 PDF remain separate and unchanged by the new generators.
- Library page updated to 147 entries and three clearly named PDF downloads.

## Content and data QA

- Exact source fidelity: **PASS**. All 24 `promptText` values occur verbatim in the article and PDF.
- Prompt blocks: **27** total, comprising 24 full prompts and three follow-up prompts.
- Public data: **147 tested**, **17 private ideas**, **164 unique ids** and **164 unique commands**.
- Precise results: **23 confirmed**, **1 partial**.
- Search, category assignment, copy behavior, article links and local image references: **PASS**.
- Article date: **2026-09-01**; SEO title, description, slug, hero and library links are present.
- The existing Part-3 article now points to the correct 147-entry library without changing its tested content.

## Automated checks

- Node test suite: **60/60 PASS**.
- Python asset and PDF suite: **22/22 PASS** using the bundled document runtime.
- `npm run check`: known baseline only, **78 errors and 9 warnings in 10 unrelated pre-existing files**. No diagnostic points to a release file.
- `npm run build`: SSR and client compilation **PASS**, including the new article chunk and updated library route. Final Windows adapter packaging reaches only the known `EPERM` symlink restriction at `.vercel/output/functions/api/indexnow.func`.
- Image metadata: **515 entries** and **72 blog image maps** generated successfully.

## PDF QA

- Public PDF and QA twin are byte-identical.
- Pages: **13**: one cover plus twelve content pages with exactly two prompts each.
- Full prompts: **24/24**, each extracted exactly once.
- Prompt body size: **11.2 pt** on all 24 prompts; enforced minimum is 10.5 pt.
- Result previews: **136 pt square**.
- Public file size: **2,318,743 bytes**.
- SHA-256: `46FF6D415E073BE4E46F2D71E304E52FECB172CCA9F1C609C8402F3D8DE46BD4`.
- Fresh visual contact-sheet inspection: **PASS** for all 13 pages. No clipping, overlap, missing result, missing footer or unreadable prompt block found.

## Release verification

Pending until the guarded main push and production deployment complete. The final commit, GitHub Actions run, live HTTP checks, canonical, Article JSON-LD, sitemap, RSS and live PDF hash will be appended after deployment.
