import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { themes } from '../constants/Themes';
import { PersonIcon } from '../icons/Index';
import { ProfileScreen, SettingsScreen, HikeScreen } from '../screens/Index';
import {
    mode,
    headerMode,
    defaultNavigationOptions,
} from '../constants/Navigation';

const ProfileStack = createStackNavigator(
    {
        Profile: ProfileScreen,
        Settings: SettingsScreen,
        Hike: HikeScreen,
    },
    {
        mode,
        headerMode,
        defaultNavigationOptions,
    },
);

ProfileStack.navigationOptions = ({ theme }) => {
    return {
        tabBarLabel: 'You',
        tabBarIcon: ({ focused }) => (
            <PersonIcon
                height={25}
                fill={
                    focused
                        ? themes[theme].navActive
                        : themes[theme].navInactive
                }
            />
        ),
    };
};

export default ProfileStack;
