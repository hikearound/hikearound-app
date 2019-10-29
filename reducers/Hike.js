const initialState = {
    action: '',
    hikeData: [],
    updatedHikeData: {},
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
                updatedHikeData: action.updatedHikeData,
            };
        case 'UNFAVORITE_HIKE':
            return {
                ...state,
                action: 'unfavoriteHike',
                updatedHikeData: action.updatedHikeData,
            };
        default:
            return state;
    }
}
