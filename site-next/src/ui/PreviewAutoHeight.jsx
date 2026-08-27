'use client';
// Reports the preview document's real height to the parent card.
//
// Without this, every block needs a hand-tuned `height` in its meta — which
// breaks the moment a block changes size at runtime (Navigation-2's menu opens,
// an accordion expands). A ResizeObserver on <body> covers both cases: the
// initial measure and every later change.

import { useEffect } from 'react';

export function PreviewAutoHeight() {
  useEffect(() => {
    // Measure the block wrapper, NOT documentElement: html/body stretch to the
    // iframe's height, so documentElement.scrollHeight just echoes back whatever
    // height the parent already set and the card never shrinks.
    const root = document.querySelector('.block-preview-root');
    const post = () => {
      const target = root?.firstElementChild ?? root;
      if (!target) return;
      const h = Math.ceil(target.getBoundingClientRect().height);
      if (h > 0) {
        window.parent?.postMessage({ type: 'dl-block-height', height: h }, window.location.origin);
      }
    };
    post();

    // Observe the block itself, not just the wrapper. The wrapper can keep the
    // same box while its child grows, so watching only the wrapper misses a
    // runtime expansion like Navigation-2's menu opening. A MutationObserver
    // covers the case where the child element is replaced entirely.
    const ro = new ResizeObserver(post);
    if (root) ro.observe(root);
    if (root?.firstElementChild) ro.observe(root.firstElementChild);

    const mo = new MutationObserver(() => {
      post();
      if (root?.firstElementChild) ro.observe(root.firstElementChild);
    });
    if (root) mo.observe(root, { childList: true, subtree: true });
    // Fonts settle after first paint and change measured height.
    document.fonts?.ready.then(post).catch(() => {});
    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
