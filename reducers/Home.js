import { homeState } from '../constants/Reducers';

export default function homeReducer(state = homeState, action) {
    switch (action.type) {
        case 'TOGGLE_SCREEN_TYPE':
            return {
                ...state,
                screenType: action.screenType,
            };
        default:
            return state;
    }
}
