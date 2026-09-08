# Claude Code und Codex kombinieren: Ein Modell baut, das andere prüft — Evidence ledger

| ID | Claim or step | Evidence state | Source locator | Editorial decision | Notes |
|---|---|---|---|---|---|
| E-001 | The creator source proposes using Claude Code and Codex as separate builder/reviewer roles with bounded review stages. | VERIFIED source understanding | S-001, S-002, S-003, S-004 | Use only as private topic radar; independently rebuild the public workflow. | Full captions and all storyboard sheets inspected; repository README and workflow files inspected. |
| E-002 | `codex exec` is the current non-interactive Codex entry point and defaults to a read-only sandbox. | VERIFIED | S-005 plus local `codex exec --help` on codex-cli 0.147.0 | Include current command and least-privilege warning. | Official docs recommend explicit `workspace-write` only when edits are needed. |
| E-003 | Claude Code supports non-interactive `-p`, structured output, explicit model selection, tool restriction, and permission modes. | VERIFIED | S-007, S-008 plus local `claude --help` on Claude Code 2.1.236 | Include a read-only-oriented reviewer command. | Safe mode prevents project customizations; the environment itself remains part of the security boundary. |
| E-004 | LLM judges can exhibit self-preference bias. | VERIFIED with scope limit | S-011 | Use only to justify skepticism toward self-grading; do not claim a second provider always improves code review. | The paper studies LLM evaluation, not this exact coding workflow. |
| E-005 | GPT-6 Astra and Claude Fable 5.1 are current high-capability candidates for difficult work. | VERIFIED | S-009, S-010 | Present as candidates, not mandatory defaults or a universal ranking. | Availability still depends on account and CLI. |
| E-006 | Different provider does not equal independent truth. | INFERRED | E-004 and general verification contract | Make this an explicit limitation and require tests plus human release decisions. | Cross-provider error correlation for this exact workflow was not measured. |
| E-007 | The public article is independently structured and contains no copied code, creator experience, or public creator attribution. | VERIFIED in draft | Article diff plus similarity scan pending | Run phrase similarity against full captions before release. | Private dossier retains source provenance. |

## Contradictions

- The creator frames the opposite provider as independent review. The public article narrows this to a fresh second perspective because provider diversity cannot guarantee correctness.
- The creator discusses model prices and personal routing choices. Those claims are not needed for the reader job and are excluded to avoid duplicating the existing model-comparison draft.

## Author-needed slots

- Human editorial review and publication approval remain pending.
