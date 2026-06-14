import React from 'react';
import { Option, OptionsMenu } from './Options';

export default {
  title: 'Components/Options',
  component: Option,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size:     { control: 'select', options: ['lg', 'md', 'sm'] },
    disabled: { control: 'boolean' },
    hover:    { control: 'boolean' },
    selected: { control: 'boolean' },
  },
};

const caption = (text) => (
  <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
    {text}
  </div>
);

// ── Shared inline icons (match HTML docs sprite paths) ────────────────────────
const AddSquareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8.5 12h7M12 8.5v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

const ArrowDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Radio-dot "current selection" indicator
const RadioDot = () => (
  <span className="opt-dot" aria-hidden="true" style={{
    width: 16, height: 16, borderRadius: '50%',
    background: 'var(--color-heading)', position: 'relative', display: 'inline-block', flexShrink: 0,
  }}>
    <span style={{
      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
      width: 6, height: 6, borderRadius: '50%', background: 'var(--color-bg)',
    }} />
  </span>
);

const TagChip = ({ color = 'grey', variant = 'outline', size = 'sm', children }) => (
  <span className={`tag tag-${color} tag-${variant} tag-${size}`}>{children}</span>
);

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground = {
  args: { size: 'md', disabled: false, hover: false, selected: false, children: 'Options' },
  render: (args) => (
    <Option
      {...args}
      leading={<AddSquareIcon />}
      trailing={<><ArrowDownIcon /><TagChip>Label</TagChip></>}
      style={{ maxWidth: 320 }}
    />
  ),
};

// ── Default ───────────────────────────────────────────────────────────────────
export const Default = {
  render: () => (
    <Option
      leading={<AddSquareIcon />}
      trailing={<><ArrowDownIcon /><TagChip>Label</TagChip></>}
      style={{ maxWidth: 320 }}
    >
      Options
    </Option>
  ),
};

// ── Variants ──────────────────────────────────────────────────────────────────
export const Variants = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div>
        {caption('Standalone row')}
        <OptionsMenu aria-label="Standalone row" style={{ width: 280 }}>
          <Option
            role="option"
            leading={<AddSquareIcon />}
            trailing={<><ArrowDownIcon /><TagChip>Label</TagChip></>}
          >
            Options
          </Option>
        </OptionsMenu>
      </div>

      <div>
        {caption('In a menu — with selection')}
        <OptionsMenu aria-label="In a menu" style={{ width: 280 }}>
          <Option role="option" selected leading={<RadioDot />} trailing={<CheckIcon />}>
            All views
          </Option>
          <Option role="option" leading={<AddSquareIcon />} trailing={<TagChip color="blue" variant="semi">New</TagChip>}>
            Active
          </Option>
          <Option role="option" disabled leading={<AddSquareIcon />}>
            Trashed
          </Option>
        </OptionsMenu>
      </div>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────
export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      {[
        { size: 'lg', label: 'Large · 48px', tagSize: 'sm' },
        { size: 'md', label: 'Medium · 40px (default)', tagSize: 'sm' },
        { size: 'sm', label: 'Small · 32px', tagSize: 'xs' },
      ].map(({ size, label, tagSize }) => (
        <div key={size}>
          {caption(label)}
          <Option
            size={size}
            leading={<AddSquareIcon />}
            trailing={<><ArrowDownIcon /><TagChip size={tagSize}>Label</TagChip></>}
          >
            Options
          </Option>
        </div>
      ))}
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────
export const States = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
      <div>
        {caption('Default')}
        <Option leading={<AddSquareIcon />} trailing={<ArrowDownIcon />}>
          Default — hover to preview
        </Option>
      </div>
      <div>
        {caption('Hover (forced)')}
        <Option leading={<AddSquareIcon />} trailing={<ArrowDownIcon />} hover>
          Hover (forced via hover prop)
        </Option>
      </div>
      <div>
        {caption('Disabled')}
        <Option leading={<AddSquareIcon />} trailing={<ArrowDownIcon />} disabled>
          Disabled
        </Option>
      </div>
    </div>
  ),
};

// ── Full Matrix — 3 sizes × 3 states ─────────────────────────────────────────
export const FullMatrix = {
  render: () => {
    const hdr = { fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' };
    const lbl = { fontSize: 12, color: 'var(--color-subheading)', fontWeight: 600, alignSelf: 'center' };

    const rows = [
      { size: 'lg', label: 'Large · 48px',          tagSize: 'sm' },
      { size: 'md', label: 'Medium · 40px',          tagSize: 'sm' },
      { size: 'sm', label: 'Small · 32px',           tagSize: 'xs' },
    ];

    return (
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 16,
        padding: 24,
        border: '1px dashed var(--color-border)',
        borderRadius: 'var(--radius-md, 6px)',
        background: 'var(--color-bg-2)',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '130px repeat(3, 1fr)', gap: '12px 16px', alignItems: 'center' }}>
          <div />
          {['Default', 'Hover', 'Disabled'].map((h) => <div key={h} style={hdr}>{h}</div>)}

          {rows.map(({ size, label, tagSize }) => (
            <React.Fragment key={size}>
              <div style={lbl}>{label}</div>
              <Option size={size} leading={<AddSquareIcon />} trailing={<><ArrowDownIcon /><TagChip size={tagSize}>Label</TagChip></>}>Options</Option>
              <Option size={size} leading={<AddSquareIcon />} trailing={<><ArrowDownIcon /><TagChip size={tagSize}>Label</TagChip></>} hover>Options</Option>
              <Option size={size} leading={<AddSquareIcon />} trailing={<><ArrowDownIcon /><TagChip size={tagSize}>Label</TagChip></>} disabled>Options</Option>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  },
};
