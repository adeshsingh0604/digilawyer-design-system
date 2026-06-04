# Text Area — Component Rules

**Page:** `docs/components/textarea.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.15.0

## Token prefix
Reuses `--input-*` tokens entirely — no new tokens.

## CSS classes
- Outer wrapper: `.input-field` — shared with Text Input and Upload Media
- Textarea element: `.textarea`
- Sizes: `.textarea-lg`, `.textarea-md` (default), `.textarea-sm`
- Resize handle: `.textarea-resize` — anchored to bottom-right corner

## Page sections (h2 IDs)
`default`, `variants`, `sizes`, `states`, `api`

## Rules
- Textarea reuses the `.input-field` wrapper — any change to `.input-field` affects Text Input, Textarea, and Upload Media simultaneously.
- Resize handle (`.textarea-resize`) is positioned absolutely at bottom-right — it is not the native browser resize handle.
- `resize: vertical` only — never `resize: both` or `resize: horizontal`.
- Typography per size must match Figma: lg = Body 1 (16px), md = Body 2 (14px), sm = Caption 1 (12px). Icon sizes scale with size modifier too.
- Do not use Textarea for single-line input — use Text Input.
