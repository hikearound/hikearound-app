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

export default getToastText;
