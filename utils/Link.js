import { Linking } from 'expo';
import { openHikeScreen } from './Hike';

export function getHikeIdFromUrl(url) {
    const re = new RegExp('/hike/(.*)');
    const hid = re.exec(url);
    if (hid) {
        return hid[1];
    }
    return null;
}

export function handleOpenURL(url, navigation) {
    const hid = getHikeIdFromUrl(url);
    if (hid && navigation) {
        openHikeScreen(hid, navigation);
    }
}

export async function checkInitialUrl(navigation) {
    const url = await Linking.getInitialURL();
    if (url) {
        handleOpenURL(url, navigation);
    }
}

export async function addUrlListener(navigation) {
    Linking.addEventListener('url', (event) =>
        handleOpenURL(event.url, navigation),
    );
}

export async function removeUrlListener(navigation) {
    Linking.removeEventListener('url', (event) =>
        handleOpenURL(event.url, navigation),
    );
}

export default {
    getHikeIdFromUrl,
    handleOpenURL,
    checkInitialUrl,
    addUrlListener,
    removeUrlListener,
};
