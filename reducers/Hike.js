const initialState = {
    hikeData: {},
};

export default function hikeReducer(state = initialState, action) {
    switch (action.type) {
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
