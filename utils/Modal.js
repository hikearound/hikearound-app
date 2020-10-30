export function toggleModalVisibility(
    prevProps,
    currentModal,
    modalType,
    showModal,
    hideModal,
) {
    if (prevProps.currentModal !== currentModal) {
        if (currentModal === modalType) {
            showModal();
        } else if (currentModal === 'none') {
            hideModal();
        }
    }
}

export default toggleModalVisibility;
