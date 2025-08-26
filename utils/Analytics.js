import { auth } from '@lib/Fire';

// Firebase Analytics doesn't work properly in React Native/Expo environment
// Disable for now to prevent warnings and errors

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
    // Analytics disabled - implement with Expo Analytics or other solution if needed
    if (!__DEV__) {
        // eslint-disable-next-line no-console
        console.log('Screen view:', screenName);
    }
}

export function logEvent(eventName, params) {
    params = setUser(params);

    // Analytics disabled - implement with Expo Analytics or other solution if needed
    if (!__DEV__) {
        // eslint-disable-next-line no-console
        console.log('Analytics event:', eventName, params);
    }
}
