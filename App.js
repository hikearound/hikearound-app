import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import AppNavigator from './navigators/AppNavigator';
import reducer from './reducers/Index';
import Fire from './lib/Fire';

const store = createStore(reducer);

class App extends React.Component {
    async componentDidMount() {
        await new Fire();
    }

    render() {
        return (
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        );
    }
}

Sentry.init({
    dsn: Constants.manifest.extra.sentryDsn,
    enableInExpoDevelopment: false,
    debug: true,
});

Sentry.setRelease(Constants.manifest.revisionId);

export default App;
