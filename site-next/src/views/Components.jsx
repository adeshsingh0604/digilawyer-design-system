'use client';
// Passes `variant` objects (which contain render functions) to VariantCard,
// so this whole subtree has to be client.

import React from 'react';
import { Link } from '../router.jsx';
import { componentList, componentByKey, totalVariants, STORYBOOK_BASE } from '../data/components';
import { VariantCard } from '../ui/VariantCard.jsx';

export function ComponentsIndex() {
  const ready = componentList.filter((c) => !c.docsOnly);
  const planned = componentList.filter((c) => c.docsOnly);

  return (
    <div className="page" data-rail="false">
      <div>
        <div className="eyebrow">EXPLORE</div>
        <h1 className="page-title">Components</h1>
        <p className="page-lede">
          {componentList.length} production components, {totalVariants} documented variants. Every
          preview on these pages renders the real component from source — not a screenshot, and not a
          copy that can drift.
        </p>

        <section className="section">
          <h2 className="section-title">Documented</h2>
          <p className="section-lede">Variant galleries written and verified.</p>
          <div className="card-grid">
            {ready.map((c) => (
              <Link className="card" to={`/components/${c.key}`} key={c.key}>
                <div className="card-name">{c.name}</div>
                <div className="card-meta">
                  {c.variants.length} variant{c.variants.length === 1 ? '' : 's'}
                </div>
                <div className="card-desc">{c.description}</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">In the library, gallery pending</h2>
          <p className="section-lede">
            These ship in the package today and are documented in Storybook. Their variant galleries
            land in a later phase — listed here rather than hidden, so the coverage gap is visible.
          </p>
          <div className="card-grid">
            {planned.map((c) => (
              <Link className="card" data-muted="true" to={`/components/${c.key}`} key={c.key}>
                <div className="card-name">{c.name}</div>
                <div className="card-meta">Planned</div>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: 20, color: 'var(--color-subheading)', fontSize: 13.5 }}>
            In the meantime, every one of them is browsable in{' '}
            <a
              href={STORYBOOK_BASE}
              target="_blank"
              rel="noreferrer noopener"
              style={{ color: 'var(--site-accent)' }}
            >
              Storybook
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

export function ComponentPage({ componentKey }) {
  const c = componentByKey[componentKey];

  if (!c) {
    return (
      <div className="page" data-rail="false">
        <div>
          <h1 className="page-title">Not found</h1>
          <p className="page-lede">
            No component named “{componentKey}”. <Link to="/components" style={{ color: 'var(--site-accent)' }}>Back to components</Link>.
          </p>
        </div>
      </div>
    );
  }

  const storybookHref = c.storybook ? STORYBOOK_BASE + c.storybook : STORYBOOK_BASE;

  return (
    <div className="page" data-rail="false">
      <div>
        <h1 className="page-title">{c.name}</h1>
        {c.description && <p className="page-lede">{c.description}</p>}

        {c.variants.length === 0 ? (
          <div className="empty">
            <div className="empty-title">Gallery not written yet</div>
            <p className="empty-note">
              {c.name} ships in the package today — this page just does not have its variant gallery
              yet. Its full API, props and states are documented in Storybook.
            </p>
            <a
              href={storybookHref}
              target="_blank"
              rel="noreferrer noopener"
              style={{ color: 'var(--site-accent)', fontSize: 13.5 }}
            >
              Open {c.name} in Storybook →
            </a>
          </div>
        ) : (
          <>
            <div className="variant-grid">
              {c.variants.map((v) => (
                <VariantCard variant={v} key={v.id} />
              ))}
            </div>
            <p style={{ marginTop: 26, color: 'var(--color-subheading)', fontSize: 13.5 }}>
              Full props table and controls:{' '}
              <a
                href={storybookHref}
                target="_blank"
                rel="noreferrer noopener"
                style={{ color: 'var(--site-accent)' }}
              >
                {c.name} in Storybook →
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
