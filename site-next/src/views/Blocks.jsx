import React from 'react';
import { Link } from '../router.jsx';
import { BlockCard } from '../ui/BlockCard.jsx';
import { blockCategories, blockCategoryByKey, totalBlocks } from '../data/blocks.js';

/**
 * Blocks index — categories and how many variants each holds.
 *
 * Server Component: nothing here is interactive, so none of it ships as JS.
 */
export function BlocksIndex() {
  return (
    <div className="page" data-rail="false">
      <div>
        <div className="eyebrow">BLOCKS</div>
        <h1 className="page-title">Blocks</h1>
        <p className="page-lede">
          Page sections built from the design system, grouped by what they do.{' '}
          {totalBlocks} block{totalBlocks === 1 ? '' : 's'} across {blockCategories.length}{' '}
          categor{blockCategories.length === 1 ? 'y' : 'ies'}. Preview one at any width, then copy
          the source straight into a prototype.
        </p>

        <div className="card-grid" style={{ marginTop: 32 }}>
          {blockCategories.map((c) => (
            <Link className="card" to={`/blocks/${c.key}`} key={c.key}>
              <div className="card-name">{c.name}</div>
              <div className="card-meta">
                {c.blocks.length} block{c.blocks.length === 1 ? '' : 's'}
              </div>
              <div className="card-desc">{c.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * One category — the showroom itself.
 *
 * Also a Server Component. Each BlockCard is a client island, so the page text
 * and the card scaffolding stay server-rendered; only the viewport switcher and
 * copy button hydrate.
 */
export function BlockCategory({ categoryKey }) {
  const category = blockCategoryByKey[categoryKey];
  if (!category) return null;

  const n = category.blocks.length;

  return (
    <div className="page" data-rail="false">
      <div>
        <div className="eyebrow">BLOCKS</div>
        <h1 className="page-title">{category.name}</h1>
        <p className="page-lede">
          {category.description}{' '}
          <span className="blocks-count">
            {n} block{n === 1 ? '' : 's'}
          </span>
        </p>

        <div style={{ marginTop: 32 }}>
          {n === 0 ? (
            <p className="page-lede">No blocks in this category yet.</p>
          ) : (
            category.blocks.map((b) => <BlockCard block={b} key={b.id} />)
          )}
        </div>
      </div>
    </div>
  );
}
