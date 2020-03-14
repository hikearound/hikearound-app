import React from 'react';
import { useTheme } from '@react-navigation/native';

export function withTheme(Component) {
    return function WrappedComponent(props) {
        const theme = useTheme();
        /* eslint-disable-next-line */
        return <Component {...props} theme={theme} />;
    };
}

export default { withTheme };
