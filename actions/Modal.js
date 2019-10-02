export const closeModal = () => {
    return { type: 'HIDE_MODAL' };
};

export const setLightboxImage = (imageIndex) => {
    return { type: 'SET_LIGHTBOX_IMAGE_INDEX', imageIndex };
};

export const showModal = (modalType) => {
    if (modalType === 'lightbox') {
        return { type: 'SHOW_LIGHTBOX' };
    }
    if (modalType === 'map') {
        return { type: 'SHOW_MAP' };
    }
    if (modalType === 'editProfile') {
        return { type: 'SHOW_EDIT_PROFILE' };
    }
    return {};
};
