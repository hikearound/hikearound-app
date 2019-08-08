import React from 'react';
import {
    createBottomTabNavigator,
    createStackNavigator,
} from 'react-navigation';
import { colors, spacing, fontSizes } from '../constants/Index';
import {
    HomeIcon,
    BellIcon,
    PersonIcon,
} from '../icons/Index';
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

const activeColor = colors.purple;
const inactiveColor = '#8E8E93';

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
        mode: 'card', // modal
        headerMode: 'float',
        headerTransitionPreset: 'fade-in-place', // uikit is buggy
        initialRouteName: 'Auth',
        defaultNavigationOptions: {
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
        },
    },
);

HomeStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = false;
    const { routeName } = navigation.state.routes[navigation.state.index];
    if ((routeName === 'Home') || (routeName === 'Hike')) {
        tabBarVisible = true;
    }
    return {
        tabBarVisible,
        animationEnabled: true,
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused }) => (
            <HomeIcon
                size={26}
                fill={focused ? activeColor : inactiveColor}
            />
        ),
    };
};

const NotificationStack = createStackNavigator(
    {
        Notification: NotificationScreen,
    },
    {
        defaultNavigationOptions: {
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
        },
    },
);

NotificationStack.navigationOptions = {
    tabBarLabel: 'Notifications',
    tabBarIcon: ({ focused }) => (
        <BellIcon
            fill={focused ? activeColor : inactiveColor}
        />
    ),
};

const ProfileStack = createStackNavigator(
    {
        Profile: ProfileScreen,
        Settings: SettingsScreen,
    },
    {
        defaultNavigationOptions: {
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
        },
        headerTransitionPreset: 'fade-in-place',
    },
);

ProfileStack.navigationOptions = {
    tabBarLabel: 'You',
    tabBarIcon: ({ focused }) => (
        <PersonIcon
            height={25}
            fill={focused ? activeColor : inactiveColor}
        />
    ),
};

const TabNavigator = createBottomTabNavigator(
    {
        HomeStack,
        NotificationStack,
        ProfileStack,
    },
    {
        tabBarOptions: {
            activeTintColor: activeColor,
            inactiveTintColor: inactiveColor,
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
