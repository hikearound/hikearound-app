import { YellowBox } from 'react-native';

export function ignoreWarnings() {
    /* eslint-disable-next-line */
    YellowBox.ignoreWarnings(
        ['getNode', 'useNativeDriver'],

    );
}

export default ignoreWarnings;
