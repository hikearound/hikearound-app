import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import AppNavigator from './navigator/AppNavigator';

// console.disableYellowBox = true;

const initialState = {
    action: '',
    name: 'Patrick Dugan',
    avatar: 'https://cl.ly/55da82beb939/download/avatar-default.jpg'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FAVORITE_HIKE':
            return { ...state, action: 'favoriteHike' };
        case 'UNFAVORITE_HIKE':
            return { ...state, action: 'unfavoriteHike' };
        case "UPDATE_NAME":
            return { ...state, name: action.name };
        case "UPDATE_AVATAR":
            return { ...state, avatar: action.avatar };
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
