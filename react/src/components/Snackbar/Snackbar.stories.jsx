import React from 'react';
import { Snackbar, SnackbarClose } from './Snackbar';

export default {
  title: 'Components/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['brand', 'info', 'danger', 'success', 'warning', 'notice', 'alert'] },
    state:   { control: 'select', options: ['semi', 'filled', 'border'] },
  },
};

const caption = (text) => (
  <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
    {text}
  </div>
);

const ActionBtn = () => <button type="button" className="btn btn-primary btn-sm">Label</button>;

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground = {
  args: { variant: 'brand', state: 'semi' },
  render: (args) => (
    <Snackbar {...args} action={<ActionBtn />} onClose={() => {}}>
      Label
    </Snackbar>
  ),
};

// ── Default ───────────────────────────────────────────────────────────────────
export const Default = {
  render: () => (
    <Snackbar action={<ActionBtn />} onClose={() => {}}>
      Label
    </Snackbar>
  ),
};

// ── Variants ──────────────────────────────────────────────────────────────────
export const Variants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {['brand', 'info', 'danger', 'success', 'warning', 'notice', 'alert'].map((v) => (
        <div key={v}>
          {caption(v.charAt(0).toUpperCase() + v.slice(1))}
          <Snackbar variant={v} action={<ActionBtn />} onClose={() => {}}>
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </Snackbar>
        </div>
      ))}
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────
export const States = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        {caption('Semi-filled (default)')}
        <Snackbar variant="info" state="semi" action={<ActionBtn />} onClose={() => {}}>
          Semi-filled (default)
        </Snackbar>
      </div>
      <div>
        {caption('Filled')}
        <Snackbar variant="info" state="filled" action={<ActionBtn />} onClose={() => {}}>
          Filled
        </Snackbar>
      </div>
      <div>
        {caption('Border')}
        <Snackbar variant="info" state="border" action={<ActionBtn />} onClose={() => {}}>
          Border
        </Snackbar>
      </div>
    </div>
  ),
};

// ── Full Matrix — 7 variants × 3 states ───────────────────────────────────────
export const FullMatrix = {
  render: () => {
    const variants = ['brand', 'info', 'danger', 'success', 'warning', 'notice', 'alert'];
    const states   = [
      { key: 'semi',   label: 'Semi-filled' },
      { key: 'filled', label: 'Filled' },
      { key: 'border', label: 'Border' },
    ];
    const hdr = { fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' };
    const lbl = { fontSize: 12, color: 'var(--color-subheading)', fontWeight: 600, alignSelf: 'start', paddingTop: 14 };

    return (
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 16,
        padding: 24,
        border: '1px dashed var(--color-border)',
        borderRadius: 'var(--radius-md, 6px)',
        background: 'var(--color-bg-2)',
        overflowX: 'auto',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(3, minmax(320px, 1fr))', gap: '12px 16px', alignItems: 'center' }}>
          <div />
          {states.map((s) => <div key={s.key} style={hdr}>{s.label}</div>)}

          {variants.map((v) => (
            <React.Fragment key={v}>
              <div style={lbl}>{v.charAt(0).toUpperCase() + v.slice(1)}</div>
              {states.map((s) => (
                <Snackbar key={s.key} variant={v} state={s.key} action={<ActionBtn />} onClose={() => {}}>
                  Label
                </Snackbar>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  },
};
