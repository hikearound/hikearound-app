import firebase from 'firebase';
import { Updates } from 'expo';

export function writeUserData(userData) {
    const { uid } = firebase.auth().currentUser;
    firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .set(userData, { merge: true });
}

export function writeMapData(map) {
    const { uid } = firebase.auth().currentUser;
    const mapData = { map };
    firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .set(mapData, { merge: true });
}

export function writePhotoData(photoData) {
    const { uid } = firebase.auth().currentUser;
    firebase
        .storage()
        .ref()
        .child(`images/users/${uid}.jpg`)
        .put(photoData.blob);
}

export async function getUserFavoriteHikes() {
    const { uid } = firebase.auth().currentUser;
    return firebase
        .firestore()
        .collection('favoritedHikes')
        .doc(uid)
        .collection('hikes')
        .get();
}

export async function getAvatarUri() {
    const { uid } = firebase.auth().currentUser;
    return firebase
        .storage()
        .ref(`images/users/${uid}.jpg`)
        .getDownloadURL();
}

export async function getUserData() {
    const { uid } = firebase.auth().currentUser;
    return firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .get();
}

export function logoutUser() {
    firebase
        .auth()
        .signOut()
        .then(() => {
            Updates.reload();
        });
}

export default {
    writeUserData,
    writePhotoData,
    logoutUser,
    getUserFavoriteHikes,
    getAvatarUri,
    getUserData,
};
