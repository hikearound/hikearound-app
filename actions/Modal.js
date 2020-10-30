export const closeModal = (closeAction) => {
    return { type: 'HIDE_MODAL', closeAction };
};

export const setLightboxImage = (imageIndex) => {
    return { type: 'SET_LIGHTBOX_IMAGE_INDEX', imageIndex };
};

export const setSelectedHike = (hid) => {
    return { type: 'SET_SELECTED_HIKE', hid };
};

export const showModal = (modalType) => {
    return { type: 'SHOW_MODAL', modalType };
};
