import { db, auth } from '../lib/Fire';

export async function getPromotionStatus(promotionType) {
    const user = auth.currentUser;

    let userData = await db.collection('users').doc(user.uid).get();
    userData = userData.data();

    if (!userData.promotions) {
        userData.promotions = { [promotionType]: { shouldShow: true } };
    }

    const { promotions } = userData;
    await db
        .collection('users')
        .doc(user.uid)
        .set({ promotions }, { merge: true });

    return userData.promotions[promotionType];
}

export async function dismissPromotion(promotionType) {
    const user = auth.currentUser;

    let userData = await db.collection('users').doc(auth.currentUser.uid).get();
    userData = userData.data();

    const { promotions } = userData;
    promotions[promotionType] = { shouldShow: false };

    return db
        .collection('users')
        .doc(user.uid)
        .set({ promotions }, { merge: true });
}
