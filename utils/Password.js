import { functions } from '@lib/Fire';

export const resetNotif = functions.httpsCallable('resetNotif');

export async function maybeSendResetNotif(userEmail) {
    await resetNotif({ userEmail });
}

export default maybeSendResetNotif;
