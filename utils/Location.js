import * as Location from 'expo-location';
import geohash from 'ngeohash';
import { degreesPerMile } from '../constants/Location';

export async function getCurrentPosition() {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
        return null;
    }

    const position = await Location.getCurrentPositionAsync({});
    return position;
}

export function getGeohashRange(latitude, longitude, distance) {
    const lowerLat = latitude - degreesPerMile.lat * distance;
    const lowerLon = longitude - degreesPerMile.lon * distance;

    const upperLat = latitude + degreesPerMile.lat * distance;
    const upperLon = longitude + degreesPerMile.lon * distance;

    return {
        lower: geohash.encode(lowerLat, lowerLon),
        upper: geohash.encode(upperLat, upperLon),
    };
}

export default { getCurrentPosition, getGeohashRange };
