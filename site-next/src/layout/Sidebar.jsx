'use client';
// uses browser APIs / React state.

import React, { useState, useRef, useEffect } from 'react';
import { Link, useRoute, isActive } from '../router.jsx';
import { nav, socials } from '../data/nav.js';
import { latestVersion } from '../data/changelog.js';
import { NavIcon, Icon } from '../ui/icons.jsx';

function socialIcon(label) {
  if (label === 'GitHub') return <Icon.github />;
  if (label === 'LinkedIn') return <Icon.linkedin />;
  return <Icon.book />;
}

function NavGroup({ item, path }) {
  // A group starts open when the current route is inside it, so a deep link
  // lands with its own section already expanded.
  const [open, setOpen] = useState(() => isActive(path, item.to));

  return (
    <>
      <div className="nav-row" data-active={isActive(path, item.to)}>
        <NavIcon name={item.icon} />
        <Link to={item.to} className="nav-row-label">
          {item.label}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={`${open ? 'Collapse' : 'Expand'} ${item.label}`}
          style={{
            display: 'grid',
            placeItems: 'center',
            border: 0,
            background: 'none',
            color: 'inherit',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <Icon.caret className="nav-caret" data-open={open} />
        </button>
      </div>
      {open && (
        <div className="nav-children">
          {item.children.map((c) => (
            <Link key={c.to} to={c.to} className="nav-child" data-active={isActive(path, c.to, { exact: true })}>
              {c.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export function Sidebar({ hidden = false }) {
  const { path } = useRoute();
  const ref = useRef(null);

  // A drawer translated off-canvas is still focusable, so keyboard users would
  // otherwise tab into navigation they cannot see. `inert` is set imperatively
  // because React 18 does not recognise it as a JSX prop.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (hidden) el.setAttribute('inert', '');
    else el.removeAttribute('inert');
  }, [hidden]);

  return (
    <aside className="sidebar" ref={ref}>
      <Link to="/" className="sidebar-brand">
        <span className="sidebar-mark">D</span>
        <span className="sidebar-name">DigiLawyer UI</span>
        <span className="sidebar-version">{latestVersion}</span>
      </Link>

      <div className="sidebar-scroll">
        {nav.map((section) => (
          <div key={section.section}>
            <div className="nav-section">{section.section}</div>
            {section.items.map((item) =>
              item.type === 'group' ? (
                <NavGroup key={item.to} item={item} path={path} />
              ) : (
                <Link key={item.to} to={item.to} className="nav-row" data-active={isActive(path, item.to)}>
                  <NavIcon name={item.icon} />
                  <span className="nav-row-label">{item.label}</span>
                </Link>
              )
            )}
          </div>
        ))}
      </div>

      <div className="sidebar-foot">
        <div className="sidebar-foot-label">Links</div>
        <div className="sidebar-socials">
          {socials.map((s) => (
            <a
              key={s.label}
              className="sidebar-social"
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={s.label}
              title={s.label}
            >
              {socialIcon(s.label)}
            </a>
          ))}
        </div>
        <div className="sidebar-copy">© 2026 DigiLawyer Design System</div>
      </div>
    </aside>
  );
}
