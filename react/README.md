# DigiLawyer DS — React Component Library

React component library for the DigiLawyer Design System. Built with Vite. Storybook 8 configured at `.storybook/`.

## Folder layout

```
react/
├── .storybook/
│   ├── main.js        ← Storybook config (Vite framework, stories glob)
│   └── preview.js     ← Global decorators: data-theme switcher + CSS imports
├── src/
│   ├── components/
│   │   └── Button/
│   │       ├── Button.jsx        ← Component
│   │       ├── Button.css        ← Styles
│   │       ├── Button.stories.jsx← Storybook stories
│   │       └── index.js          ← Barrel export
│   └── tokens/
│       └── index.js   ← Re-exports docs/shared/tokens.json
├── package.json
└── README.md
```

## Running Storybook

```bash
cd react
npm install
npm run storybook      # starts on http://localhost:6006
```

## Token source

Tokens are generated from `../docs/shared/tokens.css` and written to `../docs/shared/tokens.json` by the build script:

```bash
# From repo root:
node docs/scripts/build-tokens.js
```

The React library consumes `tokens.json` from `../docs/shared/tokens.json`. Run the build script after any token change in the docs workstream.

## Adding a new component

1. Create `src/components/MyComponent/` with:
   - `MyComponent.jsx` — React component
   - `MyComponent.css` — Styles (import and use CSS custom properties from `tokens.css`)
   - `MyComponent.stories.jsx` — Storybook stories
   - `index.js` — `export { MyComponent, default } from './MyComponent'`
2. Export from `src/index.js`
3. Add a CSS import to `.storybook/preview.js`

## Relationship to other workstreams

| Folder | Purpose |
|---|---|
| `../docs/` | HTML/CSS documentation site — canonical visual reference |
| `../react/` | This folder — React component library |
| `../storybook/` | Root placeholder README only; Storybook is configured here at `.storybook/` |

## Known issues to fix before production use

See **DESIGN.md → React & Figma Code Connect Readiness** for the full audit.
