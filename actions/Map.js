export const initializeMapData = (mapData) => {
    return { type: 'INITIALIZE_MAP_DATA', mapData };
};

export const updateMapData = (mapData) => {
    return { type: 'UPDATE_MAP_DATA', mapData };
};
