# DigiLawyer DS — React Component Library

React component library for the DigiLawyer Design System. Built with Vite. Storybook 8 configured at `.storybook/`. Published to GitHub Packages as `@adeshsingh0604/digilawyer-ds`.

## Installing (for consuming apps)

GitHub Packages requires authentication to install from, even though this package lives in a repo you can already read — a plain `npm install` with no config will fail. Each developer (and CI runner) needs a **classic PAT with the `read:packages` scope** and a project `.npmrc`:

```
# .npmrc, at the root of the consuming app
@adeshsingh0604:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

Set `GITHUB_PACKAGES_TOKEN` in your shell env (or your CI's secrets) to a PAT generated at github.com → Settings → Developer settings → Personal access tokens, scoped to `read:packages`. Then:

```bash
npm install @adeshsingh0604/digilawyer-ds react react-dom
```

```jsx
import { Button, Link } from '@adeshsingh0604/digilawyer-ds';
import '@adeshsingh0604/digilawyer-ds/styles.css'; // once, at your app root
```

`react` and `react-dom` are peer dependencies (`>=18.0.0`) — the package doesn't bundle its own copy, so your app's existing React is what renders.

## Folder layout

```
react/
├── .storybook/
│   ├── main.js        ← Storybook config (Vite framework, stories glob)
│   └── preview.js     ← Global decorators: data-theme switcher + CSS imports
├── scripts/
│   └── build-css.js   ← Flattens src/styles.css's @import chain into dist/styles.css
├── src/
│   ├── components/
│   │   └── Button/
│   │       ├── Button.jsx        ← Component (styled via docs/shared/components.css classes, not its own CSS file)
│   │       ├── Button.stories.jsx← Storybook stories
│   │       └── index.js          ← Barrel export
│   ├── tokens/
│   │   └── index.js   ← Re-exports docs/shared/tokens.json
│   └── styles.css     ← The one stylesheet consumers import — pulls in tokens.css + components.css
├── vite.config.js     ← Library build config (publish only — Storybook has its own Vite instance)
├── package.json
└── README.md
```

Components don't carry their own `.css` files. Every component's visual styling lives in `docs/shared/components.css` (the same file the static docs site uses) and is pulled in once via `src/styles.css` — this is what keeps the docs site and every React consumer visually identical with zero duplication.

## Running Storybook

```bash
cd react
npm install
npm run storybook      # starts on http://localhost:6006
```

## Building the publishable package

```bash
npm run build
```

Runs `vite build` (compiles JSX → plain JS, externalizes `react`/`react-dom`/`prop-types` so they aren't bundled) followed by `scripts/build-css.js` (flattens `styles.css`'s `@import` chain into one self-contained `dist/styles.css`, since the relative imports that work during development point outside what actually gets published). Output goes to `dist/`, which is gitignored — CI builds fresh on every publish via `.github/workflows/publish.yml`.

## Publishing (for maintainers)

Publishing is automatic: `.github/workflows/publish.yml` runs on every push to `main` that touches `react/**`, builds the package, and publishes to GitHub Packages **only if `package.json`'s version isn't already published** — so it's safe to let it run on every push, most runs are a no-op.

The version comes from the design system's own version, not a separately-tracked number: `node docs/scripts/bump-version.js` (run from the repo root) updates `react/package.json`'s version alongside `tokens.css`, `STATUS.md`, and the changelogs in one command. There's deliberately no separate "bump the npm package" step — running the normal release ceremony is enough.

## Token source

Tokens are generated from `../docs/shared/tokens.css` and written to `../docs/shared/tokens.json` by the build script:

```bash
# From repo root:
node docs/scripts/build-tokens.js
```

Run this after any token change in the docs workstream — it's what `src/tokens/index.js` re-exports.

## Adding a new component

1. Create `src/components/MyComponent/` with:
   - `MyComponent.jsx` — React component. Style it using the class names already defined in `docs/shared/components.css` (add new ones there if the component doesn't exist in the docs site yet — component styling always lives in that one shared file, never per-component)
   - `MyComponent.stories.jsx` — Storybook stories
   - `index.js` — `export { MyComponent, default } from './MyComponent'`
2. Export from `src/index.js`

No CSS-import step needed — `styles.css` already pulls in all of `components.css` in one shot.

## Relationship to other workstreams

| Folder | Purpose |
|---|---|
| `../docs/` | HTML/CSS documentation site — canonical visual reference |
| `../react/` | This folder — React component library |

Storybook lives inside this folder at `.storybook/`, deployed alongside the docs site. There's no separate root-level `storybook/` folder — an earlier placeholder for one was removed 16 July 2026.

## Known issues

See **DESIGN.md → React & Figma Code Connect Readiness** — it's kept as a historical record of an earlier audit; all 9 findings there have since been resolved and verified against the current code.
