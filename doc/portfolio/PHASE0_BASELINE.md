# Portfolio Phase 0 baseline

Date: 14 October 2026

Baseline: origin/main d4884836c93b30a8551fb9f0252cf226215c5ddb. Implementation branch: codex/portfolio-phase-0 in a separate managed worktree. The older viewer checkout and its untracked files were preserved.

Phase 0 adds frontend CI, deterministic browser smoke, a public-example source specification, an evaluation rubric, and a small regression repair discovered by fresh checks. It does not implement the prepared example, new projects, policy editing, or evidence-refresh features.

## Frontend verification

Environment: macOS ARM64, Node.js 25.9.0, npm 11.12.1, Playwright 1.64.0. Dependencies were installed from the existing lockfile with npm ci. Chromium 156.0.8078.4, Playwright revision 1248, was installed for smoke.

| Check | Fresh result |
|---|---|
| npm ci --no-audit --no-fund | Passed; 128 packages installed |
| npm test -- --maxWorkers=2 | 513 passed, 1 opt-in live test skipped; 53 files passed, 1 skipped; 144.77 seconds on this host during parallel verification |
| npm run typecheck | Passed |
| npm run build | Passed; 1,964 modules transformed; 5.00 seconds in the recorded run |
| npm run test:smoke | 4 passed; desktop and mobile supported/unsupported flows; 24.7 seconds after final recovery/export-origin assertions |
| actionlint 1.7.12 on frontend.yml | Passed |
| git diff --check | Passed |

These local durations describe this host and workload, not a product processing benchmark or GitHub runner performance.

### Initial failures and resolution

The unmodified main baseline had 491 passing tests, 22 failures and 1 skipped test. Typecheck and build passed.

- Seventeen RenderPanel component tests still expected a Reimagine button that had moved to the App toolbar. They now exercise the component's public createRequest signal while retaining exact binding, concurrency, polling, recovery and asset assertions. App tests verify the toolbar's disabled state, explanatory tooltip and reenabled state after saving.
- One failed-analysis test exposed an actual UI regression: analysis warnings had been removed. The small warning formatter/details surface was restored; failed analyses expand it automatically so a user can understand the cause.
- Four App tests exceeded their unchanged five-second timeout during concurrent default-worker verification. They passed unchanged in isolation and in the complete two-worker suite. CI caps workers at two; timeouts were not increased.

The initial browser checks also corrected test assumptions about collapsed file/status details, accessible close labels and repeated fixture state. Each viewport now uses a separate harness process; neither changes nor weakens the application API contract.

### Browser coverage and boundary

The supported smoke starts at the collection, selects G60 i5 M60, uploads explicitly synthetic bytes, creates a run through native localhost HTTP, opens the source location, validates a missing decision note, records a fixture deferral, inspects history, downloads an exact-version JSON export, and reloads the saved run. The run response must carry the harness request identity and the selected vehicle ID.

The second smoke verifies that browsing G60 520i cannot silently create analysis against the supported i5 baseline. Both desktop and mobile check document width for overflow.

The two harnesses use loopback ports 5189/5190, public fixture access, strict ports and no server reuse. External requests are blocked so the hosted model exercises its local fallback. Normal application tests still cover stale edits, uncertain-command retries and draft preservation. The separate paid/live browser suite is excluded from smoke and was not run here.

The smoke validates frontend interaction and HTTP contract behavior. It does not establish document parsing, semantic AI quality, external research, generated geometry or live production persistence.

## Backend verification

Fresh migration, lint, type, contract, chronology/isolation and service-readiness results are recorded in [the backend baseline](PHASE0_BACKEND_BASELINE.md). Its isolated Compose project does not share application volumes or ports. The API image passed 336 tests with 3 Blender skips in 148.84 seconds; the parser image passed the same 336 tests with 3 skips in 63.30 seconds. Backend application code and published contracts are unchanged.

The readiness check distinguishes database/Temporal readiness from provider, research, identity, storage and renderer configuration. A ready database and API are not proof of configured live analysis.

## CI configuration

[Frontend workflow](../../.github/workflows/frontend.yml) runs on PRs to main/frontend and pushes to main/frontend or codex/portfolio branches. It uses read-only repository permissions, pinned actions, Node 25, npm cache keyed by the frontend lockfile, a 15-minute job limit, and cancellation of superseded branch runs.

Steps are install, complete unit/HTTP tests with two workers, typecheck, production build, Chromium installation and desktop/mobile smoke. Browser failure evidence is uploaded for seven days. No provider secret, application token, backend service or private asset is needed. Existing backend CI remains unchanged.

Local workflow syntax validation passed. GitHub execution must be checked on the PR; local validation alone does not certify remote CI execution.

## Phase 0 product and evaluation decisions

- Flagship: supported G60 i5 M60, Germany; family/trim limitations stay explicit. See [the scenario and source package specification](FLAGSHIP_SCENARIO.md).
- The public package is original, labelled synthetic material. Existing synthetic fixtures are seeds/patterns; organizer/customer documents are not automatically public demo assets.
- Development and held-out evaluation are separate from the showcase. The initial target is 48 records across 16 cases, with human reference labels and critical integrity gates. These are preparation targets, not completed evaluation results. See [the rubric](EVALUATION_RUBRIC.md).
- Ownership is defined by evaluation, independent review, implementation and release roles. Self-review must be disclosed when one person fills multiple roles.
- [Scope](../frontend/SCOPE.md) and [backlog](../../backlog.md) now distinguish current functionality from later portfolio phases.

## Existing performance and usage inventory

| Available foundation | Current limit and next use |
|---|---|
| OpenTelemetry backend request count and request-duration histogram | HTTP duration does not describe total queued analysis time; add normalized stage timings in Phase 5 |
| Findings checkpoint response IDs and provider usage | Retain input/output usage with the frozen model/parser configuration; no calls were made for this baseline |
| Proposal checkpoint input/output token metadata and review usage | Useful for per-stage accounting; missing provider usage remains unknown |
| Research deadline/reservation and per-operation timing metadata | Reserved tokens and uncertain external cost are not actual invoices |
| Parse cache keyed by source content and parser policy | Verify cold/warm cache behavior before attributing an optimization |
| Readiness dependency and configured-capability flags | Check these before a live run rather than interpreting API liveness as full capability |

No fresh end-to-end AI latency or billing measurement was attempted. Historical 195/554-second runs remain historical. Current main has changed since those measurements, so Phase 2/5 must profile it again before claiming performance gains.

## Remaining release boundaries

- Prepared public example bundle, source-package parsing, independent labels, user testing and hosted release belong to later phases.
- Existing repository fixtures have no blanket redistribution grant established by this check. Phase 1 can author original synthetic content and publish it with an explicit license; do not copy private source passages into the public example.
- The local seeded-access shortcut still needs the planned production/demo separation before public live hosting. No real credentials should be embedded through VITE variables.
- Smoke emits an existing Vite warning about importing the static scene catalog from public. The required review/export flows pass; asset-module cleanup is a separate follow-up.
- Real research/AI/renderer checks require explicit configuration and a bounded provider budget. This baseline made no paid calls.

## Reproduction

Follow [frontend commands](../../frontend/README.md#portfolio-phase-0-checks) for installation, complete tests, typecheck/build and smoke. The smoke owns and stops its harness servers.

Follow [backend baseline commands](PHASE0_BACKEND_BASELINE.md) for isolated migrations, checks, tests and readiness. Do not run database tests against the application database.

The [portfolio roadmap](../PORTFOLIO_IMPLEMENTATION_PLAN.md) remains the source of phase dependencies and later release gates.

## Phase 0 exit gate

| Gate | Result |
|---|---|
| Fresh checkout installs, tests and builds | Passed locally with the documented bounded-worker test command |
| Deterministic frontend CI and browser smoke | Implemented; local workflow lint and four smoke cases passed; remote execution is checked on the PR |
| Chronology, cursor and workspace isolation | Passed, with an additional foreign-run history cursor regression |
| Flagship scope, provenance and public source preparation boundary | Defined; public package authoring/licensing belongs to Phase 1 |
| Evaluation separation, rubric and practical ownership | Defined; no quality results are claimed yet |
| Timing/usage inventory and release blockers | Recorded above; no paid/live performance claim |

Phase 0 implementation is ready for review. Later phases have not started.
