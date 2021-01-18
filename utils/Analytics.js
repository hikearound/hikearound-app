import * as Analytics from 'expo-firebase-analytics';
import { auth } from '../lib/Fire';

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
    Analytics.setCurrentScreen(screenName, screenName);
}

export function logEvent(eventName, params) {
    params = setUser(params);
    Analytics.logEvent(eventName, params);
}
