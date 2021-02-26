import firebase from 'firebase';

export function buildFormattedName(fullName) {
    let formattedName = '';

    if (fullName.givenName && fullName.familyName) {
        formattedName = `${fullName.givenName} ${fullName.familyName}`;
    }

    return formattedName;
}

export async function accountUsesApple(email) {
    if (email) {
        const providers = await firebase
            .auth()
            .fetchSignInMethodsForEmail(email);

        if (providers.includes('apple.com')) {
            return true;
        }
    }

    return false;
}
