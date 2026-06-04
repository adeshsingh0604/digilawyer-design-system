# Upload Media — Component Rules

**Page:** `docs/components/upload-media.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.16.0

## Token prefix
`--upload-*` — bg, hover bg, border, text, icon colours.

## CSS classes
- Wrapper: `.input-field` — shared with Text Input and Textarea
- Upload zone: `.upload`
- Icon: `.upload-icon` — uses the upload arrow-into-tray SVG (corrected v2.16.2)
- "Choose file" button: composes `.btn .btn-secondary .btn-sm`
- Preview grid: `.upload-preview`
- Preview item: `.upload-preview-item`
- Remove button: `.upload-remove`

## Page sections (h2 IDs)
`default`, `variants`, `states`, `full-matrix`, `api`

## Rules
- The Default demo is interactive — it uses a real `<input type="file">` and shows previews. Do not replace with a static demo.
- Upload icon is the arrow-into-tray shape (↓ into tray) — not a generic upload arrow. This was corrected in v2.16.2.
- "Choose file" button must always use `.btn-secondary` + `.btn-sm` — never a primary button.
- Composes with `.input-field` — same shared wrapper rule as Text Input and Textarea.
- Preview images use `object-fit: cover` — do not change to `contain`.
