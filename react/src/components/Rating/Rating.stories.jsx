import React, { useState } from 'react';
import { Rating } from './Rating';

export default {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    shape:    { control: 'select', options: ['star', 'heart'] },
    color:    { control: 'select', options: ['yellow', 'red', 'brand'] },
    size:     { control: 'select', options: ['lg', 'md', 'sm'] },
    count:    { control: 'number' },
    half:     { control: 'boolean' },
    readOnly: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

const caption = (text) => (
  <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
    {text}
  </div>
);

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground = {
  args: { count: 5, defaultValue: 3, shape: 'star', color: 'yellow', size: 'md', half: false, readOnly: false },
  render: (args) => <Rating {...args} />,
};

// ── Default (interactive) ─────────────────────────────────────────────────────
export const Default = {
  render: () => {
    const [val, setVal] = useState(3);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 13, color: 'var(--color-subheading)' }}>
          Rating: <strong style={{ color: 'var(--color-heading)' }}>{val} / 5</strong>
        </div>
        <Rating value={val} onChange={setVal} color="yellow" />
      </div>
    );
  },
};

// ── Shapes ────────────────────────────────────────────────────────────────────
export const Shapes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        {caption('Star — Yellow (canonical)')}
        <Rating defaultValue={4} shape="star" color="yellow" />
      </div>
      <div>
        {caption('Heart — Red (canonical)')}
        <Rating defaultValue={4} shape="heart" color="red" />
      </div>
      <div>
        {caption('Star — Brand')}
        <Rating defaultValue={4} shape="star" color="brand" />
      </div>
      <div>
        {caption('Heart — Brand')}
        <Rating defaultValue={4} shape="heart" color="brand" />
      </div>
    </div>
  ),
};

// ── Half steps ────────────────────────────────────────────────────────────────
export const HalfSteps = {
  render: () => {
    const [val, setVal] = useState(3.5);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          {caption('Interactive half-step — hover left/right half of each star')}
          <div style={{ fontSize: 13, color: 'var(--color-subheading)', marginBottom: 8 }}>
            Value: <strong style={{ color: 'var(--color-heading)' }}>{val}</strong>
          </div>
          <Rating value={val} onChange={setVal} half color="yellow" />
        </div>
        <div>
          {caption('Read-only half display — 3.5 stars')}
          <Rating defaultValue={3.5} half readOnly color="yellow" />
        </div>
        <div>
          {caption('Read-only half display — 2.5 hearts')}
          <Rating defaultValue={2.5} half readOnly shape="heart" color="red" />
        </div>
      </div>
    );
  },
};

// ── All Sizes ─────────────────────────────────────────────────────────────────
export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {[
        { size: 'lg', label: 'Large · 24px' },
        { size: 'md', label: 'Medium · 20px (default)' },
        { size: 'sm', label: 'Small · 16px' },
      ].map(({ size, label }) => (
        <div key={size}>
          {caption(label)}
          <Rating defaultValue={3.5} half readOnly size={size} color="yellow" />
        </div>
      ))}
    </div>
  ),
};

// ── Colours ───────────────────────────────────────────────────────────────────
export const Colours = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        {caption('Yellow — Star only')}
        <Rating defaultValue={3.5} half readOnly color="yellow" shape="star" />
      </div>
      <div>
        {caption('Red — Heart only')}
        <Rating defaultValue={3.5} half readOnly color="red" shape="heart" />
      </div>
      <div>
        {caption('Brand — Star')}
        <Rating defaultValue={3.5} half readOnly color="brand" shape="star" />
      </div>
      <div>
        {caption('Brand — Heart')}
        <Rating defaultValue={3.5} half readOnly color="brand" shape="heart" />
      </div>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────
export const States = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        {caption('Interactive (default)')}
        <Rating defaultValue={3} color="yellow" />
      </div>
      <div>
        {caption('Read-only (aria-readonly)')}
        <Rating defaultValue={3} color="yellow" readOnly />
      </div>
      <div>
        {caption('Empty (0)')}
        <Rating defaultValue={0} color="yellow" readOnly />
      </div>
      <div>
        {caption('Full (5)')}
        <Rating defaultValue={5} color="yellow" readOnly />
      </div>
      <div>
        {caption('Disabled')}
        <Rating defaultValue={3} color="yellow" disabled />
      </div>
    </div>
  ),
};

// ── Full Matrix — 2 shapes × 3 colours × 3 sizes ─────────────────────────────
export const FullMatrix = {
  render: () => {
    const headerStyle = { fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' };
    const rowStyle    = { fontSize: 12, color: 'var(--color-subheading)', fontWeight: 600 };

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        padding: 24,
        border: '1px dashed var(--color-border)',
        borderRadius: 'var(--radius-md, 6px)',
        background: 'var(--color-bg-2)',
      }}>
        {[
          { shape: 'star',  label: 'Star',  colors: ['yellow', 'brand'], colorLabels: ['Yellow', 'Brand'] },
          { shape: 'heart', label: 'Heart', colors: ['red', 'brand'],    colorLabels: ['Red', 'Brand']    },
        ].map(({ shape, label, colors, colorLabels }) => (
          <div key={shape}>
            <div style={{ ...headerStyle, marginBottom: 16 }}>{label}</div>
            <div style={{ display: 'grid', gridTemplateColumns: `70px repeat(${colors.length}, auto)`, gap: '12px 40px', alignItems: 'center' }}>
              <div />
              {colorLabels.map((c) => (
                <div key={c} style={headerStyle}>{c}</div>
              ))}

              {[
                { size: 'lg' },
                { size: 'md' },
                { size: 'sm' },
              ].map(({ size }) => (
                <React.Fragment key={size}>
                  <div style={rowStyle}>{size} · {size === 'lg' ? 24 : size === 'md' ? 20 : 16}px</div>
                  {colors.map((color) => (
                    <Rating key={color} defaultValue={3.5} half readOnly shape={shape} color={color} size={size} />
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
