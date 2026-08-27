'use client';
// barrel import from '@ds' pulls all 25 components, several of which use hooks.

import React from 'react';
import { Badge, BadgePin } from '@ds';

const PKG = '@adeshsingh0604/digilawyer-ds';

export default {
  key: 'badge',
  name: 'Badge',
  description:
    'Status disc, count pill or verified checkmark. Seven semantic colours, three sizes.',
  storybook: '?path=/docs/components-badge--docs',
  variants: [
    {
      id: 'badge-01',
      name: 'Badge 1',
      file: 'Badge-01.jsx',
      render: () => <Badge variant="label" color="brand">12</Badge>,
      code: `import { Badge } from '${PKG}';

const Badge1 = () => <Badge variant="label" color="brand">12</Badge>;

export default Badge1;`,
    },
    {
      id: 'badge-02',
      name: 'Badge 2',
      file: 'Badge-02.jsx',
      render: () => (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Badge variant="dot" color="success" aria-label="Online" />
          <Badge variant="dot" color="warning" aria-label="Away" />
          <Badge variant="dot" color="danger" aria-label="Offline" />
        </div>
      ),
      code: `import { Badge } from '${PKG}';

// The dot variant has no visible text, so aria-label is required.
const Badge2 = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Badge variant="dot" color="success" aria-label="Online" />
    <Badge variant="dot" color="warning" aria-label="Away" />
    <Badge variant="dot" color="danger" aria-label="Offline" />
  </div>
);

export default Badge2;`,
    },
    {
      id: 'badge-03',
      name: 'Badge 3',
      file: 'Badge-03.jsx',
      render: () => <Badge variant="verify" color="info" aria-label="Verified advocate" />,
      code: `import { Badge } from '${PKG}';

const Badge3 = () => (
  <Badge variant="verify" color="info" aria-label="Verified advocate" />
);

export default Badge3;`,
    },
    {
      id: 'badge-04',
      name: 'Badge 4',
      file: 'Badge-04.jsx',
      render: () => (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Badge variant="label" color="notice" size="sm">3</Badge>
          <Badge variant="label" color="notice" size="md">24</Badge>
          <Badge variant="label" color="notice" size="lg">99+</Badge>
        </div>
      ),
      code: `import { Badge } from '${PKG}';

const Badge4 = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Badge variant="label" color="notice" size="sm">3</Badge>
    <Badge variant="label" color="notice" size="md">24</Badge>
    <Badge variant="label" color="notice" size="lg">99+</Badge>
  </div>
);

export default Badge4;`,
    },
    {
      id: 'badge-05',
      name: 'Badge 5',
      file: 'Badge-05.jsx',
      render: () => (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['brand', 'info', 'danger', 'success', 'warning', 'notice', 'alert'].map((c) => (
            <Badge key={c} variant="label" color={c}>
              8
            </Badge>
          ))}
        </div>
      ),
      code: `import { Badge } from '${PKG}';

const COLORS = ['brand', 'info', 'danger', 'success', 'warning', 'notice', 'alert'];

const Badge5 = () => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    {COLORS.map((c) => (
      <Badge key={c} variant="label" color={c}>8</Badge>
    ))}
  </div>
);

export default Badge5;`,
    },
    {
      id: 'badge-06',
      name: 'Badge 6',
      file: 'Badge-06.jsx',
      render: () => (
        <BadgePin>
          <span
            style={{
              display: 'grid',
              placeItems: 'center',
              width: 40,
              height: 40,
              borderRadius: 8,
              background: 'var(--color-bg-2)',
              color: 'var(--color-heading)',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            In
          </span>
          <Badge variant="label" color="danger" size="sm">
            5
          </Badge>
        </BadgePin>
      ),
      code: `import { Badge, BadgePin } from '${PKG}';

// BadgePin anchors a badge to the top-right corner of any target.
const Badge6 = () => (
  <BadgePin>
    <InboxIcon />
    <Badge variant="label" color="danger" size="sm">5</Badge>
  </BadgePin>
);

export default Badge6;`,
    },
  ],
};
