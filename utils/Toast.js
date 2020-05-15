export function getToastText(action, t, data) {
    if (action === 'favoriteHike') {
        return t('toast.favorite', { hikeName: data.name });
    }
    if (action === 'copyLink') {
        return t('toast.share');
    }
    return null;
}

export default { getToastText };
