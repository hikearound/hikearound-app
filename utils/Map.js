import openMap from 'react-native-open-maps';
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
