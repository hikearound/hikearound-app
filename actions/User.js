import { AsyncStorage } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';

export const initializeUserData = (userData) => {
    return { type: 'INITIALIZE_USER_DATA', userData };
};

export const updateUserData = (userData) => {
    const firestore = firebase.firestore();
    const { uid } = firebase.auth().currentUser;

    firestore
        .collection('users')
        .doc(uid)
        .set(userData, { merge: true });

    return { type: 'UPDATE_USER_DATA', userData };
};

export const initializeAvatar = (uri) => {
    return { type: 'INITIALIZE_AVATAR', uri };
};

export const updateAvatar = (photoData) => {
    const { uid } = firebase.auth().currentUser;

    firebase
        .storage()
        .ref()
        .child(`images/users/${uid}.jpg`)
        .put(photoData.blob);

    return { type: 'UPDATE_AVATAR', photoData };
};

export const updateMap = (map) => {
    AsyncStorage.setItem('mapSetting', map);
    return { type: 'UPDATE_MAP', map };
};
