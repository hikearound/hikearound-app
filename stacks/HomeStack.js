import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withTranslation } from 'react-i18next';
import {
    LandingScreen,
    SignInScreen,
    HomeScreen,
    HikeScreen,
    CreateAccountScreen,
    AuthScreen,
    LocationPermissionScreen,
    SearchScreen,
} from '../screens/Index';
import { mode, headerMode, screenOptions } from '../constants/Navigation';
import { Logo } from '../components/Index';
import { withTheme } from '../utils/Themes';

const Stack = createStackNavigator();

const forFade = ({ current }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

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
                })}
            />
        );
    };

    renderCreateAccountScreen = (t) => {
        return (
            <Stack.Screen
                name='CreateAccount'
                component={CreateAccountScreen}
                options={{
                    headerTitle: t('label.nav.createAccount'),
                }}
            />
        );
    };

    renderSignInScreen = (t) => {
        return (
            <Stack.Screen
                name='SignIn'
                component={SignInScreen}
                options={{
                    headerTitle: t('label.nav.signIn'),
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

    renderLocationPermissionScreen = (t) => {
        return (
            <Stack.Screen
                name='LocationPermission'
                component={LocationPermissionScreen}
                options={{
                    headerTitle: t('label.nav.locationPermission'),
                }}
            />
        );
    };

    renderSearchScreen = () => {
        return (
            <Stack.Screen
                name='Search'
                component={SearchScreen}
                options={{
                    cardStyleInterpolator: forFade,
                    headerShown: false,
                    animationEnabled: false,
                }}
            />
        );
    };

    render() {
        const { theme, t } = this.props;

        return (
            <Stack.Navigator
                initialRouteName='Auth'
                screenOptions={screenOptions(theme.colors.headerStyle)}
                headerMode={headerMode}
                mode={mode}
            >
                {this.renderAuthScreen()}
                {this.renderLandingScreen()}
                {this.renderSignInScreen(t)}
                {this.renderCreateAccountScreen(t)}
                {this.renderHomeScreen()}
                {this.renderHikeScreen()}
                {this.renderLocationPermissionScreen(t)}
                {this.renderSearchScreen()}
            </Stack.Navigator>
        );
    }
}

export default withTranslation()(withTheme(HomeStack));
