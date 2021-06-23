import { updateAuthSubscription } from '@utils/Auth';

export const initializeAuthSubscription = (user) => {
    user = updateAuthSubscription(user);
    return { type: 'INITIALIZE_AUTH_SUBSCRIPTION', user };
};

export default initializeAuthSubscription;
