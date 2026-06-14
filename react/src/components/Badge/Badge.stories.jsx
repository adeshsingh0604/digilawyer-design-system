import React from 'react';
import { Badge, BadgePin } from './Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['dot', 'label', 'verify'] },
    color:   { control: 'select', options: ['brand', 'info', 'danger', 'success', 'warning', 'notice', 'alert'] },
    size:    { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

// ── Playground ──────────────────────────────────────────────────────────────
export const Playground = {
  args: {
    variant:    'dot',
    color:      'brand',
    size:       'md',
    'aria-label': 'Active',
  },
  render: (args) => <Badge {...args} />,
};

// ── Default ──────────────────────────────────────────────────────────────────
export const Default = {
  render: () => (
    <Badge variant="dot" color="brand" aria-label="Active" />
  ),
};

// ── All Variants ─────────────────────────────────────────────────────────────
export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <Badge variant="dot"    color="danger" aria-label="Unread" />
        <span style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600 }}>Dot</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <Badge variant="label" color="danger">9</Badge>
        <span style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600 }}>Label · 1d</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <Badge variant="label" color="danger">99</Badge>
        <span style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600 }}>Label · 2d</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <Badge variant="label" color="danger">999</Badge>
        <span style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600 }}>Label · 3d</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <Badge variant="label" color="danger">9999</Badge>
        <span style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600 }}>Label · 4d</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <Badge variant="verify" color="info" aria-label="Verified" />
        <span style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600 }}>Verify</span>
      </div>
    </div>
  ),
};

// ── All Colors ────────────────────────────────────────────────────────────────
const COLORS = ['brand', 'info', 'success', 'warning', 'danger', 'notice', 'alert'];

export const AllColors = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      {COLORS.map((color) => (
        <div key={color} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <Badge variant="dot" size="lg" color={color} aria-label={color} />
          <span style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'capitalize' }}>{color}</span>
        </div>
      ))}
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────
export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Dot & Verify */}
      <div>
        <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
          Dot &amp; Verify
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end' }}>
          {[['sm', '4px'], ['md', '8px'], ['lg', '12px']].map(([size, label]) => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <Badge variant="dot" color="success" size={size} aria-label="Online" />
              <span style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600 }}>{size} · {label}</span>
            </div>
          ))}
          {[['sm', '4'], ['md', '8'], ['lg', '12']].map(([size, label]) => (
            <div key={`v${size}`} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <Badge variant="verify" color="info" size={size} aria-label="Verified" />
              <span style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600 }}>verify · {label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Label sizes */}
      <div>
        <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
          Label — 3 heights × 4 digit-count widths
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '64px repeat(4, 64px)', gap: '12px 16px', alignItems: 'center' }}>
          <div />
          {['1 digit', '2 digits', '3 digits', '4 digits'].map((h) => (
            <div key={h} style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textAlign: 'center' }}>{h}</div>
          ))}
          {[['sm', '12', ['9', '9+', '99+', '999+']], ['md', '16', ['9', '99', '999', '9999']], ['lg', '20', ['9', '99', '999', '9999']]].map(([size, height, counts]) => (
            <React.Fragment key={size}>
              <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600 }}>{size} · {height}</div>
              {counts.map((c) => (
                <div key={c} style={{ display: 'flex', justifyContent: 'center' }}>
                  <Badge variant="label" color="danger" size={size}>{c}</Badge>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  ),
};

// ── Composition (BadgePin) ────────────────────────────────────────────────────
const HostBox = ({ circle = false, children }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: 40, height: 40,
    borderRadius: circle ? '999px' : 'var(--radius-md, 6px)',
    background: 'var(--color-bg-2)',
    color: 'var(--color-subheading)',
    fontSize: 11, fontWeight: 600,
  }}>
    {children}
  </div>
);

export const Composition = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <BadgePin>
          <HostBox>Inbox</HostBox>
          <Badge variant="label" color="danger">3</Badge>
        </BadgePin>
        <span style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600 }}>Label on host</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <BadgePin>
          <HostBox circle>AS</HostBox>
          <Badge variant="dot" color="success" aria-label="Online" />
        </BadgePin>
        <span style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600 }}>Online status</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <BadgePin>
          <HostBox circle>JD</HostBox>
          <Badge variant="verify" color="info" aria-label="Verified" />
        </BadgePin>
        <span style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600 }}>Verified avatar</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <BadgePin>
          <HostBox>Nav</HostBox>
          <Badge variant="dot" color="danger" aria-label="Unread" />
        </BadgePin>
        <span style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600 }}>Unread on nav</span>
      </div>
    </div>
  ),
};

// ── Full Matrix ───────────────────────────────────────────────────────────────
export const FullMatrix = {
  render: () => {
    const labelCounts = ['9', '99', '999', '9999'];
    const headerStyle = { fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.06em' };
    const rowLabelStyle = { fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600 };
    const cellStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center' };

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '90px repeat(7, 1fr)',
        gap: '12px 16px',
        alignItems: 'center',
        padding: 24,
        border: '1px dashed var(--color-border)',
        borderRadius: 'var(--radius-md, 6px)',
        background: 'var(--color-bg-2)',
      }}>
        <div />
        {COLORS.map((c) => <div key={c} style={headerStyle}>{c.charAt(0).toUpperCase() + c.slice(1)}</div>)}

        {/* Dot rows */}
        {[['sm', 'Dot · 4px'], ['md', 'Dot · 8px'], ['lg', 'Dot · 12px']].map(([size, label]) => (
          <React.Fragment key={size}>
            <div style={rowLabelStyle}>{label}</div>
            {COLORS.map((color) => (
              <div key={color} style={cellStyle}>
                <Badge variant="dot" size={size} color={color} aria-label={color} />
              </div>
            ))}
          </React.Fragment>
        ))}

        {/* Label rows — 4 digit counts at md */}
        {labelCounts.map((count, i) => (
          <React.Fragment key={count}>
            <div style={rowLabelStyle}>Label · {i + 1}d</div>
            {COLORS.map((color) => (
              <div key={color} style={cellStyle}>
                <Badge variant="label" color={color}>{count}</Badge>
              </div>
            ))}
          </React.Fragment>
        ))}

        {/* Verify row */}
        <div style={rowLabelStyle}>Verify · 8px</div>
        {COLORS.map((color) => (
          <div key={color} style={cellStyle}>
            <Badge variant="verify" color={color} aria-label="Verified" />
          </div>
        ))}
      </div>
    );
  },
};
