import { db, auth } from '../lib/Fire';

export async function writeReviewData(reviewData) {
    const user = auth.currentUser;
    db.collection('users').doc(user.uid).set(reviewData, { merge: true });
}

export default writeReviewData;
