import { modalState } from '../constants/Reducers';

export default function modalReducer(state = modalState, action) {
    switch (action.type) {
        case 'SHOW_LIGHTBOX':
            return {
                ...state,
                action: 'showLightbox',
            };

        case 'SHOW_MAP':
            return {
                ...state,
                action: 'showMap',
            };

        case 'SHOW_EDIT_PROFILE':
            return {
                ...state,
                action: 'showEditProfile',
            };

        case 'SHOW_RESET_PASSWORD':
            return {
                ...state,
                action: 'showResetPassword',
            };

        case 'SHOW_FILTER':
            return {
                ...state,
                action: 'showFilter',
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

        case 'HIDE_MODAL':
            return {
                ...state,
                action: 'hideModal',
                modalCloseAction: action.modalCloseAction,
            };

        default:
            return state;
    }
}
