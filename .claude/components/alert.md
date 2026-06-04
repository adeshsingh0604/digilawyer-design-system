# Alert — Component Rules

**Page:** `docs/components/alert.html` | **CSS:** `docs/shared/components.css` | **Version added:** v2.29.0

## Token prefix
`--alert-*` — 70 tokens total (35 light + 35 dark). 5 tokens per colour × 7 colours: `semi-bg`, `semi-text`, `filled-bg`, `filled-text`, `brd-border`.

## CSS classes
- Base: `.alert`
- Colours: `.alert-brand`, `.alert-info`, `.alert-danger`, `.alert-success`, `.alert-warning`, `.alert-notice`, `.alert-orange`
- Variants: `.alert-filled`, `.alert-border` (default is semi-filled)
- Layout: `.alert-header`, `.alert-icon`, `.alert-title`, `.alert-close`, `.alert-body`, `.alert-actions`

## Private cascade
Key internal variables set by colour modifier, read by children:
- `--_accent` — vivid colour for icon/title
- `--_bg` — background
- `--_fg` — body text colour
- `--_b1bg`, `--_b1fg` — primary button bg/text
- `--_b2fg`, `--_b2bd` — secondary button text/border

## Figma nodes
Light: 140-6541 | Dark: 5958-2561

## Rules
- Alert replaces "Notification" system-wide. Never use the word "notification" for this component.
- Header alignment: `.alert-header` must be `align-items: center`. Icon and close button are both `flex: 0 0 24px`.
- Body text: uses `--_fg` (follows accent colour on semi-filled). Border variant overrides to `var(--color-heading)`.
- Brand filled dark mode: white bg + dark text — primary button inverts (dark bg + white text). This is a specific override in `.alert-brand.alert-filled`.
- The `--_accent` variable is the key architectural point — it holds the vivid colour independently of `--_fg`, allowing the Filled variant's button to use `--_b1fg: var(--_accent)` even after `--_fg` is set to white.
- Never add a 4th variant — the three (semi/filled/border) are the complete set from Figma.
- Page-local helpers scoped as `.demo-panel.al-col`, `.demo-panel.al-grid`.
