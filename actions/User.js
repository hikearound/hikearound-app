import {
    writeUserData,
    writeUserLocation,
    writePhotoData,
    writeMapData,
    writeDarkMode,
    writeNotifData,
    logoutAndResetNavigation,
} from '../utils/User';

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

export const updateUserPosition = (currentPosition) => {
    writeUserLocation(currentPosition);
    return { type: 'UPDATE_USER_POSITION', currentPosition };
};

export const updateAvatar = (photoData) => {
    writePhotoData(photoData);
    return { type: 'UPDATE_AVATAR', photoData };
};

export const updateFavoriteHikes = (favoriteHikes) => {
    return { type: 'UPDATE_FAVORITE_HIKES', favoriteHikes };
};

export const updateReviewedHikes = (reviewedHikes) => {
    return { type: 'UPDATE_REVIEWED_HIKES', reviewedHikes };
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

export const logoutUser = (navigation) => {
    logoutAndResetNavigation(navigation);
    return { type: 'LOGOUT_USER' };
};
