import React from 'react';
import { useTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native-appearance';

export function withTheme(Component) {
    return function WrappedComponent(props) {
        const theme = useTheme();
        const scheme = useColorScheme();

        return <Component {...props} theme={theme} scheme={scheme} />;
    };
}

export default withTheme;
