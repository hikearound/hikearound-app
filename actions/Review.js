import { writeReviewData } from '../utils/Review';

export const addReviewData = (reviewData) => {
    writeReviewData(reviewData);
    return { type: 'ADD_REVIEW_DATA', reviewData };
};

export default addReviewData;
