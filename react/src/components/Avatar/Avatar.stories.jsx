import React from 'react';
import { Avatar, AvatarStack, AvatarStatus } from './Avatar';
import { Badge } from '../Badge/Badge';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['icon', 'initials', 'image'] },
    size:    { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
  },
};

const SAMPLE_SRC = 'https://i.pravatar.cc/150?img=3';

// ── Playground ───────────────────────────────────────────────────────────────
export const Playground = {
  args: { variant: 'initials', size: 'md' },
  render: (args) => <Avatar {...args}>AD</Avatar>,
};

// ── Default ───────────────────────────────────────────────────────────────────
export const Default = {
  render: () => <Avatar variant="initials" aria-label="A (sample user)">A</Avatar>,
};

// ── All Variants ──────────────────────────────────────────────────────────────
export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      {[
        { variant: 'icon',     label: 'Icon',     node: null },
        { variant: 'initials', label: 'Initials', node: 'AD' },
        { variant: 'image',    label: 'Image',    node: null },
      ].map(({ variant, label, node }) => (
        <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <Avatar
            variant={variant}
            size="lg"
            src={variant === 'image' ? SAMPLE_SRC : undefined}
            alt={variant === 'image' ? 'Sample user' : undefined}
            aria-label={variant !== 'image' ? label : undefined}
          >
            {node}
          </Avatar>
          <span style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600 }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};

// ── All Sizes ─────────────────────────────────────────────────────────────────
const SIZES = [
  { size: 'lg', label: 'lg · 48' },
  { size: 'md', label: 'md · 40' },
  { size: 'sm', label: 'sm · 32' },
  { size: 'xs', label: 'xs · 24' },
];

export const AllSizes = {
  render: () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '90px repeat(3, 1fr)',
      gap: '20px 16px',
      alignItems: 'center',
    }}>
      <div />
      {['Icon', 'Initials', 'Image'].map((h) => (
        <div key={h} style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'center' }}>{h}</div>
      ))}

      {SIZES.map(({ size, label }) => (
        <React.Fragment key={size}>
          <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600 }}>{label}</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar variant="icon" size={size} aria-label="Unknown user" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar variant="initials" size={size} aria-label="AD (Adesh Singh)">{size === 'xs' ? 'A' : 'AD'}</Avatar>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar variant="image" size={size} src={SAMPLE_SRC} alt="Sample user" />
          </div>
        </React.Fragment>
      ))}
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────
export const States = {
  render: () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '90px repeat(3, 1fr)',
      gap: '20px 16px',
      alignItems: 'center',
    }}>
      <div />
      {['Icon', 'Initials', 'Image'].map((h) => (
        <div key={h} style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'center' }}>{h}</div>
      ))}

      <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600 }}>Default</div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><Avatar variant="icon" size="lg" aria-label="Unknown user" /></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><Avatar variant="initials" size="lg" aria-label="AD">AD</Avatar></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><Avatar variant="image" size="lg" src={SAMPLE_SRC} alt="Sample user" /></div>

      <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600 }}>Hover</div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><Avatar variant="icon" size="lg" className="is-hover" aria-label="Unknown user" /></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><Avatar variant="initials" size="lg" className="is-hover" aria-label="AD">AD</Avatar></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}><Avatar variant="image" size="lg" className="is-hover" src={SAMPLE_SRC} alt="Sample user" /></div>
    </div>
  ),
};

// ── Composition ───────────────────────────────────────────────────────────────
const STATUS_OPTIONS = ['online', 'busy', 'away', 'offline'];

export const Composition = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end', flexWrap: 'wrap' }}>
      {/* Count badge + online */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <AvatarStack size="lg">
          <Avatar variant="icon" size="lg" aria-label="Unknown user" />
          <Badge variant="label" color="danger" className="avatar-pin-tr">9</Badge>
          <AvatarStatus status="online" pin="br" aria-label="Online" />
        </AvatarStack>
        <span style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600 }}>Count + online</span>
      </div>

      {/* Count badge + busy */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <AvatarStack size="lg">
          <Avatar variant="initials" size="lg" aria-label="AD (Adesh Singh)">AD</Avatar>
          <Badge variant="label" color="danger" className="avatar-pin-tr">12</Badge>
          <AvatarStatus status="busy" pin="br" aria-label="Busy" />
        </AvatarStack>
        <span style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600 }}>Count + busy</span>
      </div>

      {/* Image + away — status only */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <AvatarStack size="lg">
          <Avatar variant="image" size="lg" src={SAMPLE_SRC} alt="Sample user" />
          <AvatarStatus status="away" pin="br" aria-label="Away" />
        </AvatarStack>
        <span style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600 }}>Status only</span>
      </div>

      {/* Dot badge (md) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <AvatarStack>
          <Avatar variant="icon" aria-label="Unknown user" />
          <Badge variant="dot" color="danger" className="avatar-pin-tr" aria-label="Unread" />
        </AvatarStack>
        <span style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600 }}>Dot badge</span>
      </div>

      {/* All statuses */}
      {STATUS_OPTIONS.map((status) => (
        <div key={status} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
          <AvatarStack>
            <Avatar variant="initials" aria-label="AD">AD</Avatar>
            <AvatarStatus status={status} pin="br" aria-label={status.charAt(0).toUpperCase() + status.slice(1)} />
          </AvatarStack>
          <span style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'capitalize' }}>{status}</span>
        </div>
      ))}
    </div>
  ),
};

// ── Full Matrix ───────────────────────────────────────────────────────────────
export const FullMatrix = {
  render: () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '90px repeat(4, 1fr)',
      gap: '16px 12px',
      alignItems: 'center',
      justifyItems: 'center',
      padding: 24,
      border: '1px dashed var(--color-border)',
      borderRadius: 'var(--radius-md, 6px)',
      background: 'var(--color-bg-2)',
    }}>
      <div />
      {['lg · 48', 'md · 40', 'sm · 32', 'xs · 24'].map((h) => (
        <div key={h} style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</div>
      ))}

      {[
        { variant: 'icon',     label: 'Icon',     src: undefined, children: null },
        { variant: 'initials', label: 'Initials', src: undefined, children: 'AD' },
        { variant: 'image',    label: 'Image',    src: SAMPLE_SRC, children: null },
      ].map(({ variant, label, src, children }) => (
        <React.Fragment key={variant}>
          <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, justifySelf: 'start' }}>{label}</div>
          {['lg', 'md', 'sm', 'xs'].map((size) => (
            <Avatar
              key={size}
              variant={variant}
              size={size}
              src={src}
              alt={variant === 'image' ? 'Sample user' : undefined}
              aria-label={variant !== 'image' ? label : undefined}
            >
              {variant === 'initials' ? (size === 'xs' ? 'A' : children) : null}
            </Avatar>
          ))}
        </React.Fragment>
      ))}
    </div>
  ),
};
