import * as FacebookAds from 'expo-ads-facebook';
import { testAdTypes, placements } from '@constants/Ad';

export function enableAdTracking() {
    FacebookAds.AdSettings.setAdvertiserTrackingEnabled(true);
}

export async function getAdPermissions() {
    return FacebookAds.AdSettings.getPermissionsAsync();
}

export async function requestAdPermissions() {
    return FacebookAds.AdSettings.requestPermissionsAsync();
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
    const placementId = getPlacementId(slotType);
    const numberOfAdsToRequest = 5;

    return new FacebookAds.NativeAdsManager(placementId, numberOfAdsToRequest);
}

export function addTestDevice() {
    if (__DEV__) {
        FacebookAds.AdSettings.addTestDevice(
            FacebookAds.AdSettings.currentDeviceHash,
        );
    }
}
