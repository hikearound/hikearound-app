export const closeModal = (modalCloseAction) => {
    return { type: 'HIDE_MODAL', modalCloseAction };
};

export const setLightboxImage = (imageIndex) => {
    return { type: 'SET_LIGHTBOX_IMAGE_INDEX', imageIndex };
};

export const setMapHike = (mapHike) => {
    return { type: 'SET_MAP_HIKE', mapHike };
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

        default:
            return {};
    }
};
