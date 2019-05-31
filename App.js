import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import AppNavigator from './navigator/AppNavigator';

// console.disableYellowBox = true;

const initialState = {
    action: '',
    name: 'Stranger',
    avatar: 'https://cl.ly/55da82beb939/download/avatar-default.jpg'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_MENU':
            return { ...state, action: 'openMenu' };
        case 'CLOSE_MENU':
            return { ...state, action: 'closeMenu' };
        case 'UPDATE_NAME':
            return { ...state, name: action.name };
        case 'UPDATE_AVATAR':
            return { ...state, avatar: action.avatar };
        case 'OPEN_LOGIN':
            return { ...state, action: 'openLogin' };
        case 'CLOSE_LOGIN':
            return { ...state, action: 'closeLogin' };
        default:
            return state;
    }
};

const store = createStore(reducer);

const App = () => (
<Provider store={store}>
    <AppNavigator />
</Provider>
);

export default App;
