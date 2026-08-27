'use client';
// barrel import from '@ds' pulls all 25 components, several of which use hooks.

import React from 'react';
import { Button } from '@ds';

const PKG = '@adeshsingh0604/digilawyer-ds';

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Plus = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Trash = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M2.5 4.5h11M6 4.5V3h4v1.5M4 4.5l.6 8.2a1 1 0 0 0 1 .8h4.8a1 1 0 0 0 1-.8l.6-8.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Download = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 2.5v8m0 0L5 7.5M8 10.5l3-3M2.5 12.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default {
  key: 'button',
  name: 'Button',
  description:
    'The primary action element. Five variants, four sizes, five states — every colour resolved from tokens, never a hard-coded hex.',
  storybook: '?path=/docs/components-button--docs',
  variants: [
    {
      id: 'button-01',
      name: 'Button 1',
      file: 'Button-01.jsx',
      render: () => <Button variant="primary">Default Button</Button>,
      code: `import { Button } from '${PKG}';

const Button1 = () => <Button variant="primary">Default Button</Button>;

export default Button1;`,
    },
    {
      id: 'button-02',
      name: 'Button 2',
      file: 'Button-02.jsx',
      render: () => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="tertiary" iconLeft={<ArrowLeft />}>
            Prev
          </Button>
          <Button variant="tertiary" iconRight={<ArrowRight />}>
            Next
          </Button>
        </div>
      ),
      code: `import { Button } from '${PKG}';

const Button2 = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    <Button variant="tertiary" iconLeft={<ArrowLeft />}>Prev</Button>
    <Button variant="tertiary" iconRight={<ArrowRight />}>Next</Button>
  </div>
);

export default Button2;`,
    },
    {
      id: 'button-03',
      name: 'Button 3',
      file: 'Button-03.jsx',
      render: () => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="tertiary">Discard</Button>
          <Button variant="primary">Save</Button>
        </div>
      ),
      code: `import { Button } from '${PKG}';

// Confirm/cancel pairing: one Primary, one Tertiary — never two Primaries.
const Button3 = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    <Button variant="tertiary">Discard</Button>
    <Button variant="primary">Save</Button>
  </div>
);

export default Button3;`,
    },
    {
      id: 'button-04',
      name: 'Button 4',
      file: 'Button-04.jsx',
      render: () => (
        <Button variant="primary" iconRight={<ArrowRight />}>
          Explore More
        </Button>
      ),
      code: `import { Button } from '${PKG}';

const Button4 = () => (
  <Button variant="primary" iconRight={<ArrowRight />}>Explore More</Button>
);

export default Button4;`,
    },
    {
      id: 'button-05',
      name: 'Button 5',
      file: 'Button-05.jsx',
      render: () => (
        <Button variant="primary" disabled>
          Disabled
        </Button>
      ),
      code: `import { Button } from '${PKG}';

// Disabled uses token-based colours, not opacity, and leaves the tab order.
const Button5 = () => <Button variant="primary" disabled>Disabled</Button>;

export default Button5;`,
    },
    {
      id: 'button-06',
      name: 'Button 6',
      file: 'Button-06.jsx',
      render: () => (
        <Button variant="primary" size="sm">
          Small Size
        </Button>
      ),
      code: `import { Button } from '${PKG}';

const Button6 = () => <Button variant="primary" size="sm">Small Size</Button>;

export default Button6;`,
    },
    {
      id: 'button-07',
      name: 'Button 7',
      file: 'Button-07.jsx',
      render: () => (
        <Button variant="primary" size="lg">
          Size Large
        </Button>
      ),
      code: `import { Button } from '${PKG}';

const Button7 = () => <Button variant="primary" size="lg">Size Large</Button>;

export default Button7;`,
    },
    {
      id: 'button-08',
      name: 'Button 8',
      file: 'Button-08.jsx',
      render: () => (
        <Button variant="primary" size="xs">
          Size Extra Small
        </Button>
      ),
      code: `import { Button } from '${PKG}';

const Button8 = () => <Button variant="primary" size="xs">Size Extra Small</Button>;

export default Button8;`,
    },
    {
      id: 'button-09',
      name: 'Button 9',
      file: 'Button-09.jsx',
      render: () => (
        <Button variant="primary" loading>
          Loading
        </Button>
      ),
      code: `import { Button } from '${PKG}';

// loading sets aria-busy and disables the button; the label stays in the DOM.
const Button9 = () => <Button variant="primary" loading>Loading</Button>;

export default Button9;`,
    },
    {
      id: 'button-10',
      name: 'Button 10',
      file: 'Button-10.jsx',
      render: () => <Button variant="secondary">Upgrade</Button>,
      code: `import { Button } from '${PKG}';

const Button10 = () => <Button variant="secondary">Upgrade</Button>;

export default Button10;`,
    },
    {
      id: 'button-11',
      name: 'Button 11',
      file: 'Button-11.jsx',
      render: () => (
        <Button variant="danger" iconLeft={<Trash />}>
          Delete
        </Button>
      ),
      code: `import { Button } from '${PKG}';

const Button11 = () => (
  <Button variant="danger" iconLeft={<Trash />}>Delete</Button>
);

export default Button11;`,
    },
    {
      id: 'button-12',
      name: 'Button 12',
      file: 'Button-12.jsx',
      render: () => <Button variant="ghost">Ghost Action</Button>,
      code: `import { Button } from '${PKG}';

const Button12 = () => <Button variant="ghost">Ghost Action</Button>;

export default Button12;`,
    },
    {
      id: 'button-13',
      name: 'Button 13',
      file: 'Button-13.jsx',
      render: () => (
        <Button variant="tertiary" square aria-label="Add item">
          <Plus />
        </Button>
      ),
      code: `import { Button } from '${PKG}';

// Icon-only: set square and always pass aria-label.
const Button13 = () => (
  <Button variant="tertiary" square aria-label="Add item"><Plus /></Button>
);

export default Button13;`,
    },
    {
      id: 'button-14',
      name: 'Button 14',
      file: 'Button-14.jsx',
      render: () => (
        <Button variant="secondary" iconLeft={<Download />}>
          Download
        </Button>
      ),
      code: `import { Button } from '${PKG}';

const Button14 = () => (
  <Button variant="secondary" iconLeft={<Download />}>Download</Button>
);

export default Button14;`,
    },
    {
      id: 'button-15',
      name: 'Button 15',
      file: 'Button-15.jsx',
      render: () => (
        <div style={{ display: 'flex', gap: 0 }}>
          <Button activeBorder size="sm">
            Day
          </Button>
          <Button variant="tertiary" size="sm">
            Week
          </Button>
          <Button variant="tertiary" size="sm">
            Month
          </Button>
        </div>
      ),
      code: `import { Button } from '${PKG}';

// activeBorder is the selected state inside segmented controls.
const Button15 = () => (
  <div style={{ display: 'flex' }}>
    <Button activeBorder size="sm">Day</Button>
    <Button variant="tertiary" size="sm">Week</Button>
    <Button variant="tertiary" size="sm">Month</Button>
  </div>
);

export default Button15;`,
    },
    {
      id: 'button-16',
      name: 'Button 16',
      file: 'Button-16.jsx',
      render: () => (
        <Button variant="primary" size="lg" style={{ width: '100%' }}>
          Send Legal Notice
        </Button>
      ),
      code: `import { Button } from '${PKG}';

// Full-bleed primary for mobile sheets and single-action forms.
const Button16 = () => (
  <Button variant="primary" size="lg" style={{ width: '100%' }}>
    Send Legal Notice
  </Button>
);

export default Button16;`,
    },
  ],
};
