'use client';
// DS barrel import and local state — this is an interactive component.

import React from 'react';
import { Button, Input, Avatar, Link } from '@adeshsingh0604/digilawyer-ds';
import './Navigation1.css';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Navigation-1 — full desktop top bar.
 *
 * Wordmark, primary links, inline search, account avatar and a single primary
 * action. Collapses to wordmark + action below 900px; the links and search are
 * hidden rather than stacked, because a legal-tech app's top bar sits above
 * dense content where a tall stacked menu pushes the work off-screen.
 */
export function Navigation1() {
  return (
    <header className="nav1">
      <a className="nav1-brand" href="#home">
        <span className="nav1-mark" aria-hidden="true">D</span>
        <span className="nav1-word">DigiLawyer</span>
      </a>

      <nav className="nav1-links" aria-label="Primary">
        <Link href="#notices" size="sm">Send Notice</Link>
        <Link href="#sign" size="sm">DGSign</Link>
        <Link href="#drafting" size="sm">Drafting</Link>
        <Link href="#storefront" size="sm">Storefronts</Link>
      </nav>

      <div className="nav1-actions">
        <div className="nav1-search">
          <Input size="sm" leadingIcon={<SearchIcon />} placeholder="Search cases…" aria-label="Search cases" />
        </div>
        <Avatar variant="initials" size="sm">AS</Avatar>
        <Button variant="primary" size="sm">New notice</Button>
      </div>
    </header>
  );
}

export default Navigation1;