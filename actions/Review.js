import { deleteReviewData as deleteReview } from '../utils/Review';

export const addReviewData = (reviewData) => {
    return { type: 'ADD_REVIEW_DATA', reviewData };
};

export const updateReviewData = (reviewData) => {
    return { type: 'UPDATE_REVIEW_DATA', reviewData };
};

export const deleteReviewData = (reviewData) => {
    deleteReview(reviewData);
    return { type: 'DELETE_REVIEW_DATA', reviewData };
};
