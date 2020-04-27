import { createStore } from 'redux';
import reducer from '../reducers/Index';

const store = createStore(reducer);

export default store;
