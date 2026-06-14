import React from 'react';
import PropTypes from 'prop-types';

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '56%', height: '56%' }}>
    <circle cx="12" cy="8.5" r="3.5" fill="currentColor" />
    <path d="M5 19.5c0-3.6 3.1-6 7-6s7 2.4 7 6" fill="currentColor" />
  </svg>
);

/**
 * Circular indicator for a user or entity.
 *
 * Three fill variants — Icon (person silhouette), Initials (1–2 letters),
 * Image (clipped photo). Four sizes: xs 24 / sm 32 / md 40 / lg 48.
 *
 * **Usage rules:**
 * - Initials variant: always pass `aria-label` with the full name.
 * - Image variant: pass `alt` with the user's name on the `<img>`.
 * - Icon variant: pass `aria-label` describing the entity.
 * - Wrap in `<AvatarStack>` when composing with Badge or AvatarStatus.
 * - Use `as="button"` (or wrap in `<button>`) for interactive avatars.
 */
export const Avatar = React.forwardRef(function Avatar(
  {
    /** Icon = person silhouette · Initials = 1–2 letter text · Image = clipped photo. */
    variant = 'initials',
    /** xs = 24px · sm = 32px · md = 40px (default) · lg = 48px. */
    size = 'md',
    /** `src` for the image variant — passed to the inner `<img>`. */
    src,
    /** `alt` for the image variant — describe the person for screen readers. */
    alt = '',
    /** Initials text (1–2 chars) for the initials variant. */
    children,
    /** Additional class names merged onto the root element. */
    className,
    ...rest
  },
  ref
) {
  const classes = [
    'avatar',
    `avatar-${variant}`,
    size !== 'md' && `avatar-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span ref={ref} className={classes} {...rest}>
      {variant === 'icon' && <PersonIcon />}
      {variant === 'initials' && children}
      {variant === 'image' && <img src={src} alt={alt} />}
    </span>
  );
});

Avatar.displayName = 'Avatar';

Avatar.propTypes = {
  variant:   PropTypes.oneOf(['icon', 'initials', 'image']),
  size:      PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  src:       PropTypes.string,
  alt:       PropTypes.string,
  children:  PropTypes.node,
  className: PropTypes.string,
};

/**
 * Composition wrapper that shrink-wraps an Avatar so pinned Badge and
 * AvatarStatus elements anchor to its corners without being clipped.
 *
 * Pass `size` matching the inner Avatar's size so the status dot scales correctly.
 */
export const AvatarStack = React.forwardRef(function AvatarStack(
  { size, children, className, ...rest },
  ref
) {
  const classes = [
    'avatar-stack',
    size && size !== 'md' && `avatar-stack-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span ref={ref} className={classes} {...rest}>
      {children}
    </span>
  );
});

AvatarStack.displayName = 'AvatarStack';

AvatarStack.propTypes = {
  size:      PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  children:  PropTypes.node,
  className: PropTypes.string,
};

/**
 * Status dot — online / busy / away / offline indicator.
 *
 * Place inside `<AvatarStack>`. Use `pin="br"` (default) to anchor
 * to the bottom-right corner, or `pin="tr"` for top-right.
 * Always add `aria-label` — colour alone is not accessible.
 */
export const AvatarStatus = React.forwardRef(function AvatarStatus(
  {
    /** Colour of the status dot. */
    status = 'online',
    /** Which corner to pin to inside an AvatarStack. */
    pin = 'br',
    className,
    ...rest
  },
  ref
) {
  const classes = [
    'avatar-status',
    `avatar-status-${status}`,
    pin && `avatar-pin-${pin}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <span ref={ref} className={classes} {...rest} />;
});

AvatarStatus.displayName = 'AvatarStatus';

AvatarStatus.propTypes = {
  status:    PropTypes.oneOf(['online', 'busy', 'away', 'offline']),
  pin:       PropTypes.oneOf(['tr', 'br']),
  className: PropTypes.string,
};

export default Avatar;
