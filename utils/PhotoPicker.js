import * as ImagePicker from 'expo-image-picker';
import { reduceImageAsync, getBlob } from './Image';

export async function reduceImage(originalUri) {
    const { uri } = await reduceImageAsync(originalUri);
    return uri;
}

export async function uploadImage(uri, dispatchAvatar) {
    const blob = await getBlob(uri);

    if (blob) {
        dispatchAvatar({ uri, blob });
    }
}

export async function launchImageLibrary(dispatchAvatar) {
    const photo = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
    });

    if (!photo.cancelled) {
        const uri = await reduceImage(photo.uri);
        await uploadImage(uri, dispatchAvatar);
    }
}

export async function launchCamera(dispatchAvatar) {
    const photo = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
    });

    if (!photo.cancelled) {
        const uri = await reduceImage(photo.uri);
        await uploadImage(uri, dispatchAvatar);
    }
}

export async function checkImageLibraryPermissions(dispatchAvatar) {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
        const {
            status: newStatus,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (newStatus === 'granted') {
            launchImageLibrary(dispatchAvatar);
        }
    } else {
        launchImageLibrary(dispatchAvatar);
    }
}

export async function checkCameraPermissions(dispatchAvatar) {
    const { status } = await ImagePicker.getCameraPermissionsAsync();

    if (status !== 'granted') {
        const {
            status: newStatus,
        } = await ImagePicker.requestCameraPermissionsAsync();
        if (newStatus === 'granted') {
            launchCamera(dispatchAvatar);
        }
    } else {
        launchCamera(dispatchAvatar);
    }
}
