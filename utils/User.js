import firebase from 'firebase';
import { Updates } from 'expo';
import { cacheImages } from './Image';

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export async function writeUserData(userData) {
    const user = firebase.auth().currentUser;
    const idToken = await user.getIdToken(true);

    userData.idToken = idToken;
    user.updateProfile({
        displayName: userData.name,
    });

    db.collection('users')
        .doc(user.uid)
        .set(userData, { merge: true });
}

export function writeMapData(map) {
    const { uid } = firebase.auth().currentUser;
    const mapData = { map };

    db.collection('users')
        .doc(uid)
        .set(mapData, { merge: true });
}

export function writeDarkMode(darkMode) {
    const { uid } = firebase.auth().currentUser;
    const darkModeData = { darkMode };

    db.collection('users')
        .doc(uid)
        .set(darkModeData, { merge: true });
}

export function writeNotifData(notifData) {
    const { uid } = firebase.auth().currentUser;

    db.collection('users')
        .doc(uid)
        .set(notifData, { merge: true });
}

export async function writePhotoData(photoData) {
    const { uid } = firebase.auth().currentUser;

    await storage
        .ref()
        .child(`images/users/${uid}.jpg`)
        .put(photoData.blob);

    photoData.blob.close();
}

export async function getUserFavoriteHikes() {
    const { uid } = firebase.auth().currentUser;

    return db
        .collection('favoritedHikes')
        .doc(uid)
        .collection('hikes')
        .get();
}

export async function getAvatarUri() {
    const { uid } = firebase.auth().currentUser;
    let avatarUri = null;

    await storage
        .ref(`images/users/${uid}.jpg`)
        .getDownloadURL()
        .catch(() => {
            return null;
        })
        .then((result) => {
            avatarUri = result;
        });

    return avatarUri;
}

export async function getUserData() {
    const { uid } = firebase.auth().currentUser;

    return db
        .collection('users')
        .doc(uid)
        .get();
}

export function logoutUser() {
    auth.signOut().then(() => {
        Updates.reload();
    });
}

export async function getUserProfileData(
    dispatchUserData,
    dispatchAvatar,
    avatar,
) {
    const userData = await getUserData();
    dispatchUserData(userData.data());

    let avatarUri = await getAvatarUri();
    if (avatarUri) {
        dispatchAvatar(avatarUri);
    } else {
        avatarUri = avatar;
    }

    cacheImages([avatarUri]);
}

export default {
    writeUserData,
    writePhotoData,
    logoutUser,
    getUserFavoriteHikes,
    getAvatarUri,
    getUserData,
    getUserProfileData,
    writeNotifData,
};
