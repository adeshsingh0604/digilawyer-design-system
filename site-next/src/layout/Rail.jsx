'use client';
// Scroll-spy needs real scroll positions, so this island is unavoidably client.
// It is deliberately separate from the shell frame: a page without a rail
// should not pay for the IntersectionObserver.

import React, { useEffect, useState } from 'react';

/**
 * Right-hand "on this page" rail, with scroll-spy.
 *
 * The page scrolls inside `.panel-scroll` rather than the window, so that
 * element — not the viewport — has to be the observer root, or nothing ever
 * intersects.
 */
export function Rail({ items }) {
  const [active, setActive] = useState(items?.[0]?.id ?? null);

  useEffect(() => {
    if (!items?.length) return;

    const root = document.querySelector('.panel-scroll');
    const targets = items.map((i) => document.getElementById(i.id)).filter(Boolean);
    if (!root || !targets.length) return;

    let frame = 0;

    // Position-based rather than IntersectionObserver: sections here are taller
    // than the trigger band, so "which heading have I most recently passed" is
    // the question, and measuring answers it directly.
    const compute = () => {
      frame = 0;
      const line = root.getBoundingClientRect().top + root.clientHeight * 0.25;
      let current = targets[0].id;
      for (const t of targets) {
        if (t.getBoundingClientRect().top <= line) current = t.id;
      }
      setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };

    // Two triggers on purpose. The scroll listener is the responsive one during
    // real user scrolling; the observer catches movement that raises no scroll
    // event — programmatic jumps, anchor navigation, layout shifts as images
    // and fonts settle.
    const observer = new IntersectionObserver(schedule, {
      root,
      threshold: [0, 0.5, 1],
    });
    targets.forEach((t) => observer.observe(t));

    root.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    compute();

    return () => {
      observer.disconnect();
      root.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  if (!items?.length) return null;

  return (
    <nav className="rail" aria-label="On this page">
      <div className="rail-title">ON THIS PAGE</div>
      {items.map((i) => (
        <a
          key={i.id}
          href={`#${i.id}`}
          data-active={i.id === active || undefined}
          aria-current={i.id === active ? 'location' : undefined}
          onClick={() => setActive(i.id)}
        >
          {i.label}
        </a>
      ))}
    </nav>
  );
}
