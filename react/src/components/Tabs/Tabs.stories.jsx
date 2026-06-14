import React, { useState } from 'react';
import { Tabs, Tab, TabPanel } from './Tabs';
import { Badge } from '../Badge/Badge';

export default {
  title: 'Components/Tabs',
  component: Tab,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size:     { control: 'select', options: ['lg', 'md', 'sm'] },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    vertical: { control: 'boolean' },
  },
};

const AddIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="2.5" y="2.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.25" />
    <path d="M5.5 8h5M8 5.5v5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
);

const panelStyle = {
  border: '1px solid var(--color-border)',
  borderTop: 0,
  padding: 24,
  color: 'var(--color-heading)',
  background: 'var(--color-bg)',
  borderRadius: '0 0 6px 6px',
  fontSize: 14,
};

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground = {
  args: { size: 'md', selected: false, disabled: false, vertical: false, children: 'Label' },
  render: (args) => (
    <Tabs role="tablist" aria-label="Playground tabs">
      <Tab {...args} icon={<AddIcon />} badge={<Badge variant="label" color="info">text</Badge>} />
    </Tabs>
  ),
};

// ── Default (interactive) ─────────────────────────────────────────────────────
export const Default = {
  render: () => {
    const [active, setActive] = useState(0);
    const tabs = ['Overview', 'Details', 'History'];
    return (
      <div>
        <Tabs role="tablist" aria-label="Default tabs">
          {tabs.map((label, i) => (
            <Tab
              key={label}
              id={`tab-${i}`}
              aria-controls={`panel-${i}`}
              selected={active === i}
              onClick={() => setActive(i)}
              icon={<AddIcon />}
              badge={<Badge variant="label" color="info">text</Badge>}
            >
              {label}
            </Tab>
          ))}
        </Tabs>
        {tabs.map((label, i) => (
          <TabPanel
            key={label}
            id={`panel-${i}`}
            aria-labelledby={`tab-${i}`}
            hidden={active !== i}
            style={panelStyle}
          >
            Panel {i + 1} — {label} content. Click other tabs to switch.
          </TabPanel>
        ))}
      </div>
    );
  },
};

// ── All Sizes ─────────────────────────────────────────────────────────────────
export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[
        { size: 'lg', label: 'Large · 48px' },
        { size: 'md', label: 'Medium · 40px (default)' },
        { size: 'sm', label: 'Small · 32px' },
      ].map(({ size, label }) => (
        <div key={size}>
          <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{label}</div>
          <Tabs role="tablist" aria-label={label}>
            <Tab size={size} selected icon={<AddIcon />} badge={<Badge variant="label" color="info">text</Badge>}>Label</Tab>
            <Tab size={size} icon={<AddIcon />} badge={<Badge variant="label" color="info">text</Badge>}>Label</Tab>
            <Tab size={size} icon={<AddIcon />} badge={<Badge variant="label" color="info">text</Badge>}>Label</Tab>
          </Tabs>
        </div>
      ))}
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────
export const States = {
  render: () => (
    <Tabs role="tablist" aria-label="States">
      <Tab icon={<AddIcon />} badge={<Badge variant="label" color="info">text</Badge>}>Default</Tab>
      <Tab icon={<AddIcon />} badge={<Badge variant="label" color="info">text</Badge>} className="is-hover">Hover</Tab>
      <Tab icon={<AddIcon />} badge={<Badge variant="label" color="info">text</Badge>} selected>Active</Tab>
      <Tab icon={<AddIcon />} badge={<Badge variant="label" color="info">text</Badge>} disabled>Disabled</Tab>
    </Tabs>
  ),
};

// ── Alignment ─────────────────────────────────────────────────────────────────
export const Alignment = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '60px auto auto', gap: '20px 32px', alignItems: 'center' }}>
      <div />
      {['Horizontal', 'Vertical (.tab-vertical)'].map((h) => (
        <div key={h} style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</div>
      ))}

      {[
        { size: 'lg', label: 'lg\n48 / 64' },
        { size: 'md', label: 'md\n40 / 52' },
        { size: 'sm', label: 'sm\n32 / 48' },
      ].map(({ size, label }) => (
        <React.Fragment key={size}>
          <div style={{ fontSize: 12, color: 'var(--color-subheading)', fontWeight: 600, whiteSpace: 'pre-line' }}>{label}</div>
          <Tabs role="tablist" aria-label={`Horizontal ${size}`}>
            <Tab size={size} icon={<AddIcon />} badge={<Badge variant="label" color="info">9</Badge>}>Label</Tab>
          </Tabs>
          <Tabs role="tablist" aria-label={`Vertical ${size}`}>
            <Tab size={size} vertical icon={<AddIcon />} badge={<Badge variant="label" color="info">9</Badge>}>Label</Tab>
          </Tabs>
        </React.Fragment>
      ))}
    </div>
  ),
};

// ── Full Matrix — 3 sizes × 4 states ─────────────────────────────────────────
export const FullMatrix = {
  render: () => {
    const headerStyle = { fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' };
    const rowLabelStyle = { fontSize: 12, color: 'var(--color-subheading)', fontWeight: 600, alignSelf: 'center' };

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '110px repeat(4, minmax(160px, 1fr))',
        gap: '16px 24px',
        alignItems: 'end',
        padding: 24,
        border: '1px dashed var(--color-border)',
        borderRadius: 'var(--radius-md, 6px)',
        background: 'var(--color-bg-2)',
      }}>
        <div />
        {['Default', 'Hover', 'Active', 'Disabled'].map((h) => (
          <div key={h} style={headerStyle}>{h}</div>
        ))}

        {[
          { size: 'lg', label: 'Large · 48' },
          { size: 'md', label: 'Medium · 40' },
          { size: 'sm', label: 'Small · 32' },
        ].map(({ size, label }) => (
          <React.Fragment key={size}>
            <div style={rowLabelStyle}>{label}</div>
            {/* Default */}
            <Tabs aria-label={`${label} default`}><Tab size={size} icon={<AddIcon />} badge={<Badge variant="label" color="info">text</Badge>}>Label</Tab></Tabs>
            {/* Hover */}
            <Tabs aria-label={`${label} hover`}><Tab size={size} className="is-hover" icon={<AddIcon />} badge={<Badge variant="label" color="info">text</Badge>}>Label</Tab></Tabs>
            {/* Active */}
            <Tabs aria-label={`${label} active`}><Tab size={size} selected icon={<AddIcon />} badge={<Badge variant="label" color="info">text</Badge>}>Label</Tab></Tabs>
            {/* Disabled */}
            <Tabs aria-label={`${label} disabled`}><Tab size={size} disabled icon={<AddIcon />} badge={<Badge variant="label" color="info">text</Badge>}>Label</Tab></Tabs>
          </React.Fragment>
        ))}
      </div>
    );
  },
};
