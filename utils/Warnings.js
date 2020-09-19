import { YellowBox } from 'react-native';

export function ignoreWarnings() {
    YellowBox.ignoreWarnings(['getNode']);
    YellowBox.ignoreWarnings(['Error: INTERNAL']);
}

export default ignoreWarnings;
