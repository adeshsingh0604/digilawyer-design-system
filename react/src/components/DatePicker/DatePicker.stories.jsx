import React, { useState, useRef, useEffect } from 'react';
import { DatePicker, CalendarIcon } from './DatePicker';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    mode: { control: 'select', options: ['single', 'range'] },
  },
};

const caption = (text) => (
  <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
    {text}
  </div>
);

// Fixed reference dates so stories never change day-to-day
const JUL_9   = new Date(2024, 6, 9);   // July 9 2024
const AUG_6   = new Date(2024, 7, 6);   // Aug 6 2024
const JUL_25  = new Date(2024, 6, 25);  // July 25 2024

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground = {
  args: { mode: 'single', defaultValue: JUL_9, initialViewDate: JUL_9 },
  render: (args) => <DatePicker {...args} />,
};

// ── Default (single, July 2024) ───────────────────────────────────────────────
export const Default = {
  render: () => (
    <DatePicker
      defaultValue={JUL_9}
      initialViewDate={JUL_9}
      mode="single"
    />
  ),
};

// ── Variants ──────────────────────────────────────────────────────────────────
export const Variants = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
      <div>
        {caption('Single — day view')}
        <DatePicker defaultValue={JUL_9} initialViewDate={JUL_9} mode="single" />
      </div>
      <div>
        {caption('Range — two months')}
        <DatePicker
          mode="range"
          defaultValue={{ start: JUL_25, end: AUG_6 }}
          initialViewDate={JUL_25}
        />
      </div>
      <div>
        {caption('Month picker')}
        <DatePicker
          defaultValue={JUL_9}
          initialViewDate={JUL_9}
          mode="single"
          // open directly in month view
          initialView="month"
        />
      </div>
      <div>
        {caption('Year picker')}
        <DatePicker
          defaultValue={JUL_9}
          initialViewDate={JUL_9}
          mode="single"
          initialView="year"
        />
      </div>
    </div>
  ),
};

// ── Interactive — Input trigger + inline panel (matches HTML docs pattern) ─────
export const Interactive = {
  render: () => {
    const [value, setValue] = useState(null);
    const [open, setOpen]   = useState(false);
    const fieldRef          = useRef(null);

    useEffect(() => {
      function handleClick(e) {
        if (open && fieldRef.current && !fieldRef.current.contains(e.target)) {
          setOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }, [open]);

    function fmt(d) {
      if (!d) return '';
      const M = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      return `${d.getDate()} ${M[d.getMonth()]} ${d.getFullYear()}`;
    }

    return (
      // Inline panel sits inside the field div — same as HTML docs (no absolute positioning)
      <div ref={fieldRef} className="input-field" style={{ width: 320 }}>
        <label className="input-field-label" htmlFor="dp-story-input">Date</label>
        <div className="input" style={{ cursor: 'pointer' }} onClick={() => setOpen((o) => !o)}>
          <span className="input-leading"><CalendarIcon /></span>
          <input
            id="dp-story-input"
            type="text"
            placeholder="Select date"
            readOnly
            value={fmt(value)}
            aria-haspopup="dialog"
            aria-expanded={open}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <p className="input-field-caption">Click the field to open the calendar.</p>
        {open && (
          <DatePicker
            value={value}
            onSelect={(d) => { setValue(d); setOpen(false); }}
            mode="single"
            style={{ marginTop: 4 }}
          />
        )}
      </div>
    );
  },
};

// ── Cell States ───────────────────────────────────────────────────────────────
export const CellStates = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button className="datepicker-cell" style={{ width: 40 }}>15</button>
      <button className="datepicker-cell" style={{ width: 40, background: 'var(--datepicker-cell-bg-hover)', color: 'var(--datepicker-cell-text-hover)' }}>15</button>
      <button className="datepicker-cell is-active" style={{ width: 40 }}>15</button>
      <button className="datepicker-cell is-in-range" style={{ width: 40 }}>15</button>
      <button className="datepicker-cell is-other" style={{ width: 40 }}>15</button>
      <button className="datepicker-cell is-disabled" style={{ width: 40 }} disabled>15</button>
    </div>
  ),
};

// ── Full Matrix — cell states × 3 view types ──────────────────────────────────
export const FullMatrix = {
  render: () => {
    const hdr = { fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'center' };
    const lbl = { fontSize: 12, color: 'var(--color-subheading)', fontWeight: 600 };
    const cel = { display: 'flex', justifyContent: 'center' };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24, border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md, 6px)', background: 'var(--color-bg-2)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(5, 1fr)', gap: '12px', alignItems: 'center' }}>
          <div />
          {['Default','Hover','Active','In range','Disabled'].map((h) => <div key={h} style={hdr}>{h}</div>)}

          {/* Day */}
          <div style={lbl}>Day</div>
          <div style={cel}><button className="datepicker-cell" style={{ width: 40 }}>15</button></div>
          <div style={cel}><button className="datepicker-cell" style={{ width: 40, background: 'var(--datepicker-cell-bg-hover)', color: 'var(--datepicker-cell-text-hover)' }}>15</button></div>
          <div style={cel}><button className="datepicker-cell is-active" style={{ width: 40 }}>15</button></div>
          <div style={cel}><button className="datepicker-cell is-in-range" style={{ width: 40 }}>15</button></div>
          <div style={cel}><button className="datepicker-cell is-other" style={{ width: 40 }}>15</button></div>

          {/* Month */}
          <div style={lbl}>Month</div>
          <div style={cel}><button className="datepicker-cell" style={{ width: 56 }}>Jul</button></div>
          <div style={cel}><button className="datepicker-cell" style={{ width: 56, background: 'var(--datepicker-cell-bg-hover)', color: 'var(--datepicker-cell-text-hover)' }}>Jul</button></div>
          <div style={cel}><button className="datepicker-cell is-active" style={{ width: 56 }}>Jul</button></div>
          <div style={cel}><span style={{ color: 'var(--color-subheading)' }}>—</span></div>
          <div style={cel}><button className="datepicker-cell is-disabled" style={{ width: 56 }} disabled>Jul</button></div>

          {/* Year */}
          <div style={lbl}>Year</div>
          <div style={cel}><button className="datepicker-cell" style={{ width: 64 }}>2024</button></div>
          <div style={cel}><button className="datepicker-cell" style={{ width: 64, background: 'var(--datepicker-cell-bg-hover)', color: 'var(--datepicker-cell-text-hover)' }}>2024</button></div>
          <div style={cel}><button className="datepicker-cell is-active" style={{ width: 64 }}>2024</button></div>
          <div style={cel}><span style={{ color: 'var(--color-subheading)' }}>—</span></div>
          <div style={cel}><button className="datepicker-cell is-disabled" style={{ width: 64 }} disabled>2024</button></div>
        </div>
      </div>
    );
  },
};
