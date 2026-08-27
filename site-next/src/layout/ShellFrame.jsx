'use client';
// The interactive frame: sidebar open/closed, the search dialog, and the theme
// toggle. Everything that is *not* interactive — the breadcrumb trail and the
// page itself — arrives as already-rendered nodes from the server and is never
// shipped to the browser.

import React, { useEffect, useState } from 'react';
import { SearchDialog } from './Search.jsx';
import { Icon } from '../ui/icons.jsx';
import { useRoute } from '../router.jsx';

// Shared with docs/shared/ds.js — same key, same origin, one theme choice.
const THEME_KEY = 'ds-theme';
const MOBILE = '(max-width: 900px)';

function useTheme() {
  // Must match the server's first render exactly or hydration errors. The
  // pre-paint script in app/layout.jsx has already applied the real theme to
  // <html>, so we start on the SSR value and adopt the real one on mount —
  // rather than reading the DOM during the first client render, which would
  // disagree with the server whenever the stored theme is not the default.
  const [theme, setTheme] = useState('dark');
  const [adopted, setAdopted] = useState(false);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || 'dark');
    setAdopted(true);
  }, []);

  useEffect(() => {
    // Guarded on `adopted` so the first pass never writes the SSR default back
    // over the theme the pre-paint script already applied — that would undo the
    // no-flash behaviour this whole arrangement exists to protect.
    if (!adopted) return;
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Private mode: the choice just will not persist across reloads.
    }
  }, [theme, adopted]);

  return [theme, setTheme];
}

function useMediaQuery(query) {
  // Always false on the first render, server and client alike — reading
  // matchMedia here would disagree with the server on a narrow viewport and
  // trigger a hydration mismatch. The effect below corrects it on mount.
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    mql.addEventListener('change', onChange);
    setMatches(mql.matches);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

export function ShellFrame({ sidebar, crumbs, children }) {
  const isMobile = useMediaQuery(MOBILE);
  // Desktop resting state on the first render, server and client alike. The
  // isMobile effect below closes it on mount if the viewport is actually narrow.
  const [open, setOpen] = useState(true);
  const [searching, setSearching] = useState(false);
  const [theme, setTheme] = useTheme();
  const { path } = useRoute();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearching(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // The document title used to be set here from the crumb trail. Every route now
  // exports metadata / generateMetadata, so Next owns titles and this effect
  // would only fight it.

  // Crossing the breakpoint resets the sidebar to the resting state for that
  // mode — open as a column on desktop, closed as a drawer on mobile. Without
  // this, shrinking then re-widening leaves the desktop sidebar hidden.
  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  // Following a link on mobile should reveal the page it went to, not leave the
  // drawer sitting on top of it. Keyed on `path` alone so it does not also fire
  // on a breakpoint change, which the effect above already owns.
  useEffect(() => {
    if (isMobile) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  // Escape closes the drawer, matching the modals.
  useEffect(() => {
    if (!isMobile || !open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isMobile, open]);

  return (
    <div className="shell" data-open={open}>
      {sidebar}

      {isMobile && open && (
        <button
          type="button"
          className="sidebar-scrim"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        />
      )}

      <main className="panel">
        <div className="topbar">
          <button
            type="button"
            className="icon-btn"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Hide navigation' : 'Show navigation'}
            aria-expanded={open}
            title="Toggle navigation"
          >
            <Icon.panel />
          </button>

          {crumbs}

          <span className="topbar-spacer" />

          <button type="button" className="searchbar" onClick={() => setSearching(true)}>
            <Icon.search />
            <span>Search components…</span>
            <kbd>⌘K</kbd>
          </button>

          <button
            type="button"
            className="icon-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Icon.sun /> : <Icon.moon />}
          </button>
        </div>

        <div className="panel-scroll">{children}</div>
      </main>

      {searching && <SearchDialog onClose={() => setSearching(false)} />}
    </div>
  );
}
