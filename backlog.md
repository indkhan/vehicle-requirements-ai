# Deferred pipeline capabilities

The current product analyzes files uploaded for a run and supports PM edits and reruns against those inputs. The [portfolio implementation plan](doc/PORTFOLIO_IMPLEMENTATION_PLAN.md), accepted for implementation on 14 October 2026, expands the future scope below. Phase 0 defines the supported [flagship scenario](doc/portfolio/FLAGSHIP_SCENARIO.md), [evaluation rubric](doc/portfolio/EVALUATION_RUBRIC.md), and release baseline; it does not implement ongoing ingestion or reconsideration.

## New evidence and source refresh

- Phase 4 plans manual source-set refresh through a linked child run, comparison with its immutable parent, and explicit reconsideration of affected requirements. These are planned capabilities, not current behavior.
- Scheduled imports, source connectors, source refresh automation and continuous monitoring remain optional later work after manual reconsideration is evaluated.
- Detecting newly arrived evidence automatically and creating ongoing review tasks remain deferred; the first lifecycle slice starts from a user-supplied revised source set.

## Automatic reconsideration thresholds

- Rules for when new evidence should automatically trigger reanalysis or a proposed requirement revision remain deferred. Phase 4 first establishes explicit lineage, changed-evidence review, and PM confirmation.
- Separate policies for software, physical product and other issue types, if justified by evaluation.
- Define the denominator, minimum evidence, deduplication and policy ownership before using affected-customer thresholds. Feedback records must not be represented as unique people without respondent identifiers.
- Revisit how these rules operate in autonomous and guided modes when ongoing evidence ingestion is implemented.

## Current scope boundary

- Initial uploads remain in scope, including multiple regional files and partial evidence packages.
- Deep Dive is an initial run option: research competitor approaches and public feedback for identified customer needs, capture the evidence, and use it in proposals. This bounded research is in scope; automated ongoing external-source refresh remains deferred.
- PM edits, exclusions, additions, cohort grouping and alternative proposals remain in scope.
- Rerun only affected analysis using the current source snapshot; preserve previous results and decisions.
- Autonomous completion is the primary path. Optional PM checkpoints are a secondary mode of the same pipeline.
- Automotive lifecycle scope remains market research/needs analysis and product planning (steps 1 and 2).
- Phase 5 plans scoped regional evidence review inside the requirements workspace with explicit denominators and comparability limits. A separate cross-model or general competitor dashboard is not part of the portfolio release. Regional differences within uploaded evidence remain relevant to conflict detection and proposal variants.
