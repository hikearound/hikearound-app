import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { db, auth } from '../lib/Fire';

export async function registerForPushNotifications() {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
        return;
    }

    const user = auth.currentUser;
    const notificationToken = await Notifications.getExpoPushTokenAsync();

    db.collection('users')
        .doc(user.uid)
        .set({ notificationToken }, { merge: true });
}

export async function clearBadge() {
    await Notifications.setBadgeNumberAsync(0);
}

export async function getBadgeNumber() {
    const badgeNumber = await Notifications.getBadgeNumberAsync();
    return badgeNumber;
}

export async function handleAppBadge() {
    const badgeNumber = await getBadgeNumber();
    if (badgeNumber > 0) {
        this.clearBadge();
    }
}

export default {
    registerForPushNotifications,
    clearBadge,
    getBadgeNumber,
    handleAppBadge,
};
