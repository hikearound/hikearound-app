import { authState } from '@constants/Reducers';

export default function authReducer(inputState, action) {
  const state = inputState ?? authState;
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
