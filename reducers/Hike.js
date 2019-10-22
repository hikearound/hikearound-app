const initialState = {
    hikeData: [],
};

export default function hikeReducer(state = initialState, action) {
    switch (action.type) {
        case 'INITIALIZE_HIKE_DATA':
            return {
                ...state,
                hikeData: action.hikeData,
            };
        case 'FAVORITE_HIKE':
            return {
                ...state,
                action: 'favoriteHike',
                hikeData: action.hikeData,
            };
        case 'UNFAVORITE_HIKE':
            return {
                ...state,
                action: 'unfavoriteHike',
                hikeData: action.hikeData,
            };
        default:
            return state;
    }
}
