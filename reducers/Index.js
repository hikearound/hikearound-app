import { combineReducers } from 'redux';

import hikeReducer from './Hike';
import userReducer from './User';
import modalReducer from './Modal';

export default combineReducers({
    hikeReducer,
    userReducer,
    modalReducer,
});
