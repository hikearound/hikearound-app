import * as ImageManipulator from 'expo-image-manipulator';
import { CacheManager } from 'react-native-expo-image-cache';
import { Asset } from 'expo-asset';
import { getHikeCoverImage } from './Hike';

export async function reduceImageAsync(uri) {
    return ImageManipulator.manipulateAsync(uri, [{ resize: { width: 250 } }], {
        compress: 0.7,
    });
}

export async function clearCache() {
    await CacheManager.clearCache();
}

export function cacheImages(images) {
    return images.map((image) => {
        if (typeof image === 'string') {
            return CacheManager.get(image).getPath();
        }
        return Asset.fromModule(image).downloadAsync();
    });
}

export async function cacheHikeImage(hike, photoIndex) {
    let imageUrl = null;
    imageUrl = await getHikeCoverImage(hike.id, photoIndex);

    if (imageUrl) {
        await CacheManager.get(imageUrl).getPath();
    }

    return imageUrl;
}

export async function getBlob(uri) {
    const blob = await new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });
    return blob;
}
