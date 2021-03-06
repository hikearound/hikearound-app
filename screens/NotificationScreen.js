import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
    registerForPushNotifications,
    getUserNotifications,
} from '../utils/Notifications';
import NotificationEmptyState from '../components/empty/NotificationEmptyState';
import { RootView } from '../styles/Screens';
import { withTheme, SetBarStyle } from '../utils/Themes';
import { updateNotifBadgeCount } from '../actions/User';
import NotificationList from '../components/NotificationList';
import { timings } from '../constants/Index';
import FeedRefreshControl from '../components/FeedRefreshControl';
import { withNavigation } from '../utils/Navigation';
import { Settings } from '../components/Index';
import { showModal } from '../actions/Modal';
import NotificationPreferenceModal from '../components/modal/Notification';

const propTypes = {
    notifications: PropTypes.array.isRequired,
    notifBadgeCount: PropTypes.number,
    dispatchModalFlag: PropTypes.func.isRequired,
    dispatchNotifBadgeCount: PropTypes.func.isRequired,
};

const defaultProps = {
    notifBadgeCount: 0,
};

function mapStateToProps(state) {
    return {
        notifBadgeCount: state.userReducer.notifBadgeCount,
        notifications: state.notificationReducer.notifications,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchModalFlag: (modalType) => dispatch(showModal(modalType)),
        dispatchNotifBadgeCount: () => dispatch(updateNotifBadgeCount()),
    };
}

class NotificationScreen extends React.Component {
    constructor(props) {
        super(props);

        const { notifications, navigation } = this.props;

        this.state = {
            notifications,
            loading: false,
        };

        this.getAndSetNotifications = this.getAndSetNotifications.bind(this);

        navigation.setOptions({
            headerRight: () => <Settings onPress={this.onSettingsPress} />,
        });
    }

    async componentDidMount() {
        const { dispatchNotifBadgeCount, navigation } = this.props;

        this.getNotificationPermissions();
        this.unsubscribe = navigation.addListener('focus', () => {
            dispatchNotifBadgeCount();
        });
    }

    async componentDidUpdate(prevProps) {
        const { notifBadgeCount, notifications } = this.props;

        if (prevProps.notifBadgeCount !== notifBadgeCount) {
            this.getAndSetNotifications();
        }

        if (prevProps.notifications !== notifications) {
            this.getAndSetNotifications();
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onSettingsPress = () => {
        const { dispatchModalFlag } = this.props;
        dispatchModalFlag('notificationPreferences');
    };

    getNotificationPermissions = async () => {
        await registerForPushNotifications();
    };

    getAndSetNotifications = async () => {
        const { t } = this.props;
        const notifications = await getUserNotifications(t);

        this.setState({
            loading: false,
            notifications,
        });
    };

    onRefresh = async () => {
        await this.setState({ loading: true });

        this.timeout = setTimeout(() => {
            this.getAndSetNotifications();
        }, timings.medium);
    };

    renderEmptyState = () => <NotificationEmptyState />;

    renderNotificationList = () => {
        const { notifications, loading } = this.state;

        return (
            <NotificationList
                refreshControl={
                    <FeedRefreshControl
                        refreshing={loading}
                        onRefresh={this.onRefresh}
                        topOffset={11}
                    />
                }
                notificationData={notifications}
            />
        );
    };

    renderNotificationScreen = () => {
        const { notifications } = this.state;

        if (notifications.length === 0) {
            return this.renderEmptyState();
        }

        return this.renderNotificationList();
    };

    render() {
        return (
            <RootView>
                <SetBarStyle barStyle='light-content' />
                {this.renderNotificationScreen()}
                <NotificationPreferenceModal />
            </RootView>
        );
    }
}

NotificationScreen.propTypes = propTypes;
NotificationScreen.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(withNavigation(NotificationScreen))));
