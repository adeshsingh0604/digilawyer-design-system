'use client';
// barrel import from '@ds' pulls all 25 components, several of which use hooks.

import React from 'react';
import { Button, ButtonGroup } from '@ds';

const PKG = '@adeshsingh0604/digilawyer-ds';

export default {
  key: 'button-group',
  name: 'Button Group',
  description:
    'Layout wrapper that visually groups related buttons — attached or separated, horizontal or vertical.',
  storybook: '?path=/docs/components-buttongroup--docs',
  variants: [
    {
      id: 'button-group-01',
      name: 'Button Group 1',
      file: 'ButtonGroup-01.jsx',
      render: () => (
        <ButtonGroup>
          <Button variant="tertiary">Left</Button>
          <Button variant="tertiary">Middle</Button>
          <Button variant="tertiary">Right</Button>
        </ButtonGroup>
      ),
      code: `import { Button, ButtonGroup } from '${PKG}';

const ButtonGroup1 = () => (
  <ButtonGroup>
    <Button variant="tertiary">Left</Button>
    <Button variant="tertiary">Middle</Button>
    <Button variant="tertiary">Right</Button>
  </ButtonGroup>
);

export default ButtonGroup1;`,
    },
    {
      id: 'button-group-02',
      name: 'Button Group 2',
      file: 'ButtonGroup-02.jsx',
      render: () => (
        <ButtonGroup separated>
          <Button variant="tertiary">Draft</Button>
          <Button variant="tertiary">Preview</Button>
          <Button variant="primary">Send</Button>
        </ButtonGroup>
      ),
      code: `import { Button, ButtonGroup } from '${PKG}';

const ButtonGroup2 = () => (
  <ButtonGroup separated>
    <Button variant="tertiary">Draft</Button>
    <Button variant="tertiary">Preview</Button>
    <Button variant="primary">Send</Button>
  </ButtonGroup>
);

export default ButtonGroup2;`,
    },
    {
      id: 'button-group-03',
      name: 'Button Group 3',
      file: 'ButtonGroup-03.jsx',
      render: () => (
        <ButtonGroup vertical>
          <Button variant="tertiary">Profile</Button>
          <Button variant="tertiary">Billing</Button>
          <Button variant="tertiary">Team</Button>
        </ButtonGroup>
      ),
      code: `import { Button, ButtonGroup } from '${PKG}';

const ButtonGroup3 = () => (
  <ButtonGroup vertical>
    <Button variant="tertiary">Profile</Button>
    <Button variant="tertiary">Billing</Button>
    <Button variant="tertiary">Team</Button>
  </ButtonGroup>
);

export default ButtonGroup3;`,
    },
    {
      id: 'button-group-04',
      name: 'Button Group 4',
      file: 'ButtonGroup-04.jsx',
      render: () => (
        <ButtonGroup role="toolbar" separated>
          <Button variant="tertiary" size="sm">
            Bold
          </Button>
          <Button variant="tertiary" size="sm">
            Italic
          </Button>
          <Button variant="tertiary" size="sm">
            Link
          </Button>
        </ButtonGroup>
      ),
      code: `import { Button, ButtonGroup } from '${PKG}';

// role="toolbar" for groups of independent actions, not a single choice.
const ButtonGroup4 = () => (
  <ButtonGroup role="toolbar" separated>
    <Button variant="tertiary" size="sm">Bold</Button>
    <Button variant="tertiary" size="sm">Italic</Button>
    <Button variant="tertiary" size="sm">Link</Button>
  </ButtonGroup>
);

export default ButtonGroup4;`,
    },
  ],
};
