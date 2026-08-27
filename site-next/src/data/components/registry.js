/**
 * Server-safe component registry — routing's single source of truth.
 *
 * Why this exists separately from index.js: the rich data files export
 * `render: () => <Button …/>` functions, which forces them to be Client
 * Components. A client module's exports become client-reference stubs when read
 * from the server, so `generateStaticParams` and `generateMetadata` cannot read
 * them. This module contains no JSX and no '@ds' import, so the server can.
 *
 * Adding a component means one line here plus one rich data file. index.js
 * asserts in development that the two never drift apart.
 */

/** Components with a written variant gallery. */
export const writtenEntries = [
  {
    key: 'alert',
    name: 'Alert',
    variantCount: 5,
    description:
      'Inline feedback panel for contextual status. Seven semantic colours across three visual variants, with an optional action row.',
  },
  {
    key: 'avatar',
    name: 'Avatar',
    variantCount: 5,
    description:
      'Circular indicator for a user or entity — icon, initials or image, in four sizes, with optional status pin.',
  },
  {
    key: 'badge',
    name: 'Badge',
    variantCount: 6,
    description:
      'Status disc, count pill or verified checkmark. Seven semantic colours, three sizes.',
  },
  {
    key: 'button',
    name: 'Button',
    variantCount: 16,
    description:
      'The primary action element. Five variants, four sizes, five states — every colour resolved from tokens, never a hard-coded hex.',
  },
  {
    key: 'button-group',
    name: 'Button Group',
    variantCount: 4,
    description:
      'Layout wrapper that visually groups related buttons — attached or separated, horizontal or vertical.',
  },
  {
    key: 'tag',
    name: 'Tag',
    variantCount: 6,
    description:
      'Inline label chip for status, category or metadata. Eight colours × three variants × four sizes, display-only or clickable.',
  },
];

/**
 * In the library and Storybook, but with no variant gallery written yet.
 * `docsOnly` keeps the site from implying coverage it does not have.
 */
export const plannedEntries = [
  { key: 'breadcrumb', name: 'Breadcrumb' },
  { key: 'checkbox', name: 'Checkbox' },
  { key: 'date-picker', name: 'Date Picker' },
  { key: 'dropdown', name: 'Dropdown' },
  { key: 'link', name: 'Link' },
  { key: 'options', name: 'Options' },
  { key: 'pagination', name: 'Pagination' },
  { key: 'progress-bar', name: 'Progress Bar' },
  { key: 'radio', name: 'Radio Button' },
  { key: 'rating', name: 'Rating' },
  { key: 'slider', name: 'Slider' },
  { key: 'snackbar', name: 'Snackbar' },
  { key: 'table', name: 'Table' },
  { key: 'tabs', name: 'Tabs' },
  { key: 'textarea', name: 'Text Area' },
  { key: 'input', name: 'Text Input' },
  { key: 'toggle', name: 'Toggle Switch' },
  { key: 'tooltip', name: 'Tooltip' },
  { key: 'upload-media', name: 'Upload Media' },
];

/** Every component the site routes to, written or planned. */
/** Planned entries normalised to the same shape as written ones. */
const plannedNormalised = plannedEntries.map((c) => ({
  ...c,
  description: '',
  variantCount: 0,
  docsOnly: true,
}));

/** Every component the site routes to, written or planned. Server-safe. */
export const routableComponents = [...writtenEntries, ...plannedNormalised].sort((a, b) =>
  a.name.localeCompare(b.name)
);

/** Total documented variants — server-safe equivalent of index.js's totalVariants. */
export const totalVariantCount = writtenEntries.reduce((n, c) => n + c.variantCount, 0);

export const componentNameByKey = Object.fromEntries(
  routableComponents.map((c) => [c.key, c.name])
);
