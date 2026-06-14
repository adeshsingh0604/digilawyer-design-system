import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbCurrent, ChevronThinIcon, ChevronThickIcon } from './Breadcrumb';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: [undefined, 'sm'] },
  },
};

const caption = (text) => (
  <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
    {text}
  </div>
);

// Shared trail helper
const Trail = ({ size, sep }) => (
  <Breadcrumb size={size} aria-label="Breadcrumb">
    <BreadcrumbItem href="#">Title</BreadcrumbItem>
    <BreadcrumbSeparator>{sep}</BreadcrumbSeparator>
    <BreadcrumbItem href="#">Title</BreadcrumbItem>
    <BreadcrumbSeparator>{sep}</BreadcrumbSeparator>
    <BreadcrumbItem href="#">Title</BreadcrumbItem>
    <BreadcrumbSeparator>{sep}</BreadcrumbSeparator>
    <BreadcrumbItem href="#">Title</BreadcrumbItem>
    <BreadcrumbSeparator>{sep}</BreadcrumbSeparator>
    <BreadcrumbCurrent>Current page</BreadcrumbCurrent>
  </Breadcrumb>
);

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground = {
  args: { size: undefined },
  render: (args) => (
    <Breadcrumb {...args} aria-label="Breadcrumb">
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem href="#">Cases</BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbCurrent>Case #1042</BreadcrumbCurrent>
    </Breadcrumb>
  ),
};

// ── Default ───────────────────────────────────────────────────────────────────
export const Default = {
  render: () => <Trail />,
};

// ── Separators ────────────────────────────────────────────────────────────────
export const Separators = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>{caption('Thin chevron (default)')}<Trail /></div>
      <div>{caption('Slash')}<Trail sep="/" /></div>
      <div>{caption('Thick chevron')}<Trail sep={<ChevronThickIcon />} /></div>
    </div>
  ),
};

// ── Sizes ─────────────────────────────────────────────────────────────────────
export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>{caption('Default · Body 1 (16/24)')}<Trail /></div>
      <div>{caption('Small · Body 2 (14/20)')}<Trail size="sm" /></div>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────
export const States = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
      <div>{caption('Default')}<BreadcrumbItem href="#">Title</BreadcrumbItem></div>
      <div>{caption('Hover (forced — underline shows on real hover too)')}<BreadcrumbItem href="#" hover>Title</BreadcrumbItem></div>
      <div>{caption('Current page')}<BreadcrumbCurrent>Current page</BreadcrumbCurrent></div>
    </div>
  ),
};

// ── Composition ───────────────────────────────────────────────────────────────
export const Composition = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Above a page H1 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Breadcrumb size="sm" aria-label="Breadcrumb">
          <BreadcrumbItem href="#">Workspace</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem href="#">Cases</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem href="#">2026 Discovery</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbCurrent>Document 042</BreadcrumbCurrent>
        </Breadcrumb>
        <h3 style={{ margin: 0, fontSize: 24, lineHeight: '32px', color: 'var(--color-heading)', fontWeight: 600 }}>Document 042</h3>
        <div style={{ fontSize: 14, color: 'var(--color-subheading)' }}>Above the H1 on a deep-link page.</div>
      </div>

      {/* Inside a table cell */}
      <div className="table-wrap" style={{ maxWidth: 480 }}>
        <table className="table">
          <thead><tr><th>Name</th><th>Status</th></tr></thead>
          <tbody>
            <tr>
              <td>
                <Breadcrumb size="sm" aria-label="Folder path">
                  <BreadcrumbItem href="#">Cases</BreadcrumbItem>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem href="#">2026</BreadcrumbItem>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbCurrent>Discovery</BreadcrumbCurrent>
                </Breadcrumb>
              </td>
              <td>Open</td>
            </tr>
            <tr>
              <td>
                <Breadcrumb size="sm" aria-label="Folder path">
                  <BreadcrumbItem href="#">Templates</BreadcrumbItem>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbCurrent>Court filings</BreadcrumbCurrent>
                </Breadcrumb>
              </td>
              <td>Archived</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ),
};

// ── Responsive — truncating long breadcrumbs on mobile ───────────────────────
export const Responsive = {
  parameters: {
    viewport: { defaultViewport: 'mobile' },
    layout: 'padded',
    docs: {
      description: {
        story: 'The `.breadcrumb-item` and `.breadcrumb-current` classes get `max-width: 30vw` + `text-overflow: ellipsis` below 744 px, so deep paths stay on one line. Switch to Mobile (390) in the viewport toolbar.',
      },
    },
  },
  render: () => (
    <div style={{ width: '100%', maxWidth: 390 }}>
      <Breadcrumb aria-label="File path">
        <BreadcrumbItem href="#" className="breadcrumb-item">Dashboard</BreadcrumbItem>
        <BreadcrumbSeparator><ChevronThinIcon /></BreadcrumbSeparator>
        <BreadcrumbItem href="#" className="breadcrumb-item">Legal Documents</BreadcrumbItem>
        <BreadcrumbSeparator><ChevronThinIcon /></BreadcrumbSeparator>
        <BreadcrumbItem href="#" className="breadcrumb-item">2026 Filings</BreadcrumbItem>
        <BreadcrumbSeparator><ChevronThinIcon /></BreadcrumbSeparator>
        <BreadcrumbCurrent className="breadcrumb-current">Contract Amendment v3</BreadcrumbCurrent>
      </Breadcrumb>
    </div>
  ),
};

// ── Full Matrix — 2 sizes × 3 separators × 3 states ──────────────────────────
export const FullMatrix = {
  render: () => {
    const seps = [
      { label: 'Thin chev', node: <ChevronThinIcon /> },
      { label: 'Slash',     node: '/' },
      { label: 'Thick chev', node: <ChevronThickIcon /> },
    ];
    const hdr = { fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' };
    const lbl = { fontSize: 12, color: 'var(--color-subheading)', fontWeight: 600 };

    return (
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 28,
        padding: 24,
        border: '1px dashed var(--color-border)',
        borderRadius: 'var(--radius-md, 6px)',
        background: 'var(--color-bg-2)',
      }}>
        {[{ size: undefined, label: 'Default · 16/24' }, { size: 'sm', label: 'Small · 14/20' }].map(({ size, label }) => (
          <div key={label}>
            <div style={{ ...hdr, marginBottom: 12 }}>{label}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: '12px 20px', alignItems: 'center' }}>
              {seps.map(({ label: sLabel, node }) => (
                <React.Fragment key={sLabel}>
                  <div style={lbl}>{sLabel}</div>
                  <Breadcrumb size={size} aria-label="Breadcrumb">
                    <BreadcrumbItem href="#">Title</BreadcrumbItem>
                    <BreadcrumbSeparator>{node}</BreadcrumbSeparator>
                    <BreadcrumbItem href="#" hover>Hover</BreadcrumbItem>
                    <BreadcrumbSeparator>{node}</BreadcrumbSeparator>
                    <BreadcrumbCurrent>Current</BreadcrumbCurrent>
                  </Breadcrumb>
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
