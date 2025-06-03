import { create } from '@storybook/theming';

export const theme = create({
    base: 'light',

    // Brand
    brandTitle: 'Hikearound',
    brandUrl: 'https://hikearound.app',

    // Colors
    colorPrimary: '#935DFF',
    colorSecondary: '#935DFF',

    // UI
    appBg: '#FFFFFF',
    appContentBg: '#FFFFFF',
    appPreviewBg: 'red',
    appBorderColor: '#E5E5E5',
    appBorderRadius: 4,

    // Typography
    fontBase: 'SF Pro Text',
    fontCode: 'monospace',

    // Text colors
    textColor: '#333333',
    textInverseColor: '#FFFFFF',

    // Toolbar default and active colors
    barTextColor: '#999999',
    barSelectedColor: '#935DFF',
    barBg: '#FFFFFF',
    barHoverColor: '#935DFF',

    // Form colors
    inputBg: '#FFFFFF',
    inputBorder: '#E5E5E5',
    inputTextColor: '#333333',
    inputBorderRadius: 4,

    // Button colors
    buttonBg: '#935DFF',
    buttonBorder: '#935DFF',
    // buttonTextColor: '#000000',

    // Link colors
    linkColor: '#935DFF',
});
