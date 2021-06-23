import { profileState } from '@constants/Reducers';

export default function profileReducer(state = profileState, action) {
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
