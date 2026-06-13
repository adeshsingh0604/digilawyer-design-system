import React, { useState } from 'react';
import { Radio } from './Radio';

export default {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A single-selection control from a mutually exclusive set.
Built on a native \`<input type="radio">\` — the browser enforces one-of-N semantics via the shared \`name\` attribute. No JS needed for state.

**DigiLawyer rule:** Always group radios with a shared \`name\` and wrap in a \`<fieldset>\` + \`<legend>\` for an accessible group name.
Use for 2–6 mutually exclusive options; use Dropdown for 7+.

\`\`\`js
import { Radio } from 'digilawyer-ds';

<fieldset>
  <legend>Plan</legend>
  <Radio name="plan" value="free" defaultChecked>Free</Radio>
  <Radio name="plan" value="team">Team</Radio>
  <Radio name="plan" value="enterprise">Enterprise</Radio>
</fieldset>
\`\`\`
        `.trim(),
      },
    },
  },
  argTypes: {
    disabled:      { control: 'boolean', table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' } } },
    children:      { control: 'text' },
    name:          { control: 'text', description: 'Groups radios — all with the same name form a single-select set. Native HTML attribute.' },
    value:         { control: 'text', description: 'Value submitted with the form. Native HTML attribute.' },
    checked:       { control: 'boolean', description: 'Controlled checked state. Pair with onChange. Native HTML attribute.' },
    defaultChecked:{ control: 'boolean', description: 'Uncontrolled initial checked state. Native HTML attribute.' },
    onChange:      { action: 'changed' },
    className:     { control: false },
  },
};

/* ── Playground ── */
export const Playground = {
  parameters: {
    docs: {
      description: { story: 'Use the controls panel to try props interactively. In production, always use Radio inside a group with a shared `name`.' },
      source: {
        code: `<Radio name="plan" value="free" defaultChecked>
  Free — 1 user, basic features
</Radio>`,
      },
    },
  },
  args: {
    children: 'Free — 1 user, basic features',
    disabled: false,
    name: 'playground',
    defaultChecked: true,
  },
};

/* ── Group — the standard usage pattern ── */
export const Group = {
  name: 'Group',
  parameters: {
    docs: {
      description: { story: 'The standard usage: wrap related radios in a `<fieldset>` + `<legend>`. The browser enforces single-selection via the shared `name` attribute — no JS needed.' },
      source: {
        code: `const [plan, setPlan] = useState('free');

<fieldset>
  <legend>Select a plan</legend>
  <Radio
    name="plan"
    value="free"
    checked={plan === 'free'}
    onChange={() => setPlan('free')}
  >
    Free — 1 user, basic features
  </Radio>
  <Radio
    name="plan"
    value="team"
    checked={plan === 'team'}
    onChange={() => setPlan('team')}
  >
    Team — 10 users, advanced features
  </Radio>
  <Radio
    name="plan"
    value="enterprise"
    checked={plan === 'enterprise'}
    onChange={() => setPlan('enterprise')}
  >
    Enterprise — unlimited, SSO, audit log
  </Radio>
</fieldset>`,
      },
    },
  },
  render: function GroupStory() {
    const [plan, setPlan] = useState('free');
    const options = [
      { value: 'free',       label: 'Free — 1 user, basic features' },
      { value: 'team',       label: 'Team — 10 users, advanced features' },
      { value: 'enterprise', label: 'Enterprise — unlimited, SSO, audit log' },
    ];
    return (
      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend style={{
          fontSize: 'var(--fs-12)',
          fontWeight: 'var(--fw-semibold)',
          color: 'var(--color-subheading)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          marginBottom: 10,
        }}>
          Select a plan
        </legend>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {options.map(({ value, label }) => (
            <Radio
              key={value}
              name="plan-group"
              value={value}
              checked={plan === value}
              onChange={() => setPlan(value)}
            >
              {label}
            </Radio>
          ))}
        </div>
      </fieldset>
    );
  },
};

/* ── States ── */
export const States = {
  name: 'States',
  parameters: {
    docs: {
      description: { story: 'Two visual states × three interaction states. The Hover visual requires real pointer interaction; Disabled uses the HTML `disabled` attribute.' },
      source: {
        code: `<Radio name="s1" defaultChecked>Default (selected)</Radio>
<Radio name="s2">Default (unselected)</Radio>
<Radio name="s3" defaultChecked disabled>Disabled (selected)</Radio>
<Radio name="s4" disabled>Disabled (unselected)</Radio>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Radio name="s1" defaultChecked>Default (selected)</Radio>
      <Radio name="s2">Default (unselected)</Radio>
      <Radio name="s3" defaultChecked disabled>Disabled (selected)</Radio>
      <Radio name="s4" disabled>Disabled (unselected)</Radio>
    </div>
  ),
};

/* ── Disabled ── */
export const Disabled = {
  name: 'Disabled',
  parameters: {
    docs: {
      description: { story: 'Disabled uses `--radio-bg-disabled` / `--radio-checked-bg-disabled` tokens. The label also dims to reduced opacity. Disable individual radios or the entire group.' },
      source: {
        code: `{/* Partial — one option unavailable */}
<Radio name="p1" defaultChecked disabled>Option A (unavailable)</Radio>
<Radio name="p1">Option B</Radio>
<Radio name="p1">Option C</Radio>

{/* Full group disabled */}
<Radio name="p2" defaultChecked disabled>Option A</Radio>
<Radio name="p2" disabled>Option B</Radio>
<Radio name="p2" disabled>Option C</Radio>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ fontSize: 12, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Partial</span>
        <Radio name="p1" defaultChecked disabled>Option A (unavailable)</Radio>
        <Radio name="p1">Option B</Radio>
        <Radio name="p1">Option C</Radio>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ fontSize: 12, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>All disabled</span>
        <Radio name="p2" defaultChecked disabled>Option A</Radio>
        <Radio name="p2" disabled>Option B</Radio>
        <Radio name="p2" disabled>Option C</Radio>
      </div>
    </div>
  ),
};

/* ── Full Matrix — 2 variants × 3 states ── */
const thStyle = (extra = {}) => ({
  padding: '8px 16px',
  background: 'var(--color-bg-2)',
  color: 'var(--color-subheading)',
  fontWeight: 600,
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  borderBottom: '1px solid var(--color-border)',
  textAlign: 'center',
  ...extra,
});

const tdStyle = (extra = {}) => ({
  padding: '14px 24px',
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
      description: { story: '2 variants × 3 states. The Hover column forces the hover visual using the `.is-hover` CSS helper (for documentation only — not needed in production).' },
      source: { code: '// Visual reference grid — see individual stories for usage code.' },
    },
  },
  render: () => (
    <table style={{ borderCollapse: 'collapse', fontSize: 13, fontFamily: 'var(--font-primary)' }}>
      <thead>
        <tr>
          <th style={thStyle({ textAlign: 'left', minWidth: 120 })}></th>
          <th style={thStyle()}>Default</th>
          <th style={thStyle()}>Hover</th>
          <th style={thStyle()}>Disabled</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={tdStyle({ textAlign: 'left', color: 'var(--color-subheading)', fontWeight: 600 })}>Unselected</td>
          <td style={tdStyle()}><Radio name="m-u-d" /></td>
          <td style={tdStyle()}><Radio name="m-u-h" className="is-hover" /></td>
          <td style={tdStyle()}><Radio name="m-u-x" disabled /></td>
        </tr>
        <tr>
          <td style={tdStyle({ textAlign: 'left', color: 'var(--color-subheading)', fontWeight: 600 })}>Selected</td>
          <td style={tdStyle()}><Radio name="m-s-d" defaultChecked /></td>
          <td style={tdStyle()}><Radio name="m-s-h" defaultChecked className="is-hover" /></td>
          <td style={tdStyle()}><Radio name="m-s-x" defaultChecked disabled /></td>
        </tr>
      </tbody>
    </table>
  ),
};
