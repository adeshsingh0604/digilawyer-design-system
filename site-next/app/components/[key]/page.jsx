// Ported from the `clean.startsWith('/components/')` branch of the Vite site's
// resolve() table. generateStaticParams pre-renders one real HTML file per
// component at build time — the whole point of the move to Next.

import { notFound } from 'next/navigation';
import { Shell } from '@/layout/Shell.jsx';
import { ComponentPage } from '@/views/Components.jsx';
import { routableComponents, componentNameByKey } from '@/data/components/registry.js';

export function generateStaticParams() {
  return routableComponents.map((c) => ({ key: c.key }));
}

export async function generateMetadata({ params }) {
  const { key } = await params;
  const name = componentNameByKey[key];
  return { title: name ? `${name} | DigiLawyer UI` : 'Not found | DigiLawyer UI' };
}

export default async function Page({ params }) {
  const { key } = await params;
  // The Vite site fell back to Home for an unknown key. A real 404 is the
  // correct answer now that each route is its own document.
  if (!componentNameByKey[key]) notFound();

  return (
    <Shell
      crumbs={[{ label: 'Components', to: '/components' }, { label: componentNameByKey[key] }]}
    >
      <ComponentPage componentKey={key} />
    </Shell>
  );
}
