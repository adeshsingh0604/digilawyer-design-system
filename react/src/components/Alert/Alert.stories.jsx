import React, { useState } from 'react';
import { Alert, AlertBtnPrimary, AlertBtnSecondary } from './Alert';

export default {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    color:   { control: 'select', options: ['brand', 'info', 'danger', 'success', 'warning', 'notice', 'alert'] },
    variant: { control: 'select', options: ['semi', 'filled', 'border'] },
  },
};

// ── Shared icon helpers ───────────────────────────────────────────────────────
const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 6v4M10 13h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6.5 10l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WarnIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 3L18 17H2L10 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M10 8v4M10 14.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const DangerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ICON_MAP = {
  brand:   <InfoIcon />,
  info:    <InfoIcon />,
  danger:  <DangerIcon />,
  success: <CheckIcon />,
  warning: <WarnIcon />,
  notice:  <InfoIcon />,
  alert:   <WarnIcon />,
};

const BODY = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground = {
  args: { color: 'info', variant: 'semi', title: 'Alert title' },
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <Alert
        {...args}
        icon={<InfoIcon />}
        actions={
          <>
            <AlertBtnPrimary>Button</AlertBtnPrimary>
            <AlertBtnSecondary>Button</AlertBtnSecondary>
          </>
        }
      >
        {BODY}
      </Alert>
    </div>
  ),
};

// ── Default ───────────────────────────────────────────────────────────────────
export const Default = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Alert
        color="brand"
        title="Title"
        icon={<InfoIcon />}
        actions={
          <>
            <AlertBtnPrimary>Button</AlertBtnPrimary>
            <AlertBtnSecondary>Button</AlertBtnSecondary>
          </>
        }
      >
        {BODY}
      </Alert>
    </div>
  ),
};

// ── All Variants ──────────────────────────────────────────────────────────────
export const AllVariants = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
      {[
        { variant: 'semi',   label: 'Semi-filled (default)' },
        { variant: 'filled', label: 'Filled' },
        { variant: 'border', label: 'Border' },
      ].map(({ variant, label }) => (
        <div key={variant}>
          <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{label}</div>
          <Alert
            color="info"
            variant={variant}
            title="Title"
            icon={<InfoIcon />}
            actions={
              <>
                <AlertBtnPrimary>Button</AlertBtnPrimary>
                <AlertBtnSecondary>Button</AlertBtnSecondary>
              </>
            }
          >
            {BODY}
          </Alert>
        </div>
      ))}
    </div>
  ),
};

// ── All Colors ────────────────────────────────────────────────────────────────
const COLORS = [
  { color: 'brand',   label: 'Brand' },
  { color: 'info',    label: 'Info' },
  { color: 'danger',  label: 'Danger' },
  { color: 'success', label: 'Success' },
  { color: 'warning', label: 'Warning' },
  { color: 'notice',  label: 'Notice' },
  { color: 'alert',   label: 'Alert (orange)' },
];

export const AllColors = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 560 }}>
      {COLORS.map(({ color, label }) => (
        <Alert
          key={color}
          color={color}
          title={label}
          icon={ICON_MAP[color]}
          actions={
            <>
              <AlertBtnPrimary>Button</AlertBtnPrimary>
              <AlertBtnSecondary>Button</AlertBtnSecondary>
            </>
          }
        >
          {BODY}
        </Alert>
      ))}
    </div>
  ),
};

// ── With Dismiss (interactive) ────────────────────────────────────────────────
export const WithDismiss = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <div style={{ maxWidth: 480 }}>
        {visible ? (
          <Alert
            color="warning"
            title="Action required"
            icon={<WarnIcon />}
            onDismiss={() => setVisible(false)}
            actions={<AlertBtnPrimary>Review now</AlertBtnPrimary>}
          >
            Your session will expire in 10 minutes. Save your work to avoid losing changes.
          </Alert>
        ) : (
          <div style={{ padding: 16, fontSize: 13, color: 'var(--color-subheading)' }}>
            Alert dismissed —{' '}
            <button style={{ all: 'unset', cursor: 'pointer', color: 'var(--color-link)' }} onClick={() => setVisible(true)}>
              show again
            </button>
          </div>
        )}
      </div>
    );
  },
};

// ── Minimal (title + body only) ───────────────────────────────────────────────
export const Minimal = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
      <Alert color="success" title="Changes saved" icon={<CheckIcon />}>
        Your profile has been updated successfully.
      </Alert>
      <Alert color="danger" title="Payment failed" icon={<DangerIcon />}>
        We couldn't charge your card. Please update your billing details.
      </Alert>
    </div>
  ),
};

// ── Full Matrix ───────────────────────────────────────────────────────────────
export const FullMatrix = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, padding: 24, border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md, 6px)', background: 'var(--color-bg-2)' }}>
      {[
        { variant: 'semi',   label: 'Semi-filled' },
        { variant: 'filled', label: 'Filled' },
        { variant: 'border', label: 'Border' },
      ].map(({ variant, label }) => (
        <div key={variant}>
          <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>{label}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {COLORS.map(({ color, label: colorLabel }) => (
              <div key={color}>
                <div style={{ fontSize: 11, color: 'var(--color-subheading)', marginBottom: 6 }}>{colorLabel}</div>
                <Alert
                  color={color}
                  variant={variant}
                  title="Title"
                  icon={ICON_MAP[color]}
                  actions={
                    <>
                      <AlertBtnPrimary>Button</AlertBtnPrimary>
                      <AlertBtnSecondary>Button</AlertBtnSecondary>
                    </>
                  }
                >
                  {BODY}
                </Alert>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
