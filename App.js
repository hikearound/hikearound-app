import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppNavigator from './navigator/AppNavigator';

// eslint-disable-next-line no-console
console.disableYellowBox = true;

const initialState = {
    action: '',
    name: 'Patrick Dugan',
    location: 'Seattle, WA',
    mapPreference: 'Apple Maps',
    avatar: 'https://patdugan.me/images/me.jpg',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'FAVORITE_HIKE':
        return { ...state, action: 'favoriteHike' };
    case 'UNFAVORITE_HIKE':
        return { ...state, action: 'unfavoriteHike' };
    case 'UPDATE_NAME':
        return { ...state, name: action.name };
    case 'UPDATE_AVATAR':
        return { ...state, avatar: action.avatar };
    case 'UPDATE_LOCATION':
        return { ...state, avatar: action.location };
    case 'SET_MAP_PREFERENCE':
        return { ...state, mapPreference: action.mapPreference };
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
