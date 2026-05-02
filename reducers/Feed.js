import { feedState } from '@constants/Reducers';

export default function feedReducer(inputState, action) {
  const state = inputState ?? feedState;
  switch (action.type) {
    case 'FILTER_FEED':
      return {
        ...state,
        filterParams: { ...action.filterParams },
      };

    default:
      return state;
  }
}
