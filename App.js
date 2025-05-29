import React from 'react';
import { Provider } from 'react-redux';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import { enableScreens } from 'react-native-screens';
import Splash from './components/Splash';
import store from './store/Store';
import Fire from './lib/Fire';
import { ignoreWarnings } from './utils/Warnings';
import { addTestDevice, enableAdTracking } from './utils/Ad';

// Import Storybook
import StorybookUIRoot from './storybook';

enableScreens();
ignoreWarnings();

addTestDevice();
enableAdTracking();

const STORYBOOK_ENABLED = process.env.STORYBOOK_ENABLED === 'true';

class App extends React.Component {
    async componentDidMount() {
        if (!STORYBOOK_ENABLED) {
            await new Fire();
        }
    }

    render() {
        if (STORYBOOK_ENABLED) {
            return <StorybookUIRoot />;
        }

        return (
            <Provider store={store}>
                <Splash />
            </Provider>
        );
    }
}

Sentry.init({
    dsn: Constants.manifest.extra.sentry.dsn,
    enableInExpoDevelopment: false,
    debug: true,
});

export default App;
