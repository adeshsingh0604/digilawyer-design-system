import React, { useRef, useState } from 'react';
import { Input } from './Input';

/* ── Inline SVG icons — all 24×24 viewBox for consistent visual weight ── */
const SearchIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const EyeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const CalendarIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AddIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8.5 12h7M12 8.5v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const TagXIcon = ({ size = 10 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ── Story metadata ───────────────────────────────────────────────── */
export default {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Single-line text input with label, optional leading/trailing icon slots, and helper caption.
Three sizes (lg 48 / md 40 / sm 32), four status states, and **three variants**:

- **Default** — standard single-line text entry
- **Tags** — \`.input.input-tags\` shell; hosts \`.tag\` chips inline with the editable cursor
- **OTP** — \`.input-otp\` wrapper; a row of single-character cells for verification codes

Hover / Focus / Filled states are CSS-driven — no class needed. Status changes the caption colour only.

\`\`\`js
import { Input } from 'digilawyer-ds';

<Input
  label="Email address"
  placeholder="you@example.com"
  type="email"
  caption="We'll never share your email."
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
    placeholder:  { control: 'text', description: 'Native input placeholder. Never use as the sole label.' },
    type:         { control: 'text', description: 'Native input type (text, email, password, number…).' },
    leadingIcon:  { control: false },
    trailingIcon: { control: false },
    className:    { control: false },
    id:           { control: false },
  },
};

/* ── Playground ───────────────────────────────────────────────────── */
export const Playground = {
  parameters: {
    docs: {
      description: { story: 'Use the controls panel to try every prop interactively.' },
      source: {
        code: `<Input
  label="Full name"
  placeholder="Jane Smith"
  caption="As it appears on your ID"
  status="default"
  size="md"
/>`,
      },
    },
  },
  args: {
    label: 'Full name',
    placeholder: 'Jane Smith',
    caption: 'As it appears on your ID',
    status: 'default',
    size: 'md',
    disabled: false,
    type: 'text',
  },
};

/* ── With Icons ───────────────────────────────────────────────────── */
export const WithIcons = {
  name: 'With Icons',
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: 'Pass any SVG node to `leadingIcon` or `trailingIcon`. Icons scale automatically with the field size — 24px for lg/md, 16px for sm.' },
      source: {
        code: `<Input
  label="Search"
  placeholder="Search notices..."
  leadingIcon={<SearchIcon />}
/>

<Input
  label="Date of birth"
  placeholder="DD / MM / YYYY"
  trailingIcon={<CalendarIcon />}
/>

<Input
  label="Password"
  type="password"
  placeholder="••••••••"
  leadingIcon={<SearchIcon />}
  trailingIcon={<EyeIcon />}
/>`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 320 }}>
      <Input label="Search"        placeholder="Search notices..."  leadingIcon={<SearchIcon />} />
      <Input label="Date of birth" placeholder="DD / MM / YYYY"    trailingIcon={<CalendarIcon />} />
      <Input label="Password"      type="password" placeholder="••••••••" leadingIcon={<SearchIcon />} trailingIcon={<EyeIcon />} />
    </div>
  ),
};

/* ── Tags variant ─────────────────────────────────────────────────── */
export const Tags = {
  name: 'Tags Variant',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: `Tags variant — \`.input.input-tags\` shell wraps \`.tag\` chips inline with an editable cursor.
Type a value and press **Enter** or **,** to add a tag. Click × to remove. Used for multi-token entry (email recipients, category pickers, etc.).`,
      },
      source: {
        code: `// Tags variant — compose the shell manually
<div className="input-field">
  <label className="input-field-label" htmlFor="tags-input">Recipients</label>
  <div className="input input-tags">
    <span className="tag tag-grey tag-outline tag-sm">
      alice@example.com
      <span className="tag-trailing" onClick={() => removeTag('alice@example.com')}>
        <TagXIcon />
      </span>
    </span>
    <input id="tags-input" type="text" placeholder="Add email…" onKeyDown={handleKeyDown} />
    <span className="input-trailing"><AddIcon /></span>
  </div>
  <p className="input-field-caption">Press Enter or comma to add</p>
</div>`,
      },
    },
  },
  render: () => {
    const [tags, setTags] = useState(['Design system', 'Legal tech']);
    const [inputVal, setInputVal] = useState('');

    const addTag = (val) => {
      const trimmed = val.trim().replace(/,$/, '').trim();
      if (trimmed && !tags.includes(trimmed)) {
        setTags(prev => [...prev, trimmed]);
      }
      setInputVal('');
    };

    const removeTag = (tag) => setTags(prev => prev.filter(t => t !== tag));

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        addTag(inputVal);
      } else if (e.key === 'Backspace' && inputVal === '' && tags.length > 0) {
        setTags(prev => prev.slice(0, -1));
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 400 }}>
        {/* Default size */}
        <div className="input-field">
          <label className="input-field-label" htmlFor="tags-md">Tags (md)</label>
          <div className="input input-tags">
            {tags.map(tag => (
              <span key={tag} className="tag tag-grey tag-outline tag-sm">
                {tag}
                <span
                  className="tag-trailing"
                  role="button"
                  aria-label={`Remove ${tag}`}
                  onClick={() => removeTag(tag)}
                  style={{ cursor: 'pointer' }}
                >
                  <TagXIcon size={10} />
                </span>
              </span>
            ))}
            <input
              id="tags-md"
              type="text"
              placeholder={tags.length === 0 ? 'Add a tag…' : ''}
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => inputVal && addTag(inputVal)}
            />
            <span className="input-trailing"><AddIcon /></span>
          </div>
          <p className="input-field-caption">Press Enter or comma to add · Backspace to remove last</p>
        </div>

        {/* Large size */}
        <div className="input-field">
          <label className="input-field-label" htmlFor="tags-lg">Tags (lg)</label>
          <div className="input input-lg input-tags">
            <span className="tag tag-grey tag-outline tag-sm">
              Label
              <span className="tag-trailing"><TagXIcon /></span>
            </span>
            <input id="tags-lg" type="text" placeholder="" />
            <span className="input-trailing"><AddIcon /></span>
          </div>
        </div>

        {/* Small size */}
        <div className="input-field">
          <label className="input-field-label" htmlFor="tags-sm">Tags (sm)</label>
          <div className="input input-sm input-tags">
            <span className="tag tag-grey tag-outline tag-sm">
              Label
              <span className="tag-trailing"><TagXIcon /></span>
            </span>
            <input id="tags-sm" type="text" placeholder="" />
            <span className="input-trailing"><AddIcon /></span>
          </div>
        </div>
      </div>
    );
  },
};

/* ── OTP variant ──────────────────────────────────────────────────── */
export const OTP = {
  name: 'OTP Variant',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: `OTP variant — \`.input-otp\` wrapper with N single-character \`<input>\` cells.
Auto-advances focus on digit entry; moves back on Backspace. Add \`.input-lg\` or \`.input-sm\` to the wrapper for size variants.`,
      },
      source: {
        code: `// OTP variant — compose the wrapper manually
function OtpInput({ digits = 6, size = 'md' }) {
  const refs = Array.from({ length: digits }, () => useRef(null));

  const handleChange = (i, e) => {
    const val = e.target.value.replace(/\\D/g, '').slice(-1);
    e.target.value = val;
    if (val && i < digits - 1) refs[i + 1].current?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !e.target.value && i > 0) {
      refs[i - 1].current?.focus();
    }
  };

  const sizeClass = size === 'lg' ? 'input-otp input-lg' : size === 'sm' ? 'input-otp input-sm' : 'input-otp';

  return (
    <div className={sizeClass}>
      {Array.from({ length: digits }, (_, i) => (
        <input
          key={i}
          ref={refs[i]}
          type="text"
          maxLength={1}
          inputMode="numeric"
          placeholder="•"
          aria-label={\`Digit \${i + 1}\`}
          onChange={e => handleChange(i, e)}
          onKeyDown={e => handleKeyDown(i, e)}
        />
      ))}
    </div>
  );
}`,
      },
    },
  },
  render: () => {
    function OtpField({ digits = 6, size = 'md', label = 'OTP', caption }) {
      const refs = Array.from({ length: digits }, () => useRef(null));

      const handleChange = (i, e) => {
        const val = e.target.value.replace(/\D/g, '').slice(-1);
        e.target.value = val;
        if (val && i < digits - 1) refs[i + 1].current?.focus();
      };

      const handleKeyDown = (i, e) => {
        if (e.key === 'Backspace' && !e.target.value && i > 0) {
          refs[i - 1].current?.focus();
        }
      };

      const sizeClass = ['input-otp', size === 'lg' && 'input-lg', size === 'sm' && 'input-sm'].filter(Boolean).join(' ');

      return (
        <div className="input-field">
          <label className="input-field-label">{label}</label>
          <div className={sizeClass}>
            {Array.from({ length: digits }, (_, i) => (
              <input
                key={i}
                ref={refs[i]}
                type="text"
                maxLength={1}
                inputMode="numeric"
                placeholder="•"
                aria-label={`Digit ${i + 1}`}
                onChange={e => handleChange(i, e)}
                onKeyDown={e => handleKeyDown(i, e)}
              />
            ))}
          </div>
          {caption && <p className="input-field-caption">{caption}</p>}
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, width: 'fit-content' }}>
        <OtpField label="OTP — Large (6 digits)" size="lg" caption="Enter the 6-digit code sent to your phone" />
        <OtpField label="OTP — Medium (6 digits)" size="md" caption="Enter the 6-digit code sent to your phone" />
        <OtpField label="OTP — Small (4 digits)" size="sm" digits={4} caption="Enter the 4-digit PIN" />
      </div>
    );
  },
};

/* ── Sizes ────────────────────────────────────────────────────────── */
export const Sizes = {
  name: 'Sizes',
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: 'Three sizes — `lg` 48px / `md` 40px (default) / `sm` 32px. Typography, icon size, and padding all scale.' },
      source: {
        code: `<Input label="Large"            size="lg" placeholder="Placeholder" leadingIcon={<SearchIcon />} />
<Input label="Medium (default)" size="md" placeholder="Placeholder" leadingIcon={<SearchIcon />} />
<Input label="Small"            size="sm" placeholder="Placeholder" leadingIcon={<SearchIcon />} />`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 320 }}>
      <Input label="Large"            size="lg" placeholder="Placeholder" leadingIcon={<SearchIcon />} />
      <Input label="Medium (default)" size="md" placeholder="Placeholder" leadingIcon={<SearchIcon />} />
      <Input label="Small"            size="sm" placeholder="Placeholder" leadingIcon={<SearchIcon />} />
    </div>
  ),
};

/* ── Status states ────────────────────────────────────────────────── */
export const StatusStates = {
  name: 'Status States',
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: 'Status changes the caption colour only — the field chrome stays neutral. Always pair the error state with `aria-invalid="true"` and a descriptive caption.' },
      source: {
        code: `<Input label="Default"  caption="Helper text" />
<Input label="Success"  caption="Username is available" status="success" />
<Input label="Warning"  caption="This will overwrite existing data" status="warning" />
<Input label="Error"    caption="Email address is invalid" status="error" aria-invalid="true" />`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 320 }}>
      <Input label="Default"  placeholder="Placeholder" caption="Helper text" />
      <Input label="Success"  placeholder="Placeholder" caption="Username is available" status="success" />
      <Input label="Warning"  placeholder="Placeholder" caption="This will overwrite existing data" status="warning" />
      <Input label="Error"    placeholder="Placeholder" caption="Email address is invalid" status="error" aria-invalid="true" />
    </div>
  ),
};

/* ── Disabled ─────────────────────────────────────────────────────── */
export const Disabled = {
  name: 'Disabled',
  parameters: {
    docs: {
      description: { story: 'Pass `disabled` directly — the shell adapts via `:has(input:disabled)`. Use sparingly; prefer `readOnly` when content should be visible but not editable.' },
      source: {
        code: `<Input label="Disabled (empty)"  placeholder="Placeholder" disabled />
<Input label="Disabled (filled)" defaultValue="Existing value" disabled />`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 320 }}>
      <Input label="Disabled (empty)"  placeholder="Placeholder" caption="Caption" disabled />
      <Input label="Disabled (filled)" defaultValue="Existing value" caption="Caption" disabled />
    </div>
  ),
};

/* ── Full matrix — 3 sizes × 8 states ────────────────────────────── */
const STATES = [
  { label: 'Default',  props: {},                                               shellClass: '' },
  { label: 'Hover',    props: {},                                               shellClass: 'is-hover' },
  { label: 'Focus',    props: {},                                               shellClass: 'is-focus' },
  { label: 'Filled',   props: { defaultValue: 'User input' },                  shellClass: 'is-filled' },
  { label: 'Success',  props: { status: 'success', caption: 'Caption' },       shellClass: '' },
  { label: 'Warning',  props: { status: 'warning', caption: 'Caption' },       shellClass: '' },
  { label: 'Error',    props: { status: 'error',   caption: 'Caption' },       shellClass: '' },
  { label: 'Disabled', props: { disabled: true },                              shellClass: '' },
];

const SIZES = ['lg', 'md', 'sm'];

const thStyle = (extra = {}) => ({
  padding: '8px 16px',
  background: 'var(--color-bg-2)',
  color: 'var(--color-subheading)',
  fontWeight: 600,
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  borderBottom: '1px solid var(--color-border)',
  whiteSpace: 'nowrap',
  textAlign: 'left',
  ...extra,
});

const tdStyle = (extra = {}) => ({
  padding: '12px 16px',
  borderBottom: '1px solid var(--color-border)',
  verticalAlign: 'top',
  minWidth: 240,
  ...extra,
});

export const FullMatrix = {
  name: 'Full Matrix',
  parameters: {
    layout: 'padded',
    docs: {
      description: { story: '3 sizes × 8 states. Hover / Focus / Filled columns force the visual using `.is-hover` / `.is-focus` / `.is-filled` CSS helpers — documentation only, not needed in production.' },
      source: { code: '// Visual reference grid — see individual stories for usage code.' },
    },
  },
  render: () => (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', fontSize: 13, fontFamily: 'var(--font-primary)', minWidth: 800 }}>
        <thead>
          <tr>
            <th style={thStyle({ minWidth: 90 })}>State</th>
            {SIZES.map(s => <th key={s} style={thStyle()}>{s.toUpperCase()}</th>)}
          </tr>
        </thead>
        <tbody>
          {STATES.map(({ label, props, shellClass }) => (
            <tr key={label}>
              <td style={{ ...tdStyle({ minWidth: 90 }), color: 'var(--color-subheading)', fontWeight: 600 }}>{label}</td>
              {SIZES.map(size => (
                <td key={size} style={tdStyle()}>
                  <MatrixCell size={size} shellClass={shellClass} stateProps={props} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

/* Same icon in both slots — matches the HTML docs (both use #ico-add-square) and
   avoids visual weight differences between a small-circle icon and a large-rect icon. */
const SlotIcon = ({ size }) => (
  <svg width={size === 'sm' ? 16 : 24} height={size === 'sm' ? 16 : 24} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8.5 12h7M12 8.5v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

function MatrixCell({ size, shellClass, stateProps }) {
  const { status = 'default', caption, disabled = false, defaultValue } = stateProps;
  const wrapperClass = [
    'input-field',
    status === 'success' && 'input-field-success',
    status === 'warning' && 'input-field-warning',
    status === 'error'   && 'input-field-error',
  ].filter(Boolean).join(' ');
  const shellCls = [
    'input',
    size === 'lg' && 'input-lg',
    size === 'sm' && 'input-sm',
    shellClass,
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClass}>
      <label className="input-field-label">Label</label>
      <div className={shellCls}>
        <span className="input-leading"><SlotIcon size={size} /></span>
        <input type="text" placeholder="Placeholder" disabled={disabled} defaultValue={defaultValue} />
        <span className="input-trailing"><SlotIcon size={size} /></span>
      </div>
      {caption && <p className="input-field-caption">{caption}</p>}
    </div>
  );
}
