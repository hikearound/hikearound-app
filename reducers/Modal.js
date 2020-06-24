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

        case 'SET_LIGHTBOX_IMAGE_INDEX':
            return {
                ...state,
                imageIndex: action.imageIndex,
            };

        case 'SET_MAP_HIKE':
            return {
                ...state,
                mapHike: action.mapHike,
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
