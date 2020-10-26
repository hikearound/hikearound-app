import { feedState } from '../constants/Reducers';

export default function feedReducer(state = feedState, action) {
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
