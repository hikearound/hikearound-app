import * as Notifications from 'expo-notifications';
import { db, auth } from '@lib/Fire';
import { getUserProfileData } from '@utils/User';
import { getHikeData } from '@utils/Hike';

export async function registerForPushNotifications() {
  // Push tokens are skipped: no EAS project is configured for this build.
  // The token fetch requires a real EAS projectId (UUID), and we are not
  // sending pushes from this build.
  await Notifications.requestPermissionsAsync();
}

export async function buildNotificationArray(t, data) {
  const notifications = [];

  for (const notification of data) {
    if (notification.extraData.senderUid) {
      const uid = notification.extraData.senderUid;
      const userData = await getUserProfileData(t, uid);

      notification.sender = {
        uid,
        name: userData.name,
        photoURL: userData.photoURL,
      };
    } else {
      notification.sender = {};
    }

    const hikeData = await getHikeData(notification.hid);

    notification.hike = {
      name: hikeData.name,
      city: hikeData.city,
      state: hikeData.state,
    };

    notifications[notification.id] = notification;
    notifications.push(notification);
  }

  if (data.length === 0) {
    return [];
  }

  return notifications;
}

export async function getUserNotifications(t) {
  const user = auth.currentUser;

  const notificationsRef = db
    .collection('notifications')
    .where('recipientUid', '==', user.uid)
    .orderBy('createdOn', 'desc')
    .limit(8);

  const querySnapshot = await notificationsRef.get();

  const data = [];

  await querySnapshot.forEach(async notification => {
    if (notification.exists) {
      const notificationData = notification.data() || {};

      const reduced = {
        id: notification.id,
        ...notificationData,
      };

      data.push(reduced);
    }
  });

  const notifications = await buildNotificationArray(t, data);
  return notifications;
}

export async function markNotificationAsRead(nid) {
  return db
    .collection('notifications')
    .doc(nid)
    .set({ isRead: true }, { merge: true });
}

export async function getNotificationData(dispatchNotificationData, t) {
  const notifications = await getUserNotifications(t);
  dispatchNotificationData({ notifications });
}
