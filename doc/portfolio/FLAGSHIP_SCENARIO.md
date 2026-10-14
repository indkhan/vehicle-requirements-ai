# Flagship scenario: G60 i5 M60, Germany

Date: 14 October 2026

Status: Phase 0 source and walkthrough specification. The complete public package, recorded analysis, evaluation results, and hosted example have not been created or verified by this document.

## Product question and scope

The flagship asks: **How should a product manager improve perceived front-seat comfort for long journeys while preserving the support valued by other drivers?** The answer should be a traceable customer requirement and a reasoned PM decision, not an unsupported seat dimension or a claim of validated comfort.

Use the application's supported `g60-i5-m60` vehicle configuration. Germany (`DE`) is the only decision market; `EU` may describe its regional context, not a second population. Obtain the baseline asset and part-catalog identifiers from the actual application catalog when preparing the run. Do not substitute another collection vehicle or claim that a family-level G60 source establishes exact i5 M60 trim equipment.

The scenario covers customer requirements on comfort, usability, offering, and preservation of strengths. Engineering specifications, homologation, pricing, and a calculated business case remain outside it. Optional Reimagine is a separate visual exploration with explicit geometry and engineering limits; it is not a prerequisite for the evidence-to-decision walkthrough.

## Public package to prepare in Phase 1

Package identifier: `fwd-portfolio-g60-de-v1` (proposed). All counts below are authoring targets, not existing data or measured results. Create original, explicitly synthetic content rather than publishing supplied customer material. Keep the flagship separate from the evaluation development and held-out sets in [the evaluation rubric](EVALUATION_RUBRIC.md).

| Source | Planned content and role | Reuse and remaining preparation |
|---|---|---|
| Feedback workbook | About 12 invented logical records in `Feedback_Explorer`, scoped to Germany/G60. Include long-journey discomfort, a positive support preference, short-trip context, and a statement with unknown equipment. Identify records, not unique people. | Reuse the two invented records in [`integration-feedback.xlsx`](../../frontend/testing/fixtures/integration-feedback.xlsx) as an initial seed, retaining their original text and documented scope. Author additional records separately. Do not relabel the original two records as respondent identities or exact-trim observations. |
| Equipment/baseline PDF | One small, original synthetic equipment document with cover scope, edition date, model column, legend, package condition, an explicit unknown cell, and a locatable footnote. State prominently that its configuration is fictional and does not describe actual BMW availability. | [`tests/fixtures/pdf.py`](../../backend/tests/fixtures/pdf.py) demonstrates table/legend/footnote cases but returns a synthetic Docling document, not uploadable PDF bytes, and its model columns are 520i/530e. Reuse the testing pattern only. A new PDF must be rendered, manually referenced, parsed, and reviewed before the prepared example can use its extracted baseline. |
| Study workbook | One invented Germany/G60 comfort study with explicit method, time, scale, and sample-size meaning. Aggregate study results provide context and never increase feedback-record counts. | Reuse [`tests/fixtures/excel.py`](../../backend/tests/fixtures/excel.py) workbook generation and supported layout patterns from [`test_excel_context.py`](../../backend/tests/test_excel_context.py). Preserve explicit country/model header cells. The parser recognizes legacy `CN_EU_*`/`US_*` study layouts; an invented `DE_*` sheet name is not established support. Verify actual parsed scope instead of inferring it from a filename. |
| Sales workbook | A small invented Germany/G60 contextual series with explicit years and units. A projected value, if included, must be labelled a synthetic assumption, never a validated forecast. | Reuse workbook generation and market-code patterns from [`test_excel_sales.py`](../../backend/tests/test_excel_sales.py). Prefer a `G60` sheet and agreeing `Germany`/`DE` metadata. No sample represents actual BMW sales or establishes willingness to pay. |
| External claim | One short, originally authored fictional reference-product page describing a possible customer-facing approach. Explicitly label the page and every copied excerpt synthetic; include source date and its limited market/configuration. | Phase 1 may publish this original page with a stable locator as part of the example. It tests citation inspection and claim typing; it does not establish live web search, a real competitor advantage, or genuine market evidence. No new page or retrieval is created in Phase 0. |
| Counterevidence | A supporting-strength feedback record plus a separate original fictional external opinion or study limitation that challenges the proposed approach. Scope it so reviewers can judge whether it is comparable. | Preserve both positive support preferences and context differences. Long-journey discomfort versus short-trip satisfaction is not automatically an incompatible preference in the same cohort. A fictional opinion must remain opinion, not a capability fact. |

[`backend/app/demo.py`](../../backend/app/demo.py) already creates synthetic workbooks without private inputs, but its study and sales examples are US-scoped. Do not publish that complete package unchanged as this German scenario. The existing frontend fixture README records what the two-record workbook actually contains; it does not certify new records or the proposed six-source package.

### Provenance and permission boundary

Before publishing the Phase 1 bundle, its preparation owner must record, for every source: identifier, type, synthetic flag, author/owner, original location or generator, exact scope, edition/date, release permission or license, required attribution, transformation, and content hash. Add the actual generator/repository commit and hash after the file exists; never fill these fields with invented provenance. Record any unresolved permission as a release blocker for that source.

The original synthetic package is the preferred public material. No repository-level redistribution license was identified in this Phase 0 inspection. Existing synthetic fixtures therefore need an explicit owner-approved release basis; the fact that a file is committed is not permission evidence. Agree and record the release license for newly authored content before publishing it.

Do not include supplied `doc/googledrive` feedback/study/equipment files, challenge attachments, private originals, provider job records, credentials, or unreviewed screenshots containing them in the public bundle merely because they exist locally. Keep any private-corpus evaluation separate and publish aggregates only when authorized. Real BMW reference imagery and community 3D assets have independent provenance and attribution requirements; synthetic data permission does not cover those assets. Use a labelled fallback without bundling a third-party asset if its public delivery basis is unresolved.

If real external research is later included, review the specific source's excerpt/reuse basis, date, market and claim, retain a direct citation, and record actual retrieval provenance. A link is not permission to redistribute the whole source. The synthetic external-page path remains available when real-source permission or stable retrieval is unresolved.

## Walkthrough to demonstrate

1. Open the prepared Germany/G60 example. Entry identifies synthetic inputs and recorded output, preparation date, supported vehicle, and permitted interactions.
2. Inspect one comfort finding and its workbook row/cells. Show the actual logical-record denominator, partial coverage, and context rather than claiming a percentage of all customers.
3. Inspect baseline equipment and its legend/package condition. Missing or ambiguous information remains unknown; an existing option changes the interpretation of the customer need.
4. Review a customer-facing requirement with identifier, scope, target basis, validation method, maturity, supporting evidence, counterevidence, assumptions, and evidence level. Do not promise a particular generated requirement in advance of the run.
5. Explain its priority using the actual published factors and scoring policy. Unknown factors yield an unscored requirement; zero is a distinct value.
6. Inspect a recorded PM challenge, for example a request to distinguish comfort perception from existing equipment and preserve seat support. Review the saved revision or documented defense, then its decision and rationale.
7. Inspect chronological history and the exact-version JSON/XLSX export. Example replay or sandbox actions, if later added, are labelled separately from recorded server events.

Initial example is read-only. New evidence and reconsideration belong to later roadmap phases: add a revised source set to a linked child run, identify correspondence explicitly, and review changed requirements while retaining the parent decision. The current one-version-per-source model must not be presented as an already implemented continuous source lifecycle.

## Evidence required before the example is called complete

- Original files and manifest exist, with resolved public-use permission and prominent synthetic labels.
- Actual parser output has been checked against original files and manually authored locators. Schema compatibility is observed, not assumed from fixture shape.
- Recorded AI output, if used, comes from an actual run with model/prompt/parser/catalog configuration and source bindings retained. Static contract fixtures are not relabelled AI output.
- Source links, evidence identity, policy/factors, PM command/version, history and export agree. All published example citations are manually verified.
- A fresh visitor can inspect the example without local services or credentials. Direct mutation attempts cannot invoke a live provider or renderer.
- Model failure retains usable requirement/source review. Prepared, live, harness, geometry-produced, visually-reviewed, and engineering-validity states stay distinct.
- Evaluation and usability reports state their real sample sizes and observations. The 90–120 second walkthrough and useful-content-within-three-seconds goals are targets until measured.

## Practical ownership

One developer may own scenario assembly and integration. The project owner approves which material may be public and signs off the scenario's product scope. A separate reviewer checks source references and customer-requirement usefulness where available. The release owner checks manifest/export consistency and the public walkthrough. Record names, dates, outstanding gaps, and any combined roles in the later preparation report; these roles do not require a new team or communication integration.

Phase 0 delivers this definition only. Phase 1 creates and verifies the package and prepared adapter; Phase 2 evaluates the requirement review. See [the implementation plan](../PORTFOLIO_IMPLEMENTATION_PLAN.md) for later project, policy, regional and lifecycle work.
