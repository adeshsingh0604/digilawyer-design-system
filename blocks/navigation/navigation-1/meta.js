import { Navigation1 } from './Navigation1.jsx';

/**
 * `source` is what the user actually copies, so it is the real runnable file —
 * kept as a literal rather than read from disk because the site is a static
 * build and must not depend on the filesystem at runtime.
 */
export default {
  id: 'navigation-1',
  name: 'Navigation-1',
  description: 'Full desktop top bar with links, search, account and a primary action.',
  component: Navigation1,
  /** Preview height in px at desktop — keeps the card from collapsing. */
  height: 140,
  source: `import { Button, Input, Avatar, Link } from '@adeshsingh0604/digilawyer-ds';

export function Navigation1() {
  return (
    <header className="nav1">
      <a className="nav1-brand" href="#home">
        <span className="nav1-mark" aria-hidden="true">D</span>
        <span className="nav1-word">DigiLawyer</span>
      </a>

      <nav className="nav1-links" aria-label="Primary">
        <Link href="#notices" size="sm">Send Notice</Link>
        <Link href="#sign" size="sm">DGSign</Link>
        <Link href="#drafting" size="sm">Drafting</Link>
        <Link href="#storefront" size="sm">Storefronts</Link>
      </nav>

      <div className="nav1-actions">
        <div className="nav1-search">
          <Input size="sm" leadingIcon={<SearchIcon />} placeholder="Search cases…" aria-label="Search cases" />
        </div>
        <Avatar variant="initials" size="sm">AS</Avatar>
        <Button variant="primary" size="sm">New notice</Button>
      </div>
    </header>
  );
}`,
};
