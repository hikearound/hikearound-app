import { testAdTypes, placements } from '@constants/Ad';

export function enableAdTracking() {
    // Facebook Ads removed - no-op
}

export async function getAdPermissions() {
    // Facebook Ads removed - return denied permission
    return { granted: false };
}

export async function requestAdPermissions() {
    // Facebook Ads removed - return denied permission
    return Promise.resolve({ granted: false });
}

export function getPlacementId(slotType) {
    if (__DEV__) {
        const adType =
            testAdTypes[Math.floor(Math.random() * testAdTypes.length)];
        return `${adType}#${placements[slotType]}`;
    }

    return placements[slotType];
}

export function getAdsManager(slotType) {
    // Facebook Ads removed - return null
    return null;
}

export function addTestDevice() {
    // Facebook Ads removed - no-op
}
