import { profileState } from '@constants/Reducers';

export default function profileReducer(inputState, action) {
  const state = inputState ?? profileState;
  switch (action.type) {
    case 'INITIALIZE_PROFILE_DATA':
      return {
        ...state,
        favoriteHikes: action.profileData.favoriteHikes,
      };

    default:
      return state;
  }
}
