import * as ImageManipulator from 'expo-image-manipulator';
import { CacheManager } from 'react-native-expo-image-cache';
import { Asset } from 'expo-asset';

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

export function buildImageArray(images, imageCount) {
    const imageArray = [];

    for (let i = 0; i < imageCount; i += 1) {
        imageArray.push({
            thumbnailUri: images[i].uri.thumbnail,
            url: images[i].uri.cover,
            attribution: images[i].attribution,
        });
    }

    return imageArray;
}
