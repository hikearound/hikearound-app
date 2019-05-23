import React from 'react';
import {
    createBottomTabNavigator,
    createStackNavigator,
} from 'react-navigation';
import LandingScreen from '../screens/LandingScreen';
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';
import SectionScreen from '../screens/SectionScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Icon } from 'expo';

const activeColor = '#4775f2';
const inactiveColor = '#b8bece';

const HomeStack = createStackNavigator(
    {
        Landing: LandingScreen,
        SignIn: SignInScreen,
        Home: HomeScreen,
        Section: SectionScreen,
    },
    {
        mode: 'card', // modal
        initialRouteName: 'Landing',
    },
);

HomeStack.navigationOptions = ({ navigation }) => {
    var tabBarVisible = false;
    const routeName = navigation.state.routes[navigation.state.index].routeName;

    if (routeName == 'Home') {
        tabBarVisible = true;
    }

    return {
        tabBarVisible,
        animationEnabled: true,
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused }) => (
            <Icon.Ionicons
                name='ios-home'
                size={26}
                color={focused ? activeColor : inactiveColor}
            />
        ),
        tabBarOnPress: ({ navigation, defaultHandler }) => {
            defaultHandler();
        },
    };
};

const NotificationStack = createStackNavigator({
    Notification: NotificationScreen
});

NotificationStack.navigationOptions = {
    tabBarLabel: 'Notifications',
    tabBarIcon: ({ focused }) => (
        <Icon.Ionicons
            name='ios-albums'
            size={26}
            color={focused ? activeColor : inactiveColor}
        />
    )
};

const ProfileStack = createStackNavigator({
    Profile: ProfileScreen
});

ProfileStack.navigationOptions = {
    tabBarLabel: 'You',
    tabBarIcon: ({ focused }) => (
        <Icon.Ionicons
            name='ios-folder'
            size={26}
            color={focused ? activeColor : inactiveColor}
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
