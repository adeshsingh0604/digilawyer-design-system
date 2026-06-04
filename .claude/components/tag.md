# Tag — Component Rules

**Page:** `docs/components/tag.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.11.0

## Token prefix
`--tag-*` — 8 colours × 3 variants (filled, outline, ghost) × bg/text/border = extensive token set.

## CSS classes
- Base: `.tag`
- Colours: `.tag-brand`, `.tag-grey`, `.tag-blue`, `.tag-red`, `.tag-green`, `.tag-yellow`, `.tag-purple`, `.tag-orange`
- Variants: `.tag-filled`, `.tag-outline`, `.tag-ghost`
- Sizes: `.tag-lg` (32px), `.tag-md` (28px, default), `.tag-sm` (24px), `.tag-xs` (20px)
- Icon slots: leading and trailing icons inside the tag

## Page sections (h2 IDs)
`default`, `colors`, `variants`, `sizes`, `states`, `full-matrix`, `api`

## Rules
- Four sizes (Figma-exact): lg=32px, md=28px, sm=24px, xs=20px. Do not alter these heights.
- Filled variant: border is always `transparent` — never matches the filled bg colour.
- Dark mode verified against Figma node 5856-4255. Token names were corrected in v2.11.4 — do not revert.
- Canonical pattern: `[icon] Label [icon]` — icon is optional on either side but the label is always in the centre.
- Black Filled tag is visible in dark mode — corrected in v2.11.5. Dark bg inverts to a light surface.
- Tag composes inside Options trailing slot and Snackbar actions.
