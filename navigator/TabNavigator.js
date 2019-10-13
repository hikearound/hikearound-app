import React from 'react';
import * as Haptics from 'expo-haptics';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { colors, spacing, fontSizes } from '../constants/Index';
import { HomeIcon, BellIcon, PersonIcon } from '../icons/Index';
import {
    LandingScreen,
    SignInScreen,
    HomeScreen,
    HikeScreen,
    NotificationScreen,
    ProfileScreen,
    AuthScreen,
    SettingsScreen,
    CreateAccountScreen,
} from '../screens/Index';

const themeColors = {
    light: {
        activeColor: colors.purple,
        inactiveColor: colors.darkGray,
    },
    dark: {
        activeColor: colors.white,
        inactiveColor: colors.darkGray,
    },
};

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: colors.purple,
        height: parseInt(spacing.header, 10),
        borderBottomWidth: 0,
        marginLeft: 5,
        marginRight: 5,
    },
    headerTintColor: colors.white,
    headerTitleStyle: {
        fontSize: parseInt(fontSizes.big, 10),
    },
};

const HomeStack = createStackNavigator(
    {
        Auth: AuthScreen,
        Landing: LandingScreen,
        SignIn: SignInScreen,
        Home: HomeScreen,
        Hike: HikeScreen,
        CreateAccount: CreateAccountScreen,
    },
    {
        mode: 'card',
        headerMode: 'float',
        headerTransitionPreset: 'uikit', // uikit
        initialRouteName: 'Auth',
        defaultNavigationOptions,
    },
);

HomeStack.navigationOptions = ({ navigation, theme }) => {
    let tabBarVisible = false;
    const { routeName } = navigation.state.routes[navigation.state.index];

    if (routeName === 'Home' || routeName === 'Hike') {
        tabBarVisible = true;
    }

    return {
        tabBarVisible,
        animationEnabled: true,
        tabBarLabel: 'Home',

        tabBarIcon: ({ focused }) => (
            <HomeIcon
                size={26}
                fill={
                    focused
                        ? themeColors[theme].activeColor
                        : themeColors[theme].inactiveColor
                }
            />
        ),
    };
};

const NotificationStack = createStackNavigator(
    {
        Notification: NotificationScreen,
    },
    {
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
                        ? themeColors[theme].activeColor
                        : themeColors[theme].inactiveColor
                }
            />
        ),
    };
};

const ProfileStack = createStackNavigator(
    {
        Profile: ProfileScreen,
        Settings: SettingsScreen,
        Hike: HikeScreen,
    },
    {
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
                        ? themeColors[theme].activeColor
                        : themeColors[theme].inactiveColor
                }
            />
        ),
    };
};

const TabNavigator = createBottomTabNavigator(
    {
        HomeStack,
        NotificationStack,
        ProfileStack,
    },
    {
        defaultNavigationOptions: {
            tabBarOnPress: ({ defaultHandler }) => {
                Haptics.selectionAsync();
                defaultHandler();
            },
        },
        tabBarOptions: {
            activeTintColor: {
                light: colors.purple,
                dark: colors.white,
            },
            inactiveTintColor: {
                light: colors.darkGray,
                dark: colors.gray,
            },
            labelStyle: {
                marginBottom: 0,
            },
            tabStyle: {
                marginTop: 6,
            },
        },
    },
);

export default TabNavigator;
