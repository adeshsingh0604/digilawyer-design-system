import React from 'react';
import { ProgressBar } from './ProgressBar';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    color:         { control: 'select', options: ['brand', 'blue', 'green', 'purple', 'orange', 'yellow', 'red'] },
    size:          { control: 'select', options: ['sm', 'md'] },
    value:         { control: { type: 'range', min: 0, max: 100, step: 1 } },
    indeterminate: { control: 'boolean' },
  },
};

const caption = (text) => (
  <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
    {text}
  </div>
);

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground = {
  args: { value: 60, color: 'brand', size: 'sm', indeterminate: false },
  render: (args) => (
    <div style={{ width: 320 }}>
      <ProgressBar {...args} aria-label="Playground progress" />
    </div>
  ),
};

// ── Default ───────────────────────────────────────────────────────────────────
export const Default = {
  render: () => (
    <div style={{ width: 320 }}>
      <ProgressBar value={60} aria-label="Upload progress" />
    </div>
  ),
};

// ── Variants ──────────────────────────────────────────────────────────────────
export const Variants = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '12px 20px', alignItems: 'center', maxWidth: 560 }}>
      {['brand', 'blue', 'green', 'purple', 'orange', 'yellow', 'red'].map((c) => (
        <React.Fragment key={c}>
          <div style={{ fontSize: 12, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'capitalize' }}>{c}</div>
          <ProgressBar color={c} value={60} aria-label={`${c} progress`} />
        </React.Fragment>
      ))}
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────
export const Sizes = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '16px 20px', alignItems: 'center', maxWidth: 560 }}>
      <div>{caption('Small · 8px')}</div>
      <ProgressBar size="sm" value={60} aria-label="Small progress" />
      <div>{caption('Medium · 12px')}</div>
      <ProgressBar size="md" value={60} aria-label="Medium progress" />
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────
export const States = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '12px 20px', alignItems: 'center', maxWidth: 560 }}>
      {[0, 25, 50, 75, 100].map((v) => (
        <React.Fragment key={v}>
          <div style={{ fontSize: 12, color: 'var(--color-subheading)', fontWeight: 600 }}>{v}%</div>
          <ProgressBar value={v} aria-label={`${v}% progress`} />
        </React.Fragment>
      ))}
      <div style={{ fontSize: 12, color: 'var(--color-subheading)', fontWeight: 600 }}>Indeterminate</div>
      <ProgressBar indeterminate aria-label="Loading" />
    </div>
  ),
};

// ── Full Matrix — 2 sizes × 7 colours × 5 values ─────────────────────────────
export const FullMatrix = {
  render: () => {
    const colors = ['brand', 'blue', 'green', 'purple', 'orange', 'yellow', 'red'];
    const values = [0, 25, 50, 75, 100];
    const hdr = { fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' };
    const lbl = { fontSize: 12, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'capitalize' };

    const SizeMatrix = ({ size, label }) => (
      <div>
        <div style={{ ...hdr, marginBottom: 12 }}>{label}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(5, 1fr)', gap: '10px 16px', alignItems: 'center' }}>
          <div />
          {values.map((v) => (
            <div key={v} style={{ fontSize: 11, color: 'var(--color-subheading)', textAlign: 'center' }}>{v}%</div>
          ))}
          {colors.map((c) => (
            <React.Fragment key={c}>
              <div style={lbl}>{c}</div>
              {values.map((v) => (
                <ProgressBar key={v} color={c} size={size} value={v} aria-label={`${c} ${v}%`} />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    );

    return (
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 28,
        padding: 24,
        border: '1px dashed var(--color-border)',
        borderRadius: 'var(--radius-md, 6px)',
        background: 'var(--color-bg-2)',
      }}>
        <SizeMatrix size="sm" label="Small (8 px)" />
        <SizeMatrix size="md" label="Medium (12 px)" />
      </div>
    );
  },
};
