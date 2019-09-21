import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppNavigator from './navigator/AppNavigator';
import reducer from './reducers/Index';

// eslint-disable-next-line no-console
console.disableYellowBox = true;

const store = createStore(reducer);

const App = () => (
    <Provider store={store}>
        <AppNavigator />
    </Provider>
);

export default App;
