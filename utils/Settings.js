export function getMapSetting(map) {
    if (map === 'Google Maps') {
        return 'google-maps';
    }
    return 'apple-maps';
}

export default getMapSetting;
