import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    ProfileScreen,
    SettingsScreen,
    HikeScreen,
    NotificationSettingsScreen,
} from '../screens/Index';
import {
    mode,
    headerMode,
    defaultNavigationOptions,
} from '../constants/Navigation';

const Stack = createStackNavigator();

class ProfileStack extends React.PureComponent {
    render() {
        return (
            <Stack.Navigator
                initialRouteName='Profile'
                screenOptions={defaultNavigationOptions}
                headerMode={headerMode}
                mode={mode}
            >
                <Stack.Screen name='Profile' component={ProfileScreen} />
                <Stack.Screen name='Settings' component={SettingsScreen} />
                <Stack.Screen
                    name='NotificationSettings'
                    component={NotificationSettingsScreen}
                />
                <Stack.Screen name='Hike' component={HikeScreen} />
            </Stack.Navigator>
        );
    }
}

export default ProfileStack;
