import { CommonActions } from '@react-navigation/native';
import { cacheImages } from './Image';
import { db, storage, auth } from '../lib/Fire';
import store from '../store/Store';
import { getPosition, getRange, getNearestCity } from './Location';
import { getPermissionStatus } from './Permissions';

export async function writeUserData(userData) {
    const user = auth.currentUser;

    user.updateProfile({
        displayName: userData.name,
    });

    db.collection('users').doc(user.uid).set(userData, { merge: true });
}

export async function writeUserLocation(userData) {
    const distance = 50;
    const user = auth.currentUser;
    const { coords } = userData.currentPosition;

    if (!coords) {
        return;
    }

    const range = getRange(coords.latitude, coords.longitude, distance);
    const location = await getNearestCity(coords);

    const lastKnownLocation = { range, location };

    db.collection('users')
        .doc(user.uid)
        .set({ lastKnownLocation }, { merge: true });
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

    const favoriteHikeSnapshot = db
        .collection('favoritedHikes')
        .doc(uid)
        .collection('hikes')
        .orderBy('savedOn', 'desc')
        .get();

    return favoriteHikeSnapshot;
}

export async function getFavoriteHikes() {
    const hikes = [];
    const favoriteHikes = await getUserFavoriteHikes();

    favoriteHikes.forEach((hike) => {
        if (hike.exists) {
            hikes.push(hike.id);
        }
    });

    return hikes;
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

export function logoutUser(navigation) {
    auth.signOut().then(() => {
        // navigation.navigate('Home', { screen: 'Landing' });
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{
                    name: 'Home',
                    state: {
                        routes: [{
                            name: 'Landing',
                        }]
                    }
                }],
            }),
        );
    });
}

export async function writeAvatar(photoURL) {
    const user = auth.currentUser;

    user.updateProfile({ photoURL });
    db.collection('users').doc(user.uid).set({ photoURL }, { merge: true });
}

export async function setAvatar(dispatchAvatar) {
    const state = store.getState();
    const { avatar } = state.userReducer;

    let avatarUri = await getAvatarUri();

    if (avatarUri) {
        dispatchAvatar(avatarUri);
        writeAvatar(avatarUri);
    } else {
        avatarUri = avatar;
    }

    cacheImages([avatarUri]);
}

export async function getUserData(dispatchUserData, dispatchAvatar) {
    const status = await getPermissionStatus('location');
    const favoriteHikes = await getFavoriteHikes();

    let currentPosition = {};
    let userData = await db.collection('users').doc(auth.currentUser.uid).get();

    if (status === 'granted') {
        currentPosition = await getPosition('lastKnown');
    }

    userData = userData.data();
    userData.favoriteHikes = favoriteHikes;
    userData.currentPosition = currentPosition;

    await setAvatar(dispatchAvatar);
    dispatchUserData(userData);
}

export function createUserProfile(dispatchUserData, name) {
    const state = store.getState();
    const { map, location, darkMode, notifs, photoURL } = state.userReducer;
    const userData = { map, location, darkMode, notifs, name, photoURL };

    dispatchUserData(userData);
}
