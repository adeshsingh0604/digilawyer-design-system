/**
 * Re-export of the block registry at the repo root.
 *
 * The registry lives in `blocks/` rather than inside the site so the block
 * sources are byte-for-byte what a designer pastes into a prototype — the site
 * is a consumer of them, not their owner.
 */
export {
  blockCategories,
  blockCategoryByKey,
  blocks,
  blockById,
  totalBlocks,
} from '@blocks/index.js';
