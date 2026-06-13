# Contributing to DigiLawyer Design System

This guide covers how **developers** and **designers** from Bigotech can contribute to the design system.

---

## Table of Contents

- [Who can contribute](#who-can-contribute)
- [Branch and PR workflow](#branch-and-pr-workflow)
- [For developers — HTML/CSS docs](#for-developers--htmlcss-docs)
- [For developers — React components](#for-developers--react-components)
- [For designers](#for-designers)
- [Versioning rules](#versioning-rules)
- [Changelog — how to update it](#changelog--how-to-update-it)
- [Reverting to a previous version](#reverting-to-a-previous-version)

---

## Who can contribute

| Role | Can contribute to |
|------|-------------------|
| Developer | HTML/CSS docs (`docs/`), React components (`react/`) |
| Designer | Figma file, token reviews, Storybook feedback via issues |

---

## Branch and PR workflow

**Never commit directly to `main`.** All changes go through a pull request.

```
main          ← protected, always deployable
  └─ feat/button-loading-state    ← your branch
  └─ fix/input-icon-alignment
  └─ docs/update-spacing-tokens
```

### Step-by-step

```bash
# 1. Always start from a fresh main
git checkout main
git pull origin main

# 2. Create a branch — use the naming convention below
git checkout -b feat/component-name-description

# 3. Make your changes, then commit
git add <specific files>
git commit -m "feat(button): add loading state with spinner"

# 4. Push and open a PR
git push origin feat/component-name-description
# Then open a PR on GitHub → the PR template auto-fills
```

### Branch naming

| Prefix | When to use |
|--------|-------------|
| `feat/` | New component or new variant |
| `fix/` | Bug fix in docs or component |
| `docs/` | Content-only update (no token/code change) |
| `token/` | Adding or updating design tokens |
| `react/` | React component work only |
| `chore/` | Tooling, config, CI |

### Commit message format

```
type(scope): short description

Examples:
feat(input): add OTP variant with auto-advance
fix(textarea): clip resize handle inside shell border
docs(button): add accessibility section
token(colors): add --color-link-visited token
```

---

## For developers — HTML/CSS docs

The HTML docs live in `docs/`. No build step — open any `.html` file directly.

### Adding or updating a component page

1. Read `CLAUDE.md` — it has the exact rules for every file you'll touch
2. Run the scaffolding script for new pages:
   ```bash
   node docs/scripts/new-component.js <name>
   ```
3. Key files:
   - `docs/shared/tokens.css` — add new tokens here first
   - `docs/shared/components.css` — component CSS only (no layout)
   - `docs/shared/ds.js` — update `NAV`, `SEARCH_DOCS`, `SEARCH_TOKENS` arrays when adding pages
4. After changing `tokens.css`, regenerate the JSON:
   ```bash
   node docs/scripts/build-tokens.js
   ```
5. **Bump the version** (see [Versioning rules](#versioning-rules))
6. **Update the changelog** (see [Changelog](#changelog--how-to-update-it))

### Rules that will get your PR rejected

- Hardcoded hex/rgba colors — use CSS custom properties only
- Touching `layout.css` for component work — it's off-limits
- Missing dark-mode token declarations
- Adding a page without updating the `NAV` array in `ds.js`

---

## For developers — React components

React components live in `react/src/components/`. Storybook auto-deploys to GitHub Pages.

### Adding a new component

```bash
cd react
npm install          # first time only
npm run storybook    # local dev server on :6006
```

Each component needs:
- `ComponentName.jsx` — the component
- `ComponentName.css` — scoped styles (uses same CSS tokens)
- `ComponentName.stories.jsx` — Storybook stories
- `index.js` — re-export

See `react/WORKFLOW.md` for the full checklist and component order.

### Testing locally

Storybook runs at `http://localhost:6006`. Verify your component across:
- All size variants (lg / md / sm)
- All states (default, hover, focus, disabled, error, etc.)
- Light and dark mode (theme toggle in Storybook toolbar)

---

## For designers

Designers contribute primarily through Figma and GitHub Issues.

### Raising a design issue

Open a GitHub Issue using the **Design Feedback** template. Include:
- Component name
- What's wrong or missing
- Screenshot or Figma link
- Suggested fix (if you have one)

### Token changes

If you want to propose a new token or change an existing one:
1. Open an Issue using the **Token Change** template
2. The developer implementing it will update `tokens.css` and bump the version

### Reviewing React components

- Open Storybook: [adeshsingh0604.github.io/digilawyer-design-system/storybook/](https://adeshsingh0604.github.io/digilawyer-design-system/storybook/)
- Compare against the Figma component
- Leave feedback in the linked GitHub Issue or PR

---

## Versioning rules

We use semantic versioning (`MAJOR.MINOR.PATCH`):

| Bump | When |
|------|------|
| PATCH | Bug fix, content update, typo |
| MINOR | New component fully documented, new token group |
| MAJOR | Breaking token rename, removed component |

**Every version bump requires exactly these 6 steps** (see `CLAUDE.md` for details):
1. `--ds-version` in `docs/shared/tokens.css`
2. `DS_VERSION` in `docs/shared/ds.js`
3. New entry at top of `CHANGELOG.md`
4. New `<tr>` at top of `<tbody>` in `docs/other/changelog.html`
5. MINOR/MAJOR only: refresh 3 Latest Changes cards in `docs/index.html`
6. Update `STATUS.md`

---

## Changelog — how to update it

Every PR that changes tokens, components, or documentation **must** update the changelog.

### Format (in `CHANGELOG.md`)

```markdown
## [2.33.0] — 2026-06-15

### Added
- Input: OTP variant with 6-cell auto-advance
- Input: Tags variant with chip management

### Fixed
- Textarea: resize handle now clipped inside shell border

### Changed
- All Storybook story icons updated to 24×24 viewBox

**Author:** Your Name  
**PR:** #42
```

The `docs/other/changelog.html` page is the live version — update both files in the same commit.

---

## Reverting to a previous version

Every version is a git tag. To find available versions:

```bash
git tag --sort=-version:refname | head -20
```

To preview what a previous version looked like:

```bash
git checkout v2.31.7     # switch to that tag
npx serve docs           # serve locally
```

To revert the live site to a previous version, open a PR that reverts the specific commit:

```bash
git revert <commit-hash>   # creates a revert commit — does NOT destroy history
git push origin feat/revert-to-v2-31-7
# Open a PR — merging it will trigger a new deploy
```

**Never force-push or delete tags.** Tags are our safety net.

---

## Questions?

Tag **@adeshsingh0604** in the issue or PR.
