import { db } from '../lib/Fire';

export function writeReviewFlag(type, rid) {
    db.collection('flags').doc().set({ type, rid }, { merge: true });
}

export default writeReviewFlag;
