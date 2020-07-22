import openMap from 'react-native-open-maps';
import supercluster from 'supercluster';
import store from '../store/Store';
import { getMapSetting } from './Settings';

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

export function getCluster(coords, region) {
    const cluster = supercluster({ radius: 25, maxZoom: 8 });
    const padding = 0;

    cluster.load(coords);
    let markers = [];

    markers = cluster.getClusters(
        [
            region.longitude - region.longitudeDelta * (0.5 + padding),
            region.latitude - region.latitudeDelta * (0.5 + padding),
            region.longitude + region.longitudeDelta * (0.5 + padding),
            region.latitude + region.latitudeDelta * (0.5 + padding),
        ],
        getZoomLevel(region.longitudeDelta),
    );

    return { markers, cluster };
}
