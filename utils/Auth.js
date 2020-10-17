export function updateAuthSubscription(user) {
    if (!user) {
        return { loggedOut: true };
    }

    user.loggedOut = false;
    return user;
}

export default updateAuthSubscription;
