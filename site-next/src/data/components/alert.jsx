'use client';
// barrel import from '@ds' pulls all 25 components, several of which use hooks.

import React from 'react';
import { Alert, AlertBtnPrimary, AlertBtnSecondary } from '@ds';

const PKG = '@adeshsingh0604/digilawyer-ds';

export default {
  key: 'alert',
  name: 'Alert',
  description:
    'Inline feedback panel for contextual status. Seven semantic colours across three visual variants, with an optional action row.',
  storybook: '?path=/docs/components-alert--docs',
  variants: [
    {
      id: 'alert-01',
      name: 'Alert 1',
      file: 'Alert-01.jsx',
      wide: true,
      render: () => (
        <Alert color="info" variant="semi" title="Notice scheduled">
          Your legal notice will be dispatched on 20 August 2026.
        </Alert>
      ),
      code: `import { Alert } from '${PKG}';

const Alert1 = () => (
  <Alert color="info" variant="semi" title="Notice scheduled">
    Your legal notice will be dispatched on 20 August 2026.
  </Alert>
);

export default Alert1;`,
    },
    {
      id: 'alert-02',
      name: 'Alert 2',
      file: 'Alert-02.jsx',
      wide: true,
      render: () => (
        <Alert color="success" variant="filled" title="Signature complete">
          All three parties have signed. The document is now locked.
        </Alert>
      ),
      code: `import { Alert } from '${PKG}';

const Alert2 = () => (
  <Alert color="success" variant="filled" title="Signature complete">
    All three parties have signed. The document is now locked.
  </Alert>
);

export default Alert2;`,
    },
    {
      id: 'alert-03',
      name: 'Alert 3',
      file: 'Alert-03.jsx',
      wide: true,
      render: () => (
        <Alert color="danger" variant="border" title="Delivery failed" role="alert">
          The recipient address was rejected by the courier.
        </Alert>
      ),
      code: `import { Alert } from '${PKG}';

// role="alert" makes screen readers announce the message immediately.
const Alert3 = () => (
  <Alert color="danger" variant="border" title="Delivery failed" role="alert">
    The recipient address was rejected by the courier.
  </Alert>
);

export default Alert3;`,
    },
    {
      id: 'alert-04',
      name: 'Alert 4',
      file: 'Alert-04.jsx',
      wide: true,
      render: () => (
        <Alert
          color="warning"
          variant="semi"
          title="Draft not saved"
          actions={
            <>
              <AlertBtnPrimary>Save now</AlertBtnPrimary>
              <AlertBtnSecondary>Discard</AlertBtnSecondary>
            </>
          }
        >
          You have unsaved changes to this notice.
        </Alert>
      ),
      code: `import { Alert, AlertBtnPrimary, AlertBtnSecondary } from '${PKG}';

const Alert4 = () => (
  <Alert
    color="warning"
    variant="semi"
    title="Draft not saved"
    actions={
      <>
        <AlertBtnPrimary>Save now</AlertBtnPrimary>
        <AlertBtnSecondary>Discard</AlertBtnSecondary>
      </>
    }
  >
    You have unsaved changes to this notice.
  </Alert>
);

export default Alert4;`,
    },
    {
      id: 'alert-05',
      name: 'Alert 5',
      file: 'Alert-05.jsx',
      wide: true,
      render: () => (
        <Alert
          color="notice"
          variant="semi"
          title="New in v2.53"
          onDismiss={() => {}}
        >
          DatePicker now re-syncs its visible month when a controlled value changes.
        </Alert>
      ),
      code: `import { Alert } from '${PKG}';

// Passing onDismiss renders the close button in the header row.
const Alert5 = () => (
  <Alert
    color="notice"
    variant="semi"
    title="New in v2.53"
    onDismiss={() => setOpen(false)}
  >
    DatePicker now re-syncs its visible month when a controlled value changes.
  </Alert>
);

export default Alert5;`,
    },
  ],
};
