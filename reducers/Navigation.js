import { navigationState } from '../constants/Reducers';

export default function navigationReducer(state = navigationState, action) {
    switch (action.type) {
        case 'SET_FOCUSED_STACK':
            return {
                ...state,
                focusedStack: action.stackName,
            };

        default:
            return state;
    }
}
