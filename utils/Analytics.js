import * as Analytics from 'expo-firebase-analytics';
import { auth } from '@lib/Fire';

export function setUser(params) {
    const user = auth.currentUser;

    if (user) {
        params.uid = user.uid;
    } else {
        params.uid = null;
    }

    return params;
}

export function setCurrentScreen(screenName) {
    // Use logEvent instead of deprecated setCurrentScreen
    if (!__DEV__) {
        Analytics.logEvent('screen_view', {
            screen_name: screenName,
            screen_class: screenName,
        });
    }
}

export function logEvent(eventName, params) {
    params = setUser(params);

    if (!__DEV__) {
        Analytics.logEvent(eventName, params);
    }
}
