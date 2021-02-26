import React from 'react';
import ToastComponent from '../components/Toast';
import { truncateText } from './Text';
import { spacing } from '../constants/Index';

export function getToastText(action, t, data) {
    if (action === 'favoriteHike') {
        return truncateText(t('toast.favorite', { hikeName: data.name }), 35);
    }
    if (action === 'copyLink') {
        return t('toast.share');
    }
    return null;
}

export function getToastOffset() {
    return parseInt(spacing.tiny, 10);
}

export const toastConfig = {
    success: (internalState) => <ToastComponent text={internalState.text1} />,
};
