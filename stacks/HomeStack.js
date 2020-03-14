import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from '@react-navigation/stack';
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

const propTypes = {
    screenOptions: PropTypes.object,
};

const defaultProps = {
    screenOptions: defaultNavigationOptions,
};

const Stack = createStackNavigator();

class HomeStack extends React.PureComponent {
    applyOptions = (navigation, route, theme) => {
        let tabBarVisible = false;

        // if (routeName === 'Home' || routeName === 'Hike') {
        //     tabBarVisible = true;
        // }

        // console.log(theme)
        // console.log(route)
        // console.log(navigation)

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

    render() {
        const { screenOptions } = this.props;

        return (
            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={screenOptions}
                headerMode={headerMode}
                mode={mode}
            >
                <Stack.Screen
                    name='Landing'
                    component={LandingScreen}
                    options={(navigation, route, theme) =>
                        this.applyOptions(navigation, route, theme)
                    }
                />
                <Stack.Screen
                    name='SignIn'
                    component={SignInScreen}
                    options={(navigation, route, theme) =>
                        this.applyOptions(navigation, route, theme)
                    }
                />
                <Stack.Screen
                    name='Home'
                    component={HomeScreen}
                    options={(navigation, route, theme) =>
                        this.applyOptions(navigation, route, theme)
                    }
                />
                <Stack.Screen
                    name='Hike'
                    component={HikeScreen}
                    options={(navigation, route, theme) =>
                        this.applyOptions(navigation, route, theme)
                    }
                />
                <Stack.Screen
                    name='CreateAccount'
                    component={CreateAccountScreen}
                    options={(navigation, route, theme) =>
                        this.applyOptions(navigation, route, theme)
                    }
                />
            </Stack.Navigator>
        );
    }
}

HomeStack.propTypes = propTypes;
HomeStack.defaultProps = defaultProps;

export default HomeStack;
