import React from 'react';

const base = {
  width: 15,
  height: 15,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
};

export const Icon = {
  download: (p) => (
    <svg {...base} {...p}>
      <path d="M8 2v8m0 0L5 7m3 3 3-3M2.5 13h11" />
    </svg>
  ),
  brackets: (p) => (
    <svg {...base} {...p}>
      <path d="M5.5 2.5h-2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h2M10.5 2.5h2a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-2" />
    </svg>
  ),
  clock: (p) => (
    <svg {...base} {...p}>
      <circle cx="8" cy="8" r="5.75" />
      <path d="M8 4.75V8l2.25 1.5" />
    </svg>
  ),
  diamond: (p) => (
    <svg {...base} {...p}>
      <path d="M8 2 14 8l-6 6-6-6 6-6Z" />
    </svg>
  ),
  layers: (p) => (
    <svg {...base} {...p}>
      <path d="M8 2 1.75 5.25 8 8.5l6.25-3.25L8 2Z" />
      <path d="M1.75 10.75 8 14l6.25-3.25" />
    </svg>
  ),
  grid: (p) => (
    <svg {...base} {...p}>
      <rect x="2" y="2" width="5" height="5" rx="1" />
      <rect x="9" y="2" width="5" height="5" rx="1" />
      <rect x="2" y="9" width="5" height="5" rx="1" />
      <rect x="9" y="9" width="5" height="5" rx="1" />
    </svg>
  ),
  template: (p) => (
    <svg {...base} {...p}>
      <rect x="2" y="2.5" width="12" height="11" rx="1.5" />
      <path d="M2 6h12M6.5 6v7.5" />
    </svg>
  ),
  caret: (p) => (
    <svg {...base} width="12" height="12" {...p}>
      <path d="M6 3.5 10.5 8 6 12.5" />
    </svg>
  ),
  search: (p) => (
    <svg {...base} {...p}>
      <circle cx="7.25" cy="7.25" r="4.75" />
      <path d="m11 11 2.5 2.5" />
    </svg>
  ),
  code: (p) => (
    <svg {...base} width="14" height="14" {...p}>
      <path d="m5.5 5.5-3 2.5 3 2.5M10.5 5.5l3 2.5-3 2.5M9.25 3l-2.5 10" />
    </svg>
  ),
  copy: (p) => (
    <svg {...base} width="14" height="14" {...p}>
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
      <path d="M10.5 5.5v-2a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" />
    </svg>
  ),
  check: (p) => (
    <svg {...base} width="14" height="14" {...p}>
      <path d="m3 8.5 3.25 3.25L13 5" />
    </svg>
  ),
  close: (p) => (
    <svg {...base} {...p}>
      <path d="m4 4 8 8M12 4l-8 8" />
    </svg>
  ),
  panel: (p) => (
    <svg {...base} {...p}>
      <rect x="2" y="2.5" width="12" height="11" rx="1.5" />
      <path d="M6.25 2.5v11" />
    </svg>
  ),
  sun: (p) => (
    <svg {...base} {...p}>
      <circle cx="8" cy="8" r="3" />
      <path d="M8 1v1.5M8 13.5V15M15 8h-1.5M2.5 8H1M12.95 3.05l-1.06 1.06M4.11 11.89l-1.06 1.06M12.95 12.95l-1.06-1.06M4.11 4.11 3.05 3.05" />
    </svg>
  ),
  moon: (p) => (
    <svg {...base} {...p}>
      <path d="M13.5 9.4A5.75 5.75 0 0 1 6.6 2.5a5.75 5.75 0 1 0 6.9 6.9Z" />
    </svg>
  ),
  github: (p) => (
    <svg {...base} strokeWidth="1.2" {...p}>
      <path d="M6 13.2c-3 .9-3-1.5-4.2-1.8m8.4 3.6v-2.3c0-.7.1-1-.3-1.3 1.9-.2 3.6-.9 3.6-4.1 0-.9-.3-1.6-.8-2.2.1-.2.4-1-.1-2.1 0 0-.7-.2-2.3.9a7.8 7.8 0 0 0-4 0C4.7 2.8 4 3 4 3c-.5 1.1-.2 1.9-.1 2.1-.5.6-.8 1.3-.8 2.2 0 3.2 1.7 3.9 3.6 4.1-.3.3-.3.6-.3 1.1v2.5" />
    </svg>
  ),
  book: (p) => (
    <svg {...base} {...p}>
      <path d="M2.5 3.5A1 1 0 0 1 3.5 2.5H7a1.5 1.5 0 0 1 1.5 1.5v9A1.2 1.2 0 0 0 7.3 12H2.5V3.5ZM13.5 3.5a1 1 0 0 0-1-1H9A1.5 1.5 0 0 0 7.5 4v9A1.2 1.2 0 0 1 8.7 12h4.8V3.5Z" />
    </svg>
  ),
  linkedin: (p) => (
    <svg {...base} strokeWidth="1.2" {...p}>
      <rect x="2.25" y="2.25" width="11.5" height="11.5" rx="2" />
      <path d="M5 6.75v4.25M5 4.6v.05M8 11V8.6a1.6 1.6 0 0 1 3.2 0V11" />
    </svg>
  ),
};

export function NavIcon({ name, className = 'nav-icon' }) {
  const C = Icon[name];
  return C ? <C className={className} /> : null;
}
