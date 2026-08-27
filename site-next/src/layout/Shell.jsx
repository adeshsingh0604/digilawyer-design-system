// Server Component. Composes the shell: it renders the breadcrumb trail and the
// page body on the server, and hands them to ShellFrame — the client island that
// owns sidebar/search/theme state — as already-rendered nodes.
//
// This is the split: `children` and `crumbs` never reach the browser as JS.
import React from 'react';
import { ShellFrame } from './ShellFrame.jsx';
import { Breadcrumbs } from './Breadcrumbs.jsx';
import { Sidebar } from './Sidebar.jsx';

export function Shell({ crumbs = [], children }) {
  return (
    <ShellFrame sidebar={<Sidebar />} crumbs={<Breadcrumbs crumbs={crumbs} />}>
      {children}
    </ShellFrame>
  );
}
