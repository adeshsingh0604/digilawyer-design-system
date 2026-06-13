import React, { useState } from 'react';
import { Toggle } from './Toggle';

export default {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A boolean on/off control — like a checkbox, but the "on" state takes effect **immediately** (no save required).
Built on a native \`<input type="checkbox">\`; the thumb slide is pure CSS.

**DigiLawyer rule:** Use Toggle for instant settings (notifications, dark mode, auto-save).
Use Checkbox for form fields that need a submit action.

\`\`\`js
import { Toggle } from 'digilawyer-ds';

<Toggle
  checked={emailEnabled}
  onChange={e => setEmailEnabled(e.target.checked)}
>
  Email notifications
</Toggle>
\`\`\`
        `.trim(),
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'md' }, type: { summary: '"sm" | "md" | "lg"' } },
    },
    disabled:      { control: 'boolean', table: { defaultValue: { summary: 'false' }, type: { summary: 'boolean' } } },
    children:      { control: 'text' },
    checked:       { control: 'boolean', description: 'Controlled on/off state. Pair with onChange.' },
    defaultChecked:{ control: 'boolean', description: 'Uncontrolled initial state.' },
    onChange:      { action: 'changed' },
    className:     { control: false },
  },
};

/* ── Playground ── */
export const Playground = {
  parameters: {
    docs: {
      description: { story: 'Use the controls panel to try every prop interactively.' },
      source: {
        code: `const [on, setOn] = useState(false);

<Toggle
  checked={on}
  onChange={e => setOn(e.target.checked)}
>
  Email notifications
</Toggle>`,
      },
    },
  },
  args: {
    children: 'Email notifications',
    size: 'md',
    disabled: false,
    defaultChecked: false,
  },
  render: function PlaygroundStory(args) {
    const [on, setOn] = useState(args.defaultChecked);
    return (
      <Toggle
        {...args}
        checked={on}
        onChange={e => {
          setOn(e.target.checked);
          args.onChange?.(e);
        }}
      />
    );
  },
};

/* ── Sizes ── */
export const Sizes = {
  name: 'Sizes',
  parameters: {
    docs: {
      description: { story: 'Three sizes — `sm` (28×16), `md` / default (36×20), `lg` (44×24). Track height, thumb size, and slide distance all scale via CSS custom properties.' },
      source: {
        code: `<Toggle size="sm" defaultChecked>Small</Toggle>
<Toggle size="md" defaultChecked>Medium (default)</Toggle>
<Toggle size="lg" defaultChecked>Large</Toggle>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Toggle size="sm" defaultChecked>Small</Toggle>
      <Toggle size="md" defaultChecked>Medium (default)</Toggle>
      <Toggle size="lg" defaultChecked>Large</Toggle>
    </div>
  ),
};

/* ── Settings list — typical real-world usage ── */
export const SettingsList = {
  name: 'Settings List',
  parameters: {
    docs: {
      description: { story: 'Typical usage in a settings panel — each toggle controls an independent setting that takes immediate effect.' },
      source: {
        code: `const [settings, setSettings] = useState({
  email: true,
  push: false,
  autoSave: true,
  darkMode: false,
});

const toggle = key => e =>
  setSettings(prev => ({ ...prev, [key]: e.target.checked }));

<Toggle checked={settings.email}    onChange={toggle('email')}>Email notifications</Toggle>
<Toggle checked={settings.push}     onChange={toggle('push')}>Push notifications</Toggle>
<Toggle checked={settings.autoSave} onChange={toggle('autoSave')}>Auto-save drafts</Toggle>
<Toggle checked={settings.darkMode} onChange={toggle('darkMode')}>Dark mode</Toggle>`,
      },
    },
  },
  render: function SettingsListStory() {
    const [settings, setSettings] = useState({
      email: true,
      push: false,
      autoSave: true,
      darkMode: false,
    });
    const toggle = key => e =>
      setSettings(prev => ({ ...prev, [key]: e.target.checked }));
    const items = [
      { key: 'email',    label: 'Email notifications' },
      { key: 'push',     label: 'Push notifications' },
      { key: 'autoSave', label: 'Auto-save drafts' },
      { key: 'darkMode', label: 'Dark mode' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {items.map(({ key, label }) => (
          <Toggle key={key} checked={settings[key]} onChange={toggle(key)}>
            {label}
          </Toggle>
        ))}
      </div>
    );
  },
};

/* ── Disabled ── */
export const Disabled = {
  name: 'Disabled',
  parameters: {
    docs: {
      description: { story: 'Both disabled states use the same neutral grey fill per the Figma source — intentional, not a bug. The label also dims to reduced opacity.' },
      source: {
        code: `<Toggle disabled>Disabled (off)</Toggle>
<Toggle disabled defaultChecked>Disabled (on)</Toggle>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Toggle disabled>Disabled (off)</Toggle>
      <Toggle disabled defaultChecked>Disabled (on)</Toggle>
    </div>
  ),
};

/* ── Full Matrix — 3 sizes × 3 states × 2 variants ── */
const thStyle = (extra = {}) => ({
  padding: '8px 20px',
  background: 'var(--color-bg-2)',
  color: 'var(--color-subheading)',
  fontWeight: 600,
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  borderBottom: '1px solid var(--color-border)',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  ...extra,
});

const tdStyle = (extra = {}) => ({
  padding: '14px 20px',
  borderBottom: '1px solid var(--color-border)',
  verticalAlign: 'middle',
  ...extra,
});

const SIZES = ['sm', 'md', 'lg'];

export const FullMatrix = {
  name: 'Full Matrix',
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: '3 sizes × 3 states. Each cell shows Off above On. The Hover column uses the `.is-hover` CSS helper (documentation only — not needed in production).' },
      source: { code: '// Visual reference grid — see individual stories for usage code.' },
    },
  },
  render: () => (
    <table style={{ borderCollapse: 'collapse', fontSize: 13, fontFamily: 'var(--font-primary)' }}>
      <thead>
        <tr>
          <th style={thStyle({ textAlign: 'left', minWidth: 80 })}></th>
          <th style={thStyle()}>Default</th>
          <th style={thStyle()}>Hover</th>
          <th style={thStyle()}>Disabled</th>
        </tr>
      </thead>
      <tbody>
        {SIZES.map(size => (
          <tr key={size}>
            <td style={tdStyle({ color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', fontSize: 11, letterSpacing: '0.06em' })}>
              {size}
            </td>
            <td style={tdStyle()}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Toggle size={size} />
                <Toggle size={size} defaultChecked />
              </div>
            </td>
            <td style={tdStyle()}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Toggle size={size} className="is-hover" />
                <Toggle size={size} className="is-hover" defaultChecked />
              </div>
            </td>
            <td style={tdStyle()}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Toggle size={size} disabled />
                <Toggle size={size} disabled defaultChecked />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
