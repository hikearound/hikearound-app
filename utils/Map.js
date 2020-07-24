import openMap from 'react-native-open-maps';
import supercluster from 'supercluster';
import store from '../store/Store';
import { getMapSetting } from './Settings';
import { config, queryParams } from '../constants/Map';
import { pageFeed } from './Feed';

export async function getMapData(dispatchMapData) {
    const state = store.getState();
    const { selectedHike } = state.mapReducer;

    dispatchMapData({ selectedHike });
}

export async function getMapMarkers(position, distance) {
    const { pageSize, sortDirection } = queryParams;

    const { data } = await pageFeed(
        pageSize,
        null,
        position,
        sortDirection,
        distance,
    );

    return data;
}

export function getDrivingDirections(latitude, longitude) {
    const state = store.getState();
    const { map } = state.userReducer;

    const mapProvider = getMapSetting(map);

    openMap({
        provider: mapProvider,
        travelType: 'drive',
        query: `${latitude}, ${longitude}`,
    });
}

export function getZoomLevel(longitudeDelta) {
    return Math.round(Math.log(360 / longitudeDelta) / Math.LN2);
}

export function getBoundingBox(region) {
    const { padding } = config;
    const { longitude, longitudeDelta, latitude, latitudeDelta } = region;

    return [
        longitude - longitudeDelta * padding,
        latitude - latitudeDelta * padding,
        longitude + longitudeDelta * padding,
        latitude + latitudeDelta * padding,
    ];
}

export function getCluster(coords, region) {
    let markers = [];

    const cluster = supercluster(config);
    cluster.load(coords);

    markers = cluster.getClusters(
        getBoundingBox(region),
        getZoomLevel(region.longitudeDelta),
    );

    return { markers, cluster };
}
export function filterMarkers(region, visibleMarkers) {
    let markers = null;

    const coords = visibleMarkers.map((c) => ({
        geometry: {
            coordinates: [c.coordinates.center.lng, c.coordinates.center.lat],
        },
        distance: c.distance,
        id: c.id,
    }));

    if (coords.length !== 0) {
        markers = getCluster(coords, region);
    }

    return markers;
}
