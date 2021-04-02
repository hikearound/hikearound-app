import { db } from '../lib/Fire';

export function writeReviewFlag(type, rid) {
    return db.collection('flags').doc().set({ type, rid }, { merge: true });
}

export default writeReviewFlag;
