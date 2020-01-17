import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { themes } from '../constants/Themes';
import { HomeIcon } from '../icons/Index';
import {
    LandingScreen,
    SignInScreen,
    HomeScreen,
    HikeScreen,
    CreateAccountScreen,
} from '../screens/Index';
import {
    mode,
    headerMode,
    defaultNavigationOptions,
} from '../constants/Navigation';

const HomeStack = createStackNavigator(
    {
        Landing: LandingScreen,
        SignIn: SignInScreen,
        Home: HomeScreen,
        Hike: HikeScreen,
        CreateAccount: CreateAccountScreen,
    },
    {
        mode,
        headerMode,
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

export default HomeStack;
