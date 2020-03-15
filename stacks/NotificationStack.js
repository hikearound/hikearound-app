import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NotificationScreen } from '../screens/Index';
import { mode, headerMode, screenOptions } from '../constants/Navigation';
import { withTheme } from '../utils/Themes';

const Stack = createStackNavigator();

class NotificationStack extends React.PureComponent {
    render() {
        const { theme } = this.props;

        return (
            <Stack.Navigator
                initialRouteName='Notification'
                screenOptions={screenOptions(theme.colors.headerStyle)}
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

export default withTheme(NotificationStack);
