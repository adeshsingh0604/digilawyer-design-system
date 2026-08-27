'use client';
// The repeating unit of the blocks showroom. Every category reuses this, so a
// new block is one folder plus one registry line — nothing here is per-block.

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

// Real device widths, always. The frame renders at these dimensions so the
// block's own media queries fire truthfully, then the stage scales it down to
// fit — the same trick Chrome's device mode uses. Letting "Desktop" simply mean
// "fill the card" would show the mobile layout inside a narrow docs column,
// which is the exact bug a viewport switcher exists to prevent.
const VIEWPORTS = [
  { key: 'mobile', label: 'Mobile', width: 375 },
  { key: 'tablet', label: 'Tablet', width: 768 },
  { key: 'desktop', label: 'Desktop', width: 1280 },
];

const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13.5 2v3.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ExpandIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 2H2v4M10 14h4v-4M2 10v4h4M14 6V2h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 5.5v-2a1.5 1.5 0 0 0-1.5-1.5H3.5A1.5 1.5 0 0 0 2 3.5V9a1.5 1.5 0 0 0 1.5 1.5h2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export function BlockCard({ block }) {
  const [viewport, setViewport] = useState('desktop');
  const [copied, setCopied] = useState(false);
  // Bumping the key remounts the iframe, which is what "refresh" means here —
  // it resets any state the block holds without reloading the page.
  const [nonce, setNonce] = useState(0);
  const frameRef = useRef(null);
  const stageRef = useRef(null);
  const [scale, setScale] = useState(1);

  const active = VIEWPORTS.find((v) => v.key === viewport);
  // Seeded from meta so the card does not jump on first paint, then corrected by
  // the frame itself once it has measured — including when the block resizes at
  // runtime, e.g. Navigation-2's menu opening.
  const [height, setHeight] = useState(block.height ?? 160);

  useEffect(() => {
    const onMessage = (e) => {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type !== 'dl-block-height') return;
      if (e.source !== frameRef.current?.contentWindow) return;
      setHeight(Math.max(48, e.data.height));
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  // Scale only ever shrinks: a 375px mobile frame in a wide stage stays 375px
  // rather than being blown up, which would misrepresent the block's real size.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const fit = () => {
      // clientWidth includes the stage's padding, so subtract it — otherwise the
      // frame is scaled to a box wider than the space it actually has.
      const cs = getComputedStyle(stage);
      const available =
        stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      setScale(available > 0 ? Math.min(1, available / active.width) : 1);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [active.width]);

  const copySource = async () => {
    try {
      await navigator.clipboard.writeText(block.source ?? '');
    } catch {
      // Older browsers and insecure origins: fall back to a temporary textarea.
      const ta = document.createElement('textarea');
      ta.value = block.source ?? '';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const openFullscreen = () => {
    window.open(`/blocks/preview/${block.id}`, '_blank', 'noopener');
  };

  return (
    <section className="bc" aria-label={block.name}>
      <header className="bc-head">
        <div className="bc-name">{block.name}</div>

        <button type="button" className="bc-copy" onClick={copySource} title="Copy the block source">
          <CopyIcon />
          <span>{copied ? 'Copied' : 'Copy code'}</span>
        </button>
      </header>

      <div className="bc-toolbar">
        <div className="bc-viewports" role="group" aria-label="Preview width">
          {VIEWPORTS.map((v) => (
            <button
              key={v.key}
              type="button"
              className="bc-vp"
              data-active={viewport === v.key || undefined}
              onClick={() => setViewport(v.key)}
            >
              {v.label}
            </button>
          ))}
        </div>

        <span className="bc-spacer" />

        <button type="button" className="bc-icon" onClick={() => setNonce((n) => n + 1)} title="Reset the preview" aria-label="Reset the preview">
          <RefreshIcon />
        </button>
        <button type="button" className="bc-icon" onClick={openFullscreen} title="Open preview in a new tab" aria-label="Open preview in a new tab">
          <ExpandIcon />
        </button>
      </div>

      <div className="bc-stage" ref={stageRef}>
        {/* The wrapper reserves the *scaled* height so the card does not keep a
            1280px-tall gap after the frame inside it has been shrunk. */}
        <div className="bc-scaler" style={{ height: `${height * scale}px`, width: `${active.width * scale}px` }}>
          <iframe
            key={nonce}
            ref={frameRef}
            className="bc-frame"
            src={`/blocks/preview/${block.id}`}
            title={`${block.name} preview`}
            loading="lazy"
            style={{
              width: `${active.width}px`,
              height: `${height}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          />
        </div>
      </div>
    </section>
  );
}
