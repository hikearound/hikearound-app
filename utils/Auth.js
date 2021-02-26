import firebase from 'firebase';

export function updateAuthSubscription(user) {
    if (!user) {
        return { loggedOut: true };
    }

    user.loggedOut = false;
    return user;
}

export async function getSignInMethods(email) {
    if (email) {
        const providers = await firebase
            .auth()
            .fetchSignInMethodsForEmail(email);
        return providers;
    }
    return [];
}
