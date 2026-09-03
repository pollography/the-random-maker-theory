# Claude Fable 5.1 markiert Texte: Was das Wasserzeichen wirklich erkennt — Evidence ledger

| ID | Claim or step | Evidence state | Source locator | Editorial decision | Notes |
|---|---|---|---|---|---|
| E-001 | Fable 5.1 outputs receive a text watermark because the model was released after 2 August 2026. | BELEGT | S-ANTHROPIC-LAUNCH, section `Compliance with the EU AI Act` | USE | Scope the statement to Fable 5.1 and note the transition for older models. |
| E-002 | The watermark adds no hidden characters, extra tokens or personal/account data. | BELEGT | S-ANTHROPIC-WATERMARK, intro and user FAQ | USE | Distinguish text watermark from file metadata. |
| E-003 | The method changes sampling among plausible next tokens using context and a key. | BELEGT | S-ANTHROPIC-WATERMARK, `What is watermarking?`; S-NATURE-SYNTHID, `Watermarking with SynthID-Text` | USE | Explain in beginner language without reproducing the radar source's analogy. |
| E-004 | A detection result estimates likely Claude involvement, not authorship, ownership or a different model. | BELEGT | S-ANTHROPIC-WATERMARK, limitations and `What does a watermark actually prove?` | USE | Make this the central corrective thesis. |
| E-005 | Longer free-form text offers more evidence; small, factual, proofread and code samples are weaker cases. | BELEGT | S-ANTHROPIC-WATERMARK, limitations, proofreading and code; S-NATURE-SYNTHID, detection section | USE | Do not invent a character or word threshold. |
| E-006 | Anthropic's keyed detection API is in private preview for eligible organizations. | BELEGT | S-ANTHROPIC-LAUNCH and S-ANTHROPIC-WATERMARK, detection API section | USE | Do not claim ordinary public classifiers are fake; explain that they use a different method. |
| E-007 | Light editing may preserve signal; a complete rewrite can remove original token evidence; Claude translations are newly watermarked. | BELEGT | S-ANTHROPIC-WATERMARK, editing and translation FAQ | USE WITH LIMIT | State the limit but provide no bypass recipe or tool chain. |
| E-008 | Supported image/file outputs use C2PA credentials rather than the statistical text mechanism. | BELEGT | S-ANTHROPIC-WATERMARK, `What about images and other files?` | USE | Keep wording to supported file types and vendor claim. |
| E-009 | Article 50 applies from 2 August 2026 and distinguishes provider marking from deployer disclosure. | BELEGT | S-EU-GUIDELINES, overview | USE WITH LIMIT | Add a no-legal-advice boundary and avoid declaring individual obligations. |
| E-010 | The creator source proposes an evasion workflow and makes unquantified short/long-text claims. | GESAGT, NICHT UNABHÄNGIG BELEGT | S-RADAR-VIDEO and S-RADAR-CAPTIONS | STREICHEN | Topic radar only. The article instead explains limitations and responsible editing. |
| E-011 | No new editorial image is required for the reader job. | REDAKTIONELL ENTSCHIEDEN | Article map and visual brief | USE | The mechanism is communicated more precisely by prose and a comparison table; no borrowed screenshot. |

## Contradictions

- The radar source frames public AI detectors as categorically deceptive. Primary sources only establish that non-key classifiers use a different method and have different limits. The categorical claim is omitted.
- The radar source implies practical short/long thresholds without a sourced cutoff. Primary sources support a continuous length effect, not a universal threshold.

## Author-needed slots

- None for draft readiness. Human review remains required before publication.
