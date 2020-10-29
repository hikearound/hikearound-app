export const closeModal = (modalCloseAction) => {
    return { type: 'HIDE_MODAL', modalCloseAction };
};

export const setLightboxImage = (imageIndex) => {
    return { type: 'SET_LIGHTBOX_IMAGE_INDEX', imageIndex };
};

export const setSelectedHike = (hid) => {
    return { type: 'SET_SELECTED_HIKE', hid };
};

export const showModal = (modalType) => {
    switch (modalType) {
        case 'lightbox':
            return {
                type: 'SHOW_LIGHTBOX',
            };

        case 'map':
            return {
                type: 'SHOW_MAP',
            };

        case 'editProfile':
            return {
                type: 'SHOW_EDIT_PROFILE',
            };

        case 'resetPassword':
            return {
                type: 'SHOW_RESET_PASSWORD',
            };

        case 'filter':
            return {
                type: 'SHOW_FILTER',
            };

        case 'review':
            return {
                type: 'SHOW_REVIEW',
            };

        default:
            return {};
    }
};
