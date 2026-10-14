# Evaluation rubric for the portfolio release

Date: 14 October 2026

Status: evaluation design declared in Phase 0 before new prompt changes. No new semantic evaluation, user study, provider run, or accuracy result is claimed here. Freeze this rubric and source labels before changing extraction, research, or proposal prompts.

## What this evaluation answers

Can the application turn heterogeneous evidence into useful, scoped customer requirements, explain priorities, and retain an auditable PM decision without fabricating facts or certainty? Evaluate product correctness as well as successful API calls. A passing deterministic suite does not establish semantic AI quality; one attractive flagship example does not establish broad accuracy.

Evaluate the existing Germany/G60 flagship separately from hidden cases. Its sources are defined in [FLAGSHIP_SCENARIO.md](FLAGSHIP_SCENARIO.md). The current deterministic default score is `20 * (0.35 * impact + 0.25 * breadth + 0.20 * gap + 0.20 * future_relevance)` for supplied factors on a 0–5 scale; any unknown factor yields an unscored result. Test score arithmetic independently of human agreement about factor values.

## Planned samples and separation

These are initial targets, not files already authored, labels already collected, or measurements already achieved:

| Set | Target | Permitted use |
|---|---|---|
| Public flagship | About 12 logical feedback records plus the small heterogeneous package | Walkthrough, source inspection, prepared output and usability tasks. Do not count it as held-out quality evidence. |
| Development evaluation | 24 labelled logical feedback records across 8 source/review cases, with contextual files where applicable | Inspect failures, tune prompts/parsers and run repeatable regression checks. |
| Held-out evaluation | 24 different labelled logical feedback records across 8 source/review cases | Score the frozen candidate once for release assessment. No copying case text, labels, expected answers, or sibling paraphrases into prompt examples. |
| Pilot usability | 5 visitors approximating PM/portfolio-review tasks | Observe comprehension and workflow, not population-wide usability claims. Report actual recruitment and results if fewer participate. |

Thus the initial semantic evaluation targets 48 feedback records across 16 cases, separate from the showcase. Supporting equipment/study/sales/external documents are contextual evidence; they are not additional feedback records. Do not inflate the sample by counting duplicate bytes, repeated model runs, repeated requirements across variants, or multiple excerpts from one record as new independent observations.

Split by scenario/source family, not random worksheet rows. A duplicate, near-duplicate, translated copy, revised document, or paired counterpoint from a development source cannot become a held-out case. Keep related inputs together. The evaluation owner records split IDs/hashes and freezes original source files and manually authored labels before prompt tuning. An independently appointed reviewer should retain held-out labels until candidate configuration is frozen where practical.

If the same author sees every held-out label, describe the check as self-reviewed and do not imply independent blind validation. If a held-out failure is used for tuning, retire that case into development and author a fresh held-out replacement before making a new generalization claim. Archive the original failure/result; do not silently replace it in the published denominator.

## Cases that must be covered

Across development and held-out sets include long-journey complaints, positive strengths, different usage conditions, genuine comparable preference conflicts, duplicates, unknown respondent identity, unknown equipment, an existing optional capability, ambiguous baseline/legend/footnote, wrong market or vehicle, incomplete study denominator, future sales context, vague requests, implausible numeric targets, bilingual terminology, and external fact/opinion/inference with counterevidence.

Include benign instruction-like source text to check that uploaded content remains evidence rather than a command. Wrong-market and unsupported-vehicle cases are evaluation negatives; their inclusion does not expand the flagship's German decision scope. Add a small number of parser/retrieval/access failures to verify explicit coverage and recovery rather than inventing successful content.

## Human reference labels

Reviewers read the original spreadsheet cells, rendered PDF pages, or frozen external passages before seeing application output. Existing parser output or model findings cannot serve as the reference answer. Each case label contains:

- Case/source IDs, hashes, edition/date, exact row/cells or page/region/passage, and source type.
- Explicit vehicle/market/year/equipment/software/usage scope, with unknowns retained.
- Logical-record identity and duplicate relationship; no inferred unique customer identity.
- Expected customer needs and preservation strengths, relevant supporting/opposing evidence, and reasonable alternative interpretations.
- Baseline status: supported, contradicted, unknown, or out of scope, with package/legend conditions.
- Expected distinction between complaints, capability absence, usability, offering and individual defects.
- Acceptable customer-facing outcomes, validation needs, and examples of unacceptable unsupported targets or engineering conclusions.
- Claim type, applicability, evidence level, uncertainty, and any comparator whose context prevents direct comparison.

Labels describe acceptable outcomes, not one canonical generated sentence. Reviewers may mark several defensible proposals or priorities. Preserve disagreements and adjudication notes. Label a required customer need as missed when no output covers it; do not hide omissions by evaluating only the produced suggestions.

## Requirement usefulness rubric

Score every unique published requirement in the assessed cases. Use its version and declared scope as part of identity; do not count the same requirement again merely because it appears in two compatible variants.

| Dimension | 0: unusable | 1: partial | 2: useful |
|---|---|---|---|
| Customer outcome and actionability | No understandable outcome, or out-of-scope engineering/regulatory/cost specification | Relevant need but vague proposed change | Clear customer-facing outcome that a PM can review or commission for validation |
| Evidence grounding | Missing, fabricated, or contradictory support presented as support | Relevant support with incomplete conditions/locators | Intended source supports the scoped claim, and counterevidence is preserved |
| Scope and baseline | Wrong market/vehicle/configuration, or unknown baseline treated as absence | Scope/baseline partly retained with explicit gaps | Vehicle, market, conditions and baseline are correct or explicitly unknown |
| Target and validation | Invented or proposed number presented as validated, or unrealistic unsupported promise | Proposed basis/method incomplete but honestly qualified | Specific outcome with justified metric/target where supplied, or explicit validation needed without an invented number |
| Uncertainty and tradeoffs | Important contradiction or existing strength hidden | Main limitations visible but incompletely explained | Material uncertainty, preservation strengths and relevant alternatives are visible |
| Priority and PM usefulness | Unsupported priority or automatic approval | Factors partly explained; review still needs substantial interpretation | Score/policy/factor rationales or unscored state are clear and enable a reasoned PM decision |

A requirement counts as useful when every dimension is at least 1, customer outcome and evidence grounding are both 2, and no critical integrity failure applies. Report the full dimension distributions as well as the useful fraction. Numeric specificity is not intrinsically good: an honestly unquantified comfort requirement with a concrete validation plan can be useful; an invented 10% comfort improvement cannot.

Two reviewers should independently rate the same outputs before discussing disagreements where available. One may be the implementation owner; the other should not have authored those prompts/cases. Record reviewer roles and initial ratings, exact agreement per dimension, adjudicated ratings, and disagreements. If only one reviewer participates, publish that limitation rather than an agreement statistic.

## Metrics and proposed release gates

Thresholds below are proposed initial gates. Report actual numerator, denominator, sample conditions, failures and configuration before calling a gate passed. Any revision must be dated and justified before a new candidate is scored; it cannot erase a failed earlier result.

| Measure | How to calculate and inspect | Initial gate/target |
|---|---|---|
| Citation identity and locator integrity | Correct intended-source citations / all produced citations; human checks original excerpts and deterministic checks identifiers. Missing required citations also count in needs coverage. | Every published flagship citation correct. Report held-out results separately; zero fabricated citations allowed. |
| Baseline/market integrity | Review every availability/configuration claim and its condition; count unflagged severe scope or unknown-as-absence errors per case. | Zero severe unflagged errors in any published showcase or assessed release case. |
| Target maturity and unsupported certainty | Review every number, validation status, external capability claim and approval state against source/event record. | Zero unsupported validated targets, invented approvals or opinion/inference promoted to fact. |
| Logical counts and coverage | Compare expected record identities, deduplication and denominator to finding output. Report counts and missed/partial sources. | Zero context metrics added to feedback denominators or records misrepresented as unique people. |
| Useful requirements | Requirements meeting the six-dimension rule / all unique produced requirements. Count unusable output rather than silently excluding it. | At least 80% on the initial reviewed sample, with actual requirement and case counts disclosed. |
| Expected-needs coverage | Required labelled needs represented by at least one defensible requirement / all required labelled needs. | Report development and held-out values separately. Establish a release recall target after initial baseline, before prompt changes; no recall success claimed in Phase 0. |
| Prioritization | Exact deterministic score/policy arithmetic; human factor-rationale plausibility and disagreements reviewed separately. | Correct arithmetic for all checked cases, null distinct from zero. No requirement for artificial human agreement on one perfect ordering. |
| History and version integrity | Compare original evidence/configuration, proposal identity, decision rationale/actor and selected-version export. Include chronological pagination and stale/retry cases. | Exact bindings and retry identity preserved; any historical data gap explicitly labelled. Current data cannot impersonate a historical snapshot. |
| Authorization and failure behavior | Foreign-workspace/expired-access attempts, malformed source, provider refusal and partial source package; deterministic integration checks. | No unauthorized successful read/mutation; failures remain bounded and source-specific where supported. |
| Pilot comprehension | Complete finding → source → priority → decision/history → export without assistance; answer what is synthetic, proposed and approved. | Target 4/5 unassisted completions and 90–120 seconds for the prepared inspection. Record mistakes and assistance, not just time. |
| Performance and provider usage | Actual stage durations, sample size, cold/warm context, output/input tokens, retries, parser/model/hardware settings. | Baseline first. Prepared useful-content-within-three-seconds is a goal under recorded test conditions, not an achieved result. Live speed/cost targets wait for measurements. |

Any critical integrity failure blocks publishing the affected requirement/example as trustworthy even if mean usefulness is high. Historical backend PDF reference thresholds in [PDF_EVALUATION.md](../../backend/PDF_EVALUATION.md) remain relevant to parser release checks, but its prior small measured samples are not new results from this evaluation or evidence of complete-corpus accuracy.

## Candidate freeze and reporting procedure

1. Freeze source cases, split manifest, reference labels, rubric revision and evaluation permissions before altering prompts. Capture the current baseline configuration and its observed output.
2. Improve using development cases only. Log changes to prompts, schemas, model, parser, retrieval policy and catalog so a later result is attributable.
3. Freeze the candidate commit and all configuration. Assess the held-out cases in a separate run. Real provider runs require the agreed bounded evaluation budget; deterministic CI and document work incur none.
4. Retain failed, refused, partial and missing outputs in the case report. If a technical retry is allowed, state the retry policy and report the first attempt as well as the retry; do not silently select the best response.
5. Review against original labels, record disagreements, and apply critical gates before usefulness averages. Keep public and private source permissions separate.
6. Publish aggregate development/held-out results separately, with configuration, case/record/requirement/citation counts, actual denominators, failures, runtime and usage. Do not publish private originals or credentials. Estimated costs need model price date and calculation assumptions; token counts alone are not an invoice.

The later evaluation report should include repository commit; rubric/source-manifest hashes; model and prompt/schema/parser/catalog/policy revisions; run dates and identities; dataset origin/synthetic status; source coverage; reviewer roles/count; all metric numerators/denominators; critical failures and dispositions; stage timing and provider usage; and limitations. Public synthetic labels can accompany the report once permissions are resolved; held-out labels stay separate from normal prompt/fixture inputs until the release assessment is complete.

## Practical ownership and Phase 0 completion

The evaluation owner assembles sources/splits and freezes labels. An independent reviewer checks source truth and usefulness where available. The implementation owner changes code/prompts using development feedback. The release owner records gates and public claims. One person may perform several roles, but the report must disclose that and distinguish self-review from independent evaluation.

Phase 0 is complete for this rubric when the source plan, sample targets, separation rules, labels, gates and ownership are defined and linked from the roadmap. Dataset creation, evaluation execution, prompt tuning, provider calls and achieved quality/usability claims belong to subsequent work. This document does not create those artifacts or authorize unbounded paid evaluation.
