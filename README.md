# Investment Frontend

React, strict TypeScript and Vite foundation for the Investment Factory portfolio planner. The home and not-found routes run without FastAPI and show no holdings, prices, allocations, or performance.

## Prerequisites and commands

Use Node.js 22.12 or newer in the Node 22 line, with npm.

```sh
npm ci
npm run dev
```

Run checks before a pull request:

```sh
npm run lint
npm run typecheck
npm run test -- --run
npm run test:e2e:install
npm run test:e2e
npm run build
```

## Routes, languages and structure

- `/` is the localized planning workspace; any unknown path shows a localized recovery link.
- Portuguese (Brazil) is the default. An explicit choice between `pt-BR` and `en` is saved in this browser only; unavailable storage falls back safely for the session.
- Add locale strings to `src/shared/i18n/locales/pt-BR.ts` and `en.ts` with the same key structure, then extend supported language metadata in `src/shared/i18n/i18n.ts`.
- `src/app/` contains route composition and the responsive shell, `src/pages/` contains active route pages, and `src/shared/` contains reusable language and feedback UI.
- `e2e/` contains Chromium keyboard and axe accessibility checks at desktop and 320 px widths.

Future navigation destinations are visibly unavailable until their approved cards implement them. FastAPI integration, user accounts and portfolio features belong to future cards. Browser code does not call financial providers.
