import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import { openHikeScreen } from './Hike';
import { openReviewScreen } from './Review';
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

export function handleOpenNotification(data, navigation, t) {
    const actions = {};

    if (data.type === 'reviewLike') {
        openReviewScreen(data.extraData.rid, navigation, t, actions);
    }

    if (data.type === 'digest') {
        openHikeScreen(data.hid, navigation, actions);
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
    t,
) {
    listenerRef.current = Notifications.addNotificationResponseReceivedListener(
        (response) => {
            const { data } = response.notification.request.content;
            handleOpenNotification(data, navigation, t);
        },
    );
}

export async function removeNotificationListener(listenerRef) {
    Notifications.removeNotificationSubscription(listenerRef);
}
