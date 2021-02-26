export const closeModal = (closeAction) => ({
    type: 'HIDE_MODAL',
    closeAction,
});

export const setLightboxImage = (imageIndex) => ({
    type: 'SET_LIGHTBOX_IMAGE_INDEX',
    imageIndex,
});

export const setSelectedHike = (hid) => ({ type: 'SET_SELECTED_HIKE', hid });

export const setReviewData = (reviewData) => ({
    type: 'SET_REVIEW_DATA',
    reviewData,
});

export const setFlaggedReview = (rid) => ({ type: 'SET_FLAGGED_REVIEW', rid });

export const showModal = (modalType) => ({ type: 'SHOW_MODAL', modalType });
