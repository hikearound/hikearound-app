import * as Location from 'expo-location';
import geohash from 'ngeohash';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_GEO_KEY } from 'react-native-dotenv';
import { degreesPerMile } from '../constants/Location';
import { getPermissionStatus } from './Permissions';

export async function initializeGeolocation() {
    Geocoder.init(GOOGLE_GEO_KEY);
}

export async function getNearestCity(coords, objectType) {
    const { latitude, longitude } = coords;
    const geocode = await Geocoder.from({ lat: latitude, lng: longitude });
    const resultsLength = geocode.results[0].address_components.length;

    for (let ac = 0; ac < resultsLength; ac += 1) {
        const component = geocode.results[0].address_components[ac];

        switch (component.types[0]) {
            case 'locality':
                if (objectType === 'cityName') {
                    return component.long_name;
                }
                break;
            case 'administrative_area_level_2':
                if (objectType === 'countyName') {
                    return component.long_name;
                }
                break;
            default:
                break;
        }
    }

    return null;
}

export async function requestLocationPermission() {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
        return null;
    }
    return status;
}

export async function getPosition(type) {
    let position = {};
    let status = await getPermissionStatus('location');

    if (status !== 'granted') {
        status = await requestLocationPermission();
        if (status !== 'granted') {
            return position;
        }
    }

    if (type === 'current') {
        position = await Location.getCurrentPositionAsync();
    } else {
        position = await Location.getLastKnownPositionAsync();
    }

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
