import React from 'react';
import { registerForPushNotifications } from '../utils/Notifications';
import NotificationEmptyState from '../components/empty/NotificationEmptyState';
import { RootView } from '../styles/Screens';
import { withTheme, SetBarStyle } from '../utils/Themes';

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

        return (
            <RootView>
                <SetBarStyle barStyle='light-content' />
                {notifications.length === 0 && <NotificationEmptyState />}
            </RootView>
        );
    }
}

export default withTheme(NotificationScreen);
