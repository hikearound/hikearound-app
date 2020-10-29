import React from 'react';
import Toast from 'react-native-toast-message';
import ToastComponent from '../components/Toast';
import { truncateText } from './Text';

export function getToastText(action, t, data) {
    if (action === 'favoriteHike') {
        return truncateText(t('toast.favorite', { hikeName: data.name }), 35);
    }
    if (action === 'copyLink') {
        return t('toast.share');
    }
    return null;
}

export function initializeToast() {
    Toast.show({
        text1: 'null',
        position: 'bottom',
        type: 'init',
    });
}

export const toastConfig = {
    success: (internalState) => {
        return <ToastComponent text={internalState.text1} />;
    },
    init: () => {
        return null;
    },
};
