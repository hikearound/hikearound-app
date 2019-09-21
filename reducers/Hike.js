const initialState = {};

export default function Hike(state = initialState, action) {
    switch (action.type) {
        case 'FAVORITE_HIKE':
            return { ...state, action: 'favoriteHike' };
        case 'UNFAVORITE_HIKE':
            return { ...state, action: 'unfavoriteHike' };
        default:
            return state;
    }
}
