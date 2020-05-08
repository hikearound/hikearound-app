import { darkTheme } from '../constants/Maps';
import store from '../store/Store';

export async function getMapData(dispatchMapData, scheme) {
    const state = store.getState();

    const { darkMode } = state.userReducer;
    const { selectedHike } = state.mapReducer;

    let mapData = {};

    if (scheme === 'dark' || darkMode) {
        mapData = {
            mapType: 'standard',
            mapStyle: darkTheme,
            selectedHike,
        };
    } else {
        mapData = {
            mapType: 'terrain',
            mapStyle: [],
            selectedHike,
        };
    }

    dispatchMapData(mapData);
}

export default { getMapData };
