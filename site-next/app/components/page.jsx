// Route ported from the Vite site's hand-rolled resolve() table in
// site/src/App.jsx. Next's folder structure is the route table now.

import { Shell } from '@/layout/Shell.jsx';
import { ComponentsIndex } from '@/views/Components.jsx';

export const metadata = { title: 'Components | DigiLawyer UI' };

export default function Page() {
  return (
    <Shell crumbs={[{ label: 'Components' }]}>
      <ComponentsIndex />
    </Shell>
  );
}
