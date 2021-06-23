import { authState } from '@constants/Reducers';

export default function authReducer(state = authState, action) {
    switch (action.type) {
        case 'INITIALIZE_AUTH_SUBSCRIPTION':
            return {
                ...state,
                user: action.user,
            };

        default:
            return state;
    }
}
