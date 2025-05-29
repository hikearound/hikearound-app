import { create } from '@storybook/theming';

export const theme = create({
    base: 'light',

    // Brand
    brandTitle: 'Hikearound',

    // Colors
    colorPrimary: '#935DFF',
    colorSecondary: '#935DFF',

    // UI
    appBg: '#F6F9FC',
    appContentBg: '#FFFFFF',
    appBorderColor: '#E4E4E4',
    appBorderRadius: 4,

    // Typography
    fontBase: 'SF Pro Text',
    fontCode: 'monospace',

    // Text colors
    textColor: '#333333',
    textInverseColor: '#FFFFFF',

    // Toolbar default and active colors
    barTextColor: '#666666',
    barSelectedColor: '#935DFF',
    barBg: '#F6F9FC',
    barHoverColor: '#935DFF',

    // Form colors
    inputBg: '#FFFFFF',
    inputBorder: '#E4E4E4',
    inputTextColor: '#333333',
    inputBorderRadius: 4,

    // Button colors
    buttonBg: '#935DFF',
    buttonBorder: '#935DFF',
    // buttonTextColor: '#000000',

    // Link colors
    linkColor: '#935DFF',
});
