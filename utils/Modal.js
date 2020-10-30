export function toggleModalVisibility(
    action,
    modalAction,
    prevAction,
    showModal,
    hideModal,
) {
    if (prevAction !== action) {
        if (action === modalAction) {
            showModal();
        } else if (action === 'hideModal') {
            hideModal();
        }
    }
}

export default toggleModalVisibility;
