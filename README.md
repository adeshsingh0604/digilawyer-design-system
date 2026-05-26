# DigiLawyer Design System

Monorepo for the DigiLawyer design system. Three workstreams live side by side:

```
digilawyer-design-system/
├── docs/        Static HTML/CSS/JS documentation site (canonical source of truth)
├── react/       React component library (in progress) — consumes the same tokens
└── storybook/   Storybook for the React components (in progress)
```

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
- `docs/components/` — One HTML page per component (28 total, 4 fully documented at v2.7: Button, Button Group, Checkbox, Radio Button)
- `docs/scripts/migrate-stubs.js` — idempotent helper for the original stub sweep

See [`docs/README.md`](docs/README.md) and [`CLAUDE.md`](CLAUDE.md) for the per-page workflow.

### `react/`

React component library. Consumes the same design tokens (will eventually import them as a generated `tokens.json`). Has its own `package.json` and tooling.

### `storybook/`

Storybook setup for the React components. Currently a placeholder — to be scaffolded.

## Project-wide docs at this level

| File | What it's for |
|---|---|
| `CHANGELOG.md` | Version history across the whole repo (most entries are docs changes today) |
| `STATUS.md` | Current version + what's built / pending / next priority |
| `CLAUDE.md` | Guidance for AI assistants working on this repo (canonical workflow) |
| `TODO.md` | Prioritised task list |

## Versioning

Semantic — `MAJOR.MINOR.PATCH`. See `CLAUDE.md` for the full release checklist (bump `--ds-version` in tokens.css, `DS_VERSION` in ds.js, CHANGELOG entries in two places, STATUS bump, etc.).

Current version: **v2.8.0** (see `STATUS.md`).

## Using this design system

The whole repo is open-source under the MIT License — feel free to fork, copy, adapt, or take inspiration. A few practical paths to consume it:

**1. Drop the CSS into your own project.** The fastest path. Copy `docs/shared/tokens.css`, `docs/shared/components.css`, and (optionally) `docs/shared/layout.css` into your project. Reference the tokens (`var(--btn-primary-bg)`, etc.) and the component classes (`.btn`, `.checkbox`, `.radio`, …). Everything is plain CSS — no build step required.

**2. Consume the tokens as JSON.** `docs/shared/tokens.json` is a flat `{ light, dark }` lookup auto-generated from `tokens.css`. Useful for React/TS apps, Figma plugins, AI tools, or anywhere you want tokens outside a CSS context. Regenerate with `node docs/scripts/build-tokens.js` after any token change.

**3. Browse the live docs.** Once GitHub Pages is enabled (see `docs/README.md`), the documentation site is hosted at `https://adeshsingh0604.github.io/digilawyer-design-system/` — including the global search across every component, section, and token.

**4. Use the React components (when available).** The `react/` workspace is the in-progress React component library that wraps the same markup patterns shown in the docs. Storybook scaffolding planned in `storybook/`.

If you build something with it, no attribution required — but a link back is appreciated.

## License

[MIT](LICENSE) © 2024 Adesh Singh.

The design system is provided as-is for use in any project, commercial or personal. See [`LICENSE`](LICENSE) for the full text.
