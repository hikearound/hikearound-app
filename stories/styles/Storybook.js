import { defaultTheme } from '@constants/Themes';

export const storybookTheme = {
    backgroundColor: 'white',
    headerTextColor: 'black',
    labelColor: 'black',
    borderColor: '#e6e6e6',
    previewBorderColor: '#b3b3b3',
    buttonTextColor: '#999999',
    buttonActiveTextColor: '#444444',
};

export const navigationTheme = {
    ...defaultTheme,
    colors: {
        ...defaultTheme.colors,
        background: 'white',
        card: 'white',
    },
};

export const screenOptions = {
    headerShown: true,
    headerStyle: {
        backgroundColor: 'white',
    },
    headerTintColor: 'black',
    contentStyle: {
        backgroundColor: 'white',
    },
};

export const backgroundParameters = {
    backgrounds: [
        { name: 'light', value: '#F2F2F2', default: true },
        { name: 'dark', value: '#000000' },
    ],
};
