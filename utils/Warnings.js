import { YellowBox } from 'react-native';

export function ignoreWarnings() {
    YellowBox.ignoreWarnings(['getNode']);
}

export default ignoreWarnings;
