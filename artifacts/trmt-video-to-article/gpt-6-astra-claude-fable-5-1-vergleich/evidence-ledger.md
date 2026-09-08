# GPT-6 Astra vs. Claude Fable 5.1 - Evidence ledger

| ID | Claim or step | Evidence state | Source locator | Editorial decision | Notes |
|---|---|---|---|---|---|
| E-001 | GPT-6 Astra launched on 2026-09-03 with staged availability | VERIFIED | OpenAI launch, intro and availability | USE | Rollout wording kept cautious. |
| E-002 | API id, 1.05M context, 128K max output, 2026-04-30 cutoff | VERIFIED | OpenAI API model card | USE | Direct technical facts. |
| E-003 | Standard price is $10 input, $1 cached input and $50 output per MTok | VERIFIED | OpenAI API model card, pricing | USE | Standard tier only. |
| E-004 | Above 272K input, full request uses 2x input/cache and 1.5x output rate | VERIFIED | OpenAI API model card, long-context pricing | USE | Framed as cost risk, not defect. |
| E-005 | Fable 5.1 standard input/output is $10/$50 and cache read is $0.25 | VERIFIED | Anthropic Fable page, pricing | USE | Direct comparison at matching unit. |
| E-006 | Astra leads Terminal-Bench 4.0 57.9 vs 55.8 and DeepSWE 74.1 vs 67.4 | VERIFIED_VENDOR | OpenAI launch, coding table | USE WITH LABEL | Explicitly called OpenAI-published, not independent. |
| E-007 | Fable leads AA Intelligence Index 65.7 vs 61.2 and HLE with tools 65.0 vs 57.2 | VERIFIED_VENDOR | OpenAI launch, professional and academic tables | USE WITH LABEL | Counterevidence to universal-winner claim. |
| E-008 | OpenAI reports OSWorld 2.0 72.6% at about 40 minutes vs Sol 65.7% at 75 minutes | VERIFIED_VENDOR | OpenAI launch, computer use | USE WITH LIMIT | Compared to Sol, not Fable. No general 1.9x claim. |
| E-009 | Astra supports broad built-in tools including computer use and MCP | VERIFIED | OpenAI API model card | USE | Tool list paraphrased. |
| E-010 | Codex can keep notes across context windows and search older context | VERIFIED_EXPERIMENTAL | OpenAI launch, Codex section | USE WITH LABEL | Experimental now, planned default later. |
| E-011 | Critical cyber classification and stronger monitoring may pause legitimate work | VERIFIED_VENDOR | OpenAI safety overview | USE | Operational limitation included. |
| E-012 | 4.2% capability-confabulation result is an internal adversarial eval, not a general hallucination rate | VERIFIED_VENDOR | OpenAI safety overview/system-card wording | USE WITH LIMIT | Prevents misleading universal percentage. |
| E-013 | CoT monitorability declined in adversarial tests versus GPT-5.6 Sol | VERIFIED_VENDOR | OpenAI safety overview | USE | Material caveat retained. |
| E-014 | Creator presents Astra as broadly superior and dramatically cheaper/faster | RADAR_ONLY | Full English captions and storyboard inspection | DO NOT USE AS FACT | Replaced with independently verified, mixed evidence. |

## Contradictions

- The radar framing suggests one broad winner. OpenAI's own tables show Fable 5.1 ahead on the Artificial Analysis Intelligence Index and Humanity's Last Exam with tools.
- The radar framing suggests a broad price advantage. Base input and output prices are equal, while Fable 5.1 has cheaper cache reads and Astra adds a long-context surcharge above 272K input.
- A speed claim against GPT-5.6 Sol cannot be generalized to Fable 5.1.

## Author-needed slots

- None. No first-person experience or user-owned test result was inserted.
