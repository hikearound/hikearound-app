import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    ProfileScreen,
    SettingsScreen,
    HikeScreen,
    NotificationSettingsScreen,
} from '../screens/Index';
import { mode, headerMode, screenOptions } from '../constants/Navigation';

const Stack = createStackNavigator();

class ProfileStack extends React.PureComponent {
    render() {
        return (
            <Stack.Navigator
                initialRouteName='Profile'
                screenOptions={screenOptions}
                headerMode={headerMode}
                mode={mode}
            >
                <Stack.Screen name='Profile' component={ProfileScreen} />
                <Stack.Screen name='Settings' component={SettingsScreen} />
                <Stack.Screen
                    name='NotificationSettings'
                    component={NotificationSettingsScreen}
                    options={{
                        headerTitle: 'Notifications',
                    }}
                />
                <Stack.Screen name='Hike' component={HikeScreen} />
            </Stack.Navigator>
        );
    }
}

export default ProfileStack;
