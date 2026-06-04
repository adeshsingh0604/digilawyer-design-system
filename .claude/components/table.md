# Table — Component Rules

**Page:** `docs/components/table.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.23.0

## Token prefix
`--table-*` — header bg, border, row hover, cell text colours.

## CSS classes
- Scroll wrapper: `.table-wrap` (overflow-x: auto)
- Table: `.table`
- Cell: `.table-cell`
- Action cell: `.table-cell-action` (right-aligned actions)
- Utilities: `.table-cell-end` (right-align), `.td-num` (monospace, right-aligned numbers)

## Page sections (h2 IDs)
`default`, `variants`, `states`, `full-matrix`, `api`

## Rules
- Always wrap `.table` in `.table-wrap` — tables overflow on narrow screens without it.
- `.td-num` uses `font-family: var(--font-mono)` and `text-align: right` — for numeric data columns.
- Header row uses `<thead>` + `<th>` — never simulate a header with `<tr>` + bold `<td>`.
- Row hover is a subtle bg change — never change to a strong colour that obscures cell content.
- Do not add `border-collapse: separate` — the table uses `border-collapse: collapse` and `border` on cells.
