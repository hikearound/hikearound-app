import {
    writeUserData,
    writeUserLocation,
    writePhotoData,
    writeMapData,
    writeDarkMode,
    writeNotifData,
} from '../utils/User';

export const initializeUserData = (userData) => {
    writeUserLocation(userData);
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
    writeMapData(map);
    return { type: 'UPDATE_MAP', map };
};

export const updateDarkMode = (darkMode) => {
    writeDarkMode(darkMode);
    return { type: 'UPDATE_DARK_MODE', darkMode };
};

export const updateNotifs = (notifs) => {
    writeNotifData(notifs);
    return { type: 'UPDATE_NOTIFS', notifs };
};
