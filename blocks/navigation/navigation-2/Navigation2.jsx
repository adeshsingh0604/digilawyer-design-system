'use client';
// DS barrel import and local state — this is an interactive component.

import React, { useState } from 'react';
import { Button, Link } from '@adeshsingh0604/digilawyer-ds';
import './Navigation2.css';

const MenuIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Navigation-2 — compact bar with a real disclosure menu.
 *
 * The toggle is always present, not hidden behind a breakpoint, so the same
 * block works inside a narrow panel as well as full width. Menu state lives in
 * the block: paste it anywhere and it works with no provider.
 */
export function Navigation2() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav2">
      <div className="nav2-bar">
        <Button
          variant="tertiary"
          size="sm"
          square
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          iconLeft={open ? <CloseIcon /> : <MenuIcon />}
        />
        <a className="nav2-brand" href="#home">DigiLawyer</a>
        <span className="nav2-spacer" />
        <Button variant="primary" size="sm">Get started</Button>
      </div>

      {open && (
        <nav className="nav2-menu" aria-label="Primary">
          <Link href="#notices" size="sm">Send Notice</Link>
          <Link href="#sign" size="sm">DGSign</Link>
          <Link href="#drafting" size="sm">Drafting</Link>
          <Link href="#storefront" size="sm">Storefronts</Link>
        </nav>
      )}
    </header>
  );
}

export default Navigation2;