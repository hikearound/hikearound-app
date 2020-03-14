import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NotificationScreen } from '../screens/Index';
import { mode, headerMode, screenOptions } from '../constants/Navigation';

const Stack = createStackNavigator();

class NotificationStack extends React.PureComponent {
    render() {
        return (
            <Stack.Navigator
                initialRouteName='Notification'
                screenOptions={screenOptions}
                headerMode={headerMode}
                mode={mode}
            >
                <Stack.Screen
                    name='Notification'
                    component={NotificationScreen}
                    options={{
                        headerTitle: 'Notifications',
                    }}
                />
            </Stack.Navigator>
        );
    }
}

export default NotificationStack;
