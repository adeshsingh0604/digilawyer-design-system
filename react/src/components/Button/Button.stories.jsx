import React from 'react';
import { Button } from './Button';

/* ── Shared icons — match ico-plus / arrow from the design system sprite ── */
const PlusIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 3.5v9M3.5 8h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EditIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M11.5 2.5l2 2-9 9H2.5v-2l9-9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Five variants, four sizes, five states. All colours come from CSS custom properties in
\`docs/shared/tokens.css\` — toggle \`data-theme="dark"\` on \`<html>\` to switch themes instantly.

**HTML docs reference:** [button.html](../../../docs/components/button.html)

\`\`\`js
import { Button } from 'digilawyer-ds';

<Button variant="primary" size="md" onClick={handleClick}>
  Save changes
</Button>
\`\`\`
        `.trim(),
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'],
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'primary | secondary | tertiary | ghost | danger' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'xs | sm | md | lg' },
      },
    },
    disabled:     { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    loading:      { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    square:       { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    activeBorder: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    children:     { control: 'text' },
    'aria-label': { control: 'text', description: 'Accessible label for icon-only buttons (no visible text). Passed as a native HTML attribute.' },
    iconLeft:     { control: false },
    iconRight:    { control: false },
    onClick:      { action: 'clicked' },
    type:         { control: { type: 'select' }, options: ['button', 'submit', 'reset'], table: { defaultValue: { summary: 'button' } } },
  },
};

/* ── Playground ── */
export const Playground = {
  parameters: {
    docs: {
      description: { story: 'Use the controls panel to try every prop combination interactively.' },
      source: {
        type: 'code',
        code: `<Button variant="primary" size="md" onClick={handleClick}>
  Save changes
</Button>`,
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Button',
    disabled: false,
    loading: false,
    square: false,
    activeBorder: false,
  },
};

/* ── All 5 variants ── */
export const AllVariants = {
  name: 'All Variants',
  parameters: {
    docs: {
      description: { story: 'Choose the variant that matches the action\'s emphasis level. Never place two Primary buttons side by side.' },
      source: {
        code: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

/* ── All 4 sizes ── */
export const AllSizes = {
  name: 'All Sizes',
  parameters: {
    docs: {
      description: { story: '`xs` = 24 px · `sm` = 32 px · `md` = 40 px (default) · `lg` = 48 px. Icons scale proportionally with each size.' },
      source: {
        code: `<Button size="xs">X-Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button variant="primary" size="xs" iconLeft={<PlusIcon size={12} />} iconRight={<ArrowIcon size={12} />}>X-Small</Button>
      <Button variant="primary" size="sm" iconLeft={<PlusIcon size={14} />} iconRight={<ArrowIcon size={14} />}>Small</Button>
      <Button variant="primary" size="md" iconLeft={<PlusIcon />}           iconRight={<ArrowIcon />}>Medium</Button>
      <Button variant="primary" size="lg" iconLeft={<PlusIcon size={18} />} iconRight={<ArrowIcon size={18} />}>Large</Button>
    </div>
  ),
};

/* ── With icons ── */
export const WithIcons = {
  name: 'With Icons',
  parameters: {
    docs: {
      description: { story: 'Pass any React node to `iconLeft` or `iconRight`. Use `iconLeft` to reinforce the action visually, `iconRight` for directional cues like arrows.' },
      source: {
        code: `// Icon on the left
<Button variant="primary" iconLeft={<PlusIcon />}>Add item</Button>

// Icon on the right
<Button variant="primary" iconRight={<ArrowIcon />}>Continue</Button>

// Both sides
<Button variant="primary" iconLeft={<PlusIcon />} iconRight={<ArrowIcon />}>Label</Button>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: 'var(--color-subheading)', width: '90px', flexShrink: 0 }}>Left icon</span>
        <Button variant="primary"   iconLeft={<PlusIcon />}>Label</Button>
        <Button variant="secondary" iconLeft={<PlusIcon />}>Label</Button>
        <Button variant="tertiary"  iconLeft={<PlusIcon />}>Label</Button>
        <Button variant="ghost"     iconLeft={<PlusIcon />}>Label</Button>
        <Button variant="danger"    iconLeft={<PlusIcon />}>Label</Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: 'var(--color-subheading)', width: '90px', flexShrink: 0 }}>Right icon</span>
        <Button variant="primary"   iconRight={<ArrowIcon />}>Label</Button>
        <Button variant="secondary" iconRight={<ArrowIcon />}>Label</Button>
        <Button variant="tertiary"  iconRight={<ArrowIcon />}>Label</Button>
        <Button variant="ghost"     iconRight={<ArrowIcon />}>Label</Button>
        <Button variant="danger"    iconRight={<ArrowIcon />}>Label</Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: 'var(--color-subheading)', width: '90px', flexShrink: 0 }}>Both</span>
        <Button variant="primary"   iconLeft={<PlusIcon />} iconRight={<ArrowIcon />}>Label</Button>
        <Button variant="secondary" iconLeft={<PlusIcon />} iconRight={<ArrowIcon />}>Label</Button>
        <Button variant="tertiary"  iconLeft={<PlusIcon />} iconRight={<ArrowIcon />}>Label</Button>
        <Button variant="ghost"     iconLeft={<PlusIcon />} iconRight={<ArrowIcon />}>Label</Button>
        <Button variant="danger"    iconLeft={<PlusIcon />} iconRight={<ArrowIcon />}>Label</Button>
      </div>
    </div>
  ),
};

/* ── Square / icon-only ── */
export const Square = {
  name: 'Square (Icon Only)',
  parameters: {
    docs: {
      description: { story: 'Set `square` for icon-only buttons — removes the label and applies equal padding. **Always** provide `aria-label` when there is no visible text.' },
      source: {
        code: `<Button variant="primary" size="md" square aria-label="Add">
  <PlusIcon />
</Button>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: 'var(--color-subheading)', width: '90px', flexShrink: 0 }}>md</span>
        <Button variant="primary"   size="md" square iconLeft={<PlusIcon />} aria-label="Add" />
        <Button variant="secondary" size="md" square iconLeft={<EditIcon />}  aria-label="Edit" />
        <Button variant="tertiary"  size="md" square iconLeft={<PlusIcon />} aria-label="Add" />
        <Button variant="ghost"     size="md" square iconLeft={<PlusIcon />} aria-label="Add" />
        <Button variant="danger"    size="md" square iconLeft={<PlusIcon />} aria-label="Delete" />
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: 'var(--color-subheading)', width: '90px', flexShrink: 0 }}>sizes</span>
        <Button variant="primary" size="xs" square iconLeft={<PlusIcon size={12} />} aria-label="Add" />
        <Button variant="primary" size="sm" square iconLeft={<PlusIcon size={14} />} aria-label="Add" />
        <Button variant="primary" size="md" square iconLeft={<PlusIcon />}           aria-label="Add" />
        <Button variant="primary" size="lg" square iconLeft={<PlusIcon size={18} />} aria-label="Add" />
      </div>
    </div>
  ),
};

/* ── Active border ── */
export const ActiveBorder = {
  name: 'Active Border',
  parameters: {
    docs: {
      description: { story: 'Tertiary-only active state with a solid `1.5 px` border — used in segmented controls and button groups to indicate the selected item.' },
      source: {
        code: `<Button activeBorder>Selected</Button>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button activeBorder size="xs" iconLeft={<PlusIcon size={12} />}>X-Small</Button>
      <Button activeBorder size="sm" iconLeft={<PlusIcon size={14} />}>Small</Button>
      <Button activeBorder size="md" iconLeft={<PlusIcon />}>Medium</Button>
      <Button activeBorder size="lg" iconLeft={<PlusIcon size={18} />}>Large</Button>
    </div>
  ),
};

/* ── Full matrix — every state × size × variant ── */
const VARIANTS = ['primary', 'secondary', 'tertiary', 'ghost', 'danger'];
const SIZES    = [['lg', 'Large (48px)'], ['md', 'Medium (40px)'], ['sm', 'Small (32px)'], ['xs', 'X-Small (24px)']];
const STATES   = [
  { label: 'Default',       disabled: false, loading: false, activeBorder: false },
  { label: 'Disabled',      disabled: true,  loading: false, activeBorder: false },
  { label: 'Loading',       disabled: false, loading: true,  activeBorder: false },
  { label: 'Active border', disabled: false, loading: false, activeBorder: true, note: 'Tertiary only' },
];

export const FullMatrix = {
  name: 'Full Matrix',
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: 'Every combination of state × size × variant. Active Border only applies to Tertiary — all other variant cells show `—`.' },
      source: { code: '// Visual reference grid — see individual stories for usage code.' },
    },
  },
  render: () => (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', fontSize: '12px', fontFamily: 'var(--font-primary)', width: '100%' }}>
        <thead>
          <tr>
            <th style={thStyle({ textAlign: 'left' })}>State / Size</th>
            {VARIANTS.map(v => (
              <th key={v} style={thStyle()}>{v.charAt(0).toUpperCase() + v.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {STATES.map((state, si) =>
            SIZES.map(([sz, szLabel], idx) => (
              <tr key={`${si}-${sz}`} style={idx === 0 && si > 0 ? { borderTop: '2px solid var(--color-border)' } : {}}>
                <td style={tdStyle({ color: 'var(--color-subheading)', minWidth: '120px' })}>
                  {idx === 0 && (
                    <strong style={{ display: 'block', color: 'var(--color-heading)', marginBottom: '2px' }}>
                      {state.label}
                    </strong>
                  )}
                  <span style={{ fontSize: '11px' }}>{szLabel}</span>
                  {idx === 0 && state.note && (
                    <span style={{ display: 'block', fontSize: '10px', opacity: 0.6, marginTop: '2px' }}>
                      {state.note}
                    </span>
                  )}
                </td>
                {VARIANTS.map(v => {
                  if (state.activeBorder && v !== 'tertiary') {
                    return (
                      <td key={v} style={tdStyle({ textAlign: 'center', color: 'var(--color-subheading)' })}>—</td>
                    );
                  }
                  return (
                    <td key={v} style={tdStyle({ textAlign: 'center' })}>
                      <Button
                        variant={v}
                        size={sz}
                        disabled={state.disabled}
                        loading={state.loading}
                        activeBorder={state.activeBorder}
                        iconLeft={<PlusIcon size={sz === 'lg' ? 18 : sz === 'sm' ? 14 : sz === 'xs' ? 12 : 16} />}
                      >
                        Label
                      </Button>
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  ),
};

const thStyle = (extra = {}) => ({
  padding: '8px 12px',
  background: 'var(--color-bg-2)',
  color: 'var(--color-subheading)',
  fontWeight: 600,
  borderBottom: '1px solid var(--color-border)',
  whiteSpace: 'nowrap',
  ...extra,
});

const tdStyle = (extra = {}) => ({
  padding: '10px 12px',
  borderBottom: '1px solid var(--color-border)',
  verticalAlign: 'middle',
  ...extra,
});

/* ── Disabled — all variants ── */
export const Disabled = {
  name: 'Disabled',
  parameters: {
    docs: {
      description: { story: 'Disabled uses **token-specific colours per variant** — not a blanket `opacity: 0.5`. This ensures disabled buttons remain visually distinct across all themes.' },
      source: {
        code: `<Button variant="primary"   disabled>Primary</Button>
<Button variant="secondary" disabled>Secondary</Button>
<Button variant="tertiary"  disabled>Tertiary</Button>
<Button variant="ghost"     disabled>Ghost</Button>
<Button variant="danger"    disabled>Danger</Button>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary"   disabled>Primary</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="tertiary"  disabled>Tertiary</Button>
      <Button variant="ghost"     disabled>Ghost</Button>
      <Button variant="danger"    disabled>Danger</Button>
    </div>
  ),
};

/* ── Loading — all variants ── */
export const Loading = {
  name: 'Loading',
  parameters: {
    docs: {
      description: { story: 'Setting `loading` shows a spinner, sets `aria-busy="true"`, and disables all pointer events.' },
      source: {
        code: `<Button variant="primary" loading>Saving…</Button>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary"   loading>Primary</Button>
      <Button variant="secondary" loading>Secondary</Button>
      <Button variant="tertiary"  loading>Tertiary</Button>
      <Button variant="ghost"     loading>Ghost</Button>
      <Button variant="danger"    loading>Danger</Button>
    </div>
  ),
};
