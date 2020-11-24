import React from 'react';
import * as Haptics from 'expo-haptics';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { withTranslation } from 'react-i18next';
import HomeStack from '../stacks/HomeStack';
import MapStack from '../stacks/MapStack';
import NotificationStack from '../stacks/NotificationStack';
import ProfileStack from '../stacks/ProfileStack';
import { HomeIcon, BellIcon, PersonIcon, MapIcon } from '../icons/Index';
import { withTheme } from '../utils/Themes';
import { tabBarOptions } from '../constants/Navigation';

const Tab = createBottomTabNavigator();

class TabNavigator extends React.PureComponent {
    renderHomeStack = (t) => {
        return (
            <Tab.Screen
                name='Home'
                component={HomeStack}
                options={() => ({
                    tabBarLabel: t('label.nav.home'),
                    tabBarIcon: ({ focused }) => (
                        <HomeIcon
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
    };

    renderMapStack = (t) => {
        return (
            <Tab.Screen
                name='Map'
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
    };

    renderNotificationStack = (t) => {
        return (
            <Tab.Screen
                name='Notification'
                component={NotificationStack}
                options={() => ({
                    tabBarLabel: t('label.nav.notifications'),
                    tabBarIcon: ({ focused }) => (
                        <BellIcon
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
    };

    renderProfileStack = (t) => {
        return (
            <Tab.Screen
                name='Profile'
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
    };

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

    render() {
        const { theme, t } = this.props;

        return (
            <>
                <Tab.Navigator
                    tabBarOptions={tabBarOptions(
                        theme.colors.navActive,
                        theme.colors.navInactive,
                    )}
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

export default withTranslation()(withTheme(TabNavigator));
