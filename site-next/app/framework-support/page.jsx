// Route ported from the Vite site's hand-rolled resolve() table in
// site/src/App.jsx. Next's folder structure is the route table now.

import { Shell } from '@/layout/Shell.jsx';
import FrameworkSupport from '@/views/FrameworkSupport.jsx';

export const metadata = { title: 'Framework Support | DigiLawyer UI' };

export default function Page() {
  return (
    <Shell crumbs={[{ label: 'Framework Support' }]}>
      <FrameworkSupport />
    </Shell>
  );
}
