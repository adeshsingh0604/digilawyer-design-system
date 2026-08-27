import React from 'react';

/** Reserved section: the IA is committed, the content is not written yet. */
export function Placeholder({ eyebrow, title, lede, note }) {
  return (
    <div className="page" data-rail="false">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="page-title">{title}</h1>
        <p className="page-lede">{lede}</p>
        <div className="empty">
          <div className="empty-title">Not built yet</div>
          <p className="empty-note">{note}</p>
        </div>
      </div>
    </div>
  );
}

export const Dashboards = () => (
  <Placeholder
    eyebrow="EXPLORE"
    title="Dashboards"
    lede="Full application shells — navigation, data tables, filters and charts, wired together with the design system."
    note="Dashboards depend on Table, DatePicker, Dropdown and Pagination galleries landing first. They are the last phase of this build."
  />
);

export const Templates = () => (
  <Placeholder
    eyebrow="EXPLORE"
    title="Templates"
    lede="Complete, ready-to-use page layouts assembled from blocks."
    note="Templates are composed from blocks, so they follow the blocks phase."
  />
);
