# Snackbar — Component Rules

**Page:** `docs/components/snackbar.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.19.0

## Token prefix
`--snackbar-*` — 7 variants × 3 fields = 21 tokens per mode.

## CSS classes
- Base: `.snackbar`
- Variants: `.snackbar-brand`, `.snackbar-info`, `.snackbar-success`, `.snackbar-warning`, `.snackbar-danger`, `.snackbar-notice`, `.snackbar-default`
- States: `.snackbar-filled`
- Layout: `.snackbar-icon`, `.snackbar-message`, `.snackbar-action`, `.snackbar-close`
- Positions (6): `.snackbar-top-left`, `.snackbar-top-center`, `.snackbar-top-right`, `.snackbar-bottom-left`, `.snackbar-bottom-center`, `.snackbar-bottom-right`

## Page sections (h2 IDs)
`default`, `variants`, `states`, `positions`, `interactive`, `full-matrix`, `api`

## Rules
- Snackbar always has `box-shadow: var(--shadow-3)` — corrected v2.19.4. Do not remove.
- Dark semi backgrounds use solid colours (not rgba) — corrected v2.19.3. Do not revert to rgba.
- Interactive demo: the State toggle is segmented (not a dropdown) and the variant selector fires the correct snackbar style — corrected v2.19.1.
- Positions section demo fires Info Filled — corrected v2.19.5. Do not change to Brand Semi.
- Button inside Filled snackbar inverts (white button on coloured bg) — this is intentional.
- Snackbar is transient — it auto-dismisses. Do not use for persistent messaging (use Alert instead).
