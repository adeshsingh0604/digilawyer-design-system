import React, { useState } from 'react';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button/Button';

export default {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A row (or column) of related buttons visually grouped as one unit — toolbars, segmented controls, filter pills.
Composes existing \`Button\` sizes and variants. Use **Secondary**, **Tertiary**, or **Ghost** as the base variant;
let the selected button carry the emphasis via \`aria-pressed="true"\` or \`className="active"\`.

**DigiLawyer rule:** ButtonGroup is a layout wrapper — it does not manage selection state internally.
The consumer controls which button is active by setting \`aria-pressed\` or \`active\` on each child.

\`\`\`js
import { ButtonGroup } from 'digilawyer-ds';
import { Button } from 'digilawyer-ds';

<ButtonGroup aria-label="View">
  <Button variant="tertiary" size="md" aria-pressed="false">Day</Button>
  <Button variant="tertiary" size="md" aria-pressed="true">Week</Button>
  <Button variant="tertiary" size="md" aria-pressed="false">Month</Button>
</ButtonGroup>
\`\`\`
        `.trim(),
      },
    },
  },
  argTypes: {
    separated:    { control: 'boolean', table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' } } },
    vertical:     { control: 'boolean', table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' } } },
    activeBorder: { control: 'boolean', table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' } } },
    role: {
      control: { type: 'select' },
      options: ['group', 'toolbar'],
      table: { defaultValue: { summary: 'group' }, type: { summary: '"group" | "toolbar"' } },
    },
    'aria-label': { control: 'text', description: 'Accessible label for the group. Required for screen readers.' },
    className:    { control: false },
    children:     { control: false },
  },
};

/* ── Playground ── */
export const Playground = {
  parameters: {
    docs: {
      description: { story: 'Use the controls panel to try every prop combination interactively.' },
      source: {
        code: `const [active, setActive] = useState('week');

<ButtonGroup aria-label="View">
  {['day', 'week', 'month', 'year'].map(v => (
    <Button
      key={v}
      variant="tertiary"
      size="md"
      aria-pressed={active === v}
      onClick={() => setActive(v)}
    >
      {v.charAt(0).toUpperCase() + v.slice(1)}
    </Button>
  ))}
</ButtonGroup>`,
      },
    },
  },
  args: {
    separated: false,
    vertical: false,
    activeBorder: false,
    role: 'group',
  },
  render: function PlaygroundStory(args) {
    const [active, setActive] = useState('week');
    const items = ['Day', 'Week', 'Month', 'Year'];
    return (
      <ButtonGroup {...args} aria-label="View">
        {items.map(label => (
          <Button
            key={label}
            variant="tertiary"
            size="md"
            aria-pressed={active === label.toLowerCase()}
            onClick={() => setActive(label.toLowerCase())}
          >
            {label}
          </Button>
        ))}
      </ButtonGroup>
    );
  },
};

/* ── Sizes ── */
export const Sizes = {
  name: 'Sizes',
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: 'ButtonGroup inherits whatever size you pass to the child Buttons. All four sizes work — match the surrounding UI.' },
      source: {
        code: `<ButtonGroup aria-label="Actions lg">
  <Button variant="tertiary" size="lg">Edit</Button>
  <Button variant="tertiary" size="lg">Copy</Button>
  <Button variant="tertiary" size="lg">Delete</Button>
</ButtonGroup>

<ButtonGroup aria-label="Actions md">
  <Button variant="tertiary" size="md">Edit</Button>
  <Button variant="tertiary" size="md">Copy</Button>
  <Button variant="tertiary" size="md">Delete</Button>
</ButtonGroup>

<ButtonGroup aria-label="Actions sm">
  <Button variant="tertiary" size="sm">Edit</Button>
  <Button variant="tertiary" size="sm">Copy</Button>
  <Button variant="tertiary" size="sm">Delete</Button>
</ButtonGroup>

<ButtonGroup aria-label="Actions xs">
  <Button variant="tertiary" size="xs">Edit</Button>
  <Button variant="tertiary" size="xs">Copy</Button>
  <Button variant="tertiary" size="xs">Delete</Button>
</ButtonGroup>`,
      },
    },
  },
  render: () => {
    const sizes = ['lg', 'md', 'sm', 'xs'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
        {sizes.map(size => (
          <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ width: 28, fontSize: 12, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {size}
            </span>
            <ButtonGroup aria-label={`Actions ${size}`}>
              <Button variant="tertiary" size={size}>Edit</Button>
              <Button variant="tertiary" size={size}>Copy</Button>
              <Button variant="tertiary" size={size}>Delete</Button>
            </ButtonGroup>
          </div>
        ))}
      </div>
    );
  },
};

/* ── Separated ── */
export const Separated = {
  name: 'Separated',
  parameters: {
    docs: {
      description: { story: 'Add `separated` for a gap between buttons — each button keeps its own border radius. Use for filter pills or loose action clusters.' },
      source: {
        code: `const [active, setActive] = useState('medium');

<ButtonGroup separated aria-label="Severity">
  {['Low', 'Medium', 'High'].map(v => (
    <Button
      key={v}
      variant="secondary"
      size="sm"
      aria-pressed={active === v.toLowerCase()}
      onClick={() => setActive(v.toLowerCase())}
    >
      {v}
    </Button>
  ))}
</ButtonGroup>`,
      },
    },
  },
  render: function SeparatedStory() {
    const [active, setActive] = useState('medium');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
        <ButtonGroup separated aria-label="Severity">
          {['Low', 'Medium', 'High'].map(label => (
            <Button
              key={label}
              variant="secondary"
              size="sm"
              aria-pressed={active === label.toLowerCase()}
              onClick={() => setActive(label.toLowerCase())}
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
        <ButtonGroup separated aria-label="Actions">
          <Button variant="ghost" size="md">Bold</Button>
          <Button variant="ghost" size="md">Italic</Button>
          <Button variant="ghost" size="md">Underline</Button>
        </ButtonGroup>
      </div>
    );
  },
};

/* ── Active Border ── */
export const ActiveBorder = {
  name: 'Active Border',
  parameters: {
    docs: {
      description: { story: 'Add `activeBorder` to the wrapper: the selected button shows a solid outline fill instead of the default primary fill. Use on a Tertiary base for a subtle selection style.' },
      source: {
        code: `const [active, setActive] = useState('week');

<ButtonGroup activeBorder aria-label="View">
  {['Day', 'Week', 'Month', 'Year'].map(v => (
    <Button
      key={v}
      variant="tertiary"
      size="md"
      aria-pressed={active === v.toLowerCase()}
      onClick={() => setActive(v.toLowerCase())}
    >
      {v}
    </Button>
  ))}
</ButtonGroup>`,
      },
    },
  },
  render: function ActiveBorderStory() {
    const [active, setActive] = useState('week');
    const items = ['Day', 'Week', 'Month', 'Year'];
    return (
      <ButtonGroup activeBorder aria-label="View">
        {items.map(label => (
          <Button
            key={label}
            variant="tertiary"
            size="md"
            aria-pressed={active === label.toLowerCase()}
            onClick={() => setActive(label.toLowerCase())}
          >
            {label}
          </Button>
        ))}
      </ButtonGroup>
    );
  },
};

/* ── Vertical ── */
export const Vertical = {
  name: 'Vertical',
  parameters: {
    docs: {
      description: { story: 'Add `vertical` to stack buttons in a column. Combines with `separated`.' },
      source: {
        code: `const [active, setActive] = useState('inbox');

<ButtonGroup vertical aria-label="Folder">
  {['Inbox', 'Sent', 'Archive'].map(v => (
    <Button
      key={v}
      variant="tertiary"
      size="md"
      aria-pressed={active === v.toLowerCase()}
      onClick={() => setActive(v.toLowerCase())}
    >
      {v}
    </Button>
  ))}
</ButtonGroup>`,
      },
    },
  },
  render: function VerticalStory() {
    const [active, setActive] = useState('inbox');
    const folders = ['Inbox', 'Sent', 'Archive'];
    return (
      <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Attached</span>
          <ButtonGroup vertical aria-label="Folder">
            {folders.map(label => (
              <Button
                key={label}
                variant="tertiary"
                size="md"
                aria-pressed={active === label.toLowerCase()}
                onClick={() => setActive(label.toLowerCase())}
              >
                {label}
              </Button>
            ))}
          </ButtonGroup>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Separated</span>
          <ButtonGroup vertical separated aria-label="Actions">
            <Button variant="secondary" size="md">Edit</Button>
            <Button variant="secondary" size="md">Duplicate</Button>
            <Button variant="secondary" size="md">Archive</Button>
          </ButtonGroup>
        </div>
      </div>
    );
  },
};

/* ── Disabled ── */
export const Disabled = {
  name: 'Disabled',
  parameters: {
    docs: {
      description: { story: 'Disable individual buttons or all buttons in the group. There is no group-level `disabled` prop — pass `disabled` to each child Button.' },
      source: {
        code: `{/* Single button disabled */}
<ButtonGroup aria-label="Edit actions">
  <Button variant="tertiary" size="md">Edit</Button>
  <Button variant="tertiary" size="md" disabled>Duplicate</Button>
  <Button variant="tertiary" size="md">Archive</Button>
  <Button variant="tertiary" size="md">Delete</Button>
</ButtonGroup>

{/* All disabled */}
<ButtonGroup aria-label="Edit actions">
  <Button variant="tertiary" size="md" disabled>Edit</Button>
  <Button variant="tertiary" size="md" disabled>Duplicate</Button>
  <Button variant="tertiary" size="md" disabled>Archive</Button>
</ButtonGroup>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: 12, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Single disabled</span>
        <ButtonGroup aria-label="Edit actions">
          <Button variant="tertiary" size="md">Edit</Button>
          <Button variant="tertiary" size="md" disabled>Duplicate</Button>
          <Button variant="tertiary" size="md">Archive</Button>
          <Button variant="tertiary" size="md">Delete</Button>
        </ButtonGroup>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontSize: 12, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>All disabled</span>
        <ButtonGroup aria-label="Edit actions">
          <Button variant="tertiary" size="md" disabled>Edit</Button>
          <Button variant="tertiary" size="md" disabled>Duplicate</Button>
          <Button variant="tertiary" size="md" disabled>Archive</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

/* ── Full Matrix — position helpers ── */
const posMatrix = [
  { cls: 'btn-pos-left',   label: 'Position = Left' },
  { cls: 'btn-pos-middle', label: 'Position = Middle' },
  { cls: 'btn-pos-right',  label: 'Position = Right' },
  { cls: 'btn-pos-up',     label: 'Position = Up' },
  { cls: 'btn-pos-down',   label: 'Position = Down' },
];

const matrixLabelStyle = {
  fontSize: 11,
  color: 'var(--color-subheading)',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginTop: 6,
};

export const FullMatrix = {
  name: 'Full Matrix',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'The five position helpers define which corners are rounded and which borders collapse. Horizontal groups use **Left / Middle / Right**; vertical groups use **Up / Middle / Down**. Inside a real `<ButtonGroup>` these are applied automatically via `:first-child` / `:last-child` — the `btn-pos-*` classes are for standalone visualisation or hand-composed layouts only.',
      },
      source: { code: '// Visual reference grid — see individual stories for usage code.' },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
      {posMatrix.map(({ cls, label }) => (
        <div key={cls} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <button className={`btn btn-tertiary btn-lg ${cls}`} type="button">
            <span className="btn-label">Label</span>
          </button>
          <div style={matrixLabelStyle}>{label}</div>
        </div>
      ))}
    </div>
  ),
};
