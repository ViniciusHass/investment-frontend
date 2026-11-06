# Investment Frontend

React, strict TypeScript and Vite foundation for the Investment Factory portfolio planner. The current screen is infrastructure only: it displays no holdings, prices, allocations, or performance and makes no network requests.

## Prerequisites and commands

Use Node.js 22.12 or newer in the Node 22 line, with npm. From a clean checkout:

```sh
npm ci
npm run dev
```

Run the quality checks before a pull request:

```sh
npm run lint
npm run typecheck
npm run test -- --run
npm run build
```

## Structure

- `src/app/` contains app composition and the initial screen.
- `src/test/` contains shared test setup.
- `index.html`, `vite.config.ts` and TypeScript config files configure the SPA and toolchain.
- `.github/workflows/ci.yml` runs the same checks on pull requests.

## Future features and translations

Add a feature only through an accepted Factory card. Keep domain behavior in its feature module and reusable UI in shared modules introduced by a later card. Future API requests must use a typed client backed by an accepted FastAPI contract; browser code must never call financial providers directly. Add user-facing strings through the project's approved translation approach when that card is introduced; no translation runtime is part of this foundation.
