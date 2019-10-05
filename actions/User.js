import { AsyncStorage } from 'react-native';
import { writeUserData, writePhotoData } from '../utils/User';

export const initializeUserData = (userData) => {
    return { type: 'INITIALIZE_USER_DATA', userData };
};

export const updateUserData = (userData) => {
    writeUserData(userData);
    return { type: 'UPDATE_USER_DATA', userData };
};

export const initializeAvatar = (uri) => {
    return { type: 'INITIALIZE_AVATAR', uri };
};

export const updateAvatar = (photoData) => {
    writePhotoData(photoData);
    return { type: 'UPDATE_AVATAR', photoData };
};

export const updateMap = (map) => {
    AsyncStorage.setItem('mapSetting', map);
    return { type: 'UPDATE_MAP', map };
};
