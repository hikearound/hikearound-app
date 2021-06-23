import { reviewState } from '@constants/Reducers';

export default function reviewReducer(state = reviewState, action) {
    switch (action.type) {
        case 'ADD_REVIEW_DATA':
            return {
                ...state,
                action: 'addReview',
                reviewData: action.reviewData,
                selectedReview: action.reviewData.rid,
                selectedHike: action.reviewData.hid,
            };

        case 'UPDATE_REVIEW_DATA':
            return {
                ...state,
                action: 'updateReview',
                reviewData: action.reviewData,
                selectedReview: action.reviewData.rid,
            };

        case 'DELETE_REVIEW_DATA':
            return {
                ...state,
                action: 'deleteReview',
                selectedReview: action.reviewData.rid,
                selectedHike: action.reviewData.hid,
            };

        default:
            return state;
    }
}
