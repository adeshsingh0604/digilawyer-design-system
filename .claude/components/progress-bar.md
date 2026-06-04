# Progress Bar — Component Rules

**Page:** `docs/components/progress-bar.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.22.0

## Token prefix
`--progress-*` — track bg, fill colours per semantic colour (brand, info, success, warning, danger, notice, orange).

## CSS classes
- Track: `.progress`
- Fill: `.progress-fill`
- Colours: `.progress-brand`, `.progress-info`, `.progress-success`, `.progress-warning`, `.progress-danger`, `.progress-notice`, `.progress-orange`
- Sizes: `.progress-lg` (8px), `.progress-md` (4px, default), `.progress-sm` (2px)
- Indeterminate: `.progress-indeterminate` — CSS animation, no JS needed

## Page sections (h2 IDs)
`default`, `colors`, `sizes`, `indeterminate`, `interactive`, `api`

## Rules
- Fill width is driven by `--pct` CSS custom property set inline: `style="--pct: 75%"`. Never hardcode width.
- Indeterminate animation uses only CSS keyframes — no JavaScript.
- Seven colours match the Alert/Snackbar/Badge colour palette — keep consistent.
- Interactive demo has a live ramp, colour picker, and size switcher — preserve all three controls.
- Track always has `border-radius: var(--radius-full)` (pill shape) — do not change to a sharp corner.
