import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// ── Inline SVG icons ──────────────────────────────────────────────────────────

// className="upload-icon" goes on the SVG directly so the CSS rule
// `.upload-icon svg { fill: currentColor }` never matches and fills our strokes.
const UploadArrowIcon = () => (
  <svg className="upload-icon" viewBox="0 0 32 32" aria-hidden="true">
    <path d="M16 4v17M9 11l7-7 7 7"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 21v4a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3v-4"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FileThumbIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <circle cx="9" cy="9" r="1.5" fill="currentColor"/>
    <path d="M3 18l5-5 4 4 4-3 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

// ── FileItem — single file pill ───────────────────────────────────────────────

function FileItem({ entry, onRemove }) {
  const [preview, setPreview] = useState(entry.preview || null);

  useEffect(() => {
    if (preview || !entry.file || !entry.file.type?.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(entry.file);
  }, [entry.file]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <li className="upload-file">
      <span className="upload-file-thumb">
        {preview ? (
          <img src={preview} alt="" style={{ width: 24, height: 24, objectFit: 'cover', borderRadius: 3 }} />
        ) : (
          <FileThumbIcon />
        )}
      </span>
      <span className="upload-file-name">{entry.name}</span>
      <button
        type="button"
        className="upload-file-remove"
        aria-label={`Remove ${entry.name}`}
        onClick={onRemove}
      >
        <XIcon />
      </button>
    </li>
  );
}

// ── UploadMedia ───────────────────────────────────────────────────────────────

/**
 * Drop-target / file-list surface for picking media files.
 *
 * Reuses `.input-field` wrapper and `--input-*` tokens from Text Input.
 * Four content variants: **empty** · **1 file** · **2 files** · **3 files (limit)**.
 *
 * **Usage rules:**
 * - Always set `label` and `subheading` to communicate accepted types and size limits.
 * - Use `accept` to filter the native file picker (e.g. `"image/*"`).
 * - Use `maxFiles` to cap how many files a user can attach (default 3).
 * - Pass `onFilesChange` to lift the current file list to the parent form.
 * - Set `disabled` to lock the entire field (label stays visible).
 */
export const UploadMedia = React.forwardRef(function UploadMedia(
  {
    /** Visible label above the drop zone. */
    label,
    /** Helper or error text below the drop zone. */
    caption,
    /** Primary text inside the empty-state area. */
    heading = 'Click to choose file',
    /** Secondary text (size/type hint) inside the empty state and below the file list. */
    subheading = 'Max: 5MB file',
    /** Controlled file list — array of `{ id, name, type, file?, preview? }`. */
    files: filesProp,
    /** Uncontrolled starting file list (same shape). */
    defaultFiles = [],
    /** Called with the updated file list on every add / remove. */
    onFilesChange,
    /** Maximum number of files allowed. Choose button hides once reached. */
    maxFiles = 3,
    /** Passed to the hidden `<input accept>` — e.g. `"image/*"`. */
    accept,
    /** Max file size in bytes — files above this are silently skipped (default 5 MB). */
    maxSize = 5 * 1024 * 1024,
    /** Force `.is-hover` class at rest — documentation helper for the full matrix. */
    hover = false,
    className,
    ...rest
  },
  ref
) {
  const isControlled = filesProp !== undefined;
  const [internal, setInternal] = useState(defaultFiles);
  const fileInputRef = useRef(null);

  const files = isControlled ? filesProp : internal;

  function updateFiles(next) {
    if (!isControlled) setInternal(next);
    onFilesChange?.(next);
  }

  function handleChoose(e) {
    e.preventDefault();
    fileInputRef.current?.click();
  }

  function handleInputChange(e) {
    const incoming = Array.from(e.target.files || []).filter((f) => f.size <= maxSize);
    const remaining = maxFiles - files.length;
    const valid = incoming.slice(0, remaining);
    const next = [
      ...files,
      ...valid.map((f) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name: f.name,
        type: f.type,
        file: f,
        preview: null,
      })),
    ];
    updateFiles(next);
    e.target.value = '';
  }

  function handleRemove(id) {
    updateFiles(files.filter((f) => f.id !== id));
  }

  const atLimit = files.length >= maxFiles;

  const uploadClass = ['upload', hover && 'is-hover'].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={['input-field', className].filter(Boolean).join(' ')} {...rest}>
      {label != null && <label className="input-field-label">{label}</label>}

      <div className={uploadClass}>
        {files.length === 0 ? (
          <div className="upload-empty">
            <UploadArrowIcon />
            <p className="upload-heading">{heading}</p>
            <p className="upload-subheading">{subheading}</p>
          </div>
        ) : (
          <>
            <ul className="upload-files">
              {files.map((entry) => (
                <FileItem
                  key={entry.id}
                  entry={entry}
                  onRemove={() => handleRemove(entry.id)}
                />
              ))}
            </ul>
            <p className="upload-subheading">{subheading}</p>
          </>
        )}

        {!atLimit && (
          <button type="button" className="btn btn-primary btn-sm" onClick={handleChoose}>
            Choose file
          </button>
        )}
      </div>

      {caption != null && <p className="input-field-caption">{caption}</p>}

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={accept}
        style={{ display: 'none' }}
        onChange={handleInputChange}
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
});

UploadMedia.displayName = 'UploadMedia';
UploadMedia.propTypes = {
  label:          PropTypes.node,
  caption:        PropTypes.node,
  heading:        PropTypes.string,
  subheading:     PropTypes.string,
  files:          PropTypes.arrayOf(PropTypes.shape({
    id:      PropTypes.string.isRequired,
    name:    PropTypes.string.isRequired,
    type:    PropTypes.string,
    file:    PropTypes.object,
    preview: PropTypes.string,
  })),
  defaultFiles:   PropTypes.array,
  onFilesChange:  PropTypes.func,
  maxFiles:       PropTypes.number,
  accept:         PropTypes.string,
  maxSize:        PropTypes.number,
  hover:          PropTypes.bool,
  className:      PropTypes.string,
};

export default UploadMedia;
