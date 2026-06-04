# Checkbox — Component Rules

**Page:** `docs/components/checkbox.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.5.0

## Token prefix
`--checkbox-*` — 13 tokens covering unchecked, hover, disabled, checked, checked-hover, checked-disabled states.

## CSS classes
- Wrapper: `.checkbox`
- Hidden native input: `.checkbox-input` (visually hidden, drives focus/checked state)
- Visual box: `.checkbox-box`
- Label: `.checkbox-label`
- States driven by CSS: `:checked`, `:disabled`, `:focus-visible` on `.checkbox-input` via `~` sibling selector

## Page sections (h2 IDs)
`default`, `variants`, `sizes`, `states`, `full-matrix`, `api`

## Rules
- The native `<input type="checkbox">` is never `display:none` — it is visually hidden but focusable for accessibility.
- Checked glyph is the `#ico-check` SVG symbol from the ds.js sprite — do not inline a different SVG.
- Indeterminate state uses the `#ico-dash` symbol from ds.js sprite.
- Dark mode: checked state inverts (white box + dark glyph). Verified against Figma node 3557-20436.
- Do not change the `~` sibling selector pattern — it is how the hidden input drives the visible box styles.
