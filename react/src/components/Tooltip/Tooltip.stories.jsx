import React from 'react';
import { Tooltip, TooltipHost } from './Tooltip';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size:     { control: 'select', options: ['lg', 'md', 'sm'] },
    position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
  },
};

const BoxIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="2.5" y="2.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.25" />
    <path d="M5.5 8h5M8 5.5v5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
);

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground = {
  args: { size: 'lg', position: 'top', children: 'Tooltip text' },
  render: (args) => (
    <div style={{ padding: 32 }}>
      <Tooltip {...args} />
    </div>
  ),
};

// ── Default ───────────────────────────────────────────────────────────────────
export const Default = {
  render: () => (
    <Tooltip icon={<BoxIcon />} trailing={<BoxIcon />}>
      Lorem ipsum dolor sit amet.
    </Tooltip>
  ),
};

// ── All Sizes ─────────────────────────────────────────────────────────────────
export const AllSizes = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: '24px 16px', alignItems: 'center' }}>
      {[
        { size: 'lg', label: 'Large · 40' },
        { size: 'md', label: 'Medium · 32' },
        { size: 'sm', label: 'Small · 24' },
      ].map(({ size, label }) => (
        <React.Fragment key={size}>
          <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
          <Tooltip size={size} icon={<BoxIcon />} trailing={<BoxIcon />}>
            Lorem ipsum dolor sit amet.
          </Tooltip>
        </React.Fragment>
      ))}
    </div>
  ),
};

// ── All Positions ─────────────────────────────────────────────────────────────
export const AllPositions = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {[
        { position: 'top',    label: 'Top — arrow at bottom' },
        { position: 'bottom', label: 'Bottom — arrow at top' },
        { position: 'right',  label: 'Right — arrow at left' },
        { position: 'left',   label: 'Left — arrow at right' },
      ].map(({ position, label }) => (
        <div key={position}>
          <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>{label}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, alignItems: 'center' }}>
            {['lg', 'md', 'sm'].map((size) => (
              <div key={size} style={{ padding: '10px 0' }}>
                <Tooltip size={size} position={position} icon={<BoxIcon />} trailing={<BoxIcon />}>
                  Lorem ipsum dolor sit amet.
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ── Interactive (CSS hover — works in Storybook canvas) ───────────────────────
export const Interactive = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, padding: 48, alignItems: 'center', justifyContent: 'center' }}>
      {[
        { position: 'top',    label: 'Top' },
        { position: 'bottom', label: 'Bottom' },
        { position: 'right',  label: 'Right' },
        { position: 'left',   label: 'Left' },
      ].map(({ position, label }) => (
        <div key={position} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <TooltipHost>
            <button
              className="btn btn-secondary btn-md"
              aria-describedby={`tt-${position}`}
            >
              Hover — {position}
            </button>
            <Tooltip id={`tt-${position}`} position={position}>
              Tooltip appears {position}
            </Tooltip>
          </TooltipHost>
          <span style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};

// ── Full Matrix — 4 positions × 3 sizes ──────────────────────────────────────
export const FullMatrix = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, padding: 24, border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md, 6px)', background: 'var(--color-bg-2)' }}>
      {['top', 'bottom', 'right', 'left'].map((position) => (
        <div key={position}>
          <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>{position}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, alignItems: 'center' }}>
            {[
              { size: 'lg', label: 'Large · 40' },
              { size: 'md', label: 'Medium · 32' },
              { size: 'sm', label: 'Small · 24' },
            ].map(({ size, label }) => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 11, color: 'var(--color-subheading)' }}>{label}</div>
                <div style={{ padding: '10px 0' }}>
                  <Tooltip size={size} position={position} icon={<BoxIcon />} trailing={<BoxIcon />}>
                    Lorem ipsum dolor sit amet.
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
