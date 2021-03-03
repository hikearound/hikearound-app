import { combineReducers } from 'redux';

import authReducer from './Auth';
import hikeReducer from './Hike';
import userReducer from './User';
import mapReducer from './Map';
import modalReducer from './Modal';
import feedReducer from './Feed';
import navigationReducer from './Navigation';
import reviewReducer from './Review';
import notificationReducer from './Notification';
import profileReducer from './Profile';

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
