import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '@lib/Fire';

export function updateAuthSubscription(user) {
    if (!user) {
        return { loggedOut: true };
    }

    user.loggedOut = false;
    return user;
}

export async function getSignInMethods(email) {
    if (email) {
        const providers = await fetchSignInMethodsForEmail(auth, email);
        return providers;
    }
    return [];
}
