# Claude Code und Codex kombinieren: Ein Modell baut, das andere prüft — Brief

## Reader job

- Audience: German-speaking Claude Code or Codex users who understand basic Git and want a safer multi-agent workflow.
- Problem: Running two strong models together sounds useful, but without fixed roles, evidence, permissions, and stop rules it only multiplies context and cost.
- Useful outcome: The reader can set up a bounded coordinator, builder, reviewer, and proof loop with current CLI entry points.
- Why this deserves a TRMT article: The practical workflow is distinct from a model benchmark and adds reusable safety and verification guidance.

## Requested deliverable

- Format: standalone practical explainer with copyable prompts and current commands
- Language: German
- Public attribution requested: no
- Publication boundary: draft

## Constraints and decisions

- Confirmed decisions: route owns the only H1; opening is a two-sentence thesis; public article links current primary sources; creator media is topic-radar evidence only.
- Explicit exclusions: creator name, creator video, copied hooks, copied code, copied tests, personal claims, automatic merge or publication, numeric savings claims, universal model ranking.
- Open author decisions: none for the draft; editorial publication review remains pending.

## Acceptance criteria

- Normal case: article explains one bounded cross-provider builder-reviewer workflow and gives usable current CLI entry points.
- Missing or broken inputs: article explains baseline failures, absent acceptance criteria, stale authentication, unavailable models, and unknown review coverage.
- External errors and timeouts: article requires non-zero failures and unknown areas to remain visible instead of being counted as approval.
- Permissions and security: read-only reviewer, isolated worktree or clone, no secrets, least privilege, and no publication authority.
- Misuse: the second agent is described as a fallible reviewer, never an oracle or a security boundary.
- Load and cost: bounded rounds; no unmeasured savings claim.
- Dev versus production: local tests and build prove only the tested path; push, merge, deployment, and production remain separate gates.
