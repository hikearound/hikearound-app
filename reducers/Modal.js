const initialState = {
    imageIndex: 0,
};

export default function modalReducer(state = initialState, action) {
    switch (action.type) {
        case 'SHOW_LIGHTBOX':
            return { ...state, action: 'showLightbox' };
        case 'SHOW_MAP':
            return { ...state, action: 'showMap' };
        case 'HIDE_MODAL':
            return { ...state, action: 'hideModal' };
        case 'SET_LIGHTBOX_IMAGE_INDEX':
            return {
                ...state,
                imageIndex: action.imageIndex,
            };
        default:
            return state;
    }
}
