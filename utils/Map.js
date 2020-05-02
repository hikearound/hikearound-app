import { darkTheme } from '../constants/Maps';
import store from '../store/Store';

export async function getMapData(dispatchMapData, scheme) {
    const state = store.getState();
    const { darkMode } = state.userReducer;

    let mapData = {};

    if (scheme === 'dark' || darkMode) {
        mapData = {
            mapType: 'standard',
            mapStyle: darkTheme,
        };
    } else {
        mapData = {
            mapType: 'terrain',
            mapStyle: [],
        };
    }

    dispatchMapData(mapData);
}

export default { getMapData };
