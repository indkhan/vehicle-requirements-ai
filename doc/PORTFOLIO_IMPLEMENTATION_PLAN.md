# Portfolio implementation plan for the vehicle requirements application

Date: 14 October 2026

Status: Phase 0 implemented and locally verified on 14 October 2026, ready for review; later phases remain planned. See the [Phase 0 baseline](portfolio/PHASE0_BASELINE.md).

Implementation baseline: origin/main at d488483, inspected on 14 October 2026

Build a portfolio project that lets a visitor understand the product immediately, inspect an evidence-backed requirement, explain its priority, and follow a PM decision through later evidence changes. Preserve the existing ingestion, analysis, evidence, human review, versioning, recovery, and export pipeline. Improve its presentation and complete the missing lifecycle around it.

The first release should make one supported vehicle and market convincing. The flagship product improvement is reconsidering requirements when new evidence arrives. Broader vehicle geometry and enterprise integrations follow after the decision workflow is reliable and independently evaluated.

## 1. Product outcome and release boundaries

Positioning: **An evidence-backed requirements workspace for automotive product managers to explain priorities, review uncertainty, and track decisions as customer evidence changes.**

The primary user is a product manager reviewing customer requirements. The portfolio visitor is a recruiter, engineer, designer, or potential user who needs to inspect a useful example without configuring local infrastructure.

The flagship walkthrough is:

1. Open a prepared example for one supported derivative and market.
2. Inspect a customer need and its original source location.
3. Review the requirement, baseline, target basis, counterevidence, and priority factors.
4. Inspect a recorded PM challenge and the resulting revision or defended decision.
5. Review or make an explicitly labelled example decision and inspect its history.
6. Open the exact-version decision brief.
7. In the full release, add revised evidence and review the affected requirements while retaining the previous decision.

The initial example may be read-only. Any replay or sandbox action must identify what is prepared, what is simulated, and what is being saved. A prepared example must never imply that a visitor's upload has been analyzed.

### Release cuts

| Release | Included phases | Purpose |
|---|---|---|
| Portfolio preview | 0–2 | Hosted example, visible prioritization, polished requirement review, initial quality evidence |
| Portfolio release 1.0 | 0–6 | Persistent projects, reproducible history, policy comparison, evidence reconsideration, regional review, deployment, case study |
| Optional expansion | 7 | Additional verified geometry, selected integrations, collaboration depth |

A public live-upload service is not required for the preview. A separately authenticated live environment must exercise the real pipeline before release 1.0 claims end-to-end operation. Access to paid analysis remains bounded and separate from anonymous example browsing.

## 2. Current foundation and implementation constraints

Use the latest main branch when starting implementation. Phase 0 uses a separate managed worktree on codex/portfolio-phase-0, based on d488483; the earlier viewer worktree and its unrelated files remain intact. Preserve newer graph, geometry, research, and parser changes.

| Area | Existing foundation | Remaining work |
|---|---|---|
| Analysis | XLSX/PDF ingestion, source-linked findings, baseline checks, Deep Dive, scoped alternatives | Evaluate semantic quality and runtime on a reproducible sample; make results easier to review |
| Prioritization | Four factors, factor rationales, deterministic score, named policy version | Surface these prominently; later add frozen policy details and audited scenario comparison |
| Human review | Edit, approve, reject, defer, guided checkpoints, idempotent commands | Consolidate review into one decision sheet; add project-level reconsideration |
| History | Immutable proposal versions, decisions, chronological history, exact-version exports | Historical finding/research reads, side-by-side diff, cross-run lineage |
| Entry | Collection, workshop, local seeded access shortcut, mock/harness modes | Public prepared example, explicit environments, normal authenticated access |
| Visualization | Polished 360 viewer, reference model, verified editable geometry, tags and fallback | Keep it reliable; expand only a few explicitly supported operations later |
| Operations | Backend CI, readiness route, telemetry foundation, worker recovery | Frontend CI, browser smoke coverage, deployment and measured stage-level performance |

Important constraints:

- Current main already fixes audit pagination to chronological timestamp/ID ordering. Verify its regression coverage; do not schedule a duplicate fix.
- The local entry shortcut in FrontendApp uses seeded development access. It is not a public deployment authentication design. Production builds must not inherit development credentials or embed live tokens through VITE variables.
- SourceVersion currently has a unique source_id. Every uploaded Source has one version. Run creation and source downloads assume that relationship.
- First evidence-refresh implementation should create a linked child run with an explicit new source set. Keep the parent immutable and reuse the existing parse cache.
- Finding and requirement identifiers include run/generation context. Cross-run correspondence requires an explicit mapping; prose similarity cannot establish identity.
- Immutable proposal reads exist. Historical finding counts and research are currently exposed as current resources in the explanation UI. Do not present current resources as historical facts.
- Backend scoring uses 35/25/20/20 weights. Unknown factors produce an unscored requirement. Keep unknown separate from a zero score.
- Public collection breadth does not establish analysis or exact-trim geometry support. Label browse-only configurations before visitors try to create an analysis.

## 3. Priority and effort

P0 means necessary to understand, trust, or reliably demonstrate the product. P1 means necessary for the complete portfolio release and its distinctive lifecycle. P2 means useful after that release.

| Priority | Workstream | First phase | Why |
|---|---|---|---|
| P0 | Reproducible baseline and frontend CI | 0 | Prevent new work from hiding regressions |
| P0 | Hosted prepared example and honest demo entry | 1 | Eliminate setup friction |
| P0 | Requirement decision sheet and priority explanation | 2 | Put the challenge's central value in front of the user |
| P0 | Quality and usability evaluation | 0, 2, 6 | Support claims with measured results |
| P1 | Project library and normal sign-in | 3 | Make work durable and accessible across sessions |
| P1 | Historical snapshots and proposal comparison | 3 | Make changes reproducible |
| P1 | Scoring-policy scenarios | 3 | Let PMs examine ranking assumptions |
| P1 | New-evidence reconsideration | 4 | Complete the strongest product differentiator |
| P1 | Regional evidence review and decision brief | 5 | Make scoped tradeoffs and handoff useful |
| P0 | Release polish, live deployment, portfolio packaging | 5–6 | Make the result inspectable and dependable |
| P2 | Expanded geometry and integrations | 7 | Add depth after the core workflow is complete |

Planning estimates assume one experienced developer, an available test environment, and approximately five focused development days per week. They include implementation and verification, not continuous full-time access to users or external providers.

| Phase | Focused effort | Dependency |
|---|---|---|
| 0 | 2–3 days | None |
| 1 | 4–6 days | Phase 0 |
| 2 | 6–9 days | Phase 0; uses Phase 1 example |
| 3 | 7–11 days | Phase 2 decision model |
| 4 | 10–15 days | Phase 3 projects and snapshots |
| 5 | 7–10 days | Phases 2–4 |
| 6 | 3–5 days | All release gates |
| Optional 7 | 5–10 days per selected expansion | Release 1.0 |

Phases 0–6 total roughly 39–59 focused days, or 8–12 working weeks. This is an effort estimate, not a deadline. Re-estimate after Phase 0, the first evaluation, and the lifecycle contract spike. The useful preview should ship after roughly 12–18 focused days.

## 4. Phase 0 — Establish the release baseline

**Outcome:** a reproducible starting point, clear scope, and automated checks.

### Tasks

1. Start from current main in an implementation branch. Preserve the merged viewer changes and newer graph/geometry improvements.
2. Record fresh frontend tests, typecheck, build, backend tests, contract consistency, and deployment readiness. Historical test counts are context, not new verification.
3. Select one supported analysis vehicle and one market. Keep unsupported collection choices browsable without substituting another baseline.
4. Define the example source package: a small feedback workbook, equipment/baseline evidence, one study, a relevant external claim, and counterevidence. Use material suitable for public redistribution or replace it with a clearly labelled synthetic/public package.
5. Create an evaluation rubric before making prompt changes. Establish a held-out set separate from the flagship walkthrough.
6. Add frontend CI for installation, tests, typecheck, build, and a focused browser smoke flow. Preserve backend CI and its real contract checks.
7. Verify chronology across audit pages, including equal timestamps and deliberately scrambled IDs. Confirm invalid or foreign-run cursors remain rejected.
8. Inventory stage timing and provider-usage metadata available in current main. Record missing measurements before optimizing.
9. Update scope/backlog documentation to reflect this roadmap when implementation starts. Keep old verification records as historical evidence.

### Primary code surfaces

.github/workflows/, frontend/package.json, frontend/testing/, backend/tests/test_evidence.py, backend/app/readiness.py, backend/app/telemetry.py, README.md, backlog.md, doc/frontend/SCOPE.md.

### PR slices

- F0.1: baseline report, flagship scenario, evaluation rubric, and scope reconciliation.
- F0.2: frontend CI and deterministic browser smoke.
- F0.3: any confirmed readiness, chronology, or contract regression found by the baseline checks.

### Exit gate

- Clean checkout can install, test, and build with documented commands.
- Browser smoke requires no paid provider call.
- Chronological history and workspace isolation pass.
- Public example provenance, source type, supported scope, and evaluation ownership are defined.
- Blocking baseline defects have an explicit fix or release boundary.

## 5. Phase 1 — Ship an inspectable prepared example

**Outcome:** a visitor can open a useful workshop immediately.

### Tasks

1. Add a prominent “Try example project” action while retaining the collection and 360 browsing.
2. Separate three environments: prepared example, authenticated live workspace, and development contract harness. Show that distinction at entry and within the workspace.
3. Remove unconditional development access from production entry. Retain an explicitly development-only shortcut for local use.
4. Package a versioned example bundle containing sources/excerpts, findings, proposals, factor rationales, research, recorded decisions/history, export, and fallback visual assets.
5. Give the bundle a manifest with schema version, preparation date, vehicle/market scope, source versions, analysis provenance, permitted interactions, and content hashes.
6. Implement an explicit demo adapter through the existing API boundary. Add environment/capability metadata instead of pretending prepared output is live. Reuse normalizers and components rather than building a second workshop. In read-only mode, reject upload, run creation, edit, decision, analysis, and render calls, including generic API requests; expose no mutation actions and never fall back to the live transport.
7. Start with read-only recorded decisions and a labelled replay of one PM challenge. If a sandbox is added, state that its decisions are illustrative, session-local, and separate from server audit history.
8. Make source inspection and requirement review work when the model fails to load. Bundle reliable visual fallbacks.
9. Retain the example selection through refresh and browser navigation. Provide a clear reset action.
10. Publish a static preview with direct links to the workshop and selected example requirement.

### Primary code surfaces

frontend/src/FrontendApp.tsx, App.tsx, ApiAccess.tsx, collection/Journey.jsx, api/contracts.ts, api/client.ts, api/normalize.ts, components/AcceptanceEnvironment.tsx, SourceDialog.tsx, HistoryPanel.tsx.

Proposed additions: frontend/src/demo/demoManifest.ts, frontend/src/api/demo.ts, and a small public example bundle. These are proposed locations, not existing modules.

### PR slices

- F1.1: manifest, source package, schema validation, and example adapter.
- F1.2: entry action, explicit environment labels, and development-access boundary.
- F1.3: recorded review/replay, source inspection, export, reset, and hosted preview.

### Exit gate

- Fresh visitor opens the example without an account, token, local API, or AI key.
- Visitor can inspect evidence, requirement, recorded decision, and export.
- Example cannot invoke a paid analysis or geometry job.
- Direct mutation attempts through the read-only adapter are rejected without network requests.
- No uploaded bytes are presented as analyzed by the prepared example.
- Broken model/source states explain the issue and preserve usable review content.
- Keyboard navigation and narrow-screen layout pass.

## 6. Phase 2 — Make requirements and priorities clear

**Outcome:** one concise decision sheet replaces scattered review details, supported by an initial evaluation.

### Tasks

1. Add a shared PriorityBreakdown component using server-provided score, factors, factor rationales, and policy version. Do not recompute authoritative scores in the browser.
2. Show priority, evidence strength, and decision state on suggestion cards or a compact ranked list. Keep negative-feedback share as a separate finding measure.
3. Extract the existing SuggestionReview into a focused RequirementReview component while retaining its command, draft, and retry behavior.
4. Organize the decision sheet around:
   - customer outcome and requirement identifier;
   - vehicle, market, cohort, equipment/software context, and applicable dates;
   - current baseline and proposed change;
   - target, unit, conditions, proposed basis, maturity, and validation method;
   - supporting evidence, counterevidence, and source locations;
   - priority factors, uncertainty, assumptions, and PM rationale;
   - approve, reject, defer, or edit.
5. Keep missing baseline, unknown evidence strength, unscored priority, and unvalidated targets explicit. Display a valid zero correctly.
6. Place contextual evidence next to the claim it supports. Keep deeper diagnostics expandable.
7. Preserve mandatory decision rationale, exact-version binding, stale-edit reconciliation, unsaved drafts, and same-key retries for uncertain requests.
8. Apply the approved neutral off-white/charcoal style across the decision surface. Reuse the existing design rather than introducing a new visual world.
9. Build a small independently reviewed evaluation set and use it to improve extraction/requirement quality. Cover realistic, specific customer outcomes rather than arbitrary component dimensions.
10. Test the walkthrough with 3–5 people approximating target users. Record completion, time, wrong interpretations, and assistance needed.

### Primary code surfaces

frontend/src/components/WorkshopSummary.tsx, ChangeExplanation.tsx, ProposalWorkspace.tsx, EvidenceList.tsx, FindingDetails.tsx, SourceDialog.tsx, api/contracts.ts, api/normalize.ts, ui/workshop.css.

Proposed additions: PriorityBreakdown.tsx and RequirementReview.tsx. Reuse backend Change and Factors fields; add API fields only where a required fact genuinely is unavailable.

### PR slices

- F2.1: visible priority and factor rationale.
- F2.2: unified requirement decision sheet and source inspection.
- F2.3: responsive/accessibility pass and state coverage.
- F2.4: evaluation runner, first results, and observed quality fixes.

### Exit gate

- User can explain a requirement's ranking and inspect both supporting and opposing evidence without searching multiple panels.
- Unknown and zero scores remain distinct.
- A requirement cannot acquire an unsupported validated target or fabricated approval.
- Keyboard focus returns to the originating requirement after review.
- Existing stale-version, retry, export, and draft-preservation checks still pass.
- Initial quality report and usability observations are recorded.

**Release the portfolio preview here.** Do not delay it for connectors, broad generation, or multiuser enterprise features.

## 7. Phase 3 — Add persistent projects and trustworthy comparisons

**Outcome:** users can return to their work, compare genuine historical versions, and inspect scoring scenarios.

### Tasks

1. Add a minimal Project entity containing workspace ownership, title, supported vehicle/context, creation/update metadata, archive state, selected run, and a concurrency revision. Associate runs without modifying their original configuration.
2. Add authorized, paginated project and run listing. Browser storage retains navigation and drafts; it must not become the authoritative project database.
3. Backfill legacy runs as unassigned or explicitly imported projects. Do not invent historical creation dates when no reliable event exists.
4. Add a small project library with create, rename, archive, search, open, and resume. Archive hides work without deleting evidence or decisions.
5. Connect normal sign-in to the existing backend OIDC validation. Do not build a password database. Preserve the manual token form as a development fallback if useful.
6. Extend proposal-version inspection with immutable, generation-bound finding/research reads. Freeze the exact dependencies needed when publishing future proposal versions. Define an explicit audit-sequence or timestamp/ID decision cutoff for historical inspection: today's decisions for a proposal version are different from its state at an earlier point. Preserve separate current and as-of views.
7. Build a within-run proposal diff using stable requirement identity. Verify that current edit operations preserve identity; introduce explicit correspondence where an analysis generation changes IDs. Compare wording, target/basis, scope, evidence links, factors, priority, uncertainty, and decision history.
8. Add a frozen scoring-policy snapshot: named weights, policy version, factor rubric revision, and scale. Legacy snapshots resolve the known default policy explicitly.
9. Add deterministic weight-scenario preview. Hold factors and evidence fixed; show scores, rank movement, ties, and unscored requirements. Preview performs no model call or save.
10. Applying a policy requires a rationale and base proposal version. Publish a new immutable proposal version; preserve old policy, approvals, and exports. Changed priorities require explicit review in the new version; earlier approval remains historical context rather than a silently inherited approval.

### Primary code surfaces

backend/app/db.py, main.py, auth.py, control.py, proposals.py, evidence.py, exports.py, wire.py, contracts.py, backend/migrations/versions/.

frontend/src/FrontendApp.tsx, App.tsx, ApiAccess.tsx, session.ts, runRecovery.ts, api/client.ts, api/wire.ts, components/HistoryPanel.tsx, ChangeExplanation.tsx.

Proposed additions: ProjectLibrary.tsx, ProposalDiff.tsx, PriorityScenario.tsx, and narrowly scoped backend project/policy modules if they provide a useful ownership seam.

### PR slices

- F3.1: project migration and workspace-owned list/create/archive API.
- F3.2: sign-in, project library, URLs, and resume behavior.
- F3.3: immutable historical analysis reads and within-run version diff.
- F3.4: frozen policy, deterministic preview, and audited policy publication.

### Exit gate

- Create → close/reload → reopen works for multiple projects.
- Foreign workspace IDs, revoked memberships, and forged project/run attachment fail.
- Switching projects preserves independent drafts and makes unresolved command outcomes visible.
- Historical counts/research never silently become current values.
- A later decision does not alter a comparison pinned to an earlier decision cutoff.
- Default policy reproduces current scores; weights must be finite, nonnegative, and total 100%.
- Unknown factors remain unscored; ties have stable ordering.
- Scenario preview changes no saved version, decision, or export.
- Stale policy publication is rejected; historical exports retain historical weights.

## 8. Phase 4 — Reconsider requirements when evidence changes

**Outcome:** the app supports an ongoing requirements process with inspectable lineage.

### Tasks

1. Add an “Update evidence” action inside a project.
2. Let users explicitly retain, replace, add, or remove sources. Show the proposed source set before starting analysis.
3. Treat a revised upload as a new Source in the first implementation. Do not remove SourceVersion uniqueness or change existing download semantics in this phase.
4. Create a child run linked to the parent and exact parent proposal version. Freeze target context, source set, reason, initiating actor, and creation time. Check that the parent's saved baseline/catalog is still supported: initially block incompatible refresh with an explicit rebase choice; never silently substitute today's vehicle assets. A retained versioned catalog registry can follow if real users need it.
5. Use the existing command/outbox/Temporal pattern. Reuse workspace/content/parser-policy parse cache, but do not promise cross-run AI-result reuse without a verified cache key.
6. Keep parent findings, proposals, decisions, assets, and exports untouched while the child runs or fails.
7. Produce impact candidates from evidence dependencies and source changes. A changed source can trigger review even when a final semantic match is uncertain.
8. Add explicit requirement correspondence: same, revised, split, merged, new, removed. Include matching basis and reviewer confirmation. Never equate similar text or different run IDs automatically.
9. Show a reconsideration queue with prior decision, changed evidence, scope/denominator differences, proposed outcome/priority, uncertainty, and next action.
10. Require PM review for ambiguous correspondence and material changes. Historical approval remains context; no approval transfers silently to a new requirement revision.
11. Publish the reviewed child as the project's selected revision through an explicit command using the expected project revision and selected parent run. Reject stale publication when another child has already been selected. Allow continued inspection of the parent and both children.
12. Start with manual refresh. Add automatic triggers only after evaluation establishes useful, explainable thresholds.

### Primary code surfaces

backend/app/db.py, main.py, commands.py, runs.py, ingestion.py, workflows.py, findings.py, proposals.py, control.py, exports.py.

frontend/src/App.tsx, components/HistoryPanel.tsx, ProposalWorkspace.tsx, api/client.ts, session.ts.

Proposed additions: RunLineage and RequirementCorrespondence records; SourceRefresh.tsx and ReconsiderationQueue.tsx. Source replacement metadata belongs to the project/reconsideration so an unrelated project cannot inherit it accidentally.

### PR slices

- F4.1: source-set preview, lineage migration, child-run command.
- F4.2: impact candidate calculation and explicit correspondence.
- F4.3: reconsideration queue and PM review.
- F4.4: publish/select project revision, rollback navigation, recovery, and adversarial integration cases.

### Exit gate

- Replacing a source does not silently include both old and new evidence.
- Declared record namespaces preserve deduplication; records are not misrepresented as unique customers.
- Same command key creates one child; conflicting reuse of the key fails.
- Parent proposal/export hashes and decisions remain unchanged.
- Worker interruption resumes; failed refresh retains the usable parent.
- Concurrent child publications cannot overwrite project selection silently; stale publication returns a conflict and both children remain inspectable.
- Unsupported historical catalog bindings block refresh or require explicit rebase.
- New or ambiguous requirements remain proposed.
- Split/merge/remove cases retain traceable relationships.
- Unknown comparability never becomes a claimed improvement in customer satisfaction.
- A complete old evidence → PM decision → new evidence → reconsidered decision walkthrough passes.

## 9. Phase 5 — Finish regional review, handoff, and deployment

**Outcome:** the product handles useful tradeoffs, exports a clear decision record, and operates reliably.

### Tasks

1. Add regional scope badges and filters beside evidence and requirements using supplied scope metadata.
2. Add a compact same-need regional comparison. Backend supplies scoped counts, denominator definitions, applicable source dates, and comparability notes. Do not calculate market totals from partially loaded UI lists.
3. Show opposing regional preferences as scoped alternatives. Missing markets stay missing; overlapping findings are not summed.
4. Validate one additional vehicle or market configuration using the same pipeline. Prefer a second market on the existing verified vehicle first; additional vehicle analysis needs an actually supported catalog. Identify exactly what was tested and what remains browse-only.
5. Add a concise decision brief alongside JSON/XLSX: selected version, scope, requirement list, priority/rationale, evidence links, decisions, open assumptions, and next validation steps.
6. Generate the brief from the inspected immutable snapshot and frozen decision cutoff. Include identifiers, preparation date, and provenance. An accessible web/print view is the first slice; PDF export follows if needed.
7. Extend existing telemetry with stage duration, queue wait, provider calls/usage, correction attempts, cache hits, parsing failures, and recovery outcomes. Avoid collecting raw private evidence in operational logs.
8. Profile current-main runtime before changing batching/retrieval. Reduce one measured bottleneck at a time and rerun held-out quality evaluation.
9. Show stage progress and measured elapsed time. Add an estimate only after measured samples support it.
10. Deploy the authenticated application with real /api routing, database, worker, Temporal, persistent storage, and existing OIDC checks. Keep the public prepared example independent of live provider availability.
11. Enforce live job/upload limits and record budget usage. Readiness must distinguish dependency health from configured optional capabilities.
12. Verify restart/reconnect, private asset/source access, version-bound downloads, backup/restore, and deployment rollback.
13. Apply one bounded responsive and accessibility pass to entry, library, review, diff, reconsideration, export, and viewer controls.

### PR slices

- F5.1: regional evidence contract and review surface.
- F5.2: exact-version decision brief.
- F5.3: stage telemetry and measured performance fixes.
- F5.4: authenticated deployment, operational smoke, and final UX corrections.

### Exit gate

- Regional comparisons explain their denominators and limits.
- Second configuration runs successfully without substituting an unrelated baseline.
- Decision brief matches the chosen historical version and audit cutoff.
- Prepared example remains inspectable during API/provider outage.
- Authenticated live upload → findings → review → export passes on the deployed environment.
- Restart preserves work; expired access stops mutations and retries until access is restored.
- Preview and live environments remain visibly distinct.
- Keyboard, mobile, reduced-motion, focus, contrast, loading, empty, failure, and recovery states pass.

## 10. Phase 6 — Package the portfolio release

**Outcome:** a reviewer can understand the project and assess its engineering and product value quickly.

### Tasks

1. Repeat the flagship walkthrough with fresh visitors. Aim for an unassisted 90–120 second inspection; record actual completion rather than presenting the target as achieved.
2. Compare a small set of PM-like tasks with a manual spreadsheet/source-review process. Record correctness and decision usefulness alongside time.
3. Publish the evaluation sample size, method, model/prompt/parser versions, observed failures, latency, and provider usage. Mark any estimated cost with the price date and assumptions.
4. Record a short product demo showing evidence → requirement → rationale → decision → new-evidence reconsideration. Label prepared analysis and replayed steps.
5. Rewrite README's opening around the user problem, live/example links, screenshots, supported scope, and quick start. Link deeper setup and verification material instead of putting all infrastructure details first.
6. Add a case study with problem, design decisions, architecture, evaluation, failures fixed, tradeoffs, individual contribution, and future scope.
7. Add an architecture diagram showing frontend/API, database, worker/Temporal, source storage, research/provider, and optional renderer boundaries.
8. Organize public assets and repository metadata. Retain source/model attribution and use redistributable example data.
9. Run release checks on the release commit, tag version 1.0, and record deployment/rollback instructions.

### Exit gate

- README and hosted example make the purpose clear in the first screen.
- Reviewer can inspect a complete evidence-to-decision example without setup.
- Case study separates implemented, measured, prepared, and future capabilities.
- Published evaluation has reproducible inputs/configuration and reviewed failures.
- Fresh frontend/backend/contract/browser checks pass on the release commit.
- Normal tests make no paid calls; live checks have an explicit bounded budget.
- Both code and product walkthrough identify the author's contribution accurately.

## 11. Phase 7 — Optional expansion after release

Choose at most one workstream at a time using observed user needs.

| Expansion | First useful slice | Gate before expansion |
|---|---|---|
| Verified Reimagine operations | One additional independently mapped component and bounded operation | Geometry measurements, matching-camera review, unaffected-part preservation, explicit engineering limits |
| Reviewer collaboration | Owner, comments, review requests, two supported roles | Project permissions, attribution, stale-version handling |
| One source connector | Import from one actual user source with manual refresh first | Stable source identity, retries, deduplication, project isolation |
| Scheduled refresh | One explainable review trigger and in-app queue | Manual reconsideration precision and user-tested thresholds |
| External handoff integration | Export/link one requirement to an issue tracker | Evidence/decision version stays traceable; integration serves a real workflow |
| Additional vehicle support | One verified baseline/catalog and evaluated dataset | Same contract/pipeline; no relabelled substitute asset |

Do not delay release for arbitrary vehicle redesign, numerous connectors, agent-management dashboards, billing systems, or extensive enterprise administration.

## 12. Proposed contracts and data changes

The routes and entities below are design proposals. They do not exist merely because they are listed here. Confirm names and compatibility in the implementation PR before adding frontend calls.

| Capability | Proposed data/API change | Compatibility rule |
|---|---|---|
| Projects | Project table; nullable Run.project_id; GET/POST /projects; GET /projects/{id}/runs | Existing run endpoints remain usable; workspace ownership enforced |
| Historical analysis | Generation-bound snapshot reader through the selected proposal's generation | Never fall back to current findings/research without explicit labelling |
| Policy scenarios | Frozen ScoringPolicy; POST /runs/{id}/priority-preview; audited policy publication | Preview is non-publishing and deterministic; default preserves legacy results |
| Evidence refresh | RunLineage; source-set relationship; POST /runs/{id}/reconsiderations | Child run is new; parent and exact source bindings remain immutable |
| Requirement lineage | Persisted correspondence records and reviewer confirmation | Cross-run matches are explicit; no title-based identity |
| Regional comparison | Scoped aggregates with record IDs/denominator and comparability metadata | Preserve existing counts; no population-prevalence inference |
| Decision brief | Snapshot-derived brief asset added to existing export workflow | Bind exact proposal version, source set, policy, and decision cutoff |

Keep frontend wire models and generated backend contracts synchronized. Update strict schemas, fixture responses, normalizers, mock/harness transports, and tests together. Prefer additive endpoints; introduce a negotiated/versioned contract when an existing payload's meaning changes. Do not simply change the current contract-version literal without supporting both sides.

The initial lifecycle deliberately avoids converting Source into a multiversion source series. A later conversion requires removing uniqueness, version metadata, explicit source-version selection, exact-version download routes, and migration of existing clients. It is not a prerequisite for the first useful reconsideration flow.

Historical decision state needs separate care: proposal snapshots and decision events are distinct. A comparison or export must use a defined decision cutoff and must not infer earlier approval state from today's status.

## 13. Evaluation and release targets

Start with approximately 40–60 labelled evidence records across 12–20 review cases. These are planning targets, not existing evaluation results. Include complaints, positive strengths, duplicates, wrong-market evidence, conflicting preferences, existing equipment, vague needs, implausible numeric targets, uncertain future assumptions, and bilingual source terminology.

Separate the flagship example, development cases, and held-out evaluation. Where possible, use an independent reviewer and record disagreements rather than treating one author's labels as objective truth.

| Measure | Initial release target | Measurement |
|---|---|---|
| Source identity and locator integrity | Every published example citation resolves to its intended source and location | Deterministic checks plus human excerpt verification |
| Unauthorized approval or cross-workspace access | Zero accepted attempts in adversarial tests | Backend integration tests |
| Scope and baseline errors | Zero unflagged severe errors in showcase cases | Human-labelled market/vehicle/equipment cases |
| Unknowns and target maturity | No unknown availability or proposed number silently presented as validated | Semantic evaluation and UI inspection |
| Requirement usefulness | At least 80% of reviewed requirements rated useful/actionable on a predefined rubric | Report reviewer count, agreement, and actual numerator/denominator |
| Quality coverage | Reviewed failures and sample sizes published | Versioned evaluation report |
| Example usability | At least 4 of 5 pilot users complete the core review without assistance | Recorded task sessions |
| Prepared example loading | Aim for useful content within 3 seconds under a documented test condition | Multiple cold/warm measurements |
| Live processing | Baseline recorded first; improve dominant bottleneck without quality regression | Stage timing, usage, held-out comparison |
| History and recovery | Correct chronological pagination, immutable old snapshots, exact retry behavior | Fault-injection and integration cases |

Targets are proposed acceptance criteria and may be revised after the baseline, with the revision documented. Never advertise a target as an achieved result. Report distributions and sample conditions rather than one favorable latency number.

## 14. Working method and initial implementation queue

Use small reviewable PRs with a concrete trigger, resulting behavior, relevant tests, and known limits. Start each phase from current main. Reuse the API boundary, command/outbox pipeline, existing source parsing, and immutable proposal storage.

For UI-only refinements, use focused component/browser checks and build validation. For new contracts or data behavior, add meaningful regression/integration tests before implementation. Normal CI remains deterministic; paid provider and geometry checks stay opt-in.

The first five implementation PRs should be:

1. Fresh baseline, flagship example contract, evaluation rubric, and scope/backlog reconciliation.
2. Frontend CI and example-entry browser smoke.
3. Versioned prepared example bundle and explicit demo adapter.
4. “Try example project,” environment labels, production/development access separation.
5. Visible priority factors and unified requirement decision sheet.

Evaluation work begins with PR 1 and runs through every phase. Project, snapshot, policy, and lifecycle changes start only after the core decision sheet and its identity model are stable.

## 15. Definition of done

Release 1.0 is complete when all of the following are true:

- A visitor can inspect the prepared example without setup.
- An authenticated user can upload evidence, obtain traceable requirements, review priorities, decide, and export.
- A returning user can reopen multiple projects and compare real historical snapshots.
- Revised evidence creates an inspectable reconsideration flow without rewriting previous decisions.
- Regional differences and uncertainty remain explicit.
- Evaluation and operational measurements support the published claims.
- The neutral interface works across desktop, mobile, keyboard, reduced motion, and failure states.
- CI, deployed smoke checks, recovery, and rollback instructions are in place.
- README, architecture, short demo, and case study communicate the problem, implementation, results, contribution, and limits.

## 16. Repository references

- [Challenge briefing](BMW_Hackathon_Briefing_Short.pdf)
- [Organizer guidance](more.md)
- [Original product plan](BMW_AI_Requirements_Full_Plan.md)
- [Current deferred capabilities](../backlog.md)
- [Frontend behavior and scope](../frontend/README.md)
- [Backend setup](../backend/README.md)
- [Measured integration evidence](../backend/TESTING_HANDOFF.md)
- [Geometry proof and boundaries](reimagine-verification.md)
- [Existing source/version model](../backend/app/db.py)
- [Priority calculation](../backend/app/proposals.py)
- [Historical explanation boundaries](../frontend/src/components/ChangeExplanation.tsx)

This roadmap extends earlier deferred scope. Historical verification documents describe what was tested at their recorded commits; they are not substitutes for fresh release checks.
