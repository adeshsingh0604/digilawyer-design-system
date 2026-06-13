import React from 'react';
import { Textarea } from './Textarea';

/* 24×24 viewBox — CSS forces size to 24px (lg) or 16px (md/sm) via
   .textarea-trailing svg and .textarea-lg .textarea-trailing svg rules. */
const ExpandIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AttachIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M21 10.5l-9.5 9.5a6 6 0 01-8.5-8.5l9.5-9.5a4 4 0 015.66 5.66l-9.5 9.5a2 2 0 01-2.83-2.83l8.5-8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Multi-line text input with label, optional trailing icon, and helper caption.
Shares the \`.input-field\` wrapper with Input. Three sizes (lg / md / sm).

Resizes vertically by default. Pass \`style={{ resize: 'none' }}\` to lock height.
Hover / Focus / Filled states are CSS-driven — no class needed in production.

\`\`\`js
import { Textarea } from 'digilawyer-ds';

<Textarea
  label="Description"
  placeholder="Describe the issue..."
  caption="Up to 500 characters"
  rows={4}
/>
\`\`\`
        `.trim(),
      },
    },
  },
  argTypes: {
    label:   { control: 'text' },
    caption: { control: 'text' },
    status: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'error'],
      table: { defaultValue: { summary: 'default' }, type: { summary: '"default" | "success" | "warning" | "error"' } },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'md' }, type: { summary: '"sm" | "md" | "lg"' } },
    },
    disabled:     { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    placeholder:  { control: 'text' },
    rows:         { control: 'number', description: 'Native textarea rows attribute.' },
    trailingIcon: { control: false },
    className:    { control: false },
    id:           { control: false },
  },
};

/* ── Playground ── */
export const Playground = {
  parameters: {
    docs: {
      description: { story: 'Use the controls panel to try every prop interactively.' },
      source: {
        code: `<Textarea
  label="Description"
  placeholder="Describe the issue in detail..."
  caption="Up to 500 characters"
  rows={4}
/>`,
      },
    },
  },
  args: {
    label: 'Description',
    placeholder: 'Describe the issue in detail...',
    caption: 'Up to 500 characters',
    status: 'default',
    size: 'md',
    disabled: false,
    rows: 4,
  },
};

/* ── With trailing icon ── */
export const WithTrailingIcon = {
  name: 'With Trailing Icon',
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: 'The trailing icon is top-aligned in the shell. Use for helper affordances like expand, attach, or format.' },
      source: {
        code: `<Textarea
  label="Case notes"
  placeholder="Add your notes here..."
  caption="Visible to all team members"
  trailingIcon={<ExpandIcon />}
  rows={4}
/>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 360 }}>
      <Textarea
        label="Case notes"
        placeholder="Add your notes here..."
        caption="Visible to all team members"
        trailingIcon={<ExpandIcon />}
        rows={4}
      />
      <Textarea
        label="Attachments"
        placeholder="Paste or drag content here..."
        trailingIcon={<AttachIcon />}
        rows={3}
      />
    </div>
  ),
};

/* ── Sizes ── */
export const Sizes = {
  name: 'Sizes',
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: 'Three sizes — `lg` / `md` (default) / `sm`. Typography and trailing icon scale with the size. All start at the minimum shell height but grow with user input.' },
      source: {
        code: `<Textarea label="Large"            size="lg" placeholder="Placeholder" trailingIcon={<ExpandIcon />} />
<Textarea label="Medium (default)" size="md" placeholder="Placeholder" trailingIcon={<ExpandIcon />} />
<Textarea label="Small"            size="sm" placeholder="Placeholder" trailingIcon={<ExpandIcon />} />`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 360 }}>
      <Textarea label="Large"            size="lg" placeholder="Placeholder" trailingIcon={<ExpandIcon />} />
      <Textarea label="Medium (default)" size="md" placeholder="Placeholder" trailingIcon={<ExpandIcon />} />
      <Textarea label="Small"            size="sm" placeholder="Placeholder" trailingIcon={<ExpandIcon />} />
    </div>
  ),
};

/* ── Status states ── */
export const StatusStates = {
  name: 'Status States',
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: 'Status changes caption colour only — the field chrome stays neutral. Pair the error state with `aria-invalid="true"` and a descriptive caption.' },
      source: {
        code: `<Textarea label="Default"  caption="Helper text" />
<Textarea label="Success"  caption="Content looks good" status="success" />
<Textarea label="Warning"  caption="You are near the character limit" status="warning" />
<Textarea label="Error"    caption="This field is required" status="error" aria-invalid="true" />`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 360 }}>
      <Textarea label="Default"  placeholder="Placeholder" caption="Helper text" rows={3} />
      <Textarea label="Success"  placeholder="Placeholder" caption="Content looks good" status="success" rows={3} />
      <Textarea label="Warning"  placeholder="Placeholder" caption="You are near the character limit" status="warning" rows={3} />
      <Textarea label="Error"    placeholder="Placeholder" caption="This field is required" status="error" aria-invalid="true" rows={3} />
    </div>
  ),
};

/* ── Disabled ── */
export const Disabled = {
  name: 'Disabled',
  parameters: {
    docs: {
      description: { story: 'Pass `disabled` — the shell adapts via `:has(textarea:disabled)`. The resize handle is also removed in this state.' },
      source: {
        code: `<Textarea label="Disabled (empty)"  placeholder="Placeholder" disabled />
<Textarea label="Disabled (filled)" defaultValue="Existing content" disabled />`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 360 }}>
      <Textarea label="Disabled (empty)"  placeholder="Placeholder" caption="Caption" disabled rows={3} />
      <Textarea label="Disabled (filled)" defaultValue="Existing content that can't be edited." caption="Caption" disabled rows={3} />
    </div>
  ),
};

/* ── Full Matrix — 3 sizes × 8 states ── */
const STATES = [
  { label: 'Default',  shellClass: '',          wrapperStatus: 'default',  extra: {} },
  { label: 'Hover',    shellClass: 'is-hover',  wrapperStatus: 'default',  extra: {} },
  { label: 'Focus',    shellClass: 'is-focus',  wrapperStatus: 'default',  extra: {} },
  { label: 'Filled',   shellClass: 'is-filled', wrapperStatus: 'default',  extra: { defaultValue: 'User content' } },
  { label: 'Success',  shellClass: '',          wrapperStatus: 'success',  extra: {} },
  { label: 'Warning',  shellClass: '',          wrapperStatus: 'warning',  extra: {} },
  { label: 'Error',    shellClass: '',          wrapperStatus: 'error',    extra: {} },
  { label: 'Disabled', shellClass: '',          wrapperStatus: 'default',  extra: { disabled: true } },
];

const SIZES = ['lg', 'md', 'sm'];

export const FullMatrix = {
  name: 'Full Matrix',
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: '3 sizes × 8 states. Hover / Focus / Filled columns use `.is-hover` / `.is-focus` / `.is-filled` CSS helpers for documentation — not needed in production.' },
      source: { code: '// Visual reference grid — see individual stories for usage code.' },
    },
  },
  render: () => (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', fontSize: 13, fontFamily: 'var(--font-primary)', minWidth: 800 }}>
        <thead>
          <tr>
            <th style={{ padding: '8px 16px', background: 'var(--color-bg-2)', color: 'var(--color-subheading)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid var(--color-border)', minWidth: 80 }}>State</th>
            {SIZES.map(s => (
              <th key={s} style={{ padding: '8px 16px', background: 'var(--color-bg-2)', color: 'var(--color-subheading)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid var(--color-border)', minWidth: 280, textAlign: 'left' }}>
                {s.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {STATES.map(({ label, shellClass, wrapperStatus, extra }) => {
            const wrapCls = ['input-field', wrapperStatus === 'success' && 'input-field-success', wrapperStatus === 'warning' && 'input-field-warning', wrapperStatus === 'error' && 'input-field-error'].filter(Boolean).join(' ');
            return (
              <tr key={label}>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)', color: 'var(--color-subheading)', fontWeight: 600, verticalAlign: 'top' }}>{label}</td>
                {SIZES.map(size => {
                  const shellCls = ['textarea', size === 'lg' && 'textarea-lg', size === 'sm' && 'textarea-sm', shellClass].filter(Boolean).join(' ');
                  return (
                    <td key={size} style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)', verticalAlign: 'top' }}>
                      <div className={wrapCls} style={{ width: 260 }}>
                        <label className="input-field-label">Label</label>
                        <div className={shellCls}>
                          <textarea placeholder="Placeholder" {...extra} />
                          <span className="textarea-trailing">
                            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.5" />
                              <path d="M8.5 12h7M12 8.5v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </span>
                        </div>
                        {['success', 'warning', 'error'].includes(wrapperStatus) && <p className="input-field-caption">Caption</p>}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ),
};
