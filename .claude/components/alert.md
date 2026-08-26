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

## Copy limits (enforced, added 17 Aug 2026)

- **Title: one line.** `.alert-title` carries `min-width: 0` + `white-space: nowrap` + `text-overflow: ellipsis` — the same single-line pattern as `.snackbar-label`. The `min-width: 0` is load-bearing: without it a flex child refuses to shrink below its content and a long title widens the whole Alert instead of truncating.
- **Body: three lines maximum.** `.alert-body` uses `-webkit-line-clamp: 3`. This is currently the only line-clamp in `components.css`.
- **Never write Alert copy that exceeds these limits.** Overflow is hidden from the user, so a truncated error message loses the actual reason. When generating Alert copy, keep the title to a short phrase and the body to one or two sentences.
- `Alert.jsx` warns in development when copy is actually being cut, measured via `scrollWidth`/`scrollHeight` rather than a character count — a character budget false-positives in wide containers and false-negatives in narrow ones. The check bails when `clientWidth` is 0 so hidden Alerts (collapsed accordion, inactive tab) don't warn spuriously.
- The dev-warning pattern follows `Tag.jsx:67` — bare `process.env.NODE_ENV !== 'production'`. Do **not** wrap it in `typeof process !== 'undefined'`: bundlers replace the expression, not the global, so that guard is always false and silently disables the warning.
