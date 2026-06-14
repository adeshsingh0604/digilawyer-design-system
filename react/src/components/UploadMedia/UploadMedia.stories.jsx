import React, { useState } from 'react';
import { UploadMedia } from './UploadMedia';

export default {
  title: 'Components/UploadMedia',
  component: UploadMedia,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    maxFiles: { control: 'number' },
    disabled: { control: 'boolean' },
    hover:    { control: 'boolean' },
    accept:   { control: 'text' },
  },
};

const caption = (text) => (
  <div style={{ fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
    {text}
  </div>
);

// ── Mock file entries (no real File objects — for display-only stories) ────────
function mockFiles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id:      `mock-${i}`,
    name:    'filebig…name.png',
    type:    'image/png',
    file:    null,
    preview: null,
  }));
}

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground = {
  args: {
    label:      'Upload files',
    caption:    'Accepted: images up to 5 MB',
    subheading: 'Max: 5MB file',
    maxFiles:   3,
    accept:     'image/*',
    disabled:   false,
  },
  render: (args) => <UploadMedia {...args} style={{ width: 320 }} />,
};

// ── Default (fully interactive) ───────────────────────────────────────────────
export const Default = {
  render: () => {
    const [files, setFiles] = useState([]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 13, color: 'var(--color-subheading)' }}>
          Files selected: <strong style={{ color: 'var(--color-heading)' }}>{files.length} / 3</strong>
        </div>
        <UploadMedia
          label="Attach documents"
          caption="Try it — pick up to 3 images, click × to remove."
          accept="image/*"
          maxFiles={3}
          files={files}
          onFilesChange={setFiles}
          style={{ width: 320 }}
        />
      </div>
    );
  },
};

// ── Variants ──────────────────────────────────────────────────────────────────
export const Variants = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
      <div>
        {caption('Empty')}
        <UploadMedia
          label="Empty"
          caption="Caption"
          style={{ width: 280 }}
        />
      </div>
      <div>
        {caption('1 file uploaded')}
        <UploadMedia
          label="1 file uploaded"
          caption="Caption"
          files={mockFiles(1)}
          style={{ width: 280 }}
        />
      </div>
      <div>
        {caption('2 files uploaded')}
        <UploadMedia
          label="2 files uploaded"
          caption="Caption"
          files={mockFiles(2)}
          style={{ width: 280 }}
        />
      </div>
      <div>
        {caption('3 files — limit reached')}
        <UploadMedia
          label="3 files (limit)"
          caption="Caption"
          files={mockFiles(3)}
          maxFiles={3}
          style={{ width: 280 }}
        />
      </div>
    </div>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────
export const States = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <div>
        {caption('Default')}
        <UploadMedia
          label="Default — hover to preview"
          caption="Caption"
          style={{ width: 280 }}
        />
      </div>
      <div>
        {caption('Hover (forced)')}
        <UploadMedia
          label="Hover (forced via hover prop)"
          caption="Caption"
          hover
          style={{ width: 280 }}
        />
      </div>
      <div>
        {caption('Disabled')}
        <UploadMedia
          label="Disabled"
          caption="Caption"
          disabled
          style={{ width: 280 }}
        />
      </div>
    </div>
  ),
};

// ── Full Matrix — 4 variants × 2 states ───────────────────────────────────────
export const FullMatrix = {
  render: () => {
    const headerStyle = { fontSize: 11, color: 'var(--color-subheading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' };
    const rowStyle    = { fontSize: 12, color: 'var(--color-subheading)', fontWeight: 600, alignSelf: 'center' };

    const rows = [
      { label: 'Empty',          files: [],          max: 3 },
      { label: '1 file',         files: mockFiles(1), max: 3 },
      { label: '2 files',        files: mockFiles(2), max: 3 },
      { label: '3 files (limit)', files: mockFiles(3), max: 3 },
    ];

    return (
      <div style={{
        padding: 24,
        border: '1px dashed var(--color-border)',
        borderRadius: 'var(--radius-md, 6px)',
        background: 'var(--color-bg-2)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '120px repeat(2, minmax(280px, 1fr))',
          gap: '16px 24px',
          alignItems: 'start',
        }}>
          <div />
          <div style={headerStyle}>Default</div>
          <div style={headerStyle}>Hover</div>

          {rows.map(({ label, files, max }) => (
            <React.Fragment key={label}>
              <div style={rowStyle}>{label}</div>
              <UploadMedia
                label="Label"
                caption="Caption"
                files={files}
                maxFiles={max}
              />
              <UploadMedia
                label="Label"
                caption="Caption"
                files={files}
                maxFiles={max}
                hover
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  },
};
