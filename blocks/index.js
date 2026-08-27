/**
 * Block registry.
 *
 * Adding a block is one folder plus one line in its category's `blocks` array.
 * The site reads only this file — categories, ordering and counts all come from
 * here, so the sidebar, the index grid and the routes stay in step for free.
 */

import navigation1 from './navigation/navigation-1/meta.js';
import navigation2 from './navigation/navigation-2/meta.js';

export const blockCategories = [
  {
    key: 'navigation',
    name: 'Navigation',
    description: 'Top bars, sidebars and menu patterns.',
    blocks: [navigation1, navigation2],
  },
];

export const blockCategoryByKey = Object.fromEntries(
  blockCategories.map((c) => [c.key, c])
);

/** Flat list of every block, for search and the preview route. */
export const blocks = blockCategories.flatMap((c) =>
  c.blocks.map((b) => ({ ...b, category: c.key, categoryName: c.name }))
);

export const blockById = Object.fromEntries(blocks.map((b) => [b.id, b]));

export const totalBlocks = blocks.length;
