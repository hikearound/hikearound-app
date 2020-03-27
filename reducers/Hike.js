import { hike } from '../constants/Reducers';

export default function hikeReducer(state = hike, action) {
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
        case 'COPY_LINK':
            return {
                ...state,
                action: 'copyLink',
            };
        default:
            return state;
    }
}
