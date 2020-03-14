import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeContext } from '@react-navigation/native';
import { themes } from '../constants/Themes';
import { registerForPushNotifications } from '../utils/Notifications';
import { NotificationEmptyState } from '../components/Index';
import { RootView } from '../styles/Screens';

class NotificationScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Notifications',
    };

    static contextType = ThemeContext;

    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
        };
    }

    async componentDidMount() {
        this.getNotificationPermissions();
    }

    getNotificationPermissions = async () => {
        await registerForPushNotifications();
    };

    render() {
        const { notifications } = this.state;
        const theme = themes[this.context];

        return (
            <ThemeProvider theme={theme}>
                <RootView>
                    {notifications.length === 0 && <NotificationEmptyState />}
                </RootView>
            </ThemeProvider>
        );
    }
}

export default NotificationScreen;
