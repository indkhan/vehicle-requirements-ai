# Phase 0 backend baseline

Date: 14 October 2026. Base: `d4884836c93b30a8551fb9f0252cf226215c5ddb`, branch `codex/portfolio-phase-0`, worktree `/Users/tamilalagan/.codex/worktrees/portfolio-phase-0/vehicle-requirements-ai`.

Status: completed. Fresh API and parser-image suites each passed 336 tests with 3 explicit Blender skips. Local dependency/worker readiness passed. Only the isolated verification services were removed afterward; all volumes remain.

## Scope and isolation

Backend application code, Dockerfile, dependency lock, migrations, published contracts, and existing CI were preserved. One regression test was added: `test_history_cursor_from_another_run_is_rejected` in `backend/tests/test_evidence_security.py`. Existing tests already cover chronological timestamp ordering, equal-timestamp ID ties, invalid cursors, workspace isolation, and evidence access auditing. The additional test closes the missing history-cursor rejection case for a different run owned by the same workspace.

Docker Desktop was initially stopped and was started for this verification. The isolated Compose project is `vehicle-portfolio-phase0`, with its own network and `postgres-data`, `temporal-data`, and `objects` volumes. Application ports are changed to loopback `18100` (API), `17233` (Temporal), and `18233` (Temporal UI). No existing project volumes or services were modified.

Both fresh API and parser images use native Linux ARM64 on this host. Locked dependency layers were reused from the Docker build cache; application and test files were copied from this worktree. No dependency versions or source images were changed. This is fresh ARM64 verification, not a new x86-64 compatibility result.

Compose loads `/dev/null` instead of a local environment file. Containers use `APP_ENV_FILE=/dev/null`, test mode, empty AI/renderer credentials, disabled telemetry, and an empty PDF model directory. No private input files, application secrets, paid provider jobs, live research, or geometry jobs were used. Provider tests use controlled synthetic adapters; actual PostgreSQL and the local Temporal server are exercised.

API/worker readiness was checked on a seeded, otherwise empty database before tests. Both services were then stopped so test-created outbox commands could not be consumed by the general worker. Complete suites run sequentially, not against concurrently changing databases.

## Environment

| Component | Observed version |
|---|---|
| Docker Desktop | 4.76.0 (228118) |
| Docker Engine / Compose | 29.5.2 / 5.1.4 |
| Docker VM | Linux ARM64; 8 CPUs; 8,321,994,752 bytes memory |
| Runtime | Python 3.14.8; Linux 6.12.76-linuxkit, aarch64, glibc 2.41 |
| uv | 0.13.0 |
| FastAPI / Pydantic / SQLAlchemy | 0.143.0 / 2.14.0 / 2.1.4 |
| Temporal SDK | 1.34.0 |
| Temporal CLI / server / UI | 1.9.1 / 1.32.0 / 2.54.1 |
| PostgreSQL | 18.6 (Debian 18.6-1.pgdg13+2), ARM64 |
| OpenAI SDK | 3.28.0 |
| pytest / Ruff / mypy | 9.1.1 / 0.17.0 / 2.4.0 |
| Parser libraries | Docling 2.137.0; Torch 2.14.1+cpu; torchvision 0.29.1+cpu |

Fresh image IDs:

- API: `sha256:2cbacafb8e952ad7478e07ca7df0349235d3d29f0f017484a0532854754d0bb9`.
- Parser/worker: `sha256:d46811f38b0024d9c51dc687fc9b3d9a203abc4f8c0052d89ba1902c87a6a42c`.

Dependency-lock SHA256: `9f063934a3a6db0f8cce8f773c6373b24e46ebbfe8c1170f33e839050d4419ae`.

## Results

Command wall times include container creation/removal. pytest also reports its internal test duration. These are single local observations under shared host load, not performance guarantees.

| Check | Result | Wall time |
|---|---|---:|
| Fresh API/parser image build | Passed | 10.49 s |
| Empty-database migration | Passed | 7.912 s |
| Repeat migration | Passed | 11.725 s |
| Alembic drift check | No new upgrade operations | 7.618 s |
| Ruff | Passed | 5.538 s |
| Formatting | 102 files already formatted | 5.495 s |
| Strict mypy | No issues in 43 source files | 40.769 s |
| Generated-contract check | Passed | 21.616 s |
| Seed | Passed | 5.793 s |
| API/worker startup | Passed | 3.060 s |
| API/Temporal readiness probe | Passed | 0.868 s |
| Native parser imports | Passed; CUDA unavailable as expected | 30.667 s |
| Config environment diagnosis | 3 passed in 0.03 s | 22.109 s |
| Corrected complete API suite | 336 passed, 3 skipped; 148.84 s pytest duration | 181.085 s |
| Complete parser suite | 336 passed, 3 skipped; 63.30 s pytest duration | 71.244 s |
| Isolated-service cleanup | Containers/network removed; volumes retained | 2.879 s |

The readiness probe returned HTTP 200 from `/health` and `/ready`, with database and Temporal ready and one workflow poller. Optional configured-capability flags were all false: AI, research, renderer, OIDC, S3, telemetry. This verifies local dependency health and worker registration, not configured live integrations.

The full API suite includes the existing timestamp/tie-order regression, added foreign-run history cursor rejection, foreign-workspace denial, evidence cursor scoping, exact-version decisions/exports, durable ingestion, worker-death recovery, and Temporal replay. Each collected suite contains 339 tests, including the one added test.

## Diagnosis and preserved unsuccessful attempts

- The first build waited on Docker Desktop's credential helper. Only this Phase 0 build was interrupted after 96.44 seconds. A temporary empty Docker auth configuration, with the normal CLI plugin directory and explicit Desktop socket, resolved the wait. No stored account credentials were inspected or copied.
- A first diagnostic command looked for uv package metadata inside the application's virtual environment. uv is installed globally in the image, so that query failed. The corrected query uses `uv --version`; runtime metadata then passed.
- The initial complete API test run returned **335 passed, 3 skipped, 1 failed in 172.29 seconds**. The failed configuration test loads its own synthetic dotenv key. The verification override's explicit `OPENAI_API_KEY=""` correctly took precedence over that fixture, causing the failure. An isolated rerun with `env -u OPENAI_API_KEY` passed all three config tests; the corrected full API run then passed. `APP_ENV_FILE=/dev/null` remains set, so removing the blank variable does not load real credentials. No application change or weakened test assertion was made.

## Exact command setup

Commands were run from the worktree root. Temporary logs and command metadata are under `/tmp/portfolio-phase0`; they are local diagnostics, not committed artifacts. The directory contains the isolated override, empty Docker auth configuration, readiness probe, and each command's `.log`/`.json` result with exact arguments, exit code, and elapsed seconds.

```sh
export DOCKER_HOST=unix:///Users/tamilalagan/.docker/run/docker.sock
export DOCKER_CONFIG=/tmp/portfolio-phase0/docker-config
phase0_compose() {
  docker compose --env-file /dev/null -p vehicle-portfolio-phase0 \
    -f backend/compose.yaml -f /tmp/portfolio-phase0/compose.override.yaml "$@"
}
phase0_compose build api worker
phase0_compose up -d postgres temporal
phase0_compose run --rm api python -m alembic upgrade head
phase0_compose run --rm api python -m alembic upgrade head
phase0_compose run --rm api python -m alembic check
phase0_compose run --rm api python -m ruff check app tests migrations
phase0_compose run --rm api python -m ruff format --check app tests migrations
phase0_compose run --rm api python -m mypy app
phase0_compose run --rm api python -m app.contracts --check
phase0_compose run --rm api python -m app.seed
phase0_compose up -d api worker
phase0_compose exec -T api python - < /tmp/portfolio-phase0/readiness-check.py
phase0_compose stop api worker
phase0_compose run --rm --no-deps api env -u OPENAI_API_KEY python -m pytest -ra --durations=10
phase0_compose run --rm --no-deps worker env -u OPENAI_API_KEY python -m pytest -ra --durations=10
phase0_compose down
```

The temporary `docker-config/config.json` contains only empty `auths` and `cliPluginsExtraDirs: ["/Users/tamilalagan/.docker/cli-plugins"]`. Create its directory and `/tmp/portfolio-phase0/empty-pdf-models` before reproducing. The exact `/tmp/portfolio-phase0/compose.override.yaml` used was:

```yaml
services:
  postgres:
    platform: linux/arm64
  temporal:
    platform: linux/arm64
    ports: !override
      - "127.0.0.1:17233:7233"
      - "127.0.0.1:18233:8233"
  api:
    platform: linux/arm64
    image: vehicle-portfolio-phase0-api:baseline
    ports: !override
      - "127.0.0.1:18100:8000"
    environment:
      APP_ENV_FILE: /dev/null
      ENVIRONMENT: test
      OPENAI_API_KEY: ""
      RENDERER_URL: ""
      RENDERER_TOKEN: ""
      OTLP_ENDPOINT: ""
  worker:
    platform: linux/arm64
    image: vehicle-portfolio-phase0-worker:baseline
    environment:
      APP_ENV_FILE: /dev/null
      ENVIRONMENT: test
      OPENAI_API_KEY: ""
      RENDERER_URL: ""
      RENDERER_TOKEN: ""
      OTLP_ENDPOINT: ""
    volumes: !override
      - objects:/data/objects
      - /Users/tamilalagan/.codex/worktrees/portfolio-phase-0/vehicle-requirements-ai/contracts:/srv/contracts:ro
      - /tmp/portfolio-phase0/empty-pdf-models:/models:ro
```

The readiness command reads `/tmp/portfolio-phase0/readiness-check.py` through standard input. It connects to `temporal:7233`, requests `DescribeTaskQueue` for the default namespace and `vehicle-backend` workflow queue, and requires an active poller. It then asserts HTTP 200 from the container-local `/health` and `/ready` endpoints and records their JSON. The complete script remains beside its `readiness.log` result; it invokes no workflow or provider. The initial run used equivalent here-document input to `exec -T api python -`.

## Limits and cleanup

Three real-Blender tests are explicitly skipped: two parameterizations in `test_blender_geometry.py` and one in `test_prepare_geometry.py`, because Blender is unavailable in these images. Native parser library imports passed, but no offline PDF weights or private reference corpus were mounted. This baseline does not establish complete-corpus PDF fidelity, live AI/research quality, real vehicle geometry editing, production identity/storage/telemetry, or hosted deployment readiness.

`down` removed only the isolated Phase 0 containers and network. A final project-filtered container inventory was empty; its three volumes remained. Those volumes contain synthetic test records and queued commands and should remain separate from any live, key-configured application database. Existing projects and all volumes were preserved. Docker Desktop remains running; temporary logs/configuration remain under `/tmp/portfolio-phase0`. No commit, push, pull request, or deployment was performed by this verification task.
