import { defaultTheme, darkTheme } from '@constants/Themes';

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
