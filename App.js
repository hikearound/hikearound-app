import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import AppNavigator from './navigator/AppNavigator';
import reducer from './reducers/Index';

const store = createStore(reducer);
const dsn = 'https://5c8352d2c1f6437c9f678277bfc5528d@sentry.io/1811790';

const App = () => (
    <Provider store={store}>
        <AppNavigator />
    </Provider>
);

Sentry.init({
    dsn,
    enableInExpoDevelopment: false,
    debug: true,
});

Sentry.setRelease(Constants.manifest.revisionId);

export default App;
