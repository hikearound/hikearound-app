import { modalState } from '../constants/Reducers';

export default function modalReducer(state = modalState, action) {
    switch (action.type) {
        case 'SHOW_LIGHTBOX':
            return {
                ...state,
                action: 'showLightbox',
                currentModal: action.modalType,
            };

        case 'SHOW_MAP':
            return {
                ...state,
                action: 'showMap',
                currentModal: action.modalType,
            };

        case 'SHOW_EDIT_PROFILE':
            return {
                ...state,
                action: 'showEditProfile',
                currentModal: action.modalType,
            };

        case 'SHOW_RESET_PASSWORD':
            return {
                ...state,
                action: 'showResetPassword',
                currentModal: action.modalType,
            };

        case 'SHOW_FILTER':
            return {
                ...state,
                action: 'showFilter',
                currentModal: action.modalType,
            };

        case 'SHOW_REVIEW':
            return {
                ...state,
                action: 'showReview',
                currentModal: action.modalType,
            };

        case 'HIDE_MODAL':
            return {
                ...state,
                action: 'hideModal',
                modalCloseAction: action.modalCloseAction,
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

        default:
            return state;
    }
}
