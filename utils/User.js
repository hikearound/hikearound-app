import { cacheImages } from './Image';
import { db, storage, auth } from '../lib/Fire';
import store from '../store/Store';

export async function writeUserData(userData) {
    const user = auth.currentUser;
    const idToken = await user.getIdToken(true);

    userData.idToken = idToken;
    user.updateProfile({
        displayName: userData.name,
    });

    db.collection('users').doc(user.uid).set(userData, { merge: true });
}

export function writeMapData(map) {
    const { uid } = auth.currentUser;
    const mapData = { map };

    db.collection('users').doc(uid).set(mapData, { merge: true });
}

export function writeDarkMode(darkMode) {
    const { uid } = auth.currentUser;
    const darkModeData = { darkMode };

    db.collection('users').doc(uid).set(darkModeData, { merge: true });
}

export function writeNotifData(notifData) {
    const { uid } = auth.currentUser;

    db.collection('users').doc(uid).set({ notifs: notifData }, { merge: true });
}

export async function writePhotoData(photoData) {
    const { uid } = auth.currentUser;

    await storage.ref().child(`images/users/${uid}.jpg`).put(photoData.blob);

    photoData.blob.close();
}

export async function getUserFavoriteHikes() {
    const { uid } = auth.currentUser;

    return db.collection('favoritedHikes').doc(uid).collection('hikes').get();
}

export async function getAvatarUri() {
    const { uid } = auth.currentUser;
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
    const { uid } = auth.currentUser;

    return db.collection('users').doc(uid).get();
}

export function logoutUser(navigation) {
    auth.signOut().then(() => {
        navigation.navigate('Home', {
            screen: 'Landing',
            params: { isLogout: true },
        });
    });
}

export async function getUserProfileData(dispatchUserData, dispatchAvatar) {
    let userData = await getUserData();
    let avatarUri = await getAvatarUri();

    const state = store.getState();
    const { avatar } = state.userReducer;

    userData = userData.data();

    if (!userData.notifs) {
        userData = this.patchUserData(userData);
    }

    if (avatarUri) {
        dispatchAvatar(avatarUri);
    } else {
        avatarUri = avatar;
    }

    dispatchUserData(userData);
    cacheImages([avatarUri]);
}

export function createUserProfile(dispatchUserData, name) {
    const state = store.getState();
    const { map, location, darkMode, notifs } = state.userReducer;
    const userData = { map, location, darkMode, notifs, name };

    dispatchUserData(userData);
}
