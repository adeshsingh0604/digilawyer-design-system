import React from 'react';
import { Link } from '../router.jsx';
// Reads the server-safe registry, not data/components — that module is client
// only, and the homepage is the page that most needs to be real HTML.
import {
  routableComponents,
  writtenEntries,
  totalVariantCount,
} from '../data/components/registry.js';
import { blockCategories } from '../data/blocks.js';
import { latestVersion } from '../data/changelog.js';

export default function Home() {
  const featured = writtenEntries.slice(0, 6);

  return (
    <div className="page" data-rail="false">
      <div>
        <div className="eyebrow">DIGILAWYER DESIGN SYSTEM · {latestVersion}</div>
        <h1 className="page-title" style={{ fontSize: 44, maxWidth: '16ch' }}>
          The component library behind DigiLawyer.
        </h1>
        <p className="page-lede">
          {routableComponents.length} React components, {totalVariantCount} documented variants, one token
          layer that themes all of them. Built for legal-tech interfaces where a wrong state is a
          wrong outcome.
        </p>

        <div style={{ display: 'flex', gap: 10, marginTop: 26, flexWrap: 'wrap' }}>
          <Link
            to="/installation"
            className="card"
            style={{
              padding: '10px 18px',
              background: 'var(--site-accent)',
              color: '#1c1c1c',
              fontWeight: 600,
              fontSize: 13.5,
              borderColor: 'transparent',
            }}
          >
            Get started
          </Link>
          <Link to="/components" className="card" style={{ padding: '10px 18px', fontSize: 13.5 }}>
            Browse components
          </Link>
        </div>

        <section className="section">
          <h2 className="section-title">Featured components</h2>
          <div className="card-grid">
            {featured.map((c) => (
              <Link className="card" to={`/components/${c.key}`} key={c.key}>
                <div className="card-name">{c.name}</div>
                <div className="card-meta">{c.variantCount} variants</div>
                <div className="card-desc">{c.description}</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Blocks</h2>
          <p className="section-lede">Page sections, grouped by what they do.</p>
          <div className="card-grid">
            {blockCategories.slice(0, 8).map((b) => (
              <Link className="card" data-muted={b.blocks.length === 0} to={`/blocks/${b.key}`} key={b.key}>
                <div className="card-name">{b.name}</div>
                <div className="card-meta">
                  {b.blocks.length === 0 ? 'Planned' : `${b.blocks.length} blocks`}
                </div>
              </Link>
            ))}
          </div>
          <p style={{ marginTop: 18 }}>
            <Link to="/blocks" style={{ color: 'var(--site-accent)', fontSize: 13.5 }}>
              View all {blockCategories.length} categories →
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
