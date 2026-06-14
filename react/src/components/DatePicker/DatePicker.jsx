import React, { useState } from 'react';
import PropTypes from 'prop-types';

// ── Constants ─────────────────────────────────────────────────────────────────

const MONTHS       = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const WEEKDAYS     = ['Mo','Tu','We','Th','Fr','Sa','Su'];

// ── Helpers ───────────────────────────────────────────────────────────────────

function isSameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth()    === b.getMonth()    &&
         a.getDate()     === b.getDate();
}

function isToday(d) { return isSameDay(d, new Date()); }

function buildDays(year, month) {
  const firstWeekday  = (new Date(year, month, 1).getDay() + 6) % 7; // 0=Mo
  const daysInMonth   = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const days = [];

  for (let i = firstWeekday - 1; i >= 0; i--) {
    const pm = month === 0 ? 11 : month - 1;
    const py = month === 0 ? year - 1 : year;
    days.push({ date: new Date(py, pm, prevMonthDays - i), other: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ date: new Date(year, month, d), other: false });
  }
  const trailing = (7 - ((firstWeekday + daysInMonth) % 7)) % 7;
  for (let t = 1; t <= trailing; t++) {
    const nm = month === 11 ? 0 : month + 1;
    const ny = month === 11 ? year + 1 : year;
    days.push({ date: new Date(ny, nm, t), other: true });
  }
  return days;
}

function isDisabled(date, minDate, maxDate) {
  if (minDate && date < minDate) return true;
  if (maxDate && date > maxDate) return true;
  return false;
}

// ── Inline SVG icons ──────────────────────────────────────────────────────────

const ChevLeft  = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ChevRight = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 4l4 4-4 4"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ChevDown  = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;

/** Calendar icon — export so consumers can use it as a leading icon in an Input trigger. */
export const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3.5" y="5.5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 3v4M16 3v4M3.5 10h17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ── Internal: Header ──────────────────────────────────────────────────────────

function Header({ title, onPrev, onNext, onTitleClick, showChevron, prevLabel, nextLabel }) {
  return (
    <div className="datepicker-header">
      <button type="button" className="datepicker-nav" onClick={onPrev} aria-label={prevLabel}>
        <ChevLeft />
      </button>
      <button type="button" className="datepicker-title" onClick={onTitleClick}>
        {title}{showChevron && <ChevDown />}
      </button>
      <button type="button" className="datepicker-nav" onClick={onNext} aria-label={nextLabel}>
        <ChevRight />
      </button>
    </div>
  );
}

// ── Internal: Day grid for one month ─────────────────────────────────────────

function DayGrid({ year, month, selected, rangeStart, rangeEnd, hoverDate, mode, onSelect, onHover, onLeave, minDate, maxDate }) {
  const days = buildDays(year, month);

  function getCellClass(date, other) {
    const cls = ['datepicker-cell'];
    if (other) { cls.push('is-other'); return cls.join(' '); }
    if (isDisabled(date, minDate, maxDate)) { cls.push('is-disabled'); return cls.join(' '); }

    if (mode === 'single') {
      if (isSameDay(date, selected)) cls.push('is-active');
      if (isToday(date))             cls.push('is-today');
    } else {
      const start = rangeStart;
      const end   = rangeEnd || hoverDate;
      const lo    = start && end && start <= end ? start : end;
      const hi    = start && end && start <= end ? end   : start;
      if (isSameDay(date, start))    cls.push('is-active', 'is-range-start');
      else if (isSameDay(date, rangeEnd)) cls.push('is-active', 'is-range-end');
      else if (lo && hi && date > lo && date < hi) cls.push('is-in-range');
      if (isToday(date))             cls.push('is-today');
    }
    return cls.join(' ');
  }

  return (
    <div className="datepicker-days">
      {days.map(({ date, other }, i) => (
        <button
          key={i}
          type="button"
          className={getCellClass(date, other)}
          disabled={!other && isDisabled(date, minDate, maxDate)}
          onClick={other || isDisabled(date, minDate, maxDate) ? undefined : () => onSelect(date)}
          onMouseEnter={!other && mode === 'range' ? () => onHover(date) : undefined}
          onMouseLeave={!other && mode === 'range' ? onLeave : undefined}
          aria-pressed={mode === 'single' ? isSameDay(date, selected) : undefined}
          aria-label={`${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`}
        >
          {date.getDate()}
        </button>
      ))}
    </div>
  );
}

// ── DatePicker panel ──────────────────────────────────────────────────────────

/**
 * Calendar panel for selecting a single date, a date range, a month, or a year.
 *
 * Floats below an Input trigger in production. In Storybook the panel renders
 * inline — wrap it in a positioned container and toggle `hidden` to replicate
 * the floating behaviour.
 *
 * **Usage rules:**
 * - Always pair with a Text Input trigger (`aria-haspopup="dialog"` + `aria-expanded`).
 * - Use `mode="range"` for check-in/check-out or filter date pairs.
 * - Pass `minDate` / `maxDate` to constrain selectable dates.
 * - Pass `onSelect` to react when the user picks a date / range.
 */
export const DatePicker = React.forwardRef(function DatePicker(
  {
    /** Single mode: `Date | null`. Range mode: `{ start: Date|null, end: Date|null }`. */
    value: valueProp,
    /** Uncontrolled starting value — same shape as `value`. */
    defaultValue = null,
    /** Called with the new value when the user makes a selection. */
    onSelect,
    /** `"single"` (default) or `"range"`. */
    mode = 'single',
    /** Earliest selectable date. */
    minDate,
    /** Latest selectable date. */
    maxDate,
    /** Starting month/year to display (defaults to today or the selected value). */
    initialViewDate,
    /** Which view to open on — `"day"` (default) | `"month"` | `"year"`. */
    initialView = 'day',
    className,
    ...rest
  },
  ref
) {
  const isControlled = valueProp !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const committed = isControlled ? valueProp : internal;

  // For range — track first click
  const [rangeAnchor, setRangeAnchor] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  const [view, setView] = useState(initialView); // 'day' | 'month' | 'year'
  const [viewDate, setViewDate] = useState(() => {
    if (initialViewDate) return new Date(initialViewDate.getFullYear(), initialViewDate.getMonth(), 1);
    const d = mode === 'single' ? committed : (committed?.start ?? null);
    if (d instanceof Date) return new Date(d.getFullYear(), d.getMonth(), 1);
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  });
  const [yearStart, setYearStart] = useState(() => Math.floor(viewDate.getFullYear() / 12) * 12);

  const vy = viewDate.getFullYear();
  const vm = viewDate.getMonth();

  // Single-mode selected value
  const singleSelected = mode === 'single' ? committed : null;

  // Range-mode values
  const rangeStart = mode === 'range' ? (committed?.start ?? null) : null;
  const rangeEnd   = mode === 'range' ? (committed?.end   ?? null) : null;

  // ── Commit helpers ──────────────────────────────────────────────────────────

  function commitSingle(date) {
    if (!isControlled) setInternal(date);
    onSelect?.(date);
  }

  function commitRange(start, end) {
    const next = { start, end };
    if (!isControlled) setInternal(next);
    onSelect?.(next);
  }

  // ── Day selection ───────────────────────────────────────────────────────────

  function handleDaySelect(date) {
    if (mode === 'single') { commitSingle(date); return; }

    // Range: first click = anchor, second click = finalise
    if (!rangeAnchor) {
      setRangeAnchor(date);
      commitRange(date, null);
    } else {
      const start = rangeAnchor <= date ? rangeAnchor : date;
      const end   = rangeAnchor <= date ? date : rangeAnchor;
      commitRange(start, end);
      setRangeAnchor(null);
      setHoverDate(null);
    }
  }

  // ── Month selection ─────────────────────────────────────────────────────────

  function handleMonthSelect(monthIndex) {
    setViewDate(new Date(vy, monthIndex, 1));
    setView('day');
  }

  // ── Year selection ──────────────────────────────────────────────────────────

  function handleYearSelect(year) {
    setViewDate(new Date(year, vm, 1));
    setView('month');
  }

  // ── Navigation ──────────────────────────────────────────────────────────────

  function prevNav() {
    if (view === 'day') {
      const d = new Date(vy, vm - 1, 1);
      setViewDate(d);
    } else if (view === 'month') {
      setViewDate(new Date(vy - 1, vm, 1));
    } else {
      setYearStart((s) => s - 12);
    }
  }

  function nextNav() {
    if (view === 'day') {
      setViewDate(new Date(vy, vm + 1, 1));
    } else if (view === 'month') {
      setViewDate(new Date(vy + 1, vm, 1));
    } else {
      setYearStart((s) => s + 12);
    }
  }

  function titleClick() {
    if (view === 'day')   { setView('month'); return; }
    if (view === 'month') {
      setYearStart(Math.floor(vy / 12) * 12);
      setView('year');
    }
  }

  // ── Render helpers ──────────────────────────────────────────────────────────

  function renderDayView(year, month) {
    return (
      <>
        <div className="datepicker-weekdays">
          {WEEKDAYS.map((w) => <span key={w}>{w}</span>)}
        </div>
        <DayGrid
          year={year}
          month={month}
          selected={singleSelected}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          hoverDate={hoverDate}
          mode={mode}
          onSelect={handleDaySelect}
          onHover={setHoverDate}
          onLeave={() => setHoverDate(null)}
          minDate={minDate}
          maxDate={maxDate}
        />
      </>
    );
  }

  function renderMonthView() {
    return (
      <div className="datepicker-months">
        {MONTHS_SHORT.map((name, i) => {
          const active = mode === 'single'
            ? singleSelected && singleSelected.getFullYear() === vy && singleSelected.getMonth() === i
            : false;
          return (
            <button
              key={name}
              type="button"
              className={['datepicker-cell', active && 'is-active'].filter(Boolean).join(' ')}
              onClick={() => handleMonthSelect(i)}
            >
              {name}
            </button>
          );
        })}
      </div>
    );
  }

  function renderYearView() {
    return (
      <div className="datepicker-years">
        {Array.from({ length: 12 }, (_, i) => {
          const yr = yearStart + i;
          const active = mode === 'single'
            ? singleSelected && singleSelected.getFullYear() === yr
            : false;
          return (
            <button
              key={yr}
              type="button"
              className={['datepicker-cell', active && 'is-active'].filter(Boolean).join(' ')}
              onClick={() => handleYearSelect(yr)}
            >
              {yr}
            </button>
          );
        })}
      </div>
    );
  }

  // ── Range: two-month layout ─────────────────────────────────────────────────

  if (mode === 'range') {
    const nextMonth = vm === 11 ? 0 : vm + 1;
    const nextYear  = vm === 11 ? vy + 1 : vy;

    return (
      <div
        ref={ref}
        className={['datepicker datepicker-range', className].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label="Select date range"
        {...rest}
      >
        <div className="datepicker-month">
          <Header
            title={`${MONTHS[vm]} ${vy}`}
            onPrev={prevNav}
            onNext={nextNav}
            onTitleClick={titleClick}
            showChevron={false}
            prevLabel="Previous month"
            nextLabel="Next month"
          />
          <div className="datepicker-weekdays">{WEEKDAYS.map((w) => <span key={w}>{w}</span>)}</div>
          <DayGrid
            year={vy} month={vm}
            rangeStart={rangeStart} rangeEnd={rangeEnd} hoverDate={hoverDate}
            mode="range"
            onSelect={handleDaySelect}
            onHover={setHoverDate}
            onLeave={() => setHoverDate(null)}
            minDate={minDate} maxDate={maxDate}
          />
        </div>
        <div className="datepicker-month">
          <Header
            title={`${MONTHS[nextMonth]} ${nextYear}`}
            onPrev={prevNav}
            onNext={nextNav}
            onTitleClick={titleClick}
            showChevron={false}
            prevLabel="Previous month"
            nextLabel="Next month"
          />
          <div className="datepicker-weekdays">{WEEKDAYS.map((w) => <span key={w}>{w}</span>)}</div>
          <DayGrid
            year={nextYear} month={nextMonth}
            rangeStart={rangeStart} rangeEnd={rangeEnd} hoverDate={hoverDate}
            mode="range"
            onSelect={handleDaySelect}
            onHover={setHoverDate}
            onLeave={() => setHoverDate(null)}
            minDate={minDate} maxDate={maxDate}
          />
        </div>
      </div>
    );
  }

  // ── Single: title + current view ───────────────────────────────────────────

  const headerTitle = view === 'day'
    ? `${MONTHS[vm]} ${vy}`
    : view === 'month'
    ? `${vy}`
    : 'Select year';

  return (
    <div
      ref={ref}
      className={['datepicker', className].filter(Boolean).join(' ')}
      role="dialog"
      aria-modal="true"
      aria-label={headerTitle}
      {...rest}
    >
      <Header
        title={headerTitle}
        onPrev={prevNav}
        onNext={nextNav}
        onTitleClick={titleClick}
        showChevron={view === 'day'}
        prevLabel={view === 'day' ? 'Previous month' : view === 'month' ? 'Previous year' : 'Previous range'}
        nextLabel={view === 'day' ? 'Next month'     : view === 'month' ? 'Next year'     : 'Next range'}
      />
      {view === 'day'   && renderDayView(vy, vm)}
      {view === 'month' && renderMonthView()}
      {view === 'year'  && renderYearView()}
    </div>
  );
});

DatePicker.displayName = 'DatePicker';
DatePicker.propTypes = {
  value:           PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.shape({ start: PropTypes.instanceOf(Date), end: PropTypes.instanceOf(Date) })]),
  defaultValue:    PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.shape({ start: PropTypes.instanceOf(Date), end: PropTypes.instanceOf(Date) })]),
  onSelect:        PropTypes.func,
  mode:            PropTypes.oneOf(['single', 'range']),
  minDate:         PropTypes.instanceOf(Date),
  maxDate:         PropTypes.instanceOf(Date),
  initialViewDate: PropTypes.instanceOf(Date),
  initialView:     PropTypes.oneOf(['day', 'month', 'year']),
  className:       PropTypes.string,
};

export default DatePicker;
