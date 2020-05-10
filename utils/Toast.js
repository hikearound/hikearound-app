export function getToastText(action, data) {
    let toastText;

    if (action === 'favoriteHike') {
        toastText = `You favorited ${data.name}.`;
    } else if (action === 'copyLink') {
        toastText = `Link copied to clipboard.`;
    }

    return toastText;
}

export default { getToastText };
