import { modalState } from '../constants/Reducers';

export default function modalReducer(state = modalState, action) {
    switch (action.type) {
        case 'SHOW_LIGHTBOX':
            return { ...state, action: 'showLightbox' };
        case 'SHOW_MAP':
            return { ...state, action: 'showMap' };
        case 'SHOW_EDIT_PROFILE':
            return { ...state, action: 'showEditProfile' };
        case 'HIDE_MODAL':
            return {
                ...state,
                action: 'hideModal',
                modalCloseAction: action.modalCloseAction,
            };
        case 'SET_LIGHTBOX_IMAGE_INDEX':
            return { ...state, imageIndex: action.imageIndex };
        default:
            return state;
    }
}
