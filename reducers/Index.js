import { combineReducers } from 'redux';

import hikeReducer from './Hike';
import homeReducer from './Home';
import userReducer from './User';
import modalReducer from './Modal';

export default combineReducers({
    hikeReducer,
    homeReducer,
    userReducer,
    modalReducer,
});
