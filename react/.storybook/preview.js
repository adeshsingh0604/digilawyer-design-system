import React from 'react';
import '../../docs/shared/tokens.css';
import '../../docs/shared/components.css';
import './storybook-docs.css';

export const globalTypes = {
  theme: {
    description: 'Color theme',
    defaultValue: 'light',
    toolbar: {
      title: 'Theme',
      icon: 'circlehollow',
      items: [
        { value: 'light', title: 'Light', icon: 'sun' },
        { value: 'dark', title: 'Dark', icon: 'moon' },
      ],
      dynamicTitle: true,
    },
  },
};

export const decorators = [
  (Story, context) => {
    const theme = context.globals.theme || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    // Sync the preview canvas background to the active theme token
    document.body.style.background = theme === 'dark' ? '#1C1C1C' : '#FFFFFF';
    document.body.style.transition = 'background 0.2s';
    return React.createElement(Story);
  },
];

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
    },
  },
  layout: 'centered',
  docs: {
    source: {
      language: 'tsx',
    },
  },
};
