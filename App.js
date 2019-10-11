import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
/* eslint-disable import/no-unresolved */
import { AppearanceProvider } from 'react-native-appearance';
import AppNavigator from './navigator/AppNavigator';
import reducer from './reducers/Index';

const store = createStore(reducer);
const App = () => (
    <AppearanceProvider>
        <Provider store={store}>
            <AppNavigator />
        </Provider>
    </AppearanceProvider>
);

export default App;
