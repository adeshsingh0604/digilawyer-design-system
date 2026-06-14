import React, { useState } from 'react';
import { Slider, SliderRange } from './Slider';

export default {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size:    { control: 'select', options: ['sm', 'md', 'lg'] },
    showTip: { control: 'boolean' },
    showVal: { control: 'boolean' },
    disabled:{ control: 'boolean' },
    min:     { control: 'number' },
    max:     { control: 'number' },
    step:    { control: 'number' },
  },
};

const wrapStyle = { width: 280, padding: '8px 0' };
const label = (text) => (
  <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
    {text}
  </div>
);

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground = {
  args: { min: 0, max: 100, step: 1, defaultValue: 40, size: 'sm', showTip: false, showVal: false, disabled: false },
  render: (args) => (
    <div style={wrapStyle}>
      <Slider {...args} aria-label="Playground slider" />
    </div>
  ),
};

// ── Default ───────────────────────────────────────────────────────────────────
export const Default = {
  render: () => {
    const [val, setVal] = useState(50);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 13, color: 'var(--color-subheading)' }}>
          Value: <strong style={{ color: 'var(--color-heading)' }}>{val}</strong>
        </div>
        <div style={wrapStyle}>
          <Slider defaultValue={50} onChange={setVal} aria-label="Default slider" showVal />
        </div>
      </div>
    );
  },
};

// ── Display variants ──────────────────────────────────────────────────────────
export const DisplayVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        {label('No display (bare)')}
        <div style={wrapStyle}>
          <Slider defaultValue={60} aria-label="No display" />
        </div>
      </div>
      <div>
        {label('Tooltip on hover (.has-tip)')}
        <div style={{ ...wrapStyle, paddingTop: 0 }}>
          <Slider defaultValue={60} showTip aria-label="Tooltip slider" />
        </div>
      </div>
      <div>
        {label('Permanent label below (.has-val)')}
        <div style={wrapStyle}>
          <Slider defaultValue={60} showVal aria-label="Value label slider" />
        </div>
      </div>
    </div>
  ),
};

// ── All Sizes ─────────────────────────────────────────────────────────────────
export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {[
        { size: 'sm', track: '4px (default)', val: 40 },
        { size: 'md', track: '8px',           val: 60 },
        { size: 'lg', track: '12px',          val: 80 },
      ].map(({ size, track, val }) => (
        <div key={size}>
          {label(`${size.toUpperCase()} · ${track} track`)}
          <div style={wrapStyle}>
            <Slider size={size} defaultValue={val} showVal aria-label={`${size} slider`} />
          </div>
        </div>
      ))}
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────
export const States = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        {label('Default')}
        <div style={wrapStyle}><Slider defaultValue={50} showVal aria-label="Default" /></div>
      </div>
      <div>
        {label('Min (0)')}
        <div style={wrapStyle}><Slider defaultValue={0} showVal aria-label="Min" /></div>
      </div>
      <div>
        {label('Max (100)')}
        <div style={wrapStyle}><Slider defaultValue={100} showVal aria-label="Max" /></div>
      </div>
      <div>
        {label('Disabled')}
        <div style={wrapStyle}><Slider defaultValue={50} disabled aria-label="Disabled" /></div>
      </div>
    </div>
  ),
};

// ── Range ─────────────────────────────────────────────────────────────────────
export const Range = {
  render: () => {
    const [vals, setVals] = useState([25, 75]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div>
          {label('Range — permanent labels (.has-val)')}
          <div style={{ fontSize: 13, color: 'var(--color-subheading)', marginBottom: 8 }}>
            {vals[0]} – {vals[1]}
          </div>
          <div style={wrapStyle}>
            <SliderRange
              defaultValue={[25, 75]}
              showVal
              onChange={setVals}
              aria-label="Range slider"
            />
          </div>
        </div>
        <div>
          {label('Range — tooltip (.has-tip) · hover to reveal')}
          <div style={wrapStyle}>
            <SliderRange defaultValue={[30, 70]} showTip aria-label="Range slider with tip" />
          </div>
        </div>
        <div>
          {label('Range — md track')}
          <div style={wrapStyle}>
            <SliderRange size="md" defaultValue={[20, 80]} showVal aria-label="Range md" />
          </div>
        </div>
        <div>
          {label('Range — lg track')}
          <div style={wrapStyle}>
            <SliderRange size="lg" defaultValue={[10, 90]} showVal aria-label="Range lg" />
          </div>
        </div>
      </div>
    );
  },
};

// ── Full Matrix — 3 sizes × 4 states ─────────────────────────────────────────
export const FullMatrix = {
  render: () => {
    const headerStyle = { fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' };
    const rowLabelStyle = { fontSize: 12, color: 'var(--color-subheading)', fontWeight: 600, whiteSpace: 'nowrap' };
    // Fixed-height cell so has-tip (padding-top:36) and has-val (padding-bottom:24)
    // don't make their grid rows taller than bare/disabled rows.
    const cell = { paddingTop: 36, paddingBottom: 24 };

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '80px repeat(4, minmax(160px, 1fr))',
        gap: '8px 32px',
        alignItems: 'end',
        padding: 24,
        border: '1px dashed var(--color-border)',
        borderRadius: 'var(--radius-md, 6px)',
        background: 'var(--color-bg-2)',
      }}>
        <div />
        {['Bare', 'Tooltip (hover)', 'Permanent label', 'Disabled'].map((h) => (
          <div key={h} style={headerStyle}>{h}</div>
        ))}

        {[
          { size: 'sm', label: 'sm · 4px' },
          { size: 'md', label: 'md · 8px' },
          { size: 'lg', label: 'lg · 12px' },
        ].map(({ size, label: lbl }) => (
          <React.Fragment key={size}>
            <div style={rowLabelStyle}>{lbl}</div>
            <div style={cell}><Slider size={size} defaultValue={60} aria-label={`${lbl} bare`} /></div>
            <div style={cell}><Slider size={size} defaultValue={60} showTip aria-label={`${lbl} tip`} /></div>
            <div style={cell}><Slider size={size} defaultValue={60} showVal aria-label={`${lbl} val`} /></div>
            <div style={cell}><Slider size={size} defaultValue={60} disabled aria-label={`${lbl} disabled`} /></div>
          </React.Fragment>
        ))}
      </div>
    );
  },
};
