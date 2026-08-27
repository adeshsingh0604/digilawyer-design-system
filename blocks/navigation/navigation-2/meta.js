import { Navigation2 } from './Navigation2.jsx';

export default {
  id: 'navigation-2',
  name: 'Navigation-2',
  description: 'Compact bar with a disclosure menu that works at any width.',
  component: Navigation2,
  height: 140,
  source: `import { useState } from 'react';
import { Button, Link } from '@adeshsingh0604/digilawyer-ds';

export function Navigation2() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav2">
      <div className="nav2-bar">
        <Button
          variant="tertiary"
          size="sm"
          square
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          iconLeft={open ? <CloseIcon /> : <MenuIcon />}
        />
        <a className="nav2-brand" href="#home">DigiLawyer</a>
        <span className="nav2-spacer" />
        <Button variant="primary" size="sm">Get started</Button>
      </div>

      {open && (
        <nav className="nav2-menu" aria-label="Primary">
          <Link href="#notices" size="sm">Send Notice</Link>
          <Link href="#sign" size="sm">DGSign</Link>
          <Link href="#drafting" size="sm">Drafting</Link>
          <Link href="#storefront" size="sm">Storefronts</Link>
        </nav>
      )}
    </header>
  );
}`,
};
