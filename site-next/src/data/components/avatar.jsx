'use client';
// barrel import from '@ds' pulls all 25 components, several of which use hooks.

import React from 'react';
import { Avatar, AvatarStack, AvatarStatus } from '@ds';

const PKG = '@adeshsingh0604/digilawyer-ds';

export default {
  key: 'avatar',
  name: 'Avatar',
  description:
    'Circular indicator for a user or entity — icon, initials or image, in four sizes, with optional status pin.',
  storybook: '?path=/docs/components-avatar--docs',
  variants: [
    {
      id: 'avatar-01',
      name: 'Avatar 1',
      file: 'Avatar-01.jsx',
      render: () => <Avatar variant="icon" size="md" />,
      code: `import { Avatar } from '${PKG}';

const Avatar1 = () => <Avatar variant="icon" size="md" />;

export default Avatar1;`,
    },
    {
      id: 'avatar-02',
      name: 'Avatar 2',
      file: 'Avatar-02.jsx',
      render: () => <Avatar variant="initials" size="md">AS</Avatar>,
      code: `import { Avatar } from '${PKG}';

const Avatar2 = () => <Avatar variant="initials" size="md">AS</Avatar>;

export default Avatar2;`,
    },
    {
      id: 'avatar-03',
      name: 'Avatar 3',
      file: 'Avatar-03.jsx',
      render: () => (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Avatar variant="initials" size="xs">RK</Avatar>
          <Avatar variant="initials" size="sm">RK</Avatar>
          <Avatar variant="initials" size="md">RK</Avatar>
          <Avatar variant="initials" size="lg">RK</Avatar>
        </div>
      ),
      code: `import { Avatar } from '${PKG}';

// xs 24 · sm 32 · md 40 · lg 48
const Avatar3 = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Avatar variant="initials" size="xs">RK</Avatar>
    <Avatar variant="initials" size="sm">RK</Avatar>
    <Avatar variant="initials" size="md">RK</Avatar>
    <Avatar variant="initials" size="lg">RK</Avatar>
  </div>
);

export default Avatar3;`,
    },
    {
      id: 'avatar-04',
      name: 'Avatar 4',
      file: 'Avatar-04.jsx',
      render: () => (
        <AvatarStack size="md">
          <Avatar variant="initials" size="md">AS</Avatar>
          <Avatar variant="initials" size="md">RK</Avatar>
          <Avatar variant="initials" size="md">MV</Avatar>
          <Avatar variant="initials" size="md">+4</Avatar>
        </AvatarStack>
      ),
      code: `import { Avatar, AvatarStack } from '${PKG}';

const Avatar4 = () => (
  <AvatarStack size="md">
    <Avatar variant="initials" size="md">AS</Avatar>
    <Avatar variant="initials" size="md">RK</Avatar>
    <Avatar variant="initials" size="md">MV</Avatar>
    <Avatar variant="initials" size="md">+4</Avatar>
  </AvatarStack>
);

export default Avatar4;`,
    },
    {
      id: 'avatar-05',
      name: 'Avatar 5',
      file: 'Avatar-05.jsx',
      render: () => (
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <Avatar variant="initials" size="lg">AS</Avatar>
          <AvatarStatus status="online" pin="br" aria-label="Online" />
        </div>
      ),
      code: `import { Avatar, AvatarStatus } from '${PKG}';

// Colour alone is not accessible — AvatarStatus requires aria-label.
const Avatar5 = () => (
  <div style={{ position: 'relative', display: 'inline-flex' }}>
    <Avatar variant="initials" size="lg">AS</Avatar>
    <AvatarStatus status="online" pin="br" aria-label="Online" />
  </div>
);

export default Avatar5;`,
    },
  ],
};
