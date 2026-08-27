// Ported from the `clean.startsWith('/blocks/')` branch of the Vite site's
// resolve() table.

import { notFound } from 'next/navigation';
import { Shell } from '@/layout/Shell.jsx';
import { BlockCategory } from '@/views/Blocks.jsx';
import { blockCategoryByKey, blockCategories } from '@/data/blocks.js';

export function generateStaticParams() {
  return blockCategories.map((c) => ({ key: c.key }));
}

export async function generateMetadata({ params }) {
  const { key } = await params;
  const name = blockCategoryByKey[key]?.name;
  return { title: name ? `${name} | DigiLawyer UI` : 'Not found | DigiLawyer UI' };
}

export default async function Page({ params }) {
  const { key } = await params;
  if (!blockCategoryByKey[key]) notFound();

  return (
    <Shell crumbs={[{ label: 'Blocks', to: '/blocks' }, { label: blockCategoryByKey[key].name }]}>
      <BlockCategory categoryKey={key} />
    </Shell>
  );
}
