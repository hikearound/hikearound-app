import { Dimensions } from 'react-native';

export function getScreenHeight() {
    return Math.round(Dimensions.get('window').height);
}

export function getScreenWidth() {
    return Math.round(Dimensions.get('window').width);
}
