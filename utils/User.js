import { CommonActions } from '@react-navigation/native';
import { Appearance } from 'react-native-appearance';
import { cacheImages } from './Image';
import { db, storage, auth } from '../lib/Fire';
import store from '../store/Store';
import { getRange, getNearestCity } from './Location';
import { avatarDefault, avatarDark } from '../constants/Images';
import { getLanguageCode } from './Localization';
import { email, push } from '../constants/Notifications';

const scheme = Appearance.getColorScheme();

export async function getUserProfileData(t, uid) {
    const userSnapshot = await db.collection('users').doc(uid).get();

    if (!userSnapshot.data()) {
        return {
            uid,
            name: t('label.user.deleted'),
        };
    }

    return userSnapshot.data();
}

export async function writeUserData(userData) {
    const user = auth.currentUser;

    user.updateProfile({
        displayName: userData.name,
    });

    db.collection('users').doc(user.uid).set(userData, { merge: true });
}

export async function writeUserLanguage() {
    const user = auth.currentUser;

    db.collection('users')
        .doc(user.uid)
        .set({ lang: getLanguageCode() }, { merge: true });
}

export async function writeUserLocation(currentPosition) {
    const distance = 50;
    const user = auth.currentUser;
    const { coords } = currentPosition;

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

    const hikeSnapshot = db
        .collection('favoritedHikes')
        .doc(uid)
        .collection('hikes')
        .orderBy('savedOn', 'desc')
        .get();

    return hikeSnapshot;
}

export async function buildFavoriteHikesArray() {
    const favoritedHikes = await getUserFavoriteHikes();
    const hikes = [];

    await favoritedHikes.forEach((hike) => {
        if (hike.exists) {
            const favoriteHike = hike.data();
            favoriteHike.id = hike.id;
            hikes.push(favoriteHike);
        }
    });

    return hikes;
}

export async function getUserReviewedHikes() {
    const { uid } = auth.currentUser;

    const hikeSnapshot = db
        .collection('reviews')
        .where('uid', '==', uid)
        .orderBy('savedOn', 'desc')
        .get();

    return hikeSnapshot;
}

export async function buildHikeArray() {
    const hikes = [];
    const hikeSnapshot = await getUserFavoriteHikes();

    hikeSnapshot.forEach((hike) => {
        if (hike.exists) {
            hikes.push(hike.id);
        }
    });

    return hikes;
}

export async function buildReviewArray() {
    const reviews = [];
    const reviewSnapshot = await getUserReviewedHikes();

    reviewSnapshot.forEach((review) => {
        if (review.exists) {
            reviews.push(review.data().hid);
        }
    });

    return reviews;
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

export function logoutAndResetNavigation(navigation) {
    auth.signOut().then(() => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'Home',
                        state: {
                            routes: [{ name: 'Landing' }],
                        },
                    },
                ],
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
    let avatarUri = await getAvatarUri();

    if (avatarUri) {
        writeAvatar(avatarUri);
    } else {
        avatarUri = avatarDefault;

        if (scheme === 'dark') {
            avatarUri = avatarDark;
        }
    }

    dispatchAvatar(avatarUri);
    cacheImages([avatarUri]);
}

export async function writeNotifPreferences(notifs) {
    const user = auth.currentUser;
    db.collection('users').doc(user.uid).set({ notifs }, { merge: true });
}

export async function maybeUpdateNotifPreferences(userData) {
    let shouldUpdate = false;

    await email.forEach((type) => {
        if (!userData.notifs.email[type]) {
            shouldUpdate = true;
            userData.notifs.email[type] = { enabled: true };
        }
    });

    await push.forEach((type) => {
        if (!userData.notifs.push[type]) {
            shouldUpdate = true;
            userData.notifs.push[type] = { enabled: true };
        }
    });

    if (shouldUpdate) {
        writeNotifPreferences(userData.notifs);
    }
}

export async function getUserData(dispatchUserData, dispatchAvatar) {
    const favoriteHikes = await buildHikeArray();
    const reviewedHikes = await buildReviewArray();

    let userData = await db.collection('users').doc(auth.currentUser.uid).get();
    userData = userData.data();

    userData.favoriteHikes = favoriteHikes;
    userData.reviewedHikes = reviewedHikes;

    await setAvatar(dispatchAvatar);
    await writeUserLanguage();
    await maybeUpdateNotifPreferences(userData);

    dispatchUserData(userData);
}

export function createUserProfile(dispatchUserData, response, name) {
    const state = store.getState();
    const lang = getLanguageCode();

    response.user.updateProfile({ displayName: name });

    const { map, location, darkMode, notifs, photoURL } = state.userReducer;
    const userData = { map, location, darkMode, notifs, name, photoURL, lang };

    dispatchUserData(userData);
}
