import { AsyncStorage } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';

export const updateAvatar = (avatar) => {
    return { type: 'UPDATE_AVATAR', avatar };
};

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

export const updateMap = (map) => {
    AsyncStorage.setItem('mapSetting', map);
    return { type: 'UPDATE_MAP', map };
};
