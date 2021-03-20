import Constants from 'expo-constants';

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

export function getDismissIconPosition(includeBackground) {
    let position = { top: 47.5, right: 20 };

    if (includeBackground) {
        position = { top: 40, right: 20 };
    }

    if (Constants.statusBarHeight === 20) {
        position = { top: 15, right: 15 };
    }

    return position;
}

export function getOverflowIconPosition() {
    let position = { top: 45, left: 20 };

    if (Constants.statusBarHeight === 20) {
        position = { top: 15, left: 15 };
    }

    return position;
}
