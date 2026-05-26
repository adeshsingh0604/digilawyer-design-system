import React from 'react';
import '../../shared/tokens.css';
import '../src/components/Button/Button.css';

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
};
