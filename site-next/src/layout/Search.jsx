'use client';
// uses browser APIs / React state.

import React, { useEffect, useMemo, useState } from 'react';
import { Modal } from '../ui/Modal.jsx';
import { useRoute } from '../router.jsx';
import { componentList } from '../data/components';
import { blockCategories } from '../data/blocks.js';

/** Flat, pre-built index — the route table is small enough to search in memory. */
function buildIndex() {
  return [
    { label: 'Installation', to: '/installation', kind: 'Docs' },
    { label: 'Framework Support', to: '/framework-support', kind: 'Docs' },
    { label: 'Changelog', to: '/changelog', kind: 'Docs' },
    { label: 'Dashboards', to: '/dashboards', kind: 'Docs' },
    { label: 'Templates', to: '/templates', kind: 'Docs' },
    ...componentList.map((c) => ({
      label: c.name,
      to: `/components/${c.key}`,
      kind: c.docsOnly ? 'Planned' : 'Component',
    })),
    ...componentList.flatMap((c) =>
      c.variants.map((v) => ({
        label: `${c.name} · ${v.name}`,
        to: `/components/${c.key}`,
        kind: 'Variant',
      }))
    ),
    ...blockCategories.map((b) => ({ label: b.name, to: `/blocks/${b.key}`, kind: 'Blocks' })),
  ];
}

export function SearchDialog({ onClose }) {
  const { navigate } = useRoute();
  const [q, setQ] = useState('');
  const [cursor, setCursor] = useState(0);
  const index = useMemo(buildIndex, []);

  const hits = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return index.slice(0, 12);
    return index.filter((i) => i.label.toLowerCase().includes(needle)).slice(0, 30);
  }, [q, index]);

  useEffect(() => setCursor(0), [q]);

  const go = (hit) => {
    if (!hit) return;
    navigate(hit.to);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <input
        className="search-input"
        autoFocus
        placeholder="Search components, blocks and docs…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setCursor((c) => Math.min(c + 1, hits.length - 1));
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setCursor((c) => Math.max(c - 1, 0));
          } else if (e.key === 'Enter') {
            e.preventDefault();
            go(hits[cursor]);
          }
        }}
      />
      <div className="search-results">
        {hits.length === 0 ? (
          <div className="search-empty">No matches for “{q}”.</div>
        ) : (
          hits.map((h, i) => (
            <button
              key={`${h.to}-${h.label}`}
              type="button"
              className="search-hit"
              data-on={i === cursor}
              onMouseEnter={() => setCursor(i)}
              onClick={() => go(h)}
            >
              <span>{h.label}</span>
              <span className="search-kind">{h.kind}</span>
            </button>
          ))
        )}
      </div>
    </Modal>
  );
}
