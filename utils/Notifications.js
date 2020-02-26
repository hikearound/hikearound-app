import firebase from 'firebase';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export async function registerForPushNotifications() {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
        return;
    }

    const user = firebase.auth().currentUser;
    const notificationToken = await Notifications.getExpoPushTokenAsync();

    firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .set({ notificationToken }, { merge: true });
}

export default {
    registerForPushNotifications,
};
