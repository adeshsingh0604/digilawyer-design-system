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

    // `title` and `children` are PropTypes.node, which react-docgen reports as
    // "node" — Storybook then picks a JSON control, so plain text cannot be
    // typed in and a string passed via URL args is rejected on type mismatch.
    // Both carry plain strings in practice, so force a text control.
    title:    { control: 'text' },
    children: { control: 'text' },

    // Real React elements. There is no useful control representation, so hide
    // them rather than leave empty-object controls that silently do nothing.
    icon:    { control: false },
    actions: { control: false },

    // Without this the Actions tab stays empty. The component fires onDismiss
    // correctly — it was simply never logged.
    onDismiss: { action: 'dismissed' },
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
  args: {
    color: 'brand',
    variant: 'semi',
    title: 'Alert title',
    // Body text moved out of the render and into args so the `children` control
    // actually drives the output. Previously it was hardcoded below, which left
    // the control visible but inert.
    children: BODY,
  },
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
      />
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

// ── Copy limits ───────────────────────────────────────────────────────────────
/**
 * What happens when copy is too long — the case that actually shows up in
 * practice, because Alert text is usually pasted in rather than written to fit.
 *
 * Title truncates at one line, body clamps at three. Both cut with an ellipsis.
 * Open the browser console on this story: Alert warns in development whenever
 * it is genuinely hiding text, so the person who pasted it finds out.
 */
export const CopyLimits = {
  parameters: {
    docs: {
      description: {
        story:
          'Titles are capped at one line and bodies at three. Overflow is hidden from the user — ' +
          'a truncated error message loses the actual reason — so treat a visible ellipsis as a ' +
          'prompt to shorten the copy, not as a working layout.',
      },
    },
  },
  render: () => (
    // `minmax(0, 1fr)` is required, not decorative: a grid item defaults to
    // min-width:auto and refuses to shrink below its content, so long copy would
    // blow straight through this 480px container and never truncate. Same root
    // cause as the .alert-title fix this story demonstrates.
    <div style={{ maxWidth: 480, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 20 }}>
      <div>
        <p style={{ font: '600 12px/1.4 monospace', opacity: 0.6, marginBottom: 8 }}>
          WITHIN LIMITS — nothing hidden
        </p>
        <Alert color="success" title="Changes saved" icon={<CheckIcon />}>
          Your profile has been updated.
        </Alert>
      </div>

      <div>
        <p style={{ font: '600 12px/1.4 monospace', opacity: 0.6, marginBottom: 8 }}>
          TITLE TOO LONG — truncates to one line
        </p>
        <Alert
          color="warning"
          title="Your subscription renewal could not be completed because the card on file has expired"
          icon={<WarnIcon />}
        >
          {BODY}
        </Alert>
      </div>

      <div>
        <p style={{ font: '600 12px/1.4 monospace', opacity: 0.6, marginBottom: 8 }}>
          BODY TOO LONG — clamps at three lines
        </p>
        <Alert color="danger" title="Payment failed" icon={<DangerIcon />}>
          We attempted to charge the card ending 4242 on three separate occasions over the past
          week and each attempt was declined by your issuing bank. Please update your payment
          details to avoid any interruption to your service. If you believe this is an error,
          contact your bank or reach out to our support team for assistance.
        </Alert>
      </div>
    </div>
  ),
};
