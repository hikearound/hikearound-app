import React from 'react';
import { Provider } from 'react-redux';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Splash from './components/Splash';
import store from './store/Store';
import Fire from './lib/Fire';
import { ignoreWarnings } from './utils/Warnings';
import { addTestDevice, enableAdTracking } from './utils/Ad';
import StorybookUIRoot from './storybook';

enableScreens();
ignoreWarnings();

addTestDevice();
enableAdTracking();

const STORYBOOK_ENABLED = Constants.manifest?.extra?.storybookEnabled === true;

class App extends React.Component {
    async componentDidMount() {
        await new Fire();
    }

    render() {
        if (STORYBOOK_ENABLED) {
            return <StorybookUIRoot />;
        }

        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Provider store={store}>
                    <Splash />
                </Provider>
            </GestureHandlerRootView>
        );
    }
}

Sentry.init({
    dsn: Constants.manifest.extra.sentry.dsn,
    enableInExpoDevelopment: false,
    debug: true,
});

export default App;
