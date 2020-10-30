export function toggleModalVisibility(
    prevProps,
    currentModal,
    modalType,
    functions,
) {
    if (prevProps.currentModal !== currentModal) {
        if (currentModal === modalType) {
            functions.show();
        } else if (currentModal === 'none') {
            functions.hide();
        }
    }
}

export default toggleModalVisibility;
