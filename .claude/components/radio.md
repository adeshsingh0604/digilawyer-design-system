# Radio Button — Component Rules

**Page:** `docs/components/radio.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.7.0

## Token prefix
`--radio-*` — 13 tokens mirroring the Checkbox token structure exactly.

## CSS classes
- Wrapper: `.radio`
- Hidden native input: `.radio-input`
- Visual circle: `.radio-box`
- Inner dot: rendered via `.radio-box::after`
- Label: `.radio-label`

## Page sections (h2 IDs)
`default`, `variants`, `sizes`, `states`, `full-matrix`, `api`

## Rules
- Mirrors Checkbox architecture exactly — same hidden-input + sibling-selector pattern.
- Dark mode tokens verified against Figma node 3557-20480. Same hover + disabled ramp as Checkbox.
- The inner dot is a CSS `::after` pseudo-element, not an SVG — do not replace it with an icon.
- Radio buttons must always be used in groups with the same `name` attribute — document this in examples.
- Do not use radio buttons for toggle/switch behaviour — that is the Toggle Switch component.
