import React from 'react';
import { Link } from './Link';

export default {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    color:     { control: 'select', options: ['default', 'brand', 'blue'] },
    size:      { control: 'select', options: [undefined, 'sm', 'xs', 'xxs'] },
    underline: { control: 'boolean' },
    disabled:  { control: 'boolean' },
    hover:     { control: 'boolean' },
  },
};

const caption = (text) => (
  <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
    {text}
  </div>
);

const AddSquareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="2.5" y="2.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.25"/>
    <path d="M5.5 8h5M8 5.5v5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
  </svg>
);

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground = {
  args: { color: 'default', underline: false, disabled: false, hover: false, children: 'Title' },
  render: (args) => <Link href="#" {...args} />,
};

// ── Default ───────────────────────────────────────────────────────────────────
export const Default = {
  render: () => <Link href="#">Title</Link>,
};

// ── Variants ──────────────────────────────────────────────────────────────────
export const Variants = {
  render: () => {
    const hdr = { fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' };
    const lbl = { fontSize: 12, color: 'var(--color-subheading)', fontWeight: 600 };
    const variants = [
      { color: 'default', label: 'Default' },
      { color: 'brand',   label: 'Brand' },
      { color: 'blue',    label: 'Blue' },
    ];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(3, 80px)', gap: '14px 24px', alignItems: 'center' }}>
        <div />
        {['Default', 'Hover', 'Disabled'].map((h) => <div key={h} style={hdr}>{h}</div>)}
        {variants.map(({ color, label }) => (
          <React.Fragment key={color}>
            <div style={lbl}>{label}</div>
            <Link href="#" color={color}>Title</Link>
            <Link href="#" color={color} hover>Title</Link>
            <Link href="#" color={color} disabled>Title</Link>
          </React.Fragment>
        ))}
      </div>
    );
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────
export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <div>{caption('Body 1 · 16/24 (default)')}<Link href="#">Title — Body 1 (16/24)</Link></div>
      <div>{caption('Body 3 · 14/20 · sm')}<Link href="#" size="sm">Title — Body 3 (14/20)</Link></div>
      <div>{caption('Caption 1 · 12/16 · xs')}<Link href="#" size="xs">Title — Caption 1 (12/16)</Link></div>
      <div>{caption('Caption 2 · 10/12 · xxs')}<Link href="#" size="xxs">Title — Caption 2 (10/12)</Link></div>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────
export const States = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
      <div>{caption('Default')}<Link href="#">Default — hover me to see the live state</Link></div>
      <div>{caption('Hover (forced)')}<Link href="#" hover>Hover (forced via hover prop)</Link></div>
      <div>{caption('Underline pinned')}<Link href="#" underline>Underline pinned at rest</Link></div>
      <div>{caption('Disabled')}<Link href="#" disabled>Disabled</Link></div>
    </div>
  ),
};

// ── With Icons ────────────────────────────────────────────────────────────────
export const WithIcons = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
      <div>{caption('Default size — leading + trailing')}<Link href="#" leading={<AddSquareIcon />} trailing={<AddSquareIcon />}>Title</Link></div>
      <div>{caption('Brand · sm')}<Link href="#" color="brand" size="sm" leading={<AddSquareIcon />} trailing={<AddSquareIcon />}>Title</Link></div>
      <div>{caption('Blue · xs')}<Link href="#" color="blue" size="xs" leading={<AddSquareIcon />} trailing={<AddSquareIcon />}>Title</Link></div>
      <div>{caption('Default · xxs')}<Link href="#" size="xxs" leading={<AddSquareIcon />} trailing={<AddSquareIcon />}>Title</Link></div>
    </div>
  ),
};

// ── Full Matrix — 3 variants × 4 sizes × 3 states ────────────────────────────
export const FullMatrix = {
  render: () => {
    const variants = [
      { color: 'default', label: 'Default' },
      { color: 'brand',   label: 'Brand' },
      { color: 'blue',    label: 'Blue' },
    ];
    const sizes = [
      { size: undefined, label: 'md · Body 1' },
      { size: 'sm',      label: 'sm · Body 3' },
      { size: 'xs',      label: 'xs · Caption 1' },
      { size: 'xxs',     label: 'xxs · Caption 2' },
    ];
    const states = [
      { hover: false, disabled: false, label: 'Default' },
      { hover: true,  disabled: false, label: 'Hover' },
      { hover: false, disabled: true,  label: 'Disabled' },
    ];
    const hdr = { fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' };
    const lbl = { fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600 };

    return (
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 28,
        padding: 24,
        border: '1px dashed var(--color-border)',
        borderRadius: 'var(--radius-md, 6px)',
        background: 'var(--color-bg-2)',
      }}>
        {variants.map(({ color, label: vLabel }) => (
          <div key={color}>
            <div style={{ ...hdr, marginBottom: 12 }}>{vLabel}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px repeat(3, 1fr)', gap: '10px 16px', alignItems: 'center' }}>
              <div />
              {states.map((s) => <div key={s.label} style={hdr}>{s.label}</div>)}
              {sizes.map(({ size, label: sLabel }) => (
                <React.Fragment key={sLabel}>
                  <div style={lbl}>{sLabel}</div>
                  {states.map((s) => (
                    <div key={s.label}>
                      <Link href="#" color={color} size={size} hover={s.hover} disabled={s.disabled}>Title</Link>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
