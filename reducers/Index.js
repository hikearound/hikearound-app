import { combineReducers } from 'redux';
import authReducer from './Auth';
import hikeReducer from './Hike';
import userReducer from './User';
import mapReducer from './Map';
import modalReducer from './Modal';
import feedReducer from './Feed';
import navigationReducer from './Navigation';

const reducers = {
    authReducer,
    hikeReducer,
    userReducer,
    mapReducer,
    modalReducer,
    feedReducer,
    navigationReducer,
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_USER') {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;
