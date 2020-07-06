import { YellowBox } from 'react-native';

export function ignoreWarnings() {
    YellowBox.ignoreWarnings(['getNode', 'useNativeDriver']);
}

export default ignoreWarnings;
