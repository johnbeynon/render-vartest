# vartest

A monorepo testing which Render built-in environment variables can be passed between services via `fromService` in `render.yaml`.

## Structure

- **webservice/** — TypeScript HTTP server (`vartest-webservice`) that returns its own `RENDER_SERVICE_ID`
- **webservice/** — also used by `vartest-webservice-2`, which receives env vars sourced from `vartest-webservice`

## Findings

The `render.yaml` on `vartest-webservice-2` attempts to source all [All runtimes](https://render.com/docs/environment-variables#all-runtimes) built-in env vars from `vartest-webservice` using `envVarKey`. The results:

### Can be accessed across services

| envVarKey |
|---|
| `IS_PULL_REQUEST` |
| `RENDER_DISCOVERY_SERVICE` |
| `RENDER_EXTERNAL_HOSTNAME` |
| `RENDER_EXTERNAL_URL` |

### Cannot be accessed across services

| envVarKey |
|---|
| `RENDER` |
| `RENDER_CPU_COUNT` |
| `RENDER_GIT_BRANCH` |
| `RENDER_GIT_COMMIT` |
| `RENDER_GIT_REPO_SLUG` |
| `RENDER_INSTANCE_ID` |
| `RENDER_SERVICE_ID` |
| `RENDER_SERVICE_NAME` |
| `RENDER_SERVICE_TYPE` |
| `RENDER_WEB_CONCURRENCY` |
| `WEB_CONCURRENCY` |

## Why

Access via `fromService` is controlled by a `PublicEnvVars()` method on each service type. When a blueprint resolves `fromService` references, only the vars returned by `PublicEnvVars()` are available.

For web services (`Server`), `PublicEnvVars()` returns:
- `RENDER_EXTERNAL_HOSTNAME`
- `RENDER_EXTERNAL_URL`
- `IS_PULL_REQUEST`
- `RENDER_INTERNAL_HOSTNAME` # this is not documented on the envvar docs page
- `RENDER_DISCOVERY_SERVICE`

All other service types fall back to `BaseService.PublicEnvVars()`, which returns `nil`.

`RENDER_SERVICE_ID` is not in any `PublicEnvVars()` implementation — it is injected directly into container specs at runtime, after blueprint evaluation, so it is never available to `fromService`.
