// Route ported from the Vite site's hand-rolled resolve() table in
// site/src/App.jsx. Next's folder structure is the route table now.

import { Shell } from '@/layout/Shell.jsx';
import Changelog from '@/views/Changelog.jsx';

export const metadata = { title: 'Changelog | DigiLawyer UI' };

export default function Page() {
  return (
    <Shell crumbs={[{ label: 'Changelog' }]}>
      <Changelog />
    </Shell>
  );
}
