# DigiLawyer DS — React Component Audit

> Audit date: June 2026 · Auditor: Senior review pass  
> Scope: Button, Checkbox · Goal: production-ready, shippable to developers

---

## Summary

Both components are **not yet shippable**. The visual output is correct and
Storybook works, but the component contracts have five issues that will
cause real pain when developers try to use them in a product. All are fixable
in one session. Nothing requires a rewrite.

---

## Critical issues — must fix before shipping

### C1 — No `React.forwardRef` on Button or Checkbox

**What breaks:** Developers cannot attach a `ref` to these components.
This means they can't programmatically focus a button after a modal opens,
can't scroll to a checkbox that failed validation, can't use refs for
third-party form libraries (React Hook Form, Formik).

```jsx
// This silently fails today — ref is always null
const btnRef = useRef(null);
<Button ref={btnRef}>Save</Button>
```

**Fix:** Wrap both components in `React.forwardRef`. Button's ref goes to
the `<button>` element. Checkbox's ref goes to the `<input>` element (not
the label wrapper — that's what consumers want to focus).

---

### C2 — Button `type` is hardcoded to `"button"`

**What breaks:** Any developer who puts a Button inside a `<form>` and
expects it to submit will be confused. HTML default for `<button>` inside a
form is `type="submit"`. By hardcoding `"button"`, we broke submit buttons
permanently with no override possible.

```jsx
// Intended: submit the form. Actual: nothing happens.
<form onSubmit={handleSubmit}>
  <Button>Submit</Button>
</form>
```

**Fix:** Accept `type` as a prop with default `'button'`. This keeps the
safe default but lets developers use `type="submit"` or `type="reset"`.

---

### C3 — No `...rest` spread — native props are silently dropped

**What breaks:** Developers can't pass native HTML attributes. This includes:
- `data-testid` — breaks every test that queries by this attribute
- `tabIndex` — can't remove a button from tab order
- `onFocus`, `onBlur` — can't show tooltips or run analytics on focus
- `form` — can't associate a button with a form by ID
- `aria-describedby` — can't link error messages to inputs
- `aria-controls`, `aria-expanded` — can't build dropdowns/accordions

```jsx
// data-testid is silently dropped today
<Button data-testid="save-btn">Save</Button>
// querySelector('[data-testid="save-btn"]') → null
```

**Fix:** Destructure only custom props, spread `...rest` onto the underlying
element.

---

### C4 — CSS entry point ships docs-site scaffolding to consumers

**What the problem is:** `docs/shared/components.css` is the documentation
site's CSS file. It contains 2,958 lines including `.demo-box`, `.demo-panel`,
`.tok-table`, `.anatomy-wrap`, `.usage-grid` and dozens of other docs-only
classes. When a developer does `import 'digilawyer-ds/styles.css'`, they get
all of that in their production bundle.

These are named classes (not global selectors like `* {}` or `body {}`), so
they won't break anything unless the developer happens to use the same class
names. But it's sloppy and adds unnecessary weight.

**Fix:** Create `react/src/styles.css` as the clean consumer entry point.
Long term: split `components.css` into `docs-scaffolding.css` +
`components-lib.css`. Tracked as future work.

---

### C5 — No type safety — props are silent failures

**What breaks:** A developer passes `variant="Primary"` (capital P) and
sees a broken button with no error. They pass `size="large"` instead of
`"lg"` — same result. There's no warning in the console.

**Fix:** Add PropTypes as the immediate solution (it's a runtime dev-mode
check, zero cost in production). TypeScript migration is the long-term fix —
tracked separately.

---

## High priority — important for production quality

### H1 — Checkbox `onChange` fallback is wrong

```jsx
// Current — for controlled mode:
onChange: onChange || (() => {})
```

The empty function silently suppresses React's "You provided a `checked`
prop without an `onChange` handler" warning. That warning exists for a
good reason — it tells developers they forgot to wire up the handler. We
should not hide it.

**Fix:** Remove the fallback. Let React's warning do its job. If a consumer
passes `checked` without `onChange`, they'll see the warning and add the
handler.

---

### H2 — Checkbox missing `required` and `aria-describedby`

Every production form uses `required` on inputs. `aria-describedby` links
a checkbox to an error message. Neither can be passed today because there's
no `...rest` spread on the `<input>`.

---

### H3 — `ariaLabel` prop on Button is redundant once `...rest` lands

Once `...rest` is spread onto the button, consumers can pass `aria-label`
directly (the real HTML attribute, camelCase in JSX: `aria-label="Close"`).
The custom `ariaLabel` prop wrapper becomes unnecessary and is confusing.

**Fix:** Remove the `ariaLabel` prop. Consumers use `aria-label` directly
via `...rest`.

---

## Medium priority — noted for near-term fixes

### M1 — No build output

`package.json` points `main` to `src/index.js` (raw JSX). Consumers need
a bundler configured to transpile JSX from `node_modules`, which most do not.
The library needs a build step (`vite build --lib`) to output compiled JS.
**Tracked as a separate session — requires build config work.**

### M2 — Storybook Playground for Checkbox uses local state

The Controls panel in Storybook cannot sync with the story's `useState`.
If a developer tries to toggle "checked" from the Controls panel, nothing
happens. Should use Storybook's `useArgs` hook instead.

### M3 — Stories inline SVG icons vs a shared icon system

The same PlusIcon SVG is defined three times across the codebase
(Button stories, Checkbox stories). Should be a shared `icons.jsx` in
`react/src/`. Minor until the icon count grows.

---

## What is already correct

- ✅ Token-driven CSS — zero hardcoded hex values, dark mode works automatically
- ✅ HTML class names match docs exactly — no BEM divergence
- ✅ `useId` for auto-generating input IDs — correct React 18 approach
- ✅ `indeterminate` handled via `useRef` + `useEffect` — only correct way
- ✅ Controlled/uncontrolled pattern on Checkbox — correct dual-mode support
- ✅ `aria-busy` on loading Button — correct accessibility attribute
- ✅ CSS global import strategy — tokens + components loaded once in preview.js

---

## Fix order

| # | Fix | Effort | Done |
|---|---|---|---|
| C3 | Add `...rest` spread to both components | 10 min | ✅ |
| C1 | Add `React.forwardRef` to both components | 15 min | ✅ |
| C2 | Make `type` a prop on Button | 2 min | ✅ |
| H3 | Remove `ariaLabel` prop from Button (use `aria-label` via rest) | 2 min | ✅ |
| H1 | Fix Checkbox `onChange` fallback | 2 min | ✅ |
| C5 | Add PropTypes to both components | 20 min | ✅ |
| C4 | Create `react/src/styles.css` clean entry point | 5 min | ✅ |
| M2 | Fix Checkbox Playground story (useArgs, remove stale ariaLabel argType) | 15 min | ✅ |
| M1 | Build output (vite lib mode) | — | 🔲 separate session |
| M3 | Shared icons file across stories | — | 🔲 low priority |
