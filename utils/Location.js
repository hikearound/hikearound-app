import * as Location from 'expo-location';
import geohash from 'ngeohash';
import Constants from 'expo-constants';
import Geocoder from 'react-native-geocoding';
import { degreesPerMile } from '../constants/Location';

export async function initializeGeolocation() {
    Geocoder.init(Constants.manifest.extra.googleGeoApiKey);
}

export async function getNearestCity(coords) {
    const { latitude, longitude } = coords;
    const geocode = await Geocoder.from({ lat: latitude, lng: longitude });
    return geocode.results[0].address_components[4].long_name;
}

export async function getCurrentPosition() {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
        return null;
    }
    const position = await Location.getCurrentPositionAsync({});
    return position;
}

export function getModifier(type, distance) {
    if (type === 'lat') {
        return degreesPerMile.lat * distance;
    }
    return degreesPerMile.lon * distance;
}

export function getRange(latitude, longitude, distance) {
    const latModifier = getModifier('lat', distance);
    const lonModifier = getModifier('lon', distance);

    const lowerLat = latitude - latModifier;
    const upperLat = latitude + latModifier;

    const lowerLon = longitude - lonModifier;
    const upperLon = longitude + lonModifier;

    return {
        lower: geohash.encode(lowerLat, lowerLon),
        upper: geohash.encode(upperLat, upperLon),
    };
}
