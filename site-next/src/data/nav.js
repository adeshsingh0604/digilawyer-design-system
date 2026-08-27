import { componentList } from './components';
import { blockCategories } from './blocks';

/**
 * Sidebar information architecture.
 *
 * `type: 'group'` renders a collapsible section; `type: 'link'` renders a leaf.
 */
export const nav = [
  {
    section: 'Quickstart',
    items: [
      { type: 'link', label: 'Installation', to: '/installation', icon: 'download' },
      { type: 'link', label: 'Framework Support', to: '/framework-support', icon: 'brackets' },
      { type: 'link', label: 'Changelog', to: '/changelog', icon: 'clock' },
    ],
  },
  {
    section: 'Explore',
    items: [
      {
        type: 'group',
        label: 'Components',
        to: '/components',
        icon: 'diamond',
        children: componentList.map((c) => ({ label: c.name, to: `/components/${c.key}` })),
      },
      {
        type: 'group',
        label: 'Blocks',
        to: '/blocks',
        icon: 'layers',
        children: blockCategories.map((b) => ({ label: b.name, to: `/blocks/${b.key}` })),
      },
      { type: 'link', label: 'Dashboards', to: '/dashboards', icon: 'grid' },
      { type: 'link', label: 'Templates', to: '/templates', icon: 'template' },
    ],
  },
];

export const socials = [
  { label: 'GitHub', href: 'https://github.com/adeshsingh0604/digilawyer-design-system' },
  { label: 'Storybook', href: 'https://adeshsingh0604.github.io/digilawyer-design-system/storybook/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adeshsingh0604' },
];
