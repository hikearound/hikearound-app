import React from 'react';
import { AppRegistry } from 'react-native';
import PropTypes from 'prop-types';
import {
    getStorybookUI,
    configure,
    addDecorator,
    addParameters,
} from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';
import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppearanceProvider } from 'react-native-appearance';
import { loadStories } from './storybook.requires';
import {
    storybookTheme,
    navigationTheme,
    screenOptions,
    backgroundParameters,
} from './stories/styles/Storybook';

import './rn-addons';

const Stack = createStackNavigator();

addParameters(backgroundParameters);

// Then add decorators
addDecorator(withKnobs);
addDecorator(withBackgrounds);

// Configure stories
configure(() => {
    loadStories();
}, module);

const StorybookUI = getStorybookUI({
    asyncStorage: false,
    onDeviceUI: true,
    disableWebsockets: true,
    shouldPersistSelection: true,
    disableAnimation: true,
    theme: storybookTheme,
});

const StorybookUIRoot = ({ standalone = true }) => {
    if (standalone) {
        return (
            <NavigationContainer theme={navigationTheme}>
                <SafeAreaProvider style={{ backgroundColor: 'white' }}>
                    <AppearanceProvider>
                        <Stack.Navigator screenOptions={screenOptions}>
                            <Stack.Screen
                                name='Storybook'
                                options={{
                                    headerTitle: 'Component Library',
                                }}
                            >
                                {() => <StorybookUI />}
                            </Stack.Screen>
                        </Stack.Navigator>
                    </AppearanceProvider>
                </SafeAreaProvider>
            </NavigationContainer>
        );
    }

    return (
        <SafeAreaProvider style={{ backgroundColor: 'white' }}>
            <AppearanceProvider>
                <StorybookUI />
            </AppearanceProvider>
        </SafeAreaProvider>
    );
};

StorybookUIRoot.propTypes = {
    standalone: PropTypes.bool,
};

StorybookUIRoot.defaultProps = {
    standalone: true,
};

AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

export default StorybookUIRoot;
