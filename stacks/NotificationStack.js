import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NotificationScreen } from '../screens/Index';
import {
    mode,
    headerMode,
    defaultNavigationOptions,
} from '../constants/Navigation';

const Stack = createStackNavigator();

class NotificationStack extends React.PureComponent {
    render() {
        return (
            <Stack.Navigator
                initialRouteName='Notification'
                screenOptions={defaultNavigationOptions}
                headerMode={headerMode}
                mode={mode}
            >
                <Stack.Screen
                    name='Notification'
                    component={NotificationScreen}
                />
            </Stack.Navigator>
        );
    }
}

export default NotificationStack;
