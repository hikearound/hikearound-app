import React from 'react';
import * as Haptics from 'expo-haptics';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from '../stacks/HomeStack';
import NotificationStack from '../stacks/NotificationStack';
import ProfileStack from '../stacks/ProfileStack';
import { HomeIcon, BellIcon, PersonIcon } from '../icons/Index';
import { withTheme } from '../utils/Themes';
import { tabBarOptions } from '../constants/Navigation';

const Tab = createBottomTabNavigator();

class TabNavigator extends React.PureComponent {
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
        const { theme } = this.props;

        return (
            <Tab.Navigator
                tabBarOptions={tabBarOptions(
                    theme.colors.navActive,
                    theme.colors.navInactive,
                )}
            >
                <Tab.Screen
                    name='Home'
                    component={HomeStack}
                    options={() => ({
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ focused }) => (
                            <HomeIcon size={26} fill={this.setFill(focused)} />
                        ),
                    })}
                    listeners={{
                        tabPress: () => {
                            this.onPress();
                        },
                    }}
                />
                <Tab.Screen
                    name='Notification'
                    component={NotificationStack}
                    options={() => ({
                        tabBarLabel: 'Notifications',
                        tabBarIcon: ({ focused }) => (
                            <BellIcon fill={this.setFill(focused)} />
                        ),
                    })}
                    listeners={{
                        tabPress: () => {
                            this.onPress();
                        },
                    }}
                />
                <Tab.Screen
                    name='Profile'
                    component={ProfileStack}
                    options={() => ({
                        tabBarLabel: 'You',
                        tabBarIcon: ({ focused }) => (
                            <PersonIcon
                                height={25}
                                fill={this.setFill(focused)}
                            />
                        ),
                    })}
                    listeners={{
                        tabPress: () => {
                            this.onPress();
                        },
                    }}
                />
            </Tab.Navigator>
        );
    }
}

export default withTheme(TabNavigator);
