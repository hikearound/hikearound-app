export function getHikeIdFromUrl(url) {
    const re = new RegExp('/hike/(.*)');
    const hid = re.exec(url);
    if (hid) {
        return hid[1];
    }
    return null;
}

export default { getHikeIdFromUrl };
