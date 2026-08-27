// Replaces the Vite site's spaFallback plugin, which copied index.html to
// 404.html so a static host could boot the SPA and let it re-read the URL.
// Next emits a real 404 document, so that whole workaround is gone.

import Link from 'next/link';
import { Shell } from '@/layout/Shell.jsx';

export const metadata = { title: 'Not found | DigiLawyer UI' };

export default function NotFound() {
  return (
    <Shell crumbs={[{ label: 'Not found' }]}>
      <div style={{ padding: '48px 0', maxWidth: 560 }}>
        <h1 style={{ font: '600 28px/1.2 Sora, sans-serif', marginBottom: 12 }}>Page not found</h1>
        <p style={{ marginBottom: 24, opacity: 0.75 }}>
          That route does not exist in the DigiLawyer UI docs.
        </p>
        <Link href="/components">Browse components →</Link>
      </div>
    </Shell>
  );
}
