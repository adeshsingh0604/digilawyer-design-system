'use client';
// Client-only: the rich data files below export `render: () => <Button …/>`
// functions, which cannot cross a server→client boundary. Anything the SERVER
// needs (route params, page titles) must come from registry.js instead.

import button from './button.jsx';
import buttonGroup from './button-group.jsx';
import badge from './badge.jsx';
import avatar from './avatar.jsx';
import alert from './alert.jsx';
import tag from './tag.jsx';

import { writtenEntries, plannedEntries } from './registry.js';

/**
 * Component registry.
 *
 * Adding a component is one data file, one import here, and one line in
 * registry.js — the sidebar, the index grid, search and the route all read
 * from this list.
 *
 * `docsOnly: true` marks a component that exists in the library and Storybook
 * but has no variant gallery written yet, so the site never implies coverage
 * it does not have.
 */
const written = [button, buttonGroup, badge, avatar, alert, tag];

// registry.js drives routing on the server while these files drive rendering on
// the client, so a mismatch would 404 a component that visibly exists. Fail
// loudly in development rather than shipping a half-broken route.
if (process.env.NODE_ENV !== 'production') {
  const richKeys = written.map((c) => c.key).sort();
  const regKeys = writtenEntries.map((c) => c.key).sort();
  if (richKeys.join() !== regKeys.join()) {
    // eslint-disable-next-line no-console
    console.error(
      '[DigiLawyer UI] components/registry.js is out of sync with the data files.\n' +
        `  registry.js: ${regKeys.join(', ')}\n` +
        `  data files:  ${richKeys.join(', ')}\n` +
        '  Add the missing entry to registry.js, or routing and rendering will disagree.'
    );
  }
}

const planned = plannedEntries.map((c) => ({
  ...c,
  description: '',
  variants: [],
  docsOnly: true,
}));

export const componentList = [...written, ...planned].sort((a, b) => a.name.localeCompare(b.name));

export const componentByKey = Object.fromEntries(componentList.map((c) => [c.key, c]));

export const totalVariants = componentList.reduce((n, c) => n + c.variants.length, 0);

export const STORYBOOK_BASE =
  'https://adeshsingh0604.github.io/digilawyer-design-system/storybook/';
