'use client';

/**
 * Compatibility shim for the Vite site's hand-rolled router.
 *
 * The original `site/src/router.jsx` implemented history navigation by hand
 * because the docs site had a flat, fully-known route table. Next's file-based
 * router replaces all of that, but the copied pages and layout still import
 * `Link`, `useRoute` and `isActive` from here — keeping this module means the
 * port is a routing change, not a rewrite of every consumer.
 *
 * The old `BASE` / `toHref` logic is gone: Next handles a deploy subpath via
 * `basePath` in next.config.mjs, so routes are written base-free everywhere and
 * nothing in the app needs to know where the site is mounted.
 */

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

/** Mirrors the old `useRoute()` contract — callers only ever read `.path`. */
export function useRoute() {
  return { path: usePathname() || '/' };
}

/**
 * Anchor that keeps cmd/ctrl-click, middle-click and "open in new tab" working.
 * next/link already handles all of that, so this is a thin prop rename from the
 * old `to` API to next/link's `href`.
 */
export function Link({ to, children, className, ...rest }) {
  return (
    <NextLink href={to} className={className} {...rest}>
      {children}
    </NextLink>
  );
}

/** True when `path` is the current route, or a parent of it. Unchanged logic. */
export function isActive(current, to, { exact = false } = {}) {
  if (exact) return current === to;
  return current === to || current.startsWith(to + '/');
}
