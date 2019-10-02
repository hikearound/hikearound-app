import { AsyncStorage } from 'react-native';

export const updateName = (name) => {
    return { type: 'UPDATE_NAME', name };
};

export const updateAvatar = (avatar) => {
    return { type: 'UPDATE_AVATAR', avatar };
};

export const updateLocation = (location) => {
    return { type: 'UPDATE_LOCATION', location };
};

export const setMap = (map) => {
    AsyncStorage.setItem('mapSetting', map);
    return { type: 'SET_DEFAULT_MAP', map };
};
