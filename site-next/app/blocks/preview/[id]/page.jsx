// Bare preview route — the block and nothing else, no shell or chrome.
//
// BlockCard iframes this at a fixed width so the block's own media queries fire
// for real. Sizing a <div> instead would resize the box without ever crossing a
// breakpoint, so "Mobile" would show the desktop layout at a narrow width —
// exactly the bug a viewport switcher exists to avoid.
import { notFound } from 'next/navigation';
import { blocks, blockById } from '@blocks/index.js';
import { PreviewAutoHeight } from '@/ui/PreviewAutoHeight.jsx';

export function generateStaticParams() {
  return blocks.map((b) => ({ id: b.id }));
}

export const metadata = { robots: { index: false } };

export default async function BlockPreview({ params }) {
  const { id } = await params;
  const block = blockById[id];
  if (!block) notFound();

  const Component = block.component;
  return (
    <div className="block-preview-root">
      <Component />
      <PreviewAutoHeight />
    </div>
  );
}
