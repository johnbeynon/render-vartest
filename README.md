# vartest

A monorepo testing which Render built-in environment variables can be passed between services via `fromService` in `render.yaml`.

## Structure

- **webservice/** — TypeScript HTTP server (`vartest-webservice`) that returns its own `RENDER_SERVICE_ID`
- **webservice/** — also used by `vartest-webservice-2`, which receives env vars sourced from `vartest-webservice`

## Findings

The `render.yaml` on `vartest-webservice-2` attempts to source all [All runtimes](https://render.com/docs/environment-variables#all-runtimes) built-in env vars from `vartest-webservice` using `envVarKey`. The results:

### Can be accessed across services

| envVarKey | Notes |
|---|---|
| `IS_PULL_REQUEST` | |
| `RENDER_DISCOVERY_SERVICE` | |
| `RENDER_EXTERNAL_HOSTNAME` | |
| `RENDER_EXTERNAL_URL` | |

### Cannot be accessed across services

| envVarKey | Notes |
|---|---|
| `RENDER` | |
| `RENDER_CPU_COUNT` | |
| `RENDER_GIT_BRANCH` | |
| `RENDER_GIT_COMMIT` | |
| `RENDER_GIT_REPO_SLUG` | |
| `RENDER_INSTANCE_ID` | |
| `RENDER_SERVICE_ID` | |
| `RENDER_SERVICE_NAME` | |
| `RENDER_SERVICE_TYPE` | |
| `RENDER_WEB_CONCURRENCY` | |
| `WEB_CONCURRENCY` | |
