import React from 'react';
import { defaultTheme, darkTheme } from '@constants/Themes';
import { select } from '@storybook/addon-knobs';

export const getTheme = (themeName) => {
    const theme = themeName === 'dark' ? darkTheme.colors : defaultTheme.colors;
    return {
        ...theme,
        mode: themeName,
    };
};

export const getMapTheme = (themeName) => {
    const theme = themeName === 'dark' ? darkTheme.colors : defaultTheme.colors;
    return {
        ...theme,
        mode: themeName,
        mapBackground: 'rgba(0,0,0,0)',
        mapViewBackground: 'rgba(0,0,0,0)',
        card: 'rgba(0,0,0,0)',
        cardShadow: 'rgba(0,0,0,0)',
    };
};

export const getThemeKnob = () =>
    select('Theme', { light: 'light', dark: 'dark' }, 'light');

export const getThemeColors = (themeName) =>
    themeName === 'dark' ? darkTheme.colors : defaultTheme.colors;

export const withThemeSelection = (Component) => (props) => {
    const themeName = getThemeKnob();
    const theme = themeName === 'dark' ? darkTheme.colors : defaultTheme.colors;
    return <Component {...props} theme={theme} themeName={themeName} />;
};
