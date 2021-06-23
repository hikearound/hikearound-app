import { hikeState } from '@constants/Reducers';

export default function hikeReducer(state = hikeState, action) {
    switch (action.type) {
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
