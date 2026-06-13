import React, { useState } from 'react';
import { Tag } from './Tag';

const DotIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="4" fill="currentColor" />
  </svg>
);

const PlaceholderIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="2.5" y="2.5" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
  </svg>
);

const COLORS = ['blue', 'red', 'green', 'yellow', 'orange', 'purple', 'grey', 'black'];
const VARIANTS = ['filled', 'outline', 'semi'];

export default {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Inline label chip for status, category, or metadata.
8 colors × 3 variants × 4 sizes. Renders as \`<span>\` (display-only) by default.

**HTML docs reference:** [tag.html](../../../docs/components/tag.html)

\`\`\`js
import { Tag } from 'digilawyer-ds';

<Tag color="green" variant="semi">Active</Tag>
<Tag color="red" onRemove={() => handleRemove()}>Error</Tag>
\`\`\`
        `.trim(),
      },
    },
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: COLORS,
      table: { defaultValue: { summary: 'blue' }, type: { summary: COLORS.join(' | ') } },
    },
    variant: {
      control: { type: 'select' },
      options: VARIANTS,
      table: { defaultValue: { summary: 'filled' }, type: { summary: 'filled | outline | semi' } },
    },
    size: {
      control: { type: 'select' },
      options: ['lg', 'md', 'sm', 'xs'],
      table: { defaultValue: { summary: 'md' }, type: { summary: 'lg | md | sm | xs' } },
    },
    as: {
      control: { type: 'select' },
      options: ['span', 'button'],
      table: { defaultValue: { summary: 'span' } },
    },
    children: { control: 'text' },
    onRemove: { action: 'removed' },
  },
};

/* ── Playground ── */
export const Playground = {
  parameters: {
    docs: {
      description: { story: 'Try every prop combination in the controls panel.' },
    },
  },
  args: {
    color: 'blue',
    variant: 'filled',
    size: 'md',
    children: 'Label',
  },
};

/* ── All colors (Filled) ── */
export const AllColors = {
  name: 'All Colors',
  parameters: {
    docs: {
      description: { story: '8 semantic colors. Use colour consistently: Red = error, Green = success, Yellow = caution, Blue = info. Grey and Black are neutral.' },
      source: {
        code: `<Tag color="blue">Blue</Tag>
<Tag color="green">Green</Tag>
<Tag color="yellow">Yellow</Tag>
<Tag color="red">Red</Tag>
<Tag color="orange">Orange</Tag>
<Tag color="purple">Purple</Tag>
<Tag color="grey">Grey</Tag>
<Tag color="black">Black</Tag>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      {COLORS.map(c => <Tag key={c} color={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</Tag>)}
    </div>
  ),
};

/* ── All variants ── */
export const AllVariants = {
  name: 'All Variants',
  parameters: {
    docs: {
      description: { story: '**Filled** — solid bg, white text (Yellow uses dark text for contrast). **Outline** — 10% tinted bg + colored border. **Semi** — same tint, no border. Never mix Filled and Outline in the same list.' },
      source: {
        code: `<Tag color="blue">Filled</Tag>
<Tag color="blue" variant="outline">Outline</Tag>
<Tag color="blue" variant="semi">Semi</Tag>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Tag color="blue" icon={<PlaceholderIcon />} trailing={<PlaceholderIcon />}>Filled</Tag>
      <Tag color="blue" variant="outline" icon={<PlaceholderIcon />} trailing={<PlaceholderIcon />}>Outline</Tag>
      <Tag color="blue" variant="semi" icon={<PlaceholderIcon />} trailing={<PlaceholderIcon />}>Semi</Tag>
    </div>
  ),
};

/* ── All sizes ── */
export const AllSizes = {
  name: 'All Sizes',
  parameters: {
    docs: {
      description: { story: '`lg` = 6px padding · `md` = 4px default · `sm` = compact toolbars and dense rows · `xs` = inline with caption text.' },
      source: {
        code: `<Tag size="lg" color="blue">Large</Tag>
<Tag size="md" color="blue">Medium</Tag>
<Tag size="sm" color="blue">Small</Tag>
<Tag size="xs" color="blue">X-Small</Tag>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      {[['lg', 'Large'], ['md', 'Medium'], ['sm', 'Small'], ['xs', 'X-Small']].map(([sz, label]) => (
        <Tag key={sz} color="blue" size={sz} icon={<PlaceholderIcon />} trailing={<PlaceholderIcon />}>
          {label}
        </Tag>
      ))}
    </div>
  ),
};

/* ── With icons ── */
export const WithIcons = {
  name: 'With Icons',
  parameters: {
    docs: {
      description: { story: 'Pass any React node to `icon` (leading) or `trailing`. Icons inherit `currentColor` and scale with the tag size.' },
      source: {
        code: `// Leading dot
<Tag color="green" icon={<DotIcon />}>Active</Tag>

// Trailing close (prefer onRemove shorthand for removable chips)
<Tag color="blue" variant="outline" trailing={<CloseIcon />}>Beta</Tag>

// Both
<Tag color="yellow" icon={<DotIcon />} trailing={<CloseIcon />}>Pending</Tag>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <Tag color="green" icon={<DotIcon />}>Active</Tag>
      <Tag color="blue" variant="outline" trailing={
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      }>Beta</Tag>
      <Tag color="yellow" icon={<DotIcon />} trailing={
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      }>Pending</Tag>
      <Tag color="grey" variant="semi" icon={<DotIcon />}>Draft</Tag>
    </div>
  ),
};

/* ── Removable chips ── */
export const Removable = {
  name: 'Removable',
  parameters: {
    docs: {
      description: { story: 'Pass `onRemove` to get a trailing × button automatically. The button gets `aria-label="Remove {label}"` for screen readers.' },
      source: {
        code: `<Tag color="blue" onRemove={() => handleRemove('design')}>Design</Tag>`,
      },
    },
  },
  render: () => {
    const [chips, setChips] = useState(['Design', 'Legal', 'Finance', 'Tech']);
    const remove = (label) => setChips(prev => prev.filter(c => c !== label));

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
        {chips.map(label => (
          <Tag key={label} color="blue" variant="outline" onRemove={() => remove(label)}>{label}</Tag>
        ))}
        {chips.length === 0 && (
          <span style={{ fontSize: '12px', color: 'var(--color-subheading)' }}>All removed — refresh to reset</span>
        )}
      </div>
    );
  },
};

/* ── As button (filter chip) ── */
export const AsButton = {
  name: 'As Button (Filter Chip)',
  parameters: {
    docs: {
      description: { story: 'Pass `as="button"` for clickable filter chips. The root element becomes a `<button>` so it is keyboard focusable and accessible.' },
      source: {
        code: `<Tag as="button" color="blue" variant="outline" onClick={() => handleFilter('Legal')}>Legal</Tag>`,
      },
    },
  },
  render: () => {
    const [active, setActive] = useState('All');
    const filters = ['All', 'Legal', 'Finance', 'Tech', 'Design'];

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
        {filters.map(f => (
          <Tag
            key={f}
            as="button"
            color="blue"
            variant={active === f ? 'filled' : 'outline'}
            onClick={() => setActive(f)}
          >
            {f}
          </Tag>
        ))}
      </div>
    );
  },
};

/* ── Full matrix: 8 colors × 3 variants ── */
export const FullMatrix = {
  name: 'Full Matrix',
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: 'All 24 combinations (8 colors × 3 variants) — mirrors the Figma reference node 5296-8782. Each cell shows the canonical `[icon] Label [icon]` pattern.' },
      source: { code: '// Visual reference grid — see individual stories for usage code.' },
    },
  },
  render: () => (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', fontSize: '12px', fontFamily: 'var(--font-primary)', width: '100%' }}>
        <thead>
          <tr>
            <th style={thStyle({ textAlign: 'left', minWidth: '80px' })}>Color</th>
            {VARIANTS.map(v => (
              <th key={v} style={thStyle()}>{v.charAt(0).toUpperCase() + v.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COLORS.map(color => (
            <tr key={color}>
              <td style={tdStyle({ color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'capitalize' })}>
                {color}
              </td>
              {VARIANTS.map(variant => (
                <td key={variant} style={tdStyle()}>
                  <Tag color={color} variant={variant} icon={<PlaceholderIcon />} trailing={<PlaceholderIcon />}>
                    Label
                  </Tag>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

const thStyle = (extra = {}) => ({
  padding: '8px 16px',
  background: 'var(--color-bg-2)',
  color: 'var(--color-subheading)',
  fontWeight: 600,
  borderBottom: '1px solid var(--color-border)',
  whiteSpace: 'nowrap',
  textAlign: 'center',
  ...extra,
});

const tdStyle = (extra = {}) => ({
  padding: '10px 16px',
  borderBottom: '1px solid var(--color-border)',
  verticalAlign: 'middle',
  ...extra,
});
