import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { withTranslation } from 'react-i18next';
import {
    LandingScreen,
    SignInScreen,
    HomeScreen,
    HikeScreen,
    CreateAccountScreen,
    LocationPermissionScreen,
    SearchScreen,
} from '../screens/Index';
import {
    mode,
    headerMode,
    screenOptions,
    forFade,
} from '../constants/Navigation';
import { Logo } from '../components/Index';
import { withTheme } from '../utils/Themes';
import LoadingOverlay from '../components/LoadingOverlay';
import { tabBarScreens } from '../constants/Screens';
import ToastStack from './ToastStack';

const propTypes = {
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

const defaultProps = {
    user: null,
};

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
    };
}

function mapDispatchToProps() {
    return {};
}

const Stack = createStackNavigator();

class HomeStack extends React.Component {
    componentDidMount() {
        const { navigation } = this.props;
        navigation.setOptions({ tabBarVisible: false });
    }

    componentDidUpdate() {
        const { navigation, route } = this.props;
        const routeName = getFocusedRouteNameFromRoute(route);

        let tabBarVisible = false;

        if (tabBarScreens.includes(routeName)) {
            tabBarVisible = true;
        }

        navigation.setOptions({ tabBarVisible });
    }

    getInitialRoute = () => {
        const { user } = this.props;
        let initialRoute = 'Landing';

        if (user && user.uid) {
            initialRoute = 'Home';
        }

        return initialRoute;
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
        const { theme, user, t } = this.props;
        const initialRoute = this.getInitialRoute();

        if (user && initialRoute) {
            return (
                <>
                    <Stack.Navigator
                        initialRouteName={initialRoute}
                        screenOptions={screenOptions(theme.colors.headerStyle)}
                        headerMode={headerMode}
                        mode={mode}
                    >
                        {this.renderLandingScreen()}
                        {this.renderSignInScreen(t)}
                        {this.renderCreateAccountScreen(t)}
                        {this.renderHomeScreen()}
                        {this.renderHikeScreen()}
                        {this.renderLocationPermissionScreen(t)}
                        {this.renderSearchScreen()}
                    </Stack.Navigator>
                    <ToastStack />
                </>
            );
        }

        return <LoadingOverlay loading />;
    }
}

HomeStack.propTypes = propTypes;
HomeStack.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(HomeStack)));
