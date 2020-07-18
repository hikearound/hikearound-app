import React from 'react';
import { Provider } from 'react-redux';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './navigators/AppNavigator';
import store from './store/Store';
import Fire from './lib/Fire';
import { ignoreWarnings } from './utils/Warnings';

enableScreens();
ignoreWarnings();

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
    dsn: Constants.manifest.extra.sentry.dsn,
    enableInExpoDevelopment: false,
    debug: true,
});

Sentry.setRelease(Constants.manifest.revisionId);

export default App;
