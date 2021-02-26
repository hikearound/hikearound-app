import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withTranslation } from 'react-i18next';
import { NotificationScreen } from '../screens/Index';
import { mode, headerMode, screenOptions } from '../constants/Navigation';
import { withTheme } from '../utils/Themes';

const Stack = createStackNavigator();

class NotificationStack extends React.PureComponent {
    renderNotificationScreen = (t) => (
        <Stack.Screen
            name='Notification'
            component={NotificationScreen}
            options={{
                headerTitle: t('label.nav.notifications'),
            }}
        />
    );

    render() {
        const { theme, t } = this.props;

        return (
            <Stack.Navigator
                initialRouteName='Notification'
                screenOptions={screenOptions(theme.colors.headerStyle)}
                headerMode={headerMode}
                mode={mode}
            >
                {this.renderNotificationScreen(t)}
            </Stack.Navigator>
        );
    }
}

export default withTranslation()(withTheme(NotificationStack));
