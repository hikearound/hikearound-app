export function truncateText(text, maxLength) {
    if (text.length >= maxLength) {
        return `${text.substring(0, maxLength)}...`;
    }
    return text;
}

export function parseText(text) {
    if (text) {
        return text.replace(/(\n\n)/gm, ' ');
    }
    return text;
}
