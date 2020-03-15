import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    ProfileScreen,
    SettingsScreen,
    HikeScreen,
    NotificationSettingsScreen,
} from '../screens/Index';
import { mode, headerMode, screenOptions } from '../constants/Navigation';
import { withTheme } from '../utils/Themes';

const Stack = createStackNavigator();

class ProfileStack extends React.PureComponent {
    render() {
        const { theme } = this.props;

        return (
            <Stack.Navigator
                initialRouteName='Profile'
                screenOptions={screenOptions(theme.colors.headerStyle)}
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

export default withTheme(ProfileStack);
