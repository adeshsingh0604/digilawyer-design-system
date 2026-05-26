# Storybook — DigiLawyer Design System

Placeholder folder. To be scaffolded with Storybook for the React components in `../react/`.

## Planned setup

- **Framework:** Storybook (Vite or webpack — TBD based on the `react/` build setup)
- **Stories source:** `../react/src/**/*.stories.{ts,tsx}`
- **Token integration:** consume the generated `../docs/shared/tokens.json` (planned — see CHANGELOG for status)
- **Theme switcher:** mirror the light/dark `data-theme` mechanism from the docs site so stories render in both modes

## When to scaffold

Wait until the React component library in `../react/` has at least 3–4 components implemented. Until then, the HTML docs in `../docs/` are the canonical visual reference.

## What to install (when ready)

```bash
cd storybook
npx storybook@latest init
```

Then configure `main.ts` to load stories from `../react/src/**/*.stories.tsx` and add a preview decorator that wraps stories in the design-system's `data-theme` attribute.
