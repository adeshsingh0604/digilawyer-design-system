import React, { useState } from 'react';
import {
  Pagination,
  PaginationPrev,
  PaginationNext,
  PaginationItem,
  PaginationEllipsis,
} from './Pagination';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: ['lg', 'md', 'sm'] },
  },
};

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground = {
  args: { size: 'md' },
  render: (args) => (
    <Pagination {...args} aria-label="Playground pagination">
      <PaginationPrev />
      <PaginationItem>1</PaginationItem>
      <PaginationItem current>2</PaginationItem>
      <PaginationItem>3</PaginationItem>
      <PaginationEllipsis />
      <PaginationItem>99</PaginationItem>
      <PaginationNext />
    </Pagination>
  ),
};

// ── Default (interactive) ─────────────────────────────────────────────────────
export const Default = {
  render: () => {
    const TOTAL = 10;
    const [page, setPage] = useState(1);

    const pages = [1, 2, 3, '…', TOTAL - 1, TOTAL];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ fontSize: 13, color: 'var(--color-subheading)' }}>
          Page <strong style={{ color: 'var(--color-heading)' }}>{page}</strong> of {TOTAL}
        </div>
        <Pagination aria-label="Default pagination">
          <PaginationPrev disabled={page === 1} onClick={() => setPage((p) => p - 1)} />
          {pages.map((p, i) =>
            p === '…' ? (
              <PaginationEllipsis key={`ellipsis-${i}`} />
            ) : (
              <PaginationItem key={p} current={p === page} onClick={() => setPage(p)}>
                {p}
              </PaginationItem>
            )
          )}
          <PaginationNext disabled={page === TOTAL} onClick={() => setPage((p) => p + 1)} />
        </Pagination>
      </div>
    );
  },
};

// ── All Sizes ─────────────────────────────────────────────────────────────────
export const AllSizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[
        { size: 'lg', label: 'Large · 40px' },
        { size: 'md', label: 'Medium · 36px (default)' },
        { size: 'sm', label: 'Small · 32px' },
      ].map(({ size, label }) => (
        <div key={size}>
          <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>{label}</div>
          <Pagination size={size} aria-label={label}>
            <PaginationPrev />
            <PaginationItem>1</PaginationItem>
            <PaginationItem current>2</PaginationItem>
            <PaginationItem>3</PaginationItem>
            <PaginationEllipsis />
            <PaginationItem>99</PaginationItem>
            <PaginationNext />
          </Pagination>
        </div>
      ))}
    </div>
  ),
};

// ── Edge pages (first / last) ─────────────────────────────────────────────────
export const EdgePages = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>First page — Previous disabled</div>
        <Pagination aria-label="First page">
          <PaginationPrev disabled />
          <PaginationItem current>1</PaginationItem>
          <PaginationItem>2</PaginationItem>
          <PaginationItem>3</PaginationItem>
          <PaginationEllipsis />
          <PaginationItem>100</PaginationItem>
          <PaginationNext />
        </Pagination>
      </div>
      <div>
        <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Last page — Next disabled</div>
        <Pagination aria-label="Last page">
          <PaginationPrev />
          <PaginationItem>1</PaginationItem>
          <PaginationEllipsis />
          <PaginationItem>98</PaginationItem>
          <PaginationItem>99</PaginationItem>
          <PaginationItem current>100</PaginationItem>
          <PaginationNext disabled />
        </Pagination>
      </div>
    </div>
  ),
};

// ── Short range (no ellipsis) ─────────────────────────────────────────────────
export const ShortRange = {
  render: () => (
    <Pagination aria-label="Short range">
      <PaginationPrev />
      <PaginationItem>1</PaginationItem>
      <PaginationItem>2</PaginationItem>
      <PaginationItem current>3</PaginationItem>
      <PaginationItem>4</PaginationItem>
      <PaginationItem>5</PaginationItem>
      <PaginationNext />
    </Pagination>
  ),
};

// ── Full Matrix — 3 scenarios × 3 sizes (vertical layout) ────────────────────
export const FullMatrix = {
  render: () => {
    const sectionLabel = (text) => (
      <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
        {text}
      </div>
    );
    const rowLabel = { fontSize: 12, color: 'var(--color-subheading)', fontWeight: 600, minWidth: 90, flexShrink: 0 };
    const sizes = [
      { size: 'lg', label: 'Large · 40' },
      { size: 'md', label: 'Medium · 36' },
      { size: 'sm', label: 'Small · 32' },
    ];

    const boxStyle = {
      padding: 24,
      border: '1px dashed var(--color-border)',
      borderRadius: 'var(--radius-md, 6px)',
      background: 'var(--color-bg-2)',
      display: 'flex',
      flexDirection: 'column',
      gap: 32,
    };

    return (
      <div style={boxStyle}>
        {/* Mid range */}
        <div>
          {sectionLabel('Mid range')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sizes.map(({ size, label }) => (
              <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={rowLabel}>{label}</span>
                <Pagination size={size} aria-label={`${label} mid`}>
                  <PaginationPrev />
                  <PaginationItem>1</PaginationItem>
                  <PaginationEllipsis />
                  <PaginationItem>4</PaginationItem>
                  <PaginationItem current>5</PaginationItem>
                  <PaginationItem>6</PaginationItem>
                  <PaginationEllipsis />
                  <PaginationItem>10</PaginationItem>
                  <PaginationNext />
                </Pagination>
              </div>
            ))}
          </div>
        </div>

        {/* First page */}
        <div>
          {sectionLabel('First page — Previous disabled')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sizes.map(({ size, label }) => (
              <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={rowLabel}>{label}</span>
                <Pagination size={size} aria-label={`${label} first`}>
                  <PaginationPrev disabled />
                  <PaginationItem current>1</PaginationItem>
                  <PaginationItem>2</PaginationItem>
                  <PaginationItem>3</PaginationItem>
                  <PaginationEllipsis />
                  <PaginationItem>10</PaginationItem>
                  <PaginationNext />
                </Pagination>
              </div>
            ))}
          </div>
        </div>

        {/* Last page */}
        <div>
          {sectionLabel('Last page — Next disabled')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sizes.map(({ size, label }) => (
              <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={rowLabel}>{label}</span>
                <Pagination size={size} aria-label={`${label} last`}>
                  <PaginationPrev />
                  <PaginationItem>1</PaginationItem>
                  <PaginationEllipsis />
                  <PaginationItem>8</PaginationItem>
                  <PaginationItem>9</PaginationItem>
                  <PaginationItem current>10</PaginationItem>
                  <PaginationNext disabled />
                </Pagination>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
