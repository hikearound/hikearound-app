import { combineReducers } from 'redux';

import hikeReducer from './Hike';
import userReducer from './User';
import mapReducer from './Map';
import modalReducer from './Modal';

export default combineReducers({
    hikeReducer,
    userReducer,
    mapReducer,
    modalReducer,
});
