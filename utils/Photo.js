import * as ImageManipulator from 'expo-image-manipulator';

export function reduceImageAsync(uri) {
    return ImageManipulator.manipulateAsync(uri, [{ resize: { width: 250 } }], {
        compress: 0.7,
    });
}

export default { reduceImageAsync };