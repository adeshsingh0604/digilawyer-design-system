# DigiLawyer Design System

Monorepo for the DigiLawyer design system:

```
digilawyer-design-system/
├── docs/        Static HTML/CSS/JS documentation site (canonical source of truth)
├── react/       React component library — consumes the same tokens
│                (Storybook is configured here too, at react/.storybook/)
├── site-next/   Next.js docs site — component variant gallery + blocks showroom
└── blocks/      Copy-paste page sections built from the design system
```

**Live URLs** (all deployed by `.github/workflows/deploy.yml` on every push to `main`):

| Surface | URL |
|---|---|
| HTML docs | https://adeshsingh0604.github.io/digilawyer-design-system/ |
| Storybook | https://adeshsingh0604.github.io/digilawyer-design-system/storybook/ |
| Next.js docs site | https://adeshsingh0604.github.io/digilawyer-design-system/site-next/ |

The React library is published to GitHub Packages as `@adeshsingh0604/digilawyer-ds` by `.github/workflows/publish.yml` whenever `react/` changes on `main`.

## Quick start

**View the documentation site:**

```bash
open docs/index.html
# or serve over HTTP (recommended for the file://-sensitive bits)
npx serve docs
# or
python3 -m http.server 8080 -d docs
```

Then visit `http://localhost:8080` (or the port your server reports).

## What lives where

### `docs/`

The static documentation site. No build step, no dependencies. Open any `.html` directly in a browser.

- `docs/shared/tokens.css` — source of truth for every colour, font, spacing, radius, shadow, and component token (light + dark)
- `docs/shared/ds.js` — the only JS file; auto-injects the global header, sidebar, TOC, search, theme toggle
- `docs/foundation/` — Colors, Typography, Spacing, Radius, Shadows, Grid
- `docs/components/` — One HTML page per component (25 total, all fully documented, light + dark Figma-verified)
- `docs/scripts/migrate-stubs.js` — idempotent helper for the original stub sweep

See [`docs/README.md`](docs/README.md) and [`CLAUDE.md`](CLAUDE.md) for the per-page workflow.

### `react/`

React component library. All 25 components implemented, consuming the same design tokens via a generated `tokens.json` (and `docs/shared/{tokens,components}.css` directly for styling). Has its own `package.json` and tooling. Storybook is configured at `react/.storybook/` and deployed to GitHub Pages.

### `site-next/`

Next.js (static export) documentation site: Quickstart, a component variant gallery, the blocks showroom, and a changelog generated from `CHANGELOG.md` at build time. Run `npm run dev` inside it (port 5186). `npm run build` also runs `check:css`, which fails the build if any site-chrome class name collides with a design-system class — so the chrome can never silently restyle a live component preview. It replaced an earlier Vite prototype (`site/`), which was retired on 21 September 2026.

### `blocks/`

Copy-paste page sections (currently `navigation-1`, `navigation-2`) composed from the design system. Registry in `blocks/index.js`; see [`blocks/README.md`](blocks/README.md) for anatomy. Rendered live in `site-next`'s Blocks page.

## Project-wide docs at this level

| File | What it's for |
|---|---|
| `CHANGELOG.md` | Version history across the whole repo (most entries are docs changes today) |
| `STATUS.md` | Current version + what's built / pending / next priority |
| `CLAUDE.md` | Guidance for AI assistants working on this repo (canonical workflow) |
| `TODO.md` | Prioritised task list |

## Versioning

Semantic — `MAJOR.MINOR.PATCH`. See `CLAUDE.md` for the full release checklist (bump `--ds-version` in tokens.css, `DS_VERSION` in ds.js, CHANGELOG entries in two places, STATUS bump, etc.).

Current version: **v2.53.1** (see `STATUS.md`).

## Using this design system

The whole repo is open-source under the MIT License — feel free to fork, copy, adapt, or take inspiration. A few practical paths to consume it:

**1. Drop the CSS into your own project.** The fastest path. Copy `docs/shared/tokens.css`, `docs/shared/components.css`, and (optionally) `docs/shared/layout.css` into your project. Reference the tokens (`var(--btn-primary-bg)`, etc.) and the component classes (`.btn`, `.checkbox`, `.radio`, …). Everything is plain CSS — no build step required.

**2. Consume the tokens as JSON.** `docs/shared/tokens.json` is a flat `{ light, dark }` lookup auto-generated from `tokens.css`. Useful for React/TS apps, Figma plugins, AI tools, or anywhere you want tokens outside a CSS context. Regenerate with `node docs/scripts/build-tokens.js` after any token change.

**3. Browse the live docs.** Once GitHub Pages is enabled (see `docs/README.md`), the documentation site is hosted at `https://adeshsingh0604.github.io/digilawyer-design-system/` — including the global search across every component, section, and token.

**4. Use the React components.** The `react/` workspace is the React component library — all 25 components — wrapping the same markup patterns shown in the docs. Browse them live via Storybook (deployed alongside the docs site).

If you build something with it, no attribution required — but a link back is appreciated.

## License

[MIT](LICENSE) © 2024 Adesh Singh.

The design system is provided as-is for use in any project, commercial or personal. See [`LICENSE`](LICENSE) for the full text.
