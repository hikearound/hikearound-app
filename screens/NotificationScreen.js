import React from 'react';
import { NotificationEmptyState } from '../components/Index';

class NotificationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
        };
    }

    static navigationOptions = {
        headerTitle: 'Notifications',
    };

    render() {
        const { notifications } = this.state;
        if (notifications.length === 0) {
            return <NotificationEmptyState />;
        }
        return null;
    }
}

export default NotificationScreen;
