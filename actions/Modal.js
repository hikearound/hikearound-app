export const closeModal = () => {
    return { type: 'HIDE_MODAL' };
};

export const setLightboxImage = (imageIndex) => {
    return { type: 'SET_LIGHTBOX_IMAGE_INDEX', imageIndex };
};

export const showModal = (modalType) => {
    let modalAction;

    if (modalType === 'lightbox') {
        modalAction = 'SHOW_LIGHTBOX';
    } else if (modalType === 'map') {
        modalAction = 'SHOW_MAP';
    }

    return { type: modalAction };
};
