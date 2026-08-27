'use client';
// Client because the filter bar is interactive. The entry data is imported as a
// module rather than passed down as props from a Server Component — passing it
// would serialise all 133 entries into the RSC payload *and* ship them in the
// bundle. This way the HTML is still server-rendered for crawlers, but the data
// crosses the wire once.

import React, { useMemo, useState } from 'react';
import { changelog, contributors, releaseTypes } from '../data/changelog.js';
import { Icon } from '../ui/icons.jsx';

const tone = (type) =>
  ({ MAJOR: 'pill-major', MINOR: 'pill-minor', PATCH: 'pill-patch' })[type?.toUpperCase()] ??
  'pill-accent';

/** Order pills by significance rather than however they appear in the file. */
const TYPE_ORDER = ['MAJOR', 'MINOR', 'PATCH'];
const orderedTypes = TYPE_ORDER.filter((t) =>
  releaseTypes.some((r) => r?.toUpperCase() === t)
);

export default function Changelog() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('ALL');
  const [author, setAuthor] = useState('ALL');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return changelog.filter((e) => {
      if (type !== 'ALL' && e.type?.toUpperCase() !== type) return false;
      if (author !== 'ALL' && e.author !== author) return false;
      if (!q) return true;
      // Version, title, description and author are all searchable — looking up
      // "who changed the datepicker" should work as well as "v2.53".
      return [e.version, e.title, e.description, e.author, e.date]
        .filter(Boolean)
        .some((f) => f.toLowerCase().includes(q));
    });
  }, [query, type, author]);

  const isFiltered = query.trim() !== '' || type !== 'ALL' || author !== 'ALL';

  const reset = () => {
    setQuery('');
    setType('ALL');
    setAuthor('ALL');
  };

  return (
    <div className="page" data-rail="false">
      <div>
        <div className="eyebrow">DOCS</div>
        <h1 className="page-title">Changelog</h1>
        <p className="page-lede">
          Every released version, newest first. This page is parsed from the repository&rsquo;s{' '}
          <code>CHANGELOG.md</code> at build time, so it cannot drift from what actually shipped.
        </p>

        <div className="cl-filters">
          <div className="cl-search">
            <Icon.search />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search versions, changes or contributors…"
              aria-label="Search the changelog"
            />
          </div>

          <div className="cl-filter-row">
            <div className="cl-filter-group">
              <span className="cl-filter-label">Type</span>
              <div className="cl-pills">
                <button
                  type="button"
                  className="cl-pill"
                  data-active={type === 'ALL' || undefined}
                  onClick={() => setType('ALL')}
                >
                  All
                </button>
                {orderedTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="cl-pill"
                    data-active={type === t || undefined}
                    onClick={() => setType(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="cl-filter-group">
              <label className="cl-filter-label" htmlFor="cl-author">
                Updated by
              </label>
              <select
                id="cl-author"
                className="cl-select"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              >
                <option value="ALL">All contributors</option>
                {contributors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {isFiltered && (
              <button type="button" className="cl-reset" onClick={reset}>
                Reset filters
              </button>
            )}
          </div>

          <div className="cl-count" role="status" aria-live="polite">
            {filtered.length === changelog.length
              ? `${changelog.length} releases`
              : `${filtered.length} of ${changelog.length} releases`}
          </div>
        </div>

        <div style={{ marginTop: 28 }}>
          {filtered.length === 0 ? (
            <div className="cl-empty">
              <p>No releases match those filters.</p>
              <button type="button" className="cl-reset" onClick={reset}>
                Reset filters
              </button>
            </div>
          ) : (
            filtered.map((e) => (
              <article className="log-entry" key={e.version}>
                <div>
                  <div className="log-version">{e.version}</div>
                  <div className="log-date">{e.date}</div>
                  {e.type && (
                    <div style={{ marginTop: 10 }}>
                      <span className={`pill ${tone(e.type)}`}>{e.type}</span>
                    </div>
                  )}
                  {/* Contributor sits in the meta column beside the version, not
                      trailing a wall of description text where nobody reads it. */}
                  {e.author && (
                    <button
                      type="button"
                      className="cl-author"
                      onClick={() => setAuthor(e.author)}
                      title={`Show only releases by ${e.author}`}
                    >
                      <span className="cl-author-avatar" aria-hidden="true">
                        {e.author
                          .split(' ')
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join('')
                          .toUpperCase()}
                      </span>
                      <span className="cl-author-name">{e.author}</span>
                    </button>
                  )}
                </div>
                <div>
                  <h2 className="log-title">{e.title}</h2>
                  <p className="log-desc">{e.description}</p>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
