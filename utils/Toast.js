export function maybeTruncateToast(toast) {
    if (toast.length >= 35) {
        toast = `${toast.substring(0, 35)}...`;
    }
    return toast;
}

export function getToastText(action, t, data) {
    if (action === 'favoriteHike') {
        const toast = maybeTruncateToast(
            t('toast.favorite', { hikeName: data.name }),
        );
        return toast;
    }
    if (action === 'copyLink') {
        return t('toast.share');
    }
    return null;
}
