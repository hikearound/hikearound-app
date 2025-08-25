import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '@lib/Fire';

export function buildFormattedName(fullName) {
    let formattedName = '';

    if (fullName.givenName && fullName.familyName) {
        formattedName = `${fullName.givenName} ${fullName.familyName}`;
    }

    return formattedName;
}

export async function accountUsesApple(email) {
    if (email) {
        const providers = await fetchSignInMethodsForEmail(auth, email);

        if (providers.includes('apple.com')) {
            return true;
        }
    }

    return false;
}
