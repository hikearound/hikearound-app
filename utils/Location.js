import * as Location from 'expo-location';
import geohash from 'ngeohash';
import Geocoder from 'react-native-geocoding';
import Constants from 'expo-constants';
import { degreesPerMile } from '../constants/Location';
import { getPermissionStatus } from './Permissions';

export async function initializeGeolocation() {
    Geocoder.init(Constants.manifest.extra.googleGeo.apiKey);
}

export async function getNearestCity(coords) {
    const { latitude, longitude } = coords;

    const geocode = await Geocoder.from({ lat: latitude, lng: longitude });
    const resultsLength = geocode.results[0].address_components.length;

    let city;
    let state;

    for (let ac = 0; ac < resultsLength; ac += 1) {
        const component = geocode.results[0].address_components[ac];

        switch (component.types[0]) {
            case 'locality':
                city = component.long_name;
                break;
            case 'administrative_area_level_1':
                state = component.short_name;
                break;
            default:
                break;
        }
    }

    return `${city}, ${state}`;
}

export async function requestLocationPermission() {
    const { status } = await Location.requestPermissionsAsync();

    if (status !== 'granted') {
        return null;
    }

    return status;
}

export async function getPosition(type) {
    const currentStatus = await getPermissionStatus('location');

    if (currentStatus !== 'granted') {
        const requestedStatus = await requestLocationPermission();
        if (requestedStatus !== 'granted') {
            return {};
        }
    }

    if (type === 'current') {
        return Location.getCurrentPositionAsync();
    }

    return Location.getLastKnownPositionAsync();
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
