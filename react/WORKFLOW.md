# DigiLawyer DS — React Standards & Workflow

> **Read this at the start of every session.**
> It tells you the current state, the rules, and exactly how to add a component.
> No other context is needed.

---

## Quick start

```bash
cd /Users/adesh-bigoh/digilawyer-design-system/react
npm run storybook
# Opens http://localhost:6006
```

---

## Goal

This React library will be shipped to developers on the DigiLawyer product
team so they can build product UI from components. Every component must meet
the production checklist below before it is considered done.

---

## Source of truth — read before writing any code

```
docs/components/[name].html     ← HTML structure + class names + states
docs/shared/components.css      ← All CSS (already imported globally — don't copy it)
docs/shared/tokens.css          ← All design tokens (CSS custom properties)
```

The React component is a 1-to-1 port of the HTML doc. Read the HTML doc
first. If something is in the HTML doc, it goes in React. Don't invent props
or states that aren't in the HTML doc.

---

## Component status

| Component   | HTML docs | React .jsx | Stories | Audit passed |
|-------------|-----------|------------|---------|--------------|
| Button      | ✅        | ✅         | ✅      | ✅ Jun 2026  |
| Checkbox    | ✅        | ✅         | ✅      | ✅ Jun 2026  |
| ButtonGroup | ✅        | ✅         | ✅      | ✅ Jun 2026  |
| Radio       | ✅        | ✅         | ✅      | ✅ Jun 2026  |
| Toggle      | ✅        | ✅         | ✅      | ✅ Jun 2026  |
| Input       | ✅        | ✅         | ✅      | ✅ Jun 2026  |
| Textarea    | ✅        | ✅         | ✅      | ✅ Jun 2026  |
| Dropdown    | ✅        | ✅         | ✅      | ✅ Jun 2026  |
| Tag         | ✅        | ✅         | ✅      | ✅ Jun 2026  |
| Badge       | ✅        | ✅         | ✅      | ✅ Jun 2026  |
| Avatar      | ✅        | ✅         | ✅      | ✅ Jun 2026  |
| Alert       | ✅        | ✅         | ✅      | ✅ Jun 2026  |
| Tooltip     | ✅        | ✅         | ✅      | ✅ Jun 2026  |
| Tabs        | ✅        | ✅         | ✅      | ✅ Jun 2026  |
| Pagination  | ✅        | ✅         | ✅      | ✅ Jun 2026  |
| Upload Media | ✅       | ✅         | ✅      | ✅ Jun 2026  |
| Slider      | ✅        | ✅         | ✅      | ✅ Jun 2026  |
| Rating      | ✅        | ✅         | ✅      | ✅ Jun 2026  |
| Date Picker | ✅        | ✅         | ✅      | ✅ Jun 2026  |
| Options     | ✅        | ✅         | ✅      | ✅ Jun 2026  |
| Table       | ✅        | ✅         | ✅      | ✅ Jun 2026  |
| Snackbar    | ✅        | ✅         | ✅      | ✅ Jun 2026  |
| Progress Bar | ✅       | ✅         | ✅      | ✅ Jun 2026  |
| Link        | ✅        | ✅         | ✅      | ✅ Jun 2026  |
| Breadcrumb  | ✅        | ✅         | ✅      | ✅ Jun 2026  |

---

## Production checklist — a component is NOT done until all boxes are checked

### Component file ([Name].jsx)

- [ ] `React.forwardRef` wraps the component
- [ ] `displayName` is set: `Button.displayName = 'Button'`
- [ ] `...rest` is spread onto the root DOM element (button, input, etc.)
- [ ] Custom props are explicitly destructured BEFORE `...rest` so they don't reach the DOM
- [ ] `type="button"` default on all `<button>` elements (prevents accidental form submit)
- [ ] No hardcoded hex values or px values — CSS handles all visual styling
- [ ] Class names in JSX match the HTML docs exactly (e.g. `btn-primary`, not `btn--primary`)
- [ ] No CSS file imported in the component — styles come from the global `components.css`
- [ ] `PropTypes` defined and exported
- [ ] JSDoc comment on component and each prop

### Stories file ([Name].stories.jsx)

- [ ] `tags: ['autodocs']` present
- [ ] `parameters.docs.description.component` — one paragraph explaining the component
- [ ] `argTypes` defined for all custom props with `table.defaultValue` and `table.type`
- [ ] Native pass-through props (like `aria-label`) are documented in argTypes as text controls
- [ ] **Playground** story — all props wired to controls, interactive
- [ ] **States** story — all visual states (unchecked/checked/indeterminate or all variants)
- [ ] **Disabled** story — every variant in disabled state
- [ ] **FullMatrix** story — every variant × size × state in a table
- [ ] Dark mode tested (use the Light/Dark toolbar toggle)

### Barrel export

- [ ] `react/src/components/[Name]/index.js` exports the component
- [ ] `react/src/index.js` exports the component

---

## How to add a new component — 5 steps

### Step 1 — Read the HTML doc

```
docs/components/[name].html
```

Look for:
- The HTML element structure (which tags, which class names)
- Every state and variant shown in the demo panels
- The API table at the bottom (the contract)
- Any JS-only behaviour (e.g. indeterminate on checkbox)

### Step 2 — Read the CSS block

```bash
grep -n "COMPONENT NAME\|\.classname" docs/shared/components.css
```

You do NOT rewrite this CSS. You just need to understand which classes
control which states so you can apply them correctly in JSX.

### Step 3 — Write [Name].jsx

Template:

```jsx
import React from 'react';
import PropTypes from 'prop-types';

/**
 * [One-line description].
 * [Key usage rule #1].
 * [Key usage rule #2].
 * Any native <element> attribute passes through via ...rest.
 */
export const ComponentName = React.forwardRef(function ComponentName(
  {
    /** Prop description */
    propName = 'default',
    /** Additional class names on the root element. */
    className,
    /** All native element props pass through (data-testid, aria-*, onFocus, etc.). */
    ...rest
  },
  ref
) {
  const classes = ['base-class', `modifier-${propName}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <element ref={ref} className={classes} {...rest}>
      {/* children */}
    </element>
  );
});

ComponentName.displayName = 'ComponentName';

ComponentName.propTypes = {
  propName:  PropTypes.oneOf(['option1', 'option2']),
  className: PropTypes.string,
};

ComponentName.defaultProps = {
  propName: 'default',
};

export default ComponentName;
```

### Step 4 — Write [Name].stories.jsx

Template:

```jsx
import React from 'react';
import { ComponentName } from './ComponentName';

export default {
  title: 'Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `One paragraph. What it is, when to use it.`,
      },
    },
  },
  argTypes: {
    propName: {
      control: { type: 'select' },
      options: ['option1', 'option2'],
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'option1 | option2' },
      },
    },
  },
};

// Required: Playground, States, Disabled, FullMatrix
// Optional: Group (if multiple instances work together), WithIcons
```

### Step 5 — Export

Create `react/src/components/[Name]/index.js`:
```js
export { ComponentName, default } from './ComponentName';
```

Add to `react/src/index.js`:
```js
export { ComponentName } from './components/ComponentName';
```

---

## Non-negotiable rules

### CSS — never write it per component
No `.css` files in component folders. All styles are in
`docs/shared/components.css`, imported once in `.storybook/preview.js`.
Class names in JSX must match the HTML docs exactly.

### forwardRef — always
Every component uses `React.forwardRef`. No exceptions. Developers need
to be able to focus, measure, and test components programmatically.

### rest spread — always
Every component spreads `...rest` onto the root DOM element. This makes
`data-testid`, `aria-*`, `onFocus`, `tabIndex`, and any future HTML
attribute work without changes to the component.

### type="button" — always on buttons
Every `<button>` element has `type="button"` as the default. Override
via the `type` prop when needed (`"submit"`, `"reset"`). This prevents
accidental form submission which is a silent, hard-to-debug bug.

### No ariaLabel wrapper prop
Do not create a custom `ariaLabel` prop. Consumers pass `aria-label`
directly — it flows through `...rest` to the DOM. This is simpler and
matches the HTML standard.

### PropTypes — always
Every component has `PropTypes` defined. This is the runtime safety net
for JavaScript consumers. Without it, passing `variant="Primary"` (wrong
case) gives no warning.

### Class names — match HTML docs exactly
```
✅ btn-primary    (matches components.css)
❌ btn--primary   (BEM — does not match)
✅ checkbox-input (matches components.css)
❌ checkbox__input (BEM — does not match)
```

---

## Special cases to remember

### Indeterminate on checkboxes (and any future tri-state input)
`indeterminate` is a DOM property only — it cannot be set via HTML attribute.
Always use `useRef` + `useEffect`:
```jsx
useEffect(() => {
  if (internalRef.current) internalRef.current.indeterminate = indeterminate;
}, [indeterminate]);
```

### Merging a forwarded ref with an internal ref
When you need both a forwarded ref AND an internal ref (e.g. Checkbox needs
to write `indeterminate` to the input but also expose the input to consumers),
use a callback ref setter:
```jsx
const setRef = (el) => {
  internalRef.current = el;
  if (typeof forwardedRef === 'function') forwardedRef(el);
  else if (forwardedRef) forwardedRef.current = el;
};
```

### Controlled vs uncontrolled inputs
Support both patterns. Do NOT add an `onChange` fallback to suppress React's
warning — that warning tells developers they forgot to wire up the handler:
```jsx
const isControlled = checked !== undefined;
const inputProps = isControlled
  ? { checked, onChange }        // React warns if onChange is missing — that's correct
  : { defaultChecked, onChange };
```

### Loading state (Button)
Loading is CSS-only via `.btn-loading::after`. Do not render a `<span>`
spinner. Just add the `btn-loading` class. CSS makes the label transparent
and shows the animated ring.

### JSX requires React in scope
`@storybook/react-vite` 8.x uses classic JSX transform. Every `.jsx` file
needs `import React from 'react'` at the top.

### Use `js` not `jsx` for code blocks in descriptions
Storybook 8 applies an interactive "props badge" renderer to ` ```jsx ` code
blocks — every token becomes a blue clickable box. Use ` ```js ` instead:
````
```js
import { Button } from 'digilawyer-ds';
<Button variant="primary">Save</Button>
```
````
This uses the standard syntax highlighter and produces clean, copy-pasteable code.

### Storybook runs from the react/ directory
```bash
cd react && npm run storybook    ✅
npm run storybook                ❌ (no package.json at repo root)
```

---

## File structure per component

```
react/src/components/[Name]/
├── [Name].jsx          ← component (no CSS import)
└── index.js            ← export { Name, default } from './Name'

react/src/components/[Name]/[Name].stories.jsx   ← Storybook stories
```

No `.css` file. Ever.

---

## Known gaps (tracked, not urgent)

| Gap | Notes |
|-----|-------|
| No build output | `main: src/index.js` points to raw JSX. Need `vite build --lib`. Consumers need their own bundler for now. |
| TypeScript | PropTypes are the interim solution. TS migration is a separate project. |
| `components.css` ships docs scaffolding | Classes like `.demo-box` are inert but are unnecessary weight. Splitting into `components-lib.css` + `docs-scaffolding.css` is future work. |
| No automated tests | Unit tests with Testing Library are future work. |
