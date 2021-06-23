import { deleteReview } from '@utils/Review';

export const addReviewData = (reviewData) => ({
    type: 'ADD_REVIEW_DATA',
    reviewData,
});

export const updateReviewData = (reviewData) => ({
    type: 'UPDATE_REVIEW_DATA',
    reviewData,
});

export const deleteReviewData = (reviewData) => {
    deleteReview(reviewData);
    return { type: 'DELETE_REVIEW_DATA', reviewData };
};
