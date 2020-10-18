import React from 'react';
import { withTranslation } from 'react-i18next';
import { createStackNavigator } from '@react-navigation/stack';
import {
    ProfileScreen,
    SettingsScreen,
    HikeScreen,
    NotificationSettingsScreen,
    PasswordScreen,
} from '../screens/Index';
import { mode, headerMode, screenOptions } from '../constants/Navigation';
import { withTheme } from '../utils/Themes';

const Stack = createStackNavigator();

class ProfileStack extends React.PureComponent {
    renderProfileScreen = (t) => {
        return (
            <Stack.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    headerTitle: t('label.nav.you'),
                }}
            />
        );
    };

    renderHikeScreen = () => {
        return <Stack.Screen name='Hike' component={HikeScreen} />;
    };

    renderSettingsScreen = (t) => {
        return (
            <Stack.Screen
                name='Settings'
                component={SettingsScreen}
                options={{
                    headerTitle: t('label.nav.settings'),
                }}
            />
        );
    };

    renderNotificationSettingsScreen = (t) => {
        return (
            <Stack.Screen
                name='NotificationSettings'
                component={NotificationSettingsScreen}
                options={{
                    headerTitle: t('label.nav.notifications'),
                }}
            />
        );
    };

    renderPasswordScreen = (t) => {
        return (
            <Stack.Screen
                name='Password'
                component={PasswordScreen}
                options={{
                    headerTitle: t('label.nav.password'),
                }}
            />
        );
    };

    render() {
        const { theme, t } = this.props;

        return (
            <Stack.Navigator
                initialRouteName='Profile'
                screenOptions={screenOptions(theme.colors.headerStyle)}
                headerMode={headerMode}
                mode={mode}
            >
                {this.renderProfileScreen(t)}
                {this.renderHikeScreen()}
                {this.renderSettingsScreen(t)}
                {this.renderNotificationSettingsScreen(t)}
                {this.renderPasswordScreen(t)}
            </Stack.Navigator>
        );
    }
}

export default withTranslation()(withTheme(ProfileStack));
