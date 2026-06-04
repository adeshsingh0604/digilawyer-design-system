# Button Group — Component Rules

**Page:** `docs/components/button-group.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.4.0

## Token prefix
`--btn-group-gap`, `--btn-group-overlap` — only 2 tokens. All button colours come from `--btn-*` tokens.

## CSS classes
- Wrapper: `.btn-group`
- Attached variant: `.btn-group-attached` (buttons share borders, overlap by `--btn-group-overlap`)
- Active border: `.btn-group-active-border` (shows left border on active button)
- Position helpers: `.btn-pos-left`, `.btn-pos-middle`, `.btn-pos-right`, `.btn-pos-up`, `.btn-pos-down`

## Page sections (h2 IDs)
`default`, `sizes`, `states`, `full-matrix`, `api`

## Rules
- Button Group has no Variants section — it was intentionally removed (v2.4.4). Do not add it back.
- The full matrix shows position (Left/Middle/Right/Up/Down) — not variant × size. This is the canonical pattern.
- Position modifiers (`.btn-pos-*`) control border-radius to create a connected group appearance.
- Composes entirely with `.btn` — do not duplicate button token references inside `.btn-group`.
- `.btn-group-overlap` = `-1.5px` — matches the `.btn` border-width of 1.5px exactly.
