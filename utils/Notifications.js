import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { db, auth } from '../lib/Fire';

export async function registerForPushNotifications() {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
        return;
    }

    const user = auth.currentUser;

    let notificationToken = await Notifications.getExpoPushTokenAsync();
    notificationToken = notificationToken.data;

    db.collection('users')
        .doc(user.uid)
        .set({ notificationToken }, { merge: true });
}

export async function clearBadge() {
    await Notifications.setBadgeCountAsync(0);
}

export async function getBadgeNumber() {
    const badgeNumber = await Notifications.getBadgeCountAsync();
    return badgeNumber;
}

export async function handleAppBadge() {
    const badgeNumber = await getBadgeNumber();
    if (badgeNumber > 0) {
        clearBadge();
    }
}
