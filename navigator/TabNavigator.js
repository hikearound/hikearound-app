import React from 'react';
import {
    createBottomTabNavigator,
    createStackNavigator,
} from 'react-navigation';
import LandingScreen from '../screens/LandingScreen';
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';
import HikeScreen from '../screens/HikeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import colors from '../constants/Colors';
import spacing from '../constants/Spacing';
import fontSizes from '../constants/Fonts';
import HomeIcon from '../icons/Home';
import BellIcon from '../icons/Bell';
import PersonIcon from '../icons/Person';

const activeColor = colors.purple;
const inactiveColor = '#8E8E93';

const HomeStack = createStackNavigator(
    {
        Auth: AuthLoadingScreen,
        Landing: LandingScreen,
        SignIn: SignInScreen,
        Home: HomeScreen,
        Hike: HikeScreen,
    },
    {
        mode: 'card', // modal
        initialRouteName: 'Auth',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.purple,
                height: parseInt(spacing.header),
                borderBottomWidth: 0,
            },
            headerTintColor: colors.white,
            headerTitleStyle: {
                fontSize: parseInt(fontSizes.header),
            },
        },
    },
);

HomeStack.navigationOptions = ({ navigation }) => {
    var tabBarVisible = false;
    const routeName = (
        navigation.state.routes[navigation.state.index].routeName
    );
    if ((routeName == 'Home') || (routeName == 'Hike')) {
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
        tabBarOnPress: ({ navigation, defaultHandler }) => {
            defaultHandler();
        },
    };
};

const NotificationStack = createStackNavigator(
    {
        Notification: NotificationScreen
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.purple,
                height: parseInt(spacing.header),
                borderBottomWidth: 0,
            },
            headerTintColor: colors.white,
            headerTitleStyle: {
                fontSize: parseInt(fontSizes.header),
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
    )
};

const ProfileStack = createStackNavigator(
    {
        Profile:ProfileScreen
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: colors.purple,
                height: parseInt(spacing.header),
                borderBottomWidth: 0,
            },
            headerTintColor: colors.white,
            headerTitleStyle: {
                fontSize: parseInt(fontSizes.header),
            },
        },
    },
);

ProfileStack.navigationOptions = {
    tabBarLabel: 'You',
    tabBarIcon: ({ focused }) => (
        <PersonIcon
            height={25}
            fill={focused ? activeColor : inactiveColor}
        />
    )
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
