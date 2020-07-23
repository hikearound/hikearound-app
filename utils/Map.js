import openMap from 'react-native-open-maps';
import supercluster from 'supercluster';
import store from '../store/Store';
import { getMapSetting } from './Settings';
import { config } from '../constants/Map';

export async function getMapData(dispatchMapData) {
    const state = store.getState();
    const { selectedHike } = state.mapReducer;

    dispatchMapData({ selectedHike });
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
    const angle = longitudeDelta;

    return Math.round(Math.log(360 / angle) / Math.LN2);
}

export function getBoundingBox(region) {
    const { padding } = config;

    return [
        region.longitude - region.longitudeDelta * padding,
        region.latitude - region.latitudeDelta * padding,
        region.longitude + region.longitudeDelta * padding,
        region.latitude + region.latitudeDelta * padding,
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
