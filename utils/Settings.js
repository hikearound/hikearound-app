export function getMapSetting(map) {
    if (map === 'Google Maps') {
        return 'google';
    }
    return 'apple';
}

export default { getMapSetting };
