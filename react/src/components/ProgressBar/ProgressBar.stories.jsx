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

// ── Interactive ───────────────────────────────────────────────────────────────
export const Interactive = {
  render: () => {
    const COLORS = ['brand', 'blue', 'green', 'purple', 'orange', 'yellow', 'red'];
    const [value, setValue]           = React.useState(0);
    const [color, setColor]           = React.useState('brand');
    const [size, setSize]             = React.useState('md');
    const [indeterminate, setIndet]   = React.useState(false);
    const [ramping, setRamping]       = React.useState(false);
    const rampRef                     = React.useRef(null);
    const isRampingRef                = React.useRef(false);

    const stopRamp = () => {
      if (rampRef.current) { clearInterval(rampRef.current); rampRef.current = null; }
      isRampingRef.current = false;
      setRamping(false);
    };

    const jump = (v) => { stopRamp(); setIndet(false); setValue(v); };

    const toggleRamp = () => {
      if (isRampingRef.current) { stopRamp(); return; }
      setIndet(false);
      let v = value >= 100 ? 0 : value;
      setValue(v);
      isRampingRef.current = true;
      setRamping(true);
      rampRef.current = setInterval(() => {
        v += 2;
        if (v >= 100) { setValue(100); stopRamp(); return; }
        setValue(v);
      }, 80);
    };

    const toggleIndet = () => {
      if (indeterminate) { setIndet(false); setValue(0); return; }
      stopRamp();
      setIndet(true);
    };

    React.useEffect(() => () => stopRamp(), []);

    const btnBase = { padding: '4px 12px', borderRadius: 6, border: '1px solid', cursor: 'pointer', fontSize: 12, fontWeight: 600, transition: 'background 0.12s' };
    const primary = { ...btnBase, background: 'var(--color-heading)', color: 'var(--color-bg)', borderColor: 'var(--color-heading)' };
    const secondary = { ...btnBase, background: 'var(--color-bg-2)', color: 'var(--color-heading)', borderColor: 'var(--color-border)' };
    const lbl = { fontSize: 12, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 720 }}>
        {/* Live bar + value readout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <ProgressBar value={value} color={color} size={size} indeterminate={indeterminate} aria-label="Live progress" />
          </div>
          <span style={{ minWidth: 40, textAlign: 'right', fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--color-heading)' }}>
            {indeterminate ? '—' : `${value}%`}
          </span>
        </div>

        {/* Controls */}
        <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '12px 16px', alignItems: 'center' }}>
          <span style={lbl}>Value</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {[0, 25, 50, 75, 100].map((v) => (
              <button key={v} style={secondary} onClick={() => jump(v)}>{v}</button>
            ))}
            <button style={ramping ? primary : secondary} onClick={toggleRamp}>{ramping ? 'Pause' : 'Ramp'}</button>
            <button style={indeterminate ? primary : secondary} onClick={toggleIndet}>Indeterminate</button>
          </div>

          <span style={lbl}>Colour</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {COLORS.map((c) => (
              <button key={c} style={color === c ? primary : secondary} onClick={() => setColor(c)}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>

          <span style={lbl}>Size</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button style={size === 'sm' ? primary : secondary} onClick={() => setSize('sm')}>Small · 8</button>
            <button style={size === 'md' ? primary : secondary} onClick={() => setSize('md')}>Medium · 12</button>
          </div>
        </div>
      </div>
    );
  },
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
