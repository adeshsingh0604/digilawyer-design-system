# Date Picker — Component Rules

**Page:** `docs/components/date-picker.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.21.0

## Token prefix
`--datepicker-*` — panel bg/border/shadow, header, nav buttons, weekday row, day cells, active cell, other-month cells.

## CSS classes
- Panel: `.datepicker`
- Header: `.datepicker-header`, `.datepicker-nav`, `.datepicker-title`
- Grid: `.datepicker-grid`, `.datepicker-weekdays`, `.datepicker-days`
- Day cell: `.datepicker-day`
- States: `.is-active` (selected day — inverts), `.is-today`, `.is-other` (previous/next month, dimmed)
- Month/year pickers: `.datepicker-months`, `.datepicker-years`
- Range: `.is-range-start`, `.is-range-end`, `.is-in-range`

## Page sections (h2 IDs)
`default`, `variants`, `states`, `interactive`, `full-matrix`, `api`

## Figma nodes
Light: 105-1786, 105-2329, 105-2431 | Dark: 5913-1594, 5913-1609, 5913-1616

## Rules
- Panel chrome matches Dropdown: `--shadow-3`, 8px radius, 1px border.
- Active cell inverts: dark fill + white text in light mode; white fill + dark text in dark mode.
- `.is-other` cells are dimmed but still clickable — do not use `pointer-events: none`.
- Interactive demo wires a Text Input trigger to the calendar panel — always ensure the min-height is ≥620px so the calendar is visible without overflow (corrected v2.21.2).
- Range variant highlights the span between start and end with `.is-in-range` background.
