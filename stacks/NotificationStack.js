import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { themes } from '../constants/Themes';
import { BellIcon } from '../icons/Index';
import { NotificationScreen } from '../screens/Index';
import {
    mode,
    headerMode,
    defaultNavigationOptions,
} from '../constants/Navigation';

const NotificationStack = createStackNavigator(
    {
        Notification: NotificationScreen,
    },
    {
        mode,
        headerMode,
        defaultNavigationOptions,
    },
);

NotificationStack.navigationOptions = ({ theme }) => {
    return {
        tabBarLabel: 'Notifications',
        tabBarIcon: ({ focused }) => (
            <BellIcon
                fill={
                    focused
                        ? themes[theme].navActive
                        : themes[theme].navInactive
                }
            />
        ),
    };
};

export default NotificationStack;
