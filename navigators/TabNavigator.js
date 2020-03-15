import React from 'react';
import * as Haptics from 'expo-haptics';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from '../stacks/HomeStack';
import NotificationStack from '../stacks/NotificationStack';
import ProfileStack from '../stacks/ProfileStack';
import { HomeIcon, BellIcon, PersonIcon } from '../icons/Index';
import { withTheme } from '../utils/Themes';

const Tab = createBottomTabNavigator();

class TabNavigator extends React.PureComponent {
    render() {
        const { theme } = this.props;

        return (
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: theme.colors.navActive,
                    inactiveTintColor: theme.colors.navInactive,
                    labelStyle: {
                        marginBottom: 0,
                    },
                    tabStyle: {
                        marginTop: 6,
                    },
                }}
                screenOptions={{
                    tabBarOnPress: ({ defaultHandler }) => {
                        Haptics.selectionAsync();
                        defaultHandler();
                    },
                }}
            >
                <Tab.Screen
                    name='Home'
                    component={HomeStack}
                    options={() => ({
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ focused }) => (
                            <HomeIcon
                                size={26}
                                fill={
                                    focused
                                        ? theme.colors.navActive
                                        : theme.colors.navInactive
                                }
                            />
                        ),
                    })}
                />
                <Tab.Screen
                    name='Notification'
                    component={NotificationStack}
                    options={() => ({
                        tabBarLabel: 'Notifications',
                        tabBarIcon: ({ focused }) => (
                            <BellIcon
                                fill={
                                    focused
                                        ? theme.colors.navActive
                                        : theme.colors.navInactive
                                }
                            />
                        ),
                    })}
                />
                <Tab.Screen
                    name='Profile'
                    component={ProfileStack}
                    options={() => ({
                        tabBarLabel: 'You',
                        tabBarIcon: ({ focused }) => (
                            <PersonIcon
                                height={25}
                                fill={
                                    focused
                                        ? theme.colors.navActive
                                        : theme.colors.navInactive
                                }
                            />
                        ),
                    })}
                />
            </Tab.Navigator>
        );
    }
}

export default withTheme(TabNavigator);
