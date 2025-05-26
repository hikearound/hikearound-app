import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Haptics from 'expo-haptics';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { withTranslation } from 'react-i18next';
import * as Device from 'expo-device';
import HomeStack from '@stacks/HomeStack';
import MapStack from '@stacks/MapStack';
import NotificationStack from '@stacks/NotificationStack';
import ProfileStack from '@stacks/ProfileStack';
import { HomeIcon, BellIcon, PersonIcon, MapIcon } from '@icons/Index';
import { withTheme } from '@utils/Themes';
import { getTabBarBadgeStyle } from '@styles/Badge';

const propTypes = {
    notifBadgeCount: PropTypes.number,
};

const defaultProps = {
    notifBadgeCount: 0,
};

const Tab = createBottomTabNavigator();

function mapStateToProps(state) {
    return {
        notifBadgeCount: state.userReducer.notifBadgeCount,
    };
}

function mapDispatchToProps() {
    return {};
}

class TabNavigator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deviceType: Device.DeviceType.PHONE,
        };
    }

    componentDidMount() {
        this.getDeviceType();
    }

    renderTabBarBadge = () => {
        const { notifBadgeCount } = this.props;

        if (notifBadgeCount > 0) {
            return notifBadgeCount;
        }

        return null;
    };

    renderHomeStack = (t) => (
        <Tab.Screen
            name='HomeTab'
            component={HomeStack}
            options={() => ({
                tabBarLabel: t('label.nav.home'),
                tabBarIcon: ({ focused }) => (
                    <HomeIcon fill={this.setFill(focused)} focused={focused} />
                ),
            })}
            listeners={{
                tabPress: () => {
                    this.onPress();
                },
            }}
        />
    );

    renderMapStack = (t) => (
        <Tab.Screen
            name='MapTab'
            component={MapStack}
            options={() => ({
                tabBarLabel: t('label.nav.map'),
                tabBarIcon: ({ focused }) => (
                    <MapIcon
                        size={30}
                        fill={this.setFill(focused)}
                        focused={focused}
                    />
                ),
            })}
            listeners={{
                tabPress: () => {
                    this.onPress();
                },
            }}
        />
    );

    renderNotificationStack = (t) => {
        const { theme } = this.props;

        return (
            <Tab.Screen
                name='NotificationTab'
                component={NotificationStack}
                options={() => ({
                    tabBarLabel: t('label.nav.notifications'),
                    tabBarIcon: ({ focused }) => (
                        <BellIcon
                            fill={this.setFill(focused)}
                            focused={focused}
                        />
                    ),
                    tabBarBadge: this.renderTabBarBadge(),
                    tabBarBadgeStyle: getTabBarBadgeStyle(theme),
                })}
                listeners={{
                    tabPress: () => {
                        this.onPress();
                    },
                }}
            />
        );
    };

    renderProfileStack = (t) => (
        <Tab.Screen
            name='ProfileTab'
            component={ProfileStack}
            options={() => ({
                tabBarLabel: t('label.nav.you'),
                tabBarIcon: ({ focused }) => (
                    <PersonIcon
                        fill={this.setFill(focused)}
                        focused={focused}
                    />
                ),
            })}
            listeners={{
                tabPress: () => {
                    this.onPress();
                },
            }}
        />
    );

    setFill = (focused) => {
        const { theme } = this.props;
        if (focused) {
            return theme.colors.navActive;
        }
        return theme.colors.navInactive;
    };

    onPress = () => {
        Haptics.selectionAsync();
    };

    getDeviceType = async () => {
        const deviceType = await Device.getDeviceTypeAsync();
        this.setState({ deviceType });
    };

    render() {
        const { theme, t } = this.props;
        const { deviceType } = this.state;

        return (
            <>
                <Tab.Navigator
                    screenOptions={() => ({
                        headerShown: false,
                        tabBarActiveTintColor: theme.colors.navActive,
                        tabBarInactiveTintColor: theme.colors.navInactive,
                        tabBarStyle: {
                            height:
                                deviceType === Device.DeviceType.TABLET
                                    ? 110
                                    : 95,
                            paddingBottom:
                                deviceType === Device.DeviceType.TABLET
                                    ? 35
                                    : 30,
                            paddingTop: 0,
                            borderTopWidth: 0,
                            elevation: 0,
                            shadowOpacity: 0,
                        },
                        tabBarLabelStyle: {
                            fontSize: 12,
                            marginTop: -4,
                            marginBottom:
                                deviceType === Device.DeviceType.TABLET ? 8 : 8,
                        },
                        tabBarItemStyle: {
                            paddingVertical: 0,
                        },
                        tabBarIconStyle: {
                            marginBottom: -4,
                        },
                    })}
                >
                    {this.renderHomeStack(t)}
                    {this.renderMapStack(t)}
                    {this.renderNotificationStack(t)}
                    {this.renderProfileStack(t)}
                </Tab.Navigator>
            </>
        );
    }
}

TabNavigator.propTypes = propTypes;
TabNavigator.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(TabNavigator)));
