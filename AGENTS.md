# Frontend agent instructions

Do not scaffold or implement until Sol produces an approved long-term frontend plan. Use React + TypeScript + Vite unless an approved ADR changes this. Plan UI structure, forms, charts, accessibility, typed API clients, tests, responsive layout and future maintainability. No financial-provider API keys in browser code. Never merge to main. Follow Factory cards and contracts.

Write code and configuration comments in English.
For each approved implementation, create a separate branch and worktree from `develop`; open a PR targeting `develop` after tests. Luna never merges. The owner explicitly delegates to Sol authorization and execution of frontend card PR merges into `develop` after CI passes and Sol completes technical review. Promotion from `develop` to `main` requires owner approval after MVP evaluation.
Make subsequent commits atomic: one coherent change per commit, with a Conventional Commit subject. Agent-authored commits use `Codex <codex@users.noreply.github.com>` without changing the owner's global Git identity. Keep already published commits unchanged. Plan SemVer releases in a later approved card; do not create version tags automatically.
