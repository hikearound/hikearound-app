import * as ImageManipulator from 'expo-image-manipulator';
import { CacheManager } from 'react-native-expo-image-cache';
import { getHikeImage } from './Hike';

export async function reduceImageAsync(uri) {
    return ImageManipulator.manipulateAsync(uri, [{ resize: { width: 250 } }], {
        compress: 0.7,
    });
}

export function cacheImages(images) {
    return images.map((image) => {
        return CacheManager.get(image).getPath();
    });
}

export async function cacheHikeImage(hike) {
    let imageUrl = null;
    if (hike.images) {
        imageUrl = await getHikeImage(hike.id, 0);
        if (imageUrl) {
            await CacheManager.get(imageUrl).getPath();
        }
    }
    return imageUrl;
}

export async function getBlob(uri) {
    const blob = await new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            resolve(xhr.response);
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });
    return blob;
}

export default { reduceImageAsync, cacheImages, cacheHikeImage, getBlob };
