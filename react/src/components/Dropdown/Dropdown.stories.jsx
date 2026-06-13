import React from 'react';
import { Dropdown, DropdownItem } from './Dropdown';

/* ── Shared icons ── */
const AddSquareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8.5 12h7M12 8.5v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Tag = ({ color = 'grey', style: tagStyle = 'outline', children }) => (
  <span className={`tag tag-${color} tag-${tagStyle} tag-sm`}>{children}</span>
);

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Floating panel that wraps one or more \`DropdownItem\` rows. The panel is display-only —
open/close state lives on the trigger element.

**HTML docs reference:** [dropdown.html](../../../docs/components/dropdown.html)

\`\`\`js
import { Dropdown, DropdownItem } from 'digilawyer-ds';

<Dropdown aria-label="Sort by">
  <DropdownItem icon={<CheckIcon />} selected>Newest first</DropdownItem>
  <DropdownItem>Oldest first</DropdownItem>
  <DropdownItem>A → Z</DropdownItem>
</Dropdown>
\`\`\`
        `.trim(),
      },
    },
  },
  argTypes: {
    role: {
      control: { type: 'select' },
      options: ['listbox', 'menu'],
      table: { defaultValue: { summary: 'listbox' }, type: { summary: 'listbox | menu' } },
    },
    'aria-label': { control: 'text' },
  },
};

/* ── Playground ── */
export const Playground = {
  parameters: {
    docs: {
      description: { story: 'Use controls to try the panel props. Add DropdownItem children to populate the list.' },
    },
  },
  args: { role: 'listbox', 'aria-label': 'Playground dropdown' },
  render: (args) => (
    <Dropdown {...args} style={{ width: '260px' }}>
      <DropdownItem icon={<AddSquareIcon />} trailing={<><ChevronDownIcon /><Tag>Label</Tag></>}>Option one</DropdownItem>
      <DropdownItem icon={<AddSquareIcon />} trailing={<><ChevronDownIcon /><Tag>Label</Tag></>} active>Option two</DropdownItem>
      <DropdownItem icon={<AddSquareIcon />} trailing={<><ChevronDownIcon /><Tag>Label</Tag></>}>Option three</DropdownItem>
    </Dropdown>
  ),
};

/* ── Default ── */
export const Default = {
  parameters: {
    docs: {
      description: { story: 'Three rows with a leading icon, label, trailing chevron, and grey outline Tag chip — matching the Figma default.' },
      source: {
        code: `<Dropdown aria-label="Default dropdown" style={{ width: '320px' }}>
  <DropdownItem icon={<AddSquareIcon />} trailing={<><ChevronDownIcon /><Tag color="grey" style="outline">Label</Tag></>}>
    Options
  </DropdownItem>
  <DropdownItem icon={<AddSquareIcon />} trailing={<><ChevronDownIcon /><Tag color="grey" style="outline">Label</Tag></>}>
    Options
  </DropdownItem>
</Dropdown>`,
      },
    },
  },
  render: () => (
    <Dropdown aria-label="Default dropdown" style={{ width: '320px' }}>
      {['Options', 'Options', 'Options'].map((label, i) => (
        <DropdownItem
          key={i}
          icon={<AddSquareIcon />}
          trailing={<><ChevronDownIcon /><Tag>Label</Tag></>}
        >
          {label}
        </DropdownItem>
      ))}
    </Dropdown>
  ),
};

/* ── Sizes (item count) ── */
export const ItemCounts = {
  name: 'Item Counts',
  parameters: {
    docs: {
      description: { story: 'The panel grows linearly with children (~52px per row at md size). When items exceed the viewport, set `max-height` and `overflow-y: auto` on the panel.' },
      source: { code: '// See Default story for item markup — just add more DropdownItem children.' },
    },
  },
  render: () => {
    const counts = [1, 2, 3, 5];
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
        {counts.map(n => (
          <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'stretch' }}>
            <span style={{ fontSize: '12px', color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'center' }}>
              {n} option{n > 1 ? 's' : ''}
            </span>
            <Dropdown aria-label={`${n} option${n > 1 ? 's' : ''}`} style={{ width: '200px' }}>
              {Array.from({ length: n }, (_, i) => (
                <DropdownItem key={i} icon={<AddSquareIcon />} trailing={<><ChevronDownIcon /><Tag>Label</Tag></>}>
                  Options
                </DropdownItem>
              ))}
            </Dropdown>
          </div>
        ))}
      </div>
    );
  },
};

/* ── Active row ── */
export const ActiveRow = {
  name: 'Active Row',
  parameters: {
    docs: {
      description: { story: 'Set `active` on the hovered or keyboard-focused row. In a real implementation this is driven by pointer/keyboard events, not a static prop.' },
      source: {
        code: `<DropdownItem active icon={<AddSquareIcon />}>Hovered item</DropdownItem>`,
      },
    },
  },
  render: () => (
    <Dropdown aria-label="Active row demo" style={{ width: '240px' }}>
      <DropdownItem icon={<AddSquareIcon />}>Default</DropdownItem>
      <DropdownItem icon={<AddSquareIcon />} active>Active (hover/focus)</DropdownItem>
      <DropdownItem icon={<AddSquareIcon />}>Default</DropdownItem>
    </Dropdown>
  ),
};

/* ── Selected row (listbox) ── */
export const SelectedRow = {
  name: 'Selected Row',
  parameters: {
    docs: {
      description: { story: 'Use `selected` to mark the currently chosen value in a listbox. A checkmark in the leading slot is the conventional visual indicator.' },
      source: {
        code: `<DropdownItem selected icon={<CheckIcon />}>Newest first</DropdownItem>`,
      },
    },
  },
  render: () => (
    <Dropdown aria-label="Sort by" style={{ width: '200px' }}>
      <DropdownItem icon={<CheckIcon />} selected>Newest first</DropdownItem>
      <DropdownItem icon={<span style={{ opacity: 0 }}><CheckIcon /></span>}>Oldest first</DropdownItem>
      <DropdownItem icon={<span style={{ opacity: 0 }}><CheckIcon /></span>}>A → Z</DropdownItem>
    </Dropdown>
  ),
};

/* ── Disabled row ── */
export const DisabledRow = {
  name: 'Disabled Row',
  parameters: {
    docs: {
      description: { story: 'Set `disabled` on individual rows to mark unavailable options.' },
      source: {
        code: `<DropdownItem disabled icon={<AddSquareIcon />}>Unavailable</DropdownItem>`,
      },
    },
  },
  render: () => (
    <Dropdown aria-label="Disabled item demo" style={{ width: '200px' }}>
      <DropdownItem icon={<AddSquareIcon />}>Available</DropdownItem>
      <DropdownItem icon={<AddSquareIcon />}>Available</DropdownItem>
      <DropdownItem icon={<AddSquareIcon />} disabled>Disabled</DropdownItem>
    </Dropdown>
  ),
};

/* ── Compact (sm) rows ── */
export const CompactRows = {
  name: 'Compact Rows',
  parameters: {
    docs: {
      description: { story: 'Use `size="sm"` on DropdownItem for toolbar menus where vertical space is tight (32px row height vs 40px default).' },
      source: {
        code: `<DropdownItem size="sm" icon={<AddSquareIcon />}>Compact item</DropdownItem>`,
      },
    },
  },
  render: () => (
    <Dropdown aria-label="Compact menu" style={{ width: '200px' }}>
      <DropdownItem size="sm" icon={<AddSquareIcon />}>Compact</DropdownItem>
      <DropdownItem size="sm" icon={<AddSquareIcon />}>Item two</DropdownItem>
      <DropdownItem size="sm" icon={<AddSquareIcon />} disabled>Disabled</DropdownItem>
    </Dropdown>
  ),
};

/* ── Composition — mixed tag colours ── */
export const Composition = {
  name: 'Composition',
  parameters: {
    docs: {
      description: { story: 'Mix Tag colours in the trailing slot to convey status. Pair with action menus (`role="menu"`) or selection lists (`role="listbox"`).' },
      source: {
        code: `<DropdownItem trailing={<Tag color="green" style="semi">Live</Tag>}>Active</DropdownItem>
<DropdownItem trailing={<Tag color="yellow" style="semi">WIP</Tag>}>Draft</DropdownItem>
<DropdownItem trailing={<Tag color="grey" style="semi">Old</Tag>}>Archived</DropdownItem>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {/* Status tags */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={{ fontSize: '12px', color: 'var(--color-subheading)', fontWeight: 600 }}>Status tags</span>
        <Dropdown aria-label="Status menu" style={{ width: '240px' }}>
          <DropdownItem icon={<AddSquareIcon />} trailing={<Tag color="green" style="semi">Live</Tag>}>Active</DropdownItem>
          <DropdownItem icon={<AddSquareIcon />} trailing={<Tag color="yellow" style="semi">WIP</Tag>}>Draft</DropdownItem>
          <DropdownItem icon={<AddSquareIcon />} trailing={<Tag color="grey" style="semi">Old</Tag>}>Archived</DropdownItem>
        </Dropdown>
      </div>

      {/* Sort list with checkmark */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={{ fontSize: '12px', color: 'var(--color-subheading)', fontWeight: 600 }}>Selection list</span>
        <Dropdown aria-label="Sort by" style={{ width: '200px' }}>
          <DropdownItem icon={<CheckIcon />} selected>Newest first</DropdownItem>
          <DropdownItem icon={<span style={{ opacity: 0 }}><CheckIcon /></span>}>Oldest first</DropdownItem>
          <DropdownItem icon={<span style={{ opacity: 0 }}><CheckIcon /></span>}>A → Z</DropdownItem>
        </Dropdown>
      </div>

      {/* Compact action menu */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={{ fontSize: '12px', color: 'var(--color-subheading)', fontWeight: 600 }}>Compact menu</span>
        <Dropdown role="menu" aria-label="Actions" style={{ width: '200px' }}>
          <DropdownItem role="menuitem" size="sm" icon={<AddSquareIcon />}>Create new</DropdownItem>
          <DropdownItem role="menuitem" size="sm" icon={<AddSquareIcon />}>Duplicate</DropdownItem>
          <DropdownItem role="menuitem" size="sm" icon={<AddSquareIcon />} disabled>Delete</DropdownItem>
        </Dropdown>
      </div>
    </div>
  ),
};
