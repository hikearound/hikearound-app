import { AsyncStorage } from 'react-native';

export async function getMapSetting() {
    const mapSetting = await AsyncStorage.getItem('mapSetting');

    if (mapSetting === 'Google Maps') {
        return 'google';
    }
    return 'apple';
}

export default { getMapSetting };
