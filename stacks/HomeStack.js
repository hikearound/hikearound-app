import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    LandingScreen,
    SignInScreen,
    HomeScreen,
    HikeScreen,
    CreateAccountScreen,
    AuthScreen,
} from '../screens/Index';
import { mode, headerMode, screenOptions } from '../constants/Navigation';
import { Logo } from '../components/Index';
import { withTheme } from '../utils/Themes';

const Stack = createStackNavigator();

class HomeStack extends React.Component {
    componentDidUpdate() {
        const { navigation, route } = this.props;
        let tabBarVisible = false;

        if (route.state) {
            const { name } = route.state.routes[route.state.index];
            if (name === 'Home' || name === 'Hike') {
                tabBarVisible = true;
            }
        }

        navigation.setOptions({ tabBarVisible });
    }

    renderAuthScreen = () => {
        return (
            <Stack.Screen
                name='Auth'
                component={AuthScreen}
                options={{
                    tabBarVisible: false,
                }}
            />
        );
    };

    renderLandingScreen = () => {
        return (
            <Stack.Screen
                name='Landing'
                component={LandingScreen}
                options={() => ({
                    headerTitle: () => <Logo />,
                    animationEnabled: false,
                    tabBarVisible: false,
                })}
            />
        );
    };

    renderCreateAccountScreen = () => {
        return (
            <Stack.Screen
                name='CreateAccount'
                component={CreateAccountScreen}
                options={{
                    headerTitle: 'Create Account',
                }}
            />
        );
    };

    renderSignInScreen = () => {
        return (
            <Stack.Screen
                name='SignIn'
                component={SignInScreen}
                options={{
                    headerTitle: 'Sign In',
                }}
            />
        );
    };

    renderHomeScreen = () => {
        return (
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={() => ({
                    headerTitle: () => <Logo />,
                    animationEnabled: false,
                })}
            />
        );
    };

    renderHikeScreen = () => {
        return <Stack.Screen name='Hike' component={HikeScreen} />;
    };

    render() {
        const { theme } = this.props;

        return (
            <Stack.Navigator
                initialRouteName='Auth'
                screenOptions={screenOptions(theme.colors.headerStyle)}
                headerMode={headerMode}
                mode={mode}
            >
                {this.renderAuthScreen()}
                {this.renderLandingScreen()}
                {this.renderSignInScreen()}
                {this.renderCreateAccountScreen()}
                {this.renderHomeScreen()}
                {this.renderHikeScreen()}
            </Stack.Navigator>
        );
    }
}

export default withTheme(HomeStack);
