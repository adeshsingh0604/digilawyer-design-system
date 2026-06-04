# Toggle Switch — Component Rules

**Page:** `docs/components/toggle.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.9.0

## Token prefix
`--toggle-*` — 12 tokens covering off, hover, disabled, on, on-hover, on-disabled states.

## CSS classes
- Wrapper: `.toggle`
- Hidden native input: `.toggle-input`
- Visual track: `.toggle-track`
- Thumb: `.toggle-thumb` (slides via `transform: translateX`)
- Label: `.toggle-label`
- Sizes: `.toggle-sm`, `.toggle-md` (default), `.toggle-lg`

## Page sections (h2 IDs)
`default`, `variants`, `sizes`, `states`, `full-matrix`, `api`

## Rules
- Same hidden-input + sibling selector pattern as Checkbox and Radio.
- Thumb movement is CSS transform only — do not use `left`/`margin` for the sliding animation.
- Off state background uses `rgba` alpha — do not convert to a solid colour.
- Dark mode: off state uses slightly higher alpha to remain visible on dark background.
- Toggle is for binary on/off settings only — not for selecting between options (use Radio for that).
