/* ── DIGILAWYER DESIGN SYSTEM — ds.js v2.6.0 ─────────────────────────────
   Shared JS: global header (logo + version chip + search + theme toggle),
   sidebar + TOC injection, theme persistence (no FOUC), scroll-spy
   (IntersectionObserver + RAF scroll + click-pin), copy buttons.

   USAGE — every page declares one tiny config block, then loads ds.js,
   both in <head> BEFORE the stylesheet links so theme restore happens
   pre-paint:

     <head>
       <script>
         window.DS_PAGE = {
           key:  'colors',           // sidebar active key (must match a NAV key)
           root: '../'               // '' for root, '../' for sub-folders
           // toc omitted → ds.js auto-extracts h2[id] from <main>
           // toc: [{id,label},...] → explicit override (curated labels / h3s)
           // toc: false             → hide the TOC aside entirely
         };
       </script>
       <script src="../shared/ds.js"></script>
       <link rel="stylesheet" href="../shared/tokens.css">
       <link rel="stylesheet" href="../shared/layout.css">
       <link rel="stylesheet" href="../shared/components.css">
     </head>

   Body mount points (header is auto-injected — no mount point needed):

     <body>
       <nav   id="sidebar-mount"></nav>
       <main  class="main">  …content with h2[id="..."] anchors…  </main>
       <aside id="toc-mount"></aside>
     </body>

   Debug: append ?ds-debug=1 (or set window.DS_DEBUG = true before load) to
   log every active-section transition with its trigger reason.
   ──────────────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  var DS_VERSION = '2.8.0';
  var DEBUG = /[?&]ds-debug=1\b/.test(location.search) || window.DS_DEBUG === true;
  function dlog() {
    if (!DEBUG) return;
    var args = ['[ds.js]'].concat([].slice.call(arguments));
    console.log.apply(console, args);
  }
  function dwarn() {
    var args = ['[ds.js]'].concat([].slice.call(arguments));
    console.warn.apply(console, args);
  }

  /* ── 1. Theme restore — runs at script-parse time, before first paint ── */
  var _saved = localStorage.getItem('ds-theme');
  if (_saved === 'dark' || _saved === 'light') {
    document.documentElement.setAttribute('data-theme', _saved);
  }

  function cfg() {
    return (typeof window.DS_PAGE === 'object' && window.DS_PAGE) || {};
  }

  /* ── Navigation data ─────────────────────────────────────────────────── */
  var NAV = [
    { section: 'Foundation' },
    { label: 'Overview',      href: 'index.html',                   key: 'overview'      },
    { label: 'Colors',        href: 'foundation/colors.html',       key: 'colors'        },
    { label: 'Typography',    href: 'foundation/typography.html',   key: 'typography'    },
    { label: 'Spacing',       href: 'foundation/spacing.html',      key: 'spacing'       },
    { label: 'Radius',        href: 'foundation/radius.html',       key: 'radius'        },
    { label: 'Shadows',       href: 'foundation/shadows.html',      key: 'shadows'       },
    { label: 'Grid',          href: 'foundation/grid.html',         key: 'grid'          },
    { section: 'Inputs' },
    { label: 'Button',        href: 'components/button.html',       key: 'button'        },
    { label: 'Button Group',  href: 'components/button-group.html', key: 'button-group'  },
    { label: 'Checkbox',      href: 'components/checkbox.html',     key: 'checkbox'      },
    { label: 'Radio Button',  href: 'components/radio.html',        key: 'radio'         },
    { label: 'Toggle Switch', href: 'components/toggle.html',       key: 'toggle'        },
    { label: 'Dropdown',      href: 'components/dropdown.html',     key: 'dropdown'      },
    { label: 'Text Input',    href: 'components/input.html',        key: 'input'         },
    { label: 'Text Area',     href: 'components/textarea.html',     key: 'textarea'      },
    { label: 'Upload Media',  href: 'components/upload-media.html', key: 'upload-media',  stub: true },
    { label: 'Slider',        href: 'components/slider.html',       key: 'slider',        stub: true },
    { label: 'Rating',        href: 'components/rating.html',       key: 'rating',        stub: true },
    { label: 'Date Picker',   href: 'components/date-picker.html',  key: 'date-picker',   stub: true },
    { label: 'Options',       href: 'components/options.html',      key: 'options',       stub: true },
    { section: 'Data Display' },
    { label: 'Avatar',        href: 'components/avatar.html',       key: 'avatar'        },
    { label: 'Badge',         href: 'components/badge.html',        key: 'badge'         },
    { label: 'Tag',           href: 'components/tag.html',          key: 'tag'           },
    { label: 'Table',         href: 'components/table.html',        key: 'table'         },
    { label: 'Accordion',     href: 'components/accordion.html',    key: 'accordion'     },
    { label: 'List Group',    href: 'components/list-group.html',   key: 'list-group',    stub: true },
    { label: 'Images',        href: 'components/images.html',       key: 'images',        stub: true },
    { section: 'Feedback' },
    { label: 'Notification',  href: 'components/notification.html', key: 'notification'  },
    { label: 'Snackbar',      href: 'components/snackbar.html',     key: 'snackbar'      },
    { label: 'Tooltip',       href: 'components/tooltip.html',      key: 'tooltip'       },
    { label: 'Progress Bar',  href: 'components/progress-bar.html', key: 'progress-bar'  },
    { section: 'Navigation' },
    { label: 'Tabs',          href: 'components/tabs.html',         key: 'tabs'          },
    { label: 'Link',          href: 'components/link.html',         key: 'link'          },
    { label: 'Pagination',    href: 'components/pagination.html',   key: 'pagination'    },
    { label: 'Breadcrumb',    href: 'components/breadcrumb.html',   key: 'breadcrumb'    },
    { section: 'Other' },
    { label: 'Changelog',     href: 'other/changelog.html',         key: 'changelog'     }
  ];

  var NAV_KEYS = NAV.filter(function (n) { return n.key; }).map(function (n) { return n.key; });

  /* ── Search index ──────────────────────────────────────────────────────
     Compact source form (SEARCH_DOCS + SEARCH_TOKENS) expanded to a flat
     entry list at runtime. Keep this in sync as pages get documented or
     new tokens are added. Each entry surfaces as a suggestion in the
     header search dropdown.                                              */
  var SEARCH_DOCS = [
    { label: 'Overview',     href: 'index.html', context: 'Page',
      sections: [['overview','Overview'],['quick-links','Quick Links'],['components','Components'],['latest-changes','Latest Changes']] },
    { label: 'Colors',       href: 'foundation/colors.html', context: 'Foundation',
      sections: [['primitives','Color Primitives'],['neutral','Neutral'],['blue','Blue'],['gold','Gold'],['red','Red'],['green','Green'],['yellow','Yellow'],['purple','Purple'],['orange','Orange'],['semantic','Semantic Tokens'],['surface','Surface tokens'],['status','Status tokens'],['button-tokens','Button tokens']] },
    { label: 'Typography',   href: 'foundation/typography.html', context: 'Foundation',
      sections: [['fonts','Font Families'],['font-sizes','Font Sizes'],['type-scale','Type Scale'],['weights','Weights'],['line-heights','Line Heights']] },
    { label: 'Spacing',      href: 'foundation/spacing.html', context: 'Foundation',
      sections: [['primitives','Spacing Primitives'],['tokens','Spacing Tokens']] },
    { label: 'Radius',       href: 'foundation/radius.html', context: 'Foundation',
      sections: [['rad-scale','Scale'],['rad-usage','Usage by component'],['rad-reference','Token reference']] },
    { label: 'Shadows',      href: 'foundation/shadows.html', context: 'Foundation',
      sections: [['sh-levels','Levels'],['sh-light','Light mode'],['sh-dark','Dark mode'],['sh-reference','Token reference']] },
    { label: 'Grid',         href: 'foundation/grid.html', context: 'Foundation',
      sections: [['breakpoints','Breakpoints'],['desktop','Desktop Grid'],['tablet','Tablet Grid'],['mobile','Mobile Grid'],['tokens-ref','Token Reference']] },

    { label: 'Button',       href: 'components/button.html', context: 'Component',
      sections: [['basic-button','Basic button'],['variants','Variants'],['sizes','Sizes'],['states','States'],['with-icons','With icons'],['loading','Loading'],['full-matrix','Full matrix'],['api','API']] },
    { label: 'Button Group', href: 'components/button-group.html', context: 'Component',
      sections: [['default','Default'],['attached-separated','Attached vs separated'],['sizes','Sizes'],['with-icons','With icons'],['toggle','Toggle / selection'],['vertical','Vertical'],['states','States'],['full-matrix','Full matrix'],['api','API']] },
    { label: 'Checkbox',     href: 'components/checkbox.html', context: 'Component',
      sections: [['default','Default'],['variants','Variants'],['states','States'],['full-matrix','Full matrix'],['api','API']] },
    { label: 'Radio Button', href: 'components/radio.html', context: 'Component',
      sections: [['default','Default'],['variants','Variants'],['states','States'],['full-matrix','Full matrix'],['api','API']] },

    /* Stubs — page-level only, no sections yet */
    { label: 'Toggle Switch', href: 'components/toggle.html',        context: 'Component (stub)' },
    { label: 'Dropdown',      href: 'components/dropdown.html',      context: 'Component (stub)' },
    { label: 'Text Input',    href: 'components/input.html',         context: 'Component (stub)' },
    { label: 'Text Area',     href: 'components/textarea.html',      context: 'Component (stub)' },
    { label: 'Upload Media',  href: 'components/upload-media.html',  context: 'Component (stub)' },
    { label: 'Slider',        href: 'components/slider.html',        context: 'Component (stub)' },
    { label: 'Rating',        href: 'components/rating.html',        context: 'Component (stub)' },
    { label: 'Date Picker',   href: 'components/date-picker.html',   context: 'Component (stub)' },
    { label: 'Options',       href: 'components/options.html',       context: 'Component (stub)' },
    { label: 'Avatar',        href: 'components/avatar.html',        context: 'Component (stub)' },
    { label: 'Badge',         href: 'components/badge.html',         context: 'Component (stub)' },
    { label: 'Tag',           href: 'components/tag.html',           context: 'Component (stub)' },
    { label: 'Table',         href: 'components/table.html',         context: 'Component (stub)' },
    { label: 'Accordion',     href: 'components/accordion.html',     context: 'Component (stub)' },
    { label: 'List Group',    href: 'components/list-group.html',    context: 'Component (stub)' },
    { label: 'Images',        href: 'components/images.html',        context: 'Component (stub)' },
    { label: 'Notification',  href: 'components/notification.html',  context: 'Component (stub)' },
    { label: 'Snackbar',      href: 'components/snackbar.html',      context: 'Component (stub)' },
    { label: 'Tooltip',       href: 'components/tooltip.html',       context: 'Component (stub)' },
    { label: 'Progress Bar',  href: 'components/progress-bar.html',  context: 'Component (stub)' },
    { label: 'Tabs',          href: 'components/tabs.html',          context: 'Component (stub)' },
    { label: 'Link',          href: 'components/link.html',          context: 'Component (stub)' },
    { label: 'Pagination',    href: 'components/pagination.html',    context: 'Component (stub)' },
    { label: 'Breadcrumb',    href: 'components/breadcrumb.html',    context: 'Component (stub)' },

    { label: 'Changelog',    href: 'other/changelog.html', context: 'Other',
      sections: [['all-versions','All versions']] }
  ];

  /* Tokens — [name, href, group]. Href targets the page+anchor where the
     token is demoed / documented. Group is the human-readable bucket. */
  var SEARCH_TOKENS = [
    /* Colour — surface */
    ['--color-bg',            'foundation/colors.html#surface', 'Color'],
    ['--color-bg-2',          'foundation/colors.html#surface', 'Color'],
    ['--color-heading',       'foundation/colors.html#surface', 'Color'],
    ['--color-subheading',    'foundation/colors.html#surface', 'Color'],
    ['--color-border',        'foundation/colors.html#surface', 'Color'],
    ['--color-border-2',      'foundation/colors.html#surface', 'Color'],
    ['--color-brand-accent',  'foundation/colors.html#surface', 'Color'],
    /* Colour — status */
    ['--color-info-bg',       'foundation/colors.html#status', 'Color'],
    ['--color-info-text',     'foundation/colors.html#status', 'Color'],
    ['--color-success-bg',    'foundation/colors.html#status', 'Color'],
    ['--color-success-text',  'foundation/colors.html#status', 'Color'],
    ['--color-warning-bg',    'foundation/colors.html#status', 'Color'],
    ['--color-warning-text',  'foundation/colors.html#status', 'Color'],
    ['--color-danger-bg',     'foundation/colors.html#status', 'Color'],
    ['--color-danger-text',   'foundation/colors.html#status', 'Color'],
    ['--color-alert-bg',      'foundation/colors.html#status', 'Color'],
    ['--color-alert-text',    'foundation/colors.html#status', 'Color'],
    ['--color-notice-bg',     'foundation/colors.html#status', 'Color'],
    ['--color-notice-text',   'foundation/colors.html#status', 'Color'],

    /* Typography */
    ['--font-primary',  'foundation/typography.html#fonts', 'Typography'],
    ['--font-display',  'foundation/typography.html#fonts', 'Typography'],
    ['--font-mono',     'foundation/typography.html#fonts', 'Typography'],
    ['--fs-10',  'foundation/typography.html#font-sizes', 'Typography'],
    ['--fs-12',  'foundation/typography.html#font-sizes', 'Typography'],
    ['--fs-14',  'foundation/typography.html#font-sizes', 'Typography'],
    ['--fs-16',  'foundation/typography.html#font-sizes', 'Typography'],
    ['--fs-20',  'foundation/typography.html#font-sizes', 'Typography'],
    ['--fs-24',  'foundation/typography.html#font-sizes', 'Typography'],
    ['--fs-32',  'foundation/typography.html#font-sizes', 'Typography'],
    ['--fs-40',  'foundation/typography.html#font-sizes', 'Typography'],
    ['--fs-48',  'foundation/typography.html#font-sizes', 'Typography'],
    ['--fs-56',  'foundation/typography.html#font-sizes', 'Typography'],
    ['--fs-64',  'foundation/typography.html#font-sizes', 'Typography'],
    ['--fw-extralight','foundation/typography.html#weights', 'Typography'],
    ['--fw-light',     'foundation/typography.html#weights', 'Typography'],
    ['--fw-regular',   'foundation/typography.html#weights', 'Typography'],
    ['--fw-medium',    'foundation/typography.html#weights', 'Typography'],
    ['--fw-semibold',  'foundation/typography.html#weights', 'Typography'],
    ['--fw-bold',      'foundation/typography.html#weights', 'Typography'],
    ['--fw-extrabold', 'foundation/typography.html#weights', 'Typography'],
    ['--fw-black',     'foundation/typography.html#weights', 'Typography'],
    ['--lh-12','foundation/typography.html#line-heights','Typography'],
    ['--lh-16','foundation/typography.html#line-heights','Typography'],
    ['--lh-20','foundation/typography.html#line-heights','Typography'],
    ['--lh-24','foundation/typography.html#line-heights','Typography'],
    ['--lh-32','foundation/typography.html#line-heights','Typography'],
    ['--lh-40','foundation/typography.html#line-heights','Typography'],
    ['--lh-48','foundation/typography.html#line-heights','Typography'],
    ['--lh-56','foundation/typography.html#line-heights','Typography'],
    ['--lh-64','foundation/typography.html#line-heights','Typography'],
    ['--lh-72','foundation/typography.html#line-heights','Typography'],

    /* Spacing */
    ['--spacing-xxs',     'foundation/spacing.html#tokens', 'Spacing'],
    ['--spacing-xs',      'foundation/spacing.html#tokens', 'Spacing'],
    ['--spacing-sm',      'foundation/spacing.html#tokens', 'Spacing'],
    ['--spacing-md',      'foundation/spacing.html#tokens', 'Spacing'],
    ['--spacing-lg',      'foundation/spacing.html#tokens', 'Spacing'],
    ['--spacing-xl',      'foundation/spacing.html#tokens', 'Spacing'],
    ['--spacing-2xl',     'foundation/spacing.html#tokens', 'Spacing'],
    ['--spacing-3xl',     'foundation/spacing.html#tokens', 'Spacing'],
    ['--spacing-4xl',     'foundation/spacing.html#tokens', 'Spacing'],
    ['--spacing-section', 'foundation/spacing.html#tokens', 'Spacing'],
    ['--spacing-page',    'foundation/spacing.html#tokens', 'Spacing'],

    /* Radius */
    ['--radius-xs',   'foundation/radius.html#rad-reference', 'Radius'],
    ['--radius-sm',   'foundation/radius.html#rad-reference', 'Radius'],
    ['--radius-md',   'foundation/radius.html#rad-reference', 'Radius'],
    ['--radius-lg',   'foundation/radius.html#rad-reference', 'Radius'],
    ['--radius-xl',   'foundation/radius.html#rad-reference', 'Radius'],
    ['--radius-2xl',  'foundation/radius.html#rad-reference', 'Radius'],
    ['--radius-full', 'foundation/radius.html#rad-reference', 'Radius'],

    /* Shadow */
    ['--shadow-1', 'foundation/shadows.html#sh-reference', 'Shadow'],
    ['--shadow-2', 'foundation/shadows.html#sh-reference', 'Shadow'],
    ['--shadow-3', 'foundation/shadows.html#sh-reference', 'Shadow'],
    ['--shadow-4', 'foundation/shadows.html#sh-reference', 'Shadow'],
    ['--shadow-5', 'foundation/shadows.html#sh-reference', 'Shadow'],

    /* Button — Primary */
    ['--btn-primary-bg',            'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-primary-text',          'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-primary-bg-hover',      'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-primary-bg-active',     'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-primary-bg-disabled',   'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-primary-text-disabled', 'foundation/colors.html#button-tokens', 'Button'],
    /* Button — Secondary */
    ['--btn-secondary-bg',            'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-secondary-text',          'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-secondary-bg-hover',      'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-secondary-bg-active',     'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-secondary-bg-disabled',   'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-secondary-text-disabled', 'foundation/colors.html#button-tokens', 'Button'],
    /* Button — Tertiary */
    ['--btn-tertiary-bg',            'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-tertiary-text',          'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-tertiary-border',        'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-tertiary-bg-hover',      'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-tertiary-solid-bg',      'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-tertiary-solid-border',  'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-tertiary-text-disabled', 'foundation/colors.html#button-tokens', 'Button'],
    /* Button — Ghost */
    ['--btn-ghost-bg',            'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-ghost-text',          'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-ghost-bg-hover',      'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-ghost-bg-active',     'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-ghost-text-disabled', 'foundation/colors.html#button-tokens', 'Button'],
    /* Button — Danger */
    ['--btn-danger-bg',            'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-danger-text',          'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-danger-bg-hover',      'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-danger-bg-active',     'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-danger-bg-disabled',   'foundation/colors.html#button-tokens', 'Button'],
    ['--btn-danger-text-disabled', 'foundation/colors.html#button-tokens', 'Button'],

    /* Button Group */
    ['--btn-group-gap',     'components/button-group.html#api', 'Button Group'],
    ['--btn-group-overlap', 'components/button-group.html#api', 'Button Group'],

    /* Checkbox */
    ['--checkbox-bg',                       'components/checkbox.html#api', 'Checkbox'],
    ['--checkbox-border',                   'components/checkbox.html#api', 'Checkbox'],
    ['--checkbox-bg-hover',                 'components/checkbox.html#api', 'Checkbox'],
    ['--checkbox-border-hover',             'components/checkbox.html#api', 'Checkbox'],
    ['--checkbox-bg-disabled',              'components/checkbox.html#api', 'Checkbox'],
    ['--checkbox-border-disabled',          'components/checkbox.html#api', 'Checkbox'],
    ['--checkbox-checked-bg',               'components/checkbox.html#api', 'Checkbox'],
    ['--checkbox-checked-border',           'components/checkbox.html#api', 'Checkbox'],
    ['--checkbox-checked-glyph',            'components/checkbox.html#api', 'Checkbox'],
    ['--checkbox-checked-bg-hover',         'components/checkbox.html#api', 'Checkbox'],
    ['--checkbox-checked-border-hover',     'components/checkbox.html#api', 'Checkbox'],
    ['--checkbox-checked-bg-disabled',      'components/checkbox.html#api', 'Checkbox'],
    ['--checkbox-checked-border-disabled',  'components/checkbox.html#api', 'Checkbox'],

    /* Radio Button */
    ['--radio-bg',                       'components/radio.html#api', 'Radio'],
    ['--radio-border',                   'components/radio.html#api', 'Radio'],
    ['--radio-bg-hover',                 'components/radio.html#api', 'Radio'],
    ['--radio-border-hover',             'components/radio.html#api', 'Radio'],
    ['--radio-bg-disabled',              'components/radio.html#api', 'Radio'],
    ['--radio-border-disabled',          'components/radio.html#api', 'Radio'],
    ['--radio-checked-bg',               'components/radio.html#api', 'Radio'],
    ['--radio-checked-border',           'components/radio.html#api', 'Radio'],
    ['--radio-checked-dot',              'components/radio.html#api', 'Radio'],
    ['--radio-checked-bg-hover',         'components/radio.html#api', 'Radio'],
    ['--radio-checked-border-hover',     'components/radio.html#api', 'Radio'],
    ['--radio-checked-bg-disabled',      'components/radio.html#api', 'Radio'],
    ['--radio-checked-border-disabled',  'components/radio.html#api', 'Radio'],

    /* System */
    ['--ds-version',       'index.html', 'System'],
    ['--ds-header-height', 'index.html', 'System'],
    ['--sidebar-width',    'index.html', 'System'],
    ['--toc-width',        'index.html', 'System']
  ];

  function buildSearchIndex() {
    var idx = [];
    SEARCH_DOCS.forEach(function (page) {
      idx.push({ type: 'page', label: page.label, href: page.href, context: page.context });
      (page.sections || []).forEach(function (s) {
        idx.push({ type: 'section', label: s[1], href: page.href + '#' + s[0], context: page.label });
      });
    });
    SEARCH_TOKENS.forEach(function (t) {
      idx.push({ type: 'token', label: t[0], href: t[1], context: t[2] });
    });
    return idx;
  }
  var SEARCH_INDEX = buildSearchIndex();

  /* ── 2. SVG sprite injection ─────────────────────────────────────────── */
  function injectSprite() {
    if (document.getElementById('ico-sun')) return;
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('style', 'display:none');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.innerHTML =
      '<defs>' +
      '<symbol id="ico-plus" viewBox="0 0 16 16">' +
        '<path d="M8 3.5v9M3.5 8h9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>' +
      '</symbol>' +
      '<symbol id="ico-sun" viewBox="0 0 14 14">' +
        '<circle cx="7" cy="7" r="2.5" stroke="currentColor" stroke-width="1.3" fill="none"/>' +
        '<path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M3.05 3.05l1.06 1.06M9.89 9.89l1.06 1.06M10.95 3.05l-1.06 1.06M4.11 9.89 3.05 10.95" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>' +
      '</symbol>' +
      '<symbol id="ico-moon" viewBox="0 0 14 14">' +
        '<path d="M12 8.5A5.5 5.5 0 0 1 5.5 2c0-.3.02-.6.06-.9A5.5 5.5 0 1 0 12.9 8.44 5.5 5.5 0 0 1 12 8.5z" stroke="currentColor" stroke-width="1.3" fill="none"/>' +
      '</symbol>' +
      '<symbol id="ico-check" viewBox="0 0 16 16">' +
        '<path d="M3.5 8.5l3 3 6-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
      '</symbol>' +
      '<symbol id="ico-dash" viewBox="0 0 16 16">' +
        '<path d="M4 8h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>' +
      '</symbol>' +
      '<symbol id="ico-search" viewBox="0 0 14 14">' +
        '<circle cx="6" cy="6" r="4" stroke="currentColor" stroke-width="1.3" fill="none"/>' +
        '<path d="M9.5 9.5L12.5 12.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>' +
      '</symbol>' +
      '</defs>';
    document.body.insertBefore(svg, document.body.firstChild);
  }

  /* ── 3. Global header injection ──────────────────────────────────────── */
  function injectHeader() {
    if (document.querySelector('.ds-header')) return;
    var c = cfg();
    var root = c.root || '';
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    var header = document.createElement('header');
    header.className = 'ds-header';
    header.innerHTML =
      '<a class="ds-header-brand" href="' + root + 'index.html">' +
        '<span>DigiLawyer DS</span>' +
        '<span class="sb-tag">v' + DS_VERSION + '</span>' +
      '</a>' +
      '<div class="ds-header-actions">' +
        '<div class="ds-search">' +
          '<svg class="ds-search-icon" aria-hidden="true"><use href="#ico-search"/></svg>' +
          '<input type="text" class="ds-search-input" placeholder="Search components, tokens, sections…" aria-label="Search documentation" autocomplete="off" spellcheck="false">' +
          '<ul class="ds-search-results" role="listbox" hidden></ul>' +
        '</div>' +
        '<button class="theme-btn" id="themeToggle" title="Toggle theme" aria-label="Toggle theme">' +
          '<svg width="14" height="14" viewBox="0 0 14 14">' +
            '<use href="#' + (isDark ? 'ico-moon' : 'ico-sun') + '" id="themeIcon"/>' +
          '</svg>' +
        '</button>' +
      '</div>';
    document.body.insertBefore(header, document.body.firstChild);
  }

  /* ── 4. Sidebar injection ────────────────────────────────────────────── */
  function buildSidebar() {
    var mount = document.getElementById('sidebar-mount');
    if (!mount) return;
    var c      = cfg();
    var root   = c.root || '';
    var active = c.key  || '';

    if (active && NAV_KEYS.indexOf(active) === -1) {
      dwarn('DS_PAGE.key "' + active + '" does not match any NAV entry. Sidebar active state will not light up.');
    }

    var nav = document.createElement('nav');
    nav.className = 'sidebar';

    /* No more .sb-header — logo, version chip, and theme toggle live in
       the global header. Sidebar starts directly with nav sections. */

    NAV.forEach(function (item) {
      if (item.section) {
        var sec = document.createElement('div');
        sec.className = 'sb-section';
        sec.textContent = item.section;
        nav.appendChild(sec);
      } else {
        var a = document.createElement('a');
        a.href = root + item.href;
        a.className = item.stub ? 'sb-link-stub' : 'sb-link';
        if (!item.stub && item.key === active) a.className += ' active';
        a.textContent = item.label;
        nav.appendChild(a);
      }
    });

    mount.parentNode.replaceChild(nav, mount);
  }

  /* ── 5. TOC injection ─────────────────────────────────────────────────
     Source of truth precedence:
       1. DS_PAGE.toc === false        → hide TOC entirely
       2. DS_PAGE.toc = [{id,label},…] → use exactly this list
       3. omitted / undefined          → auto-extract from <main> h2[id]
   ───────────────────────────────────────────────────────────────────── */
  function resolveTocSections() {
    var explicit = cfg().toc;
    if (explicit === false) return null;
    if (Array.isArray(explicit) && explicit.length) return explicit;
    var scope = document.querySelector('main.main') || document;
    var h2s = scope.querySelectorAll('h2[id]');
    if (!h2s.length) return [];
    var out = [];
    h2s.forEach(function (h) {
      out.push({ id: h.id, label: h.textContent.trim() });
    });
    return out;
  }

  function buildTOC() {
    var mount = document.getElementById('toc-mount');
    if (!mount) return null;
    var sections = resolveTocSections();
    if (sections === null || !sections.length) {
      mount.parentNode.removeChild(mount);
      return null;
    }
    if (Array.isArray(cfg().toc)) {
      sections.forEach(function (s) {
        if (!document.getElementById(s.id)) {
          dwarn('DS_PAGE.toc references id="' + s.id + '" but no element with that id exists on the page.');
        }
      });
    }
    var aside = document.createElement('aside');
    aside.className = 'toc';
    var title = document.createElement('div');
    title.className = 'toc-title';
    title.textContent = 'Contents';
    aside.appendChild(title);
    sections.forEach(function (s) {
      var a = document.createElement('a');
      a.href = '#' + s.id;
      a.className = 'toc-link';
      a.textContent = s.label;
      aside.appendChild(a);
    });
    mount.parentNode.replaceChild(aside, mount);
    return sections;
  }

  /* ── 6. Version display from CSS token ───────────────────────────────── */
  function updateVersion() {
    var raw = getComputedStyle(document.documentElement).getPropertyValue('--ds-version');
    var v = raw ? raw.trim().replace(/['"]/g, '') : DS_VERSION;
    if (!v) v = DS_VERSION;
    document.querySelectorAll('.sb-tag').forEach(function (el) {
      el.textContent = 'v' + v;
    });
    var badge = document.querySelector('.version-badge');
    if (badge) badge.textContent = 'v' + v;
  }

  /* ── 7. Theme toggle ─────────────────────────────────────────────────── */
  /* Suppress every element's CSS transition for the instant of the theme
     swap. Without this, body / header / sidebar / each .sb-link / each
     demo-box all animate independently over 200ms and visibly trail one
     another — reads as flicker, especially on the sidebar with ~30 nav
     links each running their own `transition: all 0.12s`. With the
     suppression the colour change is synchronous across every element,
     then transitions resume on the next animation frame.                */
  function initThemeToggle() {
    var btn = document.getElementById('themeToggle');
    var ico = document.getElementById('themeIcon');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      var next = dark ? 'light' : 'dark';
      var root = document.documentElement;
      root.classList.add('ds-no-transitions');
      root.setAttribute('data-theme', next);
      localStorage.setItem('ds-theme', next);
      if (ico) ico.setAttribute('href', dark ? '#ico-sun' : '#ico-moon');
      void root.offsetHeight;  // force reflow with transitions off
      requestAnimationFrame(function () {
        root.classList.remove('ds-no-transitions');
      });
    });
  }

  /* ── 8. Header search ───────────────────────────────────────────────────
     Substring match on label, ranked: exact > prefix > contains. Up to
     12 results in a dropdown. Keyboard nav: ↓/↑ move highlight, Enter
     navigates, Esc closes. Clicks navigate via the rendered <a> href.   */
  function initSearch() {
    var input = document.querySelector('.ds-search-input');
    var list  = document.querySelector('.ds-search-results');
    if (!input || !list) return;
    var root = cfg().root || '';
    var MAX_RESULTS = 12;
    var highlight = -1;

    function rank(label, q) {
      var l = label.toLowerCase();
      if (l === q) return 0;
      if (l.indexOf(q) === 0) return 1;
      if (l.indexOf(q) !== -1) return 2;
      return -1;
    }

    function search(q) {
      q = q.trim().toLowerCase();
      if (!q) return [];
      var scored = [];
      SEARCH_INDEX.forEach(function (item) {
        var r = rank(item.label, q);
        if (r >= 0) scored.push({ item: item, rank: r });
      });
      scored.sort(function (a, b) {
        if (a.rank !== b.rank) return a.rank - b.rank;
        if (a.item.type !== b.item.type) {
          var order = { page: 0, section: 1, token: 2 };
          return order[a.item.type] - order[b.item.type];
        }
        return a.item.label.localeCompare(b.item.label);
      });
      return scored.slice(0, MAX_RESULTS).map(function (s) { return s.item; });
    }

    function render(results) {
      list.innerHTML = '';
      highlight = -1;
      if (!results.length) {
        var empty = document.createElement('li');
        empty.className = 'ds-search-empty';
        empty.textContent = 'No matches.';
        list.appendChild(empty);
        return;
      }
      results.forEach(function (item, i) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.className = 'ds-search-item';
        a.href = root + item.href;
        a.setAttribute('data-index', i);
        a.innerHTML =
          '<span class="ds-search-item-kind is-' + item.type + '">' + item.type + '</span>' +
          '<span class="ds-search-item-body">' +
            '<span class="ds-search-item-label"></span>' +
            '<span class="ds-search-item-context"></span>' +
          '</span>';
        a.querySelector('.ds-search-item-label').textContent = item.label;
        a.querySelector('.ds-search-item-context').textContent = item.context;
        a.addEventListener('mouseenter', function () { setHighlight(i); });
        li.appendChild(a);
        list.appendChild(li);
      });
    }

    function setHighlight(i) {
      var items = list.querySelectorAll('.ds-search-item');
      if (!items.length) return;
      if (i < 0) i = items.length - 1;
      if (i >= items.length) i = 0;
      highlight = i;
      items.forEach(function (el, idx) {
        el.classList.toggle('is-active', idx === i);
      });
      var active = items[i];
      if (active && active.scrollIntoView) {
        active.scrollIntoView({ block: 'nearest' });
      }
    }

    function open()  { list.hidden = false; }
    function close() { list.hidden = true; highlight = -1; }

    input.addEventListener('input', function () {
      var results = search(input.value);
      render(results);
      open();
    });
    input.addEventListener('focus', function () {
      if (input.value.trim()) open();
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setHighlight(highlight + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlight(highlight - 1); }
      else if (e.key === 'Enter') {
        var items = list.querySelectorAll('.ds-search-item');
        if (!items.length) return;
        var target = items[highlight >= 0 ? highlight : 0];
        if (target) { e.preventDefault(); location.href = target.href; }
      }
      else if (e.key === 'Escape') { close(); input.blur(); }
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.ds-search')) close();
    });
  }

  /* ── 9. TOC scroll-spy ──────────────────────────────────────────────────
     Active section = last heading whose top is ≤ LINE (defaults to 100px,
     bumped to header-height + 24 once a header is present so the indicator
     transitions when the next heading clears the header bar).            */
  function initTOCSpy(sections) {
    if (!sections || !sections.length) return;
    var links = document.querySelectorAll('.toc-link');
    if (!links.length) return;

    var headings = [];
    sections.forEach(function (s) {
      var h = document.getElementById(s.id);
      if (h) headings.push(h);
    });
    if (!headings.length) return;

    var linkById = {};
    links.forEach(function (l) {
      linkById[l.getAttribute('href').slice(1)] = l;
    });

    var currentId = null;
    function setActive(id, reason) {
      if (id === currentId) return;
      currentId = id;
      links.forEach(function (l) {
        l.classList.toggle('active', l.getAttribute('href') === '#' + id);
      });
      dlog('active →', id, '(' + reason + ')');
    }

    var pinUntil = 0;
    var headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--ds-header-height'), 10) || 0;
    var LINE = Math.max(100, headerHeight + 24);

    function update(reason) {
      if (Date.now() < pinUntil) return;
      var current = headings[0];
      for (var i = 0; i < headings.length; i++) {
        if (headings[i].getBoundingClientRect().top <= LINE) {
          current = headings[i];
        } else {
          break;
        }
      }
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 4) {
        current = headings[headings.length - 1];
      }
      setActive(current.id, reason || 'recompute');
    }

    var ob = new IntersectionObserver(function () { update('io'); }, { rootMargin: '0px 0px -90% 0px' });
    headings.forEach(function (h) { ob.observe(h); });

    var rafQueued = false;
    window.addEventListener('scroll', function () {
      if (rafQueued) return;
      rafQueued = true;
      requestAnimationFrame(function () { rafQueued = false; update('scroll'); });
    }, { passive: true });

    window.addEventListener('hashchange', function () {
      var id = location.hash.slice(1);
      if (id && linkById[id]) {
        setActive(id, 'hashchange');
        pinUntil = Date.now() + 800;
      }
    });

    update('init');
  }

  /* ── 10. Copy buttons ────────────────────────────────────────────────── */
  function initCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        var pre = document.getElementById(b.dataset.target);
        if (!pre) return;
        navigator.clipboard.writeText(pre.innerText).then(function () {
          b.textContent = 'Copied!';
          b.classList.add('ok');
          setTimeout(function () { b.textContent = 'Copy'; b.classList.remove('ok'); }, 1800);
        });
      });
    });
  }

  /* ── Init ────────────────────────────────────────────────────────────── */
  function init() {
    injectSprite();
    injectHeader();
    buildSidebar();
    var sections = buildTOC();
    updateVersion();
    initThemeToggle();
    initSearch();
    initTOCSpy(sections);
    initCopyButtons();
    if (DEBUG) dlog('init complete', { version: DS_VERSION, key: cfg().key, sections: sections, searchEntries: SEARCH_INDEX.length });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
