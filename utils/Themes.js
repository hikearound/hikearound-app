import React from 'react';
import { useTheme, useFocusEffect } from '@react-navigation/native';
import { useColorScheme } from 'react-native-appearance';
import { StatusBar } from 'react-native';

export function withTheme(Component) {
    return function WrappedComponent(props) {
        const theme = useTheme();
        const scheme = useColorScheme();

        return <Component {...props} theme={theme} scheme={scheme} />;
    };
}

export function SetBarStyle({ barStyle }) {
    useFocusEffect(
        React.useCallback(() => {
            StatusBar.setBarStyle(barStyle);
        }, [barStyle]),
    );
    return null;
}

export function setBarStyleWithTheme(theme, setState) {
    if (theme.dark) {
        setState({ barStyle: 'light-content' });
    } else {
        setState({ barStyle: 'dark-content' });
    }
}
