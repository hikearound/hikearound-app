import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { AppearanceProvider } from 'react-native-appearance';
import AppNavigator from './navigator/AppNavigator';
import reducer from './reducers/Index';

const store = createStore(reducer);
const App = () => (
    <Provider store={store}>
        <AppearanceProvider>
            <AppNavigator />
        </AppearanceProvider>
    </Provider>
);

export default App;
