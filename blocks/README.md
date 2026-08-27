# Blocks

Copy-paste page sections built from the DigiLawyer Design System.

Modelled on the Watermelon UI blocks showroom: a category page lists numbered
variants, each rendered **live** at Mobile / Tablet / Desktop with its source one
click away. The block is the deliverable — you copy the JSX, you do not install a
registry package.

## Anatomy

```
blocks/
  index.js                     registry — categories and their variants
  <category>/
    <category>-<n>/
      index.js                 re-export
      <Category><N>.jsx        the block itself
      <Category><N>.css        block-scoped styles, tokens only
      meta.js                  name, description, source string
```

## Rules

- **Tokens only.** Blocks compose DigiLawyer DS components and reference
  `var(--token)`. Never a raw hex — the same rule the DS itself follows.
- **Numbered variants, not descriptive names.** `navigation-1`, not
  `PrimaryNavWithSearch`. The preview tells you what it is; the number is just
  an address.
- **Self-contained.** A block must paste into an empty page and render. No
  provider, no context, no route assumptions.
- **The source string in `meta.js` is what the user copies.** It must be the
  real, runnable JSX — not a paraphrase.
