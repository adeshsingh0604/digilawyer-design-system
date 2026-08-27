// Server Component. The crumb trail is derived entirely from props the route
// already knows, so there is no reason to ship it to the browser — it is passed
// into ShellFrame as an already-rendered node.
import React from 'react';
import { Link } from '../router.jsx';

export function Breadcrumbs({ crumbs = [] }) {
  return (
    <nav className="topbar-crumbs" aria-label="Breadcrumb">
      {crumbs.map((c, i) => (
        <React.Fragment key={c.label}>
          {i > 0 && <span aria-hidden="true">/</span>}
          {i === crumbs.length - 1 || !c.to ? (
            <strong>{c.label}</strong>
          ) : (
            <Link to={c.to}>{c.label}</Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
