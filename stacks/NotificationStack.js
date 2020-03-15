import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NotificationScreen } from '../screens/Index';
import { mode, headerMode, screenOptions } from '../constants/Navigation';
import { withTheme } from '../utils/Themes';

const Stack = createStackNavigator();

class NotificationStack extends React.PureComponent {
    renderNotificationScreen = () => {
        return (
            <Stack.Screen
                name='Notification'
                component={NotificationScreen}
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
                initialRouteName='Notification'
                screenOptions={screenOptions(theme.colors.headerStyle)}
                headerMode={headerMode}
                mode={mode}
            >
                {this.renderNotificationScreen()}
            </Stack.Navigator>
        );
    }
}

export default withTheme(NotificationStack);
