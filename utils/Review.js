import { Appearance } from 'react-native-appearance';
import { db, auth, timestamp } from '../lib/Fire';
import { getUserProfileData } from './User';
import { avatarDefault, avatarDark } from '../constants/Images';

const scheme = Appearance.getColorScheme();

export async function buildReviewArray(data) {
    const reviews = [];

    for (const review of data) {
        const userData = await getUserProfileData(review.uid);

        if (!userData.photoURL) {
            userData.photoURL = avatarDefault;

            if (scheme === 'dark') {
                userData.photoURL = avatarDark;
            }
        }

        review.user = {
            name: userData.name,
            location: userData.location,
            photoURL: userData.photoURL,
        };

        reviews[review.id] = review;
        reviews.push(review);
    }

    if (data.length === 0) {
        return [];
    }

    return reviews;
}

export async function updateReviewData(rid, reviewData) {
    db.collection('reviews').doc(rid).set(reviewData, { merge: true });
}

export async function getReviewData(rid) {
    let reviewData = await db.collection('reviews').doc(rid).get();

    reviewData = reviewData.data();
    reviewData.id = rid;

    return reviewData;
}

export async function writeReviewData(reviewData) {
    const user = auth.currentUser;

    reviewData.uid = user.uid;
    reviewData.userLikes = [];
    reviewData.savedOn = timestamp;

    return db
        .collection('reviews')
        .add(reviewData)
        .then(async function (docRef) {
            const review = await getReviewData(docRef.id);
            return review;
        });
}

export function getReviewRef(hid, sortDirection, querySize) {
    return db
        .collection('reviews')
        .where('hid', '==', hid)
        .orderBy('savedOn', sortDirection)
        .limit(querySize);
}

export async function getRecentReviews(hid, sortDirection, querySize) {
    const reviewRef = getReviewRef(hid, sortDirection, querySize);
    const querySnapshot = await reviewRef.get();

    let recentReviews = [];

    await querySnapshot.forEach((review) => {
        if (review.exists) {
            const reviewData = review.data() || {};
            reviewData.id = review.id;

            const reduced = {
                key: review.id,
                ...reviewData,
            };

            recentReviews.push(reduced);
        }
    });

    recentReviews = await buildReviewArray(recentReviews);
    return recentReviews;
}

export function writeReviewLikes(rid, userLikes) {
    db.collection('reviews').doc(rid).set({ userLikes }, { merge: true });
}
