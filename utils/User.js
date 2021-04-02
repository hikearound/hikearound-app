import { CommonActions } from '@react-navigation/native';
import { Appearance } from 'react-native-appearance';
import * as Notifications from 'expo-notifications';
import { cacheImages } from './Image';
import { db, storage, auth } from '../lib/Fire';
import store from '../store/Store';
import { getRange, getNearestCity } from './Location';
import { avatarDefault, avatarDark } from '../constants/Images';
import { getLanguageCode } from './Localization';
import { email, push } from '../constants/Notifications';

const scheme = Appearance.getColorScheme();

export function getDefaultAvatar() {
    if (scheme === 'dark') {
        return avatarDark;
    }

    return avatarDefault;
}

export async function getUserProfileData(t, uid) {
    const userSnapshot = await db.collection('users').doc(uid).get();

    if (!userSnapshot.data()) {
        return {
            uid,
            name: t('label.user.deleted'),
            photoURL: getDefaultAvatar(),
        };
    }

    const userData = userSnapshot.data();

    if (!userData.photoURL) {
        userData.photoURL = getDefaultAvatar();
    } else {
        cacheImages([userData.photoURL]);
    }

    return userData;
}

export async function writeUserData(uid, userData) {
    return db.collection('users').doc(uid).set(userData, { merge: true });
}

export async function writeUserLanguage() {
    const user = auth.currentUser;

    return db
        .collection('users')
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

    return db.collection('users').doc(uid).set(mapData, { merge: true });
}

export function writeDarkMode(darkMode) {
    const { uid } = auth.currentUser;
    const darkModeData = { darkMode };

    return db.collection('users').doc(uid).set(darkModeData, { merge: true });
}

export function writeNotifData(notifData) {
    const { uid } = auth.currentUser;

    return db
        .collection('users')
        .doc(uid)
        .set({ notifs: notifData }, { merge: true });
}

export function clearNotifBadgeCount() {
    const { uid } = auth.currentUser;

    Notifications.setBadgeCountAsync(0);

    return db
        .collection('users')
        .doc(uid)
        .set({ notifBadgeCount: 0 }, { merge: true });
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

export async function getProfileData(dispatchProfileData) {
    const favoriteHikes = await buildFavoriteHikesArray();
    dispatchProfileData({ favoriteHikes });
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
        .catch(() => null)
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
    await user.updateProfile({ photoURL });

    return db
        .collection('users')
        .doc(user.uid)
        .set({ photoURL }, { merge: true });
}

export async function setAvatar(dispatchAvatar) {
    let avatarUri = await getAvatarUri();

    if (avatarUri) {
        writeAvatar(avatarUri);
    } else {
        avatarUri = getDefaultAvatar();
    }

    dispatchAvatar(avatarUri);
    cacheImages([avatarUri]);
}

export async function writeNotifPreferences(notifs) {
    const user = auth.currentUser;

    return db
        .collection('users')
        .doc(user.uid)
        .set({ notifs }, { merge: true });
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

    return userData.notifs;
}

export async function getUserDataRef() {
    const userData = await db
        .collection('users')
        .doc(auth.currentUser.uid)
        .get();

    return userData;
}

export async function maybeClearNotifBadgeCount(userBadgeCount) {
    const appBadgeCount = await Notifications.getBadgeCountAsync();

    if (appBadgeCount !== 0) {
        if (userBadgeCount === 0) {
            clearNotifBadgeCount();
        }
    }
}

export function setNotifBadgeCount(userData) {
    let notifBadgeCount = 0;

    if (userData.notifBadgeCount !== undefined) {
        notifBadgeCount = userData.notifBadgeCount;
        maybeClearNotifBadgeCount(userData.notifBadgeCount);
    }

    return notifBadgeCount;
}

export async function buildAndDispatchUserData(
    userData,
    dispatchUserData,
    dispatchAvatar,
) {
    const favoriteHikes = await buildHikeArray();
    const reviewedHikes = await buildReviewArray();

    userData = userData.data();

    if (!userData.name) {
        userData = await getUserDataRef();
        userData = userData.data();
    }

    userData.favoriteHikes = favoriteHikes;
    userData.reviewedHikes = reviewedHikes;

    const notifBadgeCount = setNotifBadgeCount(userData);
    userData.notifBadgeCount = notifBadgeCount;

    await setAvatar(dispatchAvatar);
    await writeUserLanguage();

    const notifs = await maybeUpdateNotifPreferences(userData);
    userData.notifs = notifs;

    dispatchUserData(userData);
}

export async function getUserData(dispatchUserData, dispatchAvatar) {
    const userData = await getUserDataRef();
    buildAndDispatchUserData(userData, dispatchUserData, dispatchAvatar);
}

export async function createUserProfile(dispatchNewUserData, user, name) {
    const state = store.getState();
    const lang = getLanguageCode();

    await user.updateProfile({ displayName: name });

    const { map, location, darkMode, notifs, photoURL } = state.userReducer;
    const userData = { map, location, darkMode, notifs, name, photoURL, lang };

    await writeUserData(user.uid, userData);
    dispatchNewUserData(userData);
}

export function shouldDisableSwitch(notifs, item) {
    if (item.type === 'push') {
        if (!notifs.push.global.enabled) {
            if (item.property !== 'global') {
                return true;
            }
        }
    }

    if (item.type === 'email') {
        if (!notifs.email.global.enabled) {
            if (item.property !== 'global') {
                return true;
            }
        }
    }

    return false;
}
