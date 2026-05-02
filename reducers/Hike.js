import { hikeState } from '@constants/Reducers';

export default function hikeReducer(inputState, action) {
  const state = inputState ?? hikeState;
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
