# vartest

A monorepo case demonstrating how to pass a Render service's `RENDER_SERVICE_ID` to another service via `render.yaml`.

## Structure

- **webservice/** — TypeScript HTTP server that returns `Hello`
- **static-site/** — Static site whose build injects the webservice's service ID into the root page

## How it works

In `render.yaml`, the static site declares an env var using `fromService`:

```yaml
- key: WEBSERVICE_ID
  fromService:
    name: vartest-webservice
    type: web
    property: RENDER_SERVICE_ID
```

This passes the webservice's `RENDER_SERVICE_ID` into the static site's build environment. The build script (`build.js`) bakes that value into `index.html` at build time, which is then displayed on the root page.
