import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import { openHikeScreen } from './Hike';
import { getUserData } from './User';

export function getHikeIdFromUrl(url) {
    const re = new RegExp('/hike/(.*)');
    const hid = re.exec(url);
    if (hid) {
        return hid[1];
    }
    return null;
}

export function handleOpenURL(url, navigation) {
    const hid = getHikeIdFromUrl(url);
    if (hid && navigation) {
        openHikeScreen(hid, navigation, {});
    }
}

export async function checkInitialUrl(navigation) {
    const url = await Linking.getInitialURL();
    if (url) {
        handleOpenURL(url, navigation);
    }
}

export async function addUrlListener(navigation) {
    Linking.addEventListener('url', (event) =>
        handleOpenURL(event.url, navigation),
    );
}

export async function removeUrlListener(navigation) {
    Linking.removeEventListener('url', (event) =>
        handleOpenURL(event.url, navigation),
    );
}

export function handleOpenNotification(hid, type, navigation) {
    let options = {};

    if (type === 'reviewLike') {
        options = { scrollToReviewList: true };
    }

    if (hid && navigation) {
        openHikeScreen(hid, navigation, options);
    }
}

export async function addNotificationReceivedListener(
    dispatchUserData,
    dispatchAvatar,
    listenerRef,
) {
    listenerRef.current = Notifications.addNotificationReceivedListener(
        async () => {
            await getUserData(dispatchUserData, dispatchAvatar);
        },
    );
}

export async function addNotificationResponseReceivedListener(
    navigation,
    listenerRef,
) {
    listenerRef.current = Notifications.addNotificationResponseReceivedListener(
        (response) => {
            const { hid, type } = response.notification.request.content.data;
            handleOpenNotification(hid, type, navigation);
        },
    );
}

export async function removeNotificationListener(listenerRef) {
    Notifications.removeNotificationSubscription(listenerRef);
}
