import { showLocation } from 'react-native-map-link';
import supercluster from 'supercluster';
import store from '@store/Store';
import { getMapSetting } from '@utils/Settings';
import { config, queryParams } from '@constants/Map';
import { queryHikes } from '@utils/Feed';

export async function getMapMarkers(position, distance) {
    const { querySize, queryType, lastKey, sortDirection, filterParams } =
        queryParams;

    if (Object.keys(position).length === 0) {
        return [];
    }

    const { data } = await queryHikes(
        querySize,
        queryType,
        lastKey,
        position,
        sortDirection,
        distance,
        filterParams,
    );

    return data;
}

export async function getMapData(dispatchMapData) {
    const state = store.getState();
    const { selectedHike } = state.mapReducer;
    const { currentPosition } = state.userReducer;

    const markers = await getMapMarkers(currentPosition, queryParams.distance);
    dispatchMapData({ selectedHike, markers });
}

export function getDrivingDirections(latitude, longitude, hikeName) {
    const state = store.getState();
    const { map } = state.userReducer;

    const mapProvider = getMapSetting(map);

    showLocation({
        latitude,
        longitude,
        title: hikeName,
        app: mapProvider,
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

export function getClusterZoomAltitude(cluster, clusterId) {
    const zoom = cluster.getClusterExpansionZoom(clusterId);

    const altitude =
        0.05 *
        (591657550.5 / 2 ** (zoom - 1) / 2) *
        Math.cos(85.362 / 2 / Math.sin(85.362 / 2));

    return altitude;
}

export function filterMarkers(region, visibleMarkers) {
    let markers = null;

    const coords = visibleMarkers.map((c) => ({
        geometry: {
            coordinates: [
                c.coordinates.starting.lng,
                c.coordinates.starting.lat,
            ],
        },
        distance: c.distance,
        id: c.id,
    }));

    if (coords.length !== 0) {
        markers = getCluster(coords, region);
    }

    return markers;
}
