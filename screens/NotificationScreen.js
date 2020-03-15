import React from 'react';
import { ThemeProvider } from 'styled-components';
import { registerForPushNotifications } from '../utils/Notifications';
import { NotificationEmptyState } from '../components/Index';
import { RootView } from '../styles/Screens';
import { withTheme } from '../utils/Themes';

class NotificationScreen extends React.Component {
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
        const { theme } = this.props;

        return (
            <ThemeProvider theme={theme.colors}>
                <RootView>
                    {notifications.length === 0 && <NotificationEmptyState />}
                </RootView>
            </ThemeProvider>
        );
    }
}

export default withTheme(NotificationScreen);
