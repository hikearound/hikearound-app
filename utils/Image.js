import * as ImageManipulator from 'expo-image-manipulator';
import { CacheManager } from 'react-native-expo-image-cache';

export function reduceImageAsync(uri) {
    return ImageManipulator.manipulateAsync(uri, [{ resize: { width: 250 } }], {
        compress: 0.7,
    });
}

export function cacheImages(images) {
    return images.map((image) => {
        return CacheManager.get(image).getPath();
    });
}

export default { reduceImageAsync, cacheImages };
