import React from 'react';
import { Table, TableWrap, TableCell, TableCellAction } from './Table';

export default {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

// ── Playground ────────────────────────────────────────────────────────────────
export const Playground = {
  render: () => (
    <TableWrap style={{ maxWidth: 640 }}>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Adesh Singh</td>
            <td>Active</td>
            <td>Owner</td>
            <td>
              <TableCell end>
                <TableCellAction aria-label="More actions for Adesh Singh" />
              </TableCell>
            </td>
          </tr>
          <tr>
            <td>Jane Doe</td>
            <td>Pending</td>
            <td>Editor</td>
            <td>
              <TableCell end>
                <TableCellAction aria-label="More actions for Jane Doe" />
              </TableCell>
            </td>
          </tr>
        </tbody>
      </Table>
    </TableWrap>
  ),
};

// ── Default — 6 columns × 4 rows (mirrors HTML docs) ─────────────────────────
export const Default = {
  render: () => (
    <TableWrap>
      <Table>
        <thead>
          <tr>
            <th>Label</th><th>Label</th><th>Label</th>
            <th>Label</th><th>Label</th><th>Label</th>
          </tr>
        </thead>
        <tbody>
          {[0, 1, 2, 3].map((row) => (
            <tr key={row}>
              {[0, 1, 2, 3, 4, 5].map((col) => (
                <td key={col}>
                  <TableCell>
                    Label
                    <TableCellAction aria-label={`More actions — row ${row + 1}, col ${col + 1}`} />
                  </TableCell>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrap>
  ),
};

// ── Composition — mixed cell content ─────────────────────────────────────────
const StatusDot = ({ status, label }) => {
  const map = { online: 'success', idle: 'warning', offline: 'danger' };
  return (
    <>
      <span
        className={`badge badge-dot badge-${map[status]}`}
        aria-label={label}
        style={{ marginRight: 8 }}
      />
      {label}
    </>
  );
};

export const Composition = {
  render: () => (
    <TableWrap>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Plan</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Adesh Singh</td>
            <td><StatusDot status="online" label="Online" /></td>
            <td><span className="tag tag-md">Pro</span></td>
            <td>adesh@example.com</td>
            <td>
              <TableCell end>
                <TableCellAction aria-label="More actions for Adesh Singh" />
              </TableCell>
            </td>
          </tr>
          <tr>
            <td>Jane Doe</td>
            <td><StatusDot status="idle" label="Idle" /></td>
            <td><span className="tag tag-md">Free</span></td>
            <td>jane@example.com</td>
            <td>
              <TableCell end>
                <TableCellAction aria-label="More actions for Jane Doe" />
              </TableCell>
            </td>
          </tr>
          <tr>
            <td>Mark Patel</td>
            <td><StatusDot status="offline" label="Offline" /></td>
            <td><span className="tag tag-md">Pro</span></td>
            <td>mark@example.com</td>
            <td>
              <TableCell end>
                <TableCellAction aria-label="More actions for Mark Patel" />
              </TableCell>
            </td>
          </tr>
        </tbody>
      </Table>
    </TableWrap>
  ),
};

// ── States — kebab action: default + hover ────────────────────────────────────
export const States = {
  render: () => (
    <TableWrap style={{ maxWidth: 480 }}>
      <Table>
        <thead>
          <tr><th>State</th><th>Kebab</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Default</td>
            <td>
              <TableCell end>
                <TableCellAction aria-label="More" />
              </TableCell>
            </td>
          </tr>
          <tr>
            <td>Hover (forced)</td>
            <td>
              <TableCell end>
                <TableCellAction hover aria-label="More" />
              </TableCell>
            </td>
          </tr>
        </tbody>
      </Table>
    </TableWrap>
  ),
};

// ── Responsive — horizontal scroll on mobile ──────────────────────────────────
export const Responsive = {
  parameters: {
    viewport: { defaultViewport: 'mobile' },
    docs: {
      description: {
        story: 'Wrap the table in `.table-wrap` to enable horizontal scroll on mobile. Switch to Mobile (390) in the viewport toolbar.',
      },
      source: {
        code: `<div className="table-wrap">
  <Table>…</Table>
</div>`,
      },
    },
  },
  render: () => (
    <div className="table-wrap">
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Role</th>
            <th>Email</th>
            <th>Plan</th>
            <th>Joined</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: 'Adesh Singh', status: 'Active', role: 'Owner', email: 'adesh@example.com', plan: 'Pro', joined: '1 Jan 2025' },
            { name: 'Jane Doe',    status: 'Idle',   role: 'Admin', email: 'jane@example.com',  plan: 'Free', joined: '15 Mar 2025' },
            { name: 'Mark Patel',  status: 'Offline', role: 'Member', email: 'mark@example.com', plan: 'Pro', joined: '3 Jun 2025' },
          ].map((row) => (
            <tr key={row.email}>
              <td>{row.name}</td>
              <td>{row.status}</td>
              <td>{row.role}</td>
              <td>{row.email}</td>
              <td><span className="tag tag-md">{row.plan}</span></td>
              <td>{row.joined}</td>
              <td><TableCell end><TableCellAction aria-label={`More for ${row.name}`} /></TableCell></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  ),
};

// ── Full Matrix — cell content types × row positions ─────────────────────────
export const FullMatrix = {
  render: () => (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 24,
      padding: 24,
      border: '1px dashed var(--color-border)',
      borderRadius: 'var(--radius-md, 6px)',
      background: 'var(--color-bg-2)',
    }}>
      <TableWrap>
        <Table>
          <thead>
            <tr>
              <th>Header text</th>
              <th>With kebab</th>
              <th>Numeric</th>
              <th>Tag</th>
              <th>Status dot</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Default row text</td>
              <td>
                <TableCell>
                  With kebab
                  <TableCellAction aria-label="More" />
                </TableCell>
              </td>
              <td className="td-num">1,248</td>
              <td><span className="tag tag-md">Active</span></td>
              <td><span className="badge badge-dot badge-success" aria-label="Online" style={{ marginRight: 8 }} />Online</td>
              <td>
                <TableCell end>
                  <TableCellAction aria-label="More" />
                </TableCell>
              </td>
            </tr>
            <tr>
              <td>Long-content row</td>
              <td>
                <TableCell>
                  Long label here
                  <TableCellAction aria-label="More" />
                </TableCell>
              </td>
              <td className="td-num">42</td>
              <td><span className="tag tag-md">Pending</span></td>
              <td><span className="badge badge-dot badge-warning" aria-label="Idle" style={{ marginRight: 8 }} />Idle</td>
              <td>
                <TableCell end>
                  <TableCellAction hover aria-label="More" />
                </TableCell>
              </td>
            </tr>
            <tr>
              <td>Compact</td>
              <td>
                <TableCell>
                  Item
                  <TableCellAction aria-label="More" />
                </TableCell>
              </td>
              <td className="td-num">7</td>
              <td><span className="tag tag-md">Archived</span></td>
              <td><span className="badge badge-dot badge-danger" aria-label="Offline" style={{ marginRight: 8 }} />Offline</td>
              <td>
                <TableCell end>
                  <TableCellAction aria-label="More" />
                </TableCell>
              </td>
            </tr>
          </tbody>
        </Table>
      </TableWrap>
    </div>
  ),
};
