import React from 'react';
import { timings } from '../constants/Index';
import { NotificationEmptyState } from '../components/Index';

class NotificationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            shouldLoad: false,
        };
    }

    componentDidMount() {
        this.loadingTimeout = setTimeout(() => {
            this.setState({
                shouldLoad: true,
            });
        }, timings.short);
    }

    static navigationOptions = {
        headerTitle: 'Notifications',
    };

    render() {
        const { notifications, shouldLoad } = this.state;

        if (shouldLoad) {
            if (notifications.length === 0) {
                return <NotificationEmptyState />;
            }
        }
        return null;
    }
}

export default NotificationScreen;
