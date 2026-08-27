'use client';
// barrel import from '@ds' pulls all 25 components, several of which use hooks.

import React from 'react';
import { Tag } from '@ds';

const PKG = '@adeshsingh0604/digilawyer-ds';

export default {
  key: 'tag',
  name: 'Tag',
  description:
    'Inline label chip for status, category or metadata. Eight colours × three variants × four sizes, display-only or clickable.',
  storybook: '?path=/docs/components-tag--docs',
  variants: [
    {
      id: 'tag-01',
      name: 'Tag 1',
      file: 'Tag-01.jsx',
      render: () => <Tag color="blue" variant="filled">Contract</Tag>,
      code: `import { Tag } from '${PKG}';

const Tag1 = () => <Tag color="blue" variant="filled">Contract</Tag>;

export default Tag1;`,
    },
    {
      id: 'tag-02',
      name: 'Tag 2',
      file: 'Tag-02.jsx',
      render: () => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Tag color="green" variant="filled">Filled</Tag>
          <Tag color="green" variant="outline">Outline</Tag>
          <Tag color="green" variant="semi">Semi</Tag>
        </div>
      ),
      code: `import { Tag } from '${PKG}';

const Tag2 = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    <Tag color="green" variant="filled">Filled</Tag>
    <Tag color="green" variant="outline">Outline</Tag>
    <Tag color="green" variant="semi">Semi</Tag>
  </div>
);

export default Tag2;`,
    },
    {
      id: 'tag-03',
      name: 'Tag 3',
      file: 'Tag-03.jsx',
      render: () => (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Tag color="purple" variant="semi" size="xs">xs</Tag>
          <Tag color="purple" variant="semi" size="sm">sm</Tag>
          <Tag color="purple" variant="semi" size="md">md</Tag>
          <Tag color="purple" variant="semi" size="lg">lg</Tag>
        </div>
      ),
      code: `import { Tag } from '${PKG}';

const Tag3 = () => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
    <Tag color="purple" variant="semi" size="xs">xs</Tag>
    <Tag color="purple" variant="semi" size="sm">sm</Tag>
    <Tag color="purple" variant="semi" size="md">md</Tag>
    <Tag color="purple" variant="semi" size="lg">lg</Tag>
  </div>
);

export default Tag3;`,
    },
    {
      id: 'tag-04',
      name: 'Tag 4',
      file: 'Tag-04.jsx',
      render: () => (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Tag color="orange" variant="semi" onRemove={() => {}}>
            Pending
          </Tag>
          <Tag color="red" variant="semi" onRemove={() => {}}>
            Overdue
          </Tag>
        </div>
      ),
      code: `import { Tag } from '${PKG}';

// onRemove renders a trailing dismiss control.
const Tag4 = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    <Tag color="orange" variant="semi" onRemove={() => remove('pending')}>Pending</Tag>
    <Tag color="red" variant="semi" onRemove={() => remove('overdue')}>Overdue</Tag>
  </div>
);

export default Tag4;`,
    },
    {
      id: 'tag-05',
      name: 'Tag 5',
      file: 'Tag-05.jsx',
      render: () => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Tag as="button" color="black" variant="filled">
            All
          </Tag>
          <Tag as="button" color="grey" variant="outline">
            Notices
          </Tag>
          <Tag as="button" color="grey" variant="outline">
            Agreements
          </Tag>
        </div>
      ),
      code: `import { Tag } from '${PKG}';

// as="button" turns the chip into a real, focusable filter control.
const Tag5 = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    <Tag as="button" color="black" variant="filled">All</Tag>
    <Tag as="button" color="grey" variant="outline">Notices</Tag>
    <Tag as="button" color="grey" variant="outline">Agreements</Tag>
  </div>
);

export default Tag5;`,
    },
    {
      id: 'tag-06',
      name: 'Tag 6',
      file: 'Tag-06.jsx',
      render: () => (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['blue', 'red', 'green', 'yellow', 'orange', 'purple', 'grey', 'black'].map((c) => (
            <Tag key={c} color={c} variant="semi" size="sm">
              {c}
            </Tag>
          ))}
        </div>
      ),
      code: `import { Tag } from '${PKG}';

const COLORS = ['blue', 'red', 'green', 'yellow', 'orange', 'purple', 'grey', 'black'];

const Tag6 = () => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    {COLORS.map((c) => <Tag key={c} color={c} variant="semi" size="sm">{c}</Tag>)}
  </div>
);

export default Tag6;`,
    },
  ],
};
