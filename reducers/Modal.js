import { modalState } from '@constants/Reducers';

export default function modalReducer(state = modalState, action) {
    switch (action.type) {
        case 'SHOW_MODAL':
            return {
                ...state,
                action: 'showModal',
                currentModal: action.modalType,
            };

        case 'HIDE_MODAL':
            return {
                ...state,
                reviewData: {},
                action: 'hideModal',
                currentModal: 'none',
                closeAction: action.closeAction,
            };

        case 'SET_LIGHTBOX_IMAGE_INDEX':
            return {
                ...state,
                imageIndex: action.imageIndex,
            };

        case 'SET_SELECTED_HIKE':
            return {
                ...state,
                selectedHike: action.hid,
            };

        case 'SET_REVIEW_DATA':
            return {
                ...state,
                reviewData: action.reviewData,
            };

        case 'SET_FLAGGED_REVIEW':
            return {
                ...state,
                flaggedReview: action.rid,
            };

        default:
            return state;
    }
}
