import store from '../store/Store';

export async function getMapData(dispatchMapData) {
    const state = store.getState();
    const { selectedHike } = state.mapReducer;

    dispatchMapData({ selectedHike });
}

export default getMapData;
