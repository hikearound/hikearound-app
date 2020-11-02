import { db, auth, timestamp } from '../lib/Fire';
import { getUserProfileData } from './User';

export async function writeReviewData(reviewData) {
    const user = auth.currentUser;

    reviewData.uid = user.uid;
    reviewData.userLikes = [];
    reviewData.savedOn = timestamp;

    // const formatedReview = review.split('\n').join('\\n');
    // db.collection('reviews').doc().set(reviewData, { merge: true });
}

export function getReviewRef(hid, sortDirection, querySize) {
    return db
        .collection('reviews')
        .where('hid', '==', hid)
        .orderBy('savedOn', sortDirection)
        .limit(querySize);
}

export async function queryReviews(hid, sortDirection, querySize, lastKey) {
    let reviewRef = getReviewRef(hid, sortDirection, querySize);

    if (lastKey) {
        reviewRef = reviewRef.startAfter(lastKey);
    }

    const querySnapshot = await reviewRef.get();
    const data = [];

    await querySnapshot.forEach(async (review) => {
        if (review.exists) {
            const reviewData = review.data() || {};

            const reduced = {
                id: review.id,
                ...reviewData,
            };

            data.push(reduced);
        }
    });

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    return { data, cursor: lastVisible };
}

export async function buildReviewData(data) {
    const reviews = {};

    for (const review of data) {
        const userData = await getUserProfileData(review.uid);
        const { name, location, photoURL } = userData;

        review.user = { name, location, photoURL };
        reviews[review.id] = review;
    }

    return reviews;
}

export function sortReviews(previousState, reviews, sortDirection) {
    const data = { ...previousState.data, ...reviews };

    let sortedReviews = Object.values(data).sort(
        (a, b) => a.createdOn < b.createdOn,
    );

    if (sortDirection === 'desc') {
        sortedReviews = Object.values(data).sort(
            (a, b) => a.createdOn > b.createdOn,
        );
    }

    return { data, sortedReviews };
}
