import * as Location from 'expo-location';

export async function getCurrentPosition() {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
        return null;
    }

    const position = await Location.getCurrentPositionAsync({});
    return position;
}

export default { getCurrentPosition };
