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
    renderProfileScreen = () => {
        return <Stack.Screen name='Profile' component={ProfileScreen} />;
    };

    renderHikeScreen = () => {
        return <Stack.Screen name='Hike' component={HikeScreen} />;
    };

    renderSettingsScreen = () => {
        return <Stack.Screen name='Settings' component={SettingsScreen} />;
    };

    renderNotificationSettingsScreen = () => {
        return (
            <Stack.Screen
                name='NotificationSettings'
                component={NotificationSettingsScreen}
                options={{
                    headerTitle: 'Notifications',
                }}
            />
        );
    };

    render() {
        const { theme } = this.props;

        return (
            <Stack.Navigator
                initialRouteName='Profile'
                screenOptions={screenOptions(theme.colors.headerStyle)}
                headerMode={headerMode}
                mode={mode}
            >
                {this.renderProfileScreen()}
                {this.renderHikeScreen()}
                {this.renderSettingsScreen()}
                {this.renderNotificationSettingsScreen()}
            </Stack.Navigator>
        );
    }
}

export default withTheme(ProfileStack);
