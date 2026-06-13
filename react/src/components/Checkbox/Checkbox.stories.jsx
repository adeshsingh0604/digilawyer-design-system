import React, { useState } from 'react';
import { useArgs } from '@storybook/preview-api';
import { Checkbox } from './Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A binary selection control with three visual states and three interaction states.
Built on a native \`<input type="checkbox">\` — fully keyboard-accessible, no ARIA needed.

**DigiLawyer rule:** Checkbox always appears left of the label. Use for multi-select;
use Radio Button for single-select; use Toggle for settings that take immediate effect.

\`\`\`js
import { Checkbox } from 'digilawyer-ds';

<Checkbox checked={agreed} onChange={e => setAgreed(e.target.checked)}>
  I agree to the terms
</Checkbox>
\`\`\`
        `.trim(),
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      table: { defaultValue: { summary: 'undefined (uncontrolled)' }, type: { summary: 'boolean' } },
    },
    defaultChecked: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' } },
    },
    indeterminate: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' } },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    children:     { control: 'text' },
    'aria-label': { control: 'text', description: 'Accessible label when no visible children label is provided. Passed as a native HTML attribute.' },
    onChange:     { action: 'changed' },
    id:           { control: false },
    className:    { control: false },
  },
};

/* ── Playground — controls panel stays in sync via useArgs ── */
export const Playground = {
  parameters: {
    docs: {
      description: { story: 'Use the controls panel to try every prop interactively. Toggling **checked** in the controls updates the checkbox immediately.' },
      source: {
        type: 'code',
        code: `<Checkbox
  checked={agreed}
  onChange={e => setAgreed(e.target.checked)}
>
  I agree to the terms
</Checkbox>`,
      },
    },
  },
  args: {
    checked:       false,
    disabled:      false,
    indeterminate: false,
    children:      'I agree to the terms',
  },
  render: function PlaygroundStory(args) {
    const [{ checked }, updateArgs] = useArgs();
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => {
          updateArgs({ checked: e.target.checked });
          args.onChange?.(e);
        }}
      />
    );
  },
};

/* ── Visual states ── */
export const VisualStates = {
  name: 'Visual States',
  parameters: {
    docs: {
      description: { story: 'Three visual states. **Unchecked** and **Checked** map to the native boolean. **Indeterminate** is set via JS (`input.indeterminate = true`) — used for "select all" parent rows with mixed children.' },
      source: {
        code: `<Checkbox>Unchecked</Checkbox>
<Checkbox defaultChecked>Checked</Checkbox>
<Checkbox indeterminate>Indeterminate</Checkbox>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Checkbox defaultChecked={false}>Unchecked</Checkbox>
      <Checkbox defaultChecked>Checked</Checkbox>
      <Checkbox indeterminate defaultChecked={false}>Indeterminate</Checkbox>
    </div>
  ),
};

/* ── Disabled states ── */
export const Disabled = {
  name: 'Disabled',
  parameters: {
    docs: {
      description: { story: 'Disabled uses `--checkbox-bg-disabled` / `--checkbox-checked-bg-disabled` tokens — distinct per state, not a blanket opacity. The label also dims to `color-subheading` at `opacity: 0.7`.' },
      source: {
        code: `<Checkbox disabled>Disabled (unchecked)</Checkbox>
<Checkbox disabled defaultChecked>Disabled (checked)</Checkbox>
<Checkbox disabled indeterminate>Disabled (indeterminate)</Checkbox>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Checkbox disabled>Disabled (unchecked)</Checkbox>
      <Checkbox disabled defaultChecked>Disabled (checked)</Checkbox>
      <Checkbox disabled indeterminate>Disabled (indeterminate)</Checkbox>
    </div>
  ),
};

/* ── Group with fieldset ── */
export const Group = {
  name: 'Group',
  parameters: {
    docs: {
      description: { story: 'Wrap related checkboxes in a `<fieldset>` + `<legend>` for an accessible group name. The "Select all" parent uses the indeterminate state when only some children are checked.' },
      source: {
        code: `const [items, setItems] = useState({ notices: true, drafts: false, signatures: true });
const allChecked = Object.values(items).every(Boolean);
const someChecked = Object.values(items).some(Boolean) && !allChecked;

<fieldset>
  <legend>Email notifications</legend>
  <Checkbox
    checked={allChecked}
    indeterminate={someChecked}
    onChange={e => setItems({ notices: e.target.checked, drafts: e.target.checked, signatures: e.target.checked })}
  >
    Select all
  </Checkbox>
  <Checkbox checked={items.notices} onChange={e => setItems(p => ({ ...p, notices: e.target.checked }))}>
    New notice filed
  </Checkbox>
  <Checkbox checked={items.drafts} onChange={e => setItems(p => ({ ...p, drafts: e.target.checked }))}>
    Draft ready for review
  </Checkbox>
  <Checkbox checked={items.signatures} onChange={e => setItems(p => ({ ...p, signatures: e.target.checked }))}>
    Signature request received
  </Checkbox>
</fieldset>`,
      },
    },
  },
  render: () => {
    const [items, setItems] = useState({
      notices: true,
      drafts: false,
      signatures: true,
    });

    const allChecked = Object.values(items).every(Boolean);
    const someChecked = Object.values(items).some(Boolean) && !allChecked;

    const toggleAll = (e) => {
      const next = e.target.checked;
      setItems({ notices: next, drafts: next, signatures: next });
    };

    const toggle = (key) => (e) =>
      setItems((prev) => ({ ...prev, [key]: e.target.checked }));

    return (
      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend style={{
          fontSize: 'var(--fs-12)',
          fontWeight: 'var(--fw-semibold)',
          color: 'var(--color-subheading)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: '10px',
        }}>
          Email notifications
        </legend>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Checkbox
            checked={allChecked}
            indeterminate={someChecked}
            onChange={toggleAll}
          >
            <strong>Select all</strong>
          </Checkbox>
          <div style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Checkbox checked={items.notices}    onChange={toggle('notices')}>New notice filed</Checkbox>
            <Checkbox checked={items.drafts}     onChange={toggle('drafts')}>Draft ready for review</Checkbox>
            <Checkbox checked={items.signatures} onChange={toggle('signatures')}>Signature request received</Checkbox>
          </div>
        </div>
      </fieldset>
    );
  },
};

/* ── Full matrix — 3 visual states × 3 interaction states ── */
const VISUAL_STATES = [
  { label: 'Unchecked',     checked: false, indeterminate: false },
  { label: 'Checked',       checked: true,  indeterminate: false },
  { label: 'Indeterminate', checked: false, indeterminate: true  },
];

const thStyle = (extra = {}) => ({
  padding: '8px 16px',
  background: 'var(--color-bg-2)',
  color: 'var(--color-subheading)',
  fontWeight: 600,
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  borderBottom: '1px solid var(--color-border)',
  whiteSpace: 'nowrap',
  textAlign: 'center',
  ...extra,
});

const tdStyle = (extra = {}) => ({
  padding: '14px 20px',
  borderBottom: '1px solid var(--color-border)',
  verticalAlign: 'middle',
  textAlign: 'center',
  ...extra,
});

export const FullMatrix = {
  name: 'Full Matrix',
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: '3 visual states × 3 interaction states. The Hover column shows how each state appears on pointer hover. Disabled applies token-based colour changes — not opacity.' },
      source: { excludeDecorators: true, code: '// Visual reference grid — see individual stories for usage code.' },
    },
  },
  render: () => (
    <table style={{ borderCollapse: 'collapse', fontSize: '13px', fontFamily: 'var(--font-primary)', width: '100%' }}>
      <thead>
        <tr>
          <th style={thStyle({ textAlign: 'left' })}>State</th>
          <th style={thStyle()}>Default</th>
          <th style={thStyle()}>Hover</th>
          <th style={thStyle()}>Disabled</th>
        </tr>
      </thead>
      <tbody>
        {VISUAL_STATES.map(({ label, checked, indeterminate }) => (
          <tr key={label}>
            <td style={tdStyle({ textAlign: 'left', color: 'var(--color-subheading)', minWidth: '120px', fontWeight: 600 })}>
              {label}
            </td>
            <td style={tdStyle()}>
              <Checkbox defaultChecked={checked} indeterminate={indeterminate} />
            </td>
            <td style={tdStyle()}>
              <_HoverCheckbox checked={checked} indeterminate={indeterminate} />
            </td>
            <td style={tdStyle()}>
              <Checkbox disabled defaultChecked={checked} indeterminate={indeterminate} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

/* Internal helper: renders a checkbox frozen in its hover visual using inline styles */
function _HoverCheckbox({ checked, indeterminate }) {
  const bg = checked || indeterminate
    ? 'var(--checkbox-checked-bg-hover)'
    : 'var(--checkbox-bg-hover)';
  const border = checked || indeterminate
    ? 'var(--checkbox-checked-border-hover)'
    : 'var(--checkbox-border-hover)';

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '16px',
      height: '16px',
      borderRadius: 'var(--radius-xs)',
      border: `1.5px solid ${border}`,
      background: bg,
      color: 'var(--checkbox-checked-glyph)',
      boxSizing: 'border-box',
      flexShrink: 0,
    }}>
      {checked && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {indeterminate && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 7H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}
