import * as FacebookAds from 'expo-ads-facebook';
import { testAdTypes, placements } from '../constants/Ad';

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
    return new FacebookAds.NativeAdsManager(placementId);
}

export default getAdsManager;
