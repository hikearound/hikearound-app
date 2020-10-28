import * as Location from 'expo-location';
import geohash from 'ngeohash';
import Geocoder from 'react-native-geocoding';
import Constants from 'expo-constants';
import { geoDistances } from '../constants/Location';
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

export function shouldSetCity(lastKnownPosition) {
    if (Object.keys(lastKnownPosition).length !== 0) {
        return true;
    }

    return false;
}

export async function getPosition(type) {
    let location;
    const currentStatus = await getPermissionStatus('location');

    if (currentStatus !== 'granted') {
        const requestedStatus = await requestLocationPermission();
        if (requestedStatus !== 'granted') {
            return {};
        }
    }

    if (type !== 'current') {
        location = await Location.getLastKnownPositionAsync();
    }

    if (location == null) {
        location = await Location.getCurrentPositionAsync();
    }

    return location;
}

export function getModifier(type, distance, latitude) {
    const { latMilesPerDegree, lonMilesPerDegreeAtEquator } = geoDistances;

    if (type === 'lat') {
        return (1 / latMilesPerDegree) * distance;
    }

    const lonMilesPerDegree =
        Math.cos((latitude * Math.PI) / 180) * lonMilesPerDegreeAtEquator;

    return (1 / lonMilesPerDegree) * distance;
}

export function getRange(latitude, longitude, distance) {
    const latModifier = getModifier('lat', distance, latitude);
    const lonModifier = getModifier('lon', distance, null);

    const lowerLat = latitude - latModifier;
    const upperLat = latitude + latModifier;

    const lowerLon = longitude - lonModifier;
    const upperLon = longitude + lonModifier;

    return {
        lower: geohash.encode(lowerLat, lowerLon),
        upper: geohash.encode(upperLat, upperLon),
    };
}

export function maybeShowHikeInFeed(
    distance,
    userLat,
    userLng,
    hikeLat,
    hikeLng,
) {
    const latModifier = getModifier('lat', distance, userLat);
    const lngModifier = getModifier('lon', distance, null);

    const latDiff = Math.abs(userLat - hikeLat);
    const lngDiff = Math.abs(userLng - hikeLng);

    if (latDiff >= latModifier || lngDiff >= lngModifier) {
        return false;
    }

    return true;
}
