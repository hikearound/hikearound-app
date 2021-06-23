import { combineReducers } from 'redux';

import authReducer from '@reducers/Auth';
import hikeReducer from '@reducers/Hike';
import userReducer from '@reducers/User';
import mapReducer from '@reducers/Map';
import modalReducer from '@reducers/Modal';
import feedReducer from '@reducers/Feed';
import navigationReducer from '@reducers/Navigation';
import reviewReducer from '@reducers/Review';
import notificationReducer from '@reducers/Notification';
import profileReducer from '@reducers/Profile';

const appReducer = combineReducers({
    authReducer,
    hikeReducer,
    userReducer,
    mapReducer,
    modalReducer,
    feedReducer,
    navigationReducer,
    reviewReducer,
    notificationReducer,
    profileReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_USER') {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;
