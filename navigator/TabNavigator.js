import React from 'react';
import * as Haptics from 'expo-haptics';
import {
    createStackNavigator,
    HeaderStyleInterpolators,
} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { colors, spacing, fontSizes } from '../constants/Index';
import { themes } from '../constants/Themes';
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

const mode = 'card';
const headerMode = 'float';
const headerInterpolator = HeaderStyleInterpolators.forUIKit;

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: colors.purple,
        height: parseInt(spacing.header, 10),
        borderBottomWidth: 0,
    },
    headerLeftContainerStyle: {
        left: parseInt(spacing.micro, 10),
    },
    headerRightContainerStyle: {
        right: parseInt(spacing.micro, 10),
    },
    headerTintColor: colors.white,
    headerTitleStyle: {
        fontSize: parseInt(fontSizes.big, 10),
    },
    headerBackTitleVisible: false,
    headerStyleInterpolator: headerInterpolator,
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
        mode,
        headerMode,
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
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused }) => (
            <HomeIcon
                size={26}
                fill={
                    focused
                        ? themes[theme].navActive
                        : themes[theme].navInactive
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
