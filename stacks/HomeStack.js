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
    ReviewScreen,
} from '@screens/Index';
import { mode, headerMode, screenOptions } from '@constants/Navigation';
import { Logo } from '@components/Index';
import { withTheme } from '@utils/Themes';
import { tabBarScreens } from '@constants/Screens';
import { setFocusedStack } from '@actions/Navigation';
import ToastProvider from '@providers/ToastProvider';
import SplashImage from '@components/SplashImage';

const propTypes = {
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    dispatchFocusedStack: PropTypes.func.isRequired,
    focusedStack: PropTypes.string.isRequired,
    stackName: PropTypes.string,
};

const defaultProps = {
    user: null,
    stackName: 'Home',
};

function mapStateToProps(state) {
    return {
        user: state.authReducer.user,
        focusedStack: state.navigationReducer.focusedStack,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchFocusedStack: (stackName) =>
            dispatch(setFocusedStack(stackName)),
    };
}

const Stack = createStackNavigator();

class HomeStack extends React.Component {
    componentDidMount() {
        const { navigation, dispatchFocusedStack, stackName } = this.props;

        this.unsubscribe = navigation.addListener('focus', () => {
            dispatchFocusedStack(stackName);
        });
    }

    componentDidUpdate() {
        const { route } = this.props;
        this.setTabBarVisibility(getFocusedRouteNameFromRoute(route));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    setTabBarVisibility = (routeName) => {
        const { navigation } = this.props;
        let tabBarVisible = false;

        if (tabBarScreens.includes(routeName) || !routeName) {
            tabBarVisible = true;
        }

        navigation.setOptions({ tabBarVisible });
    };

    getInitialRoute = () => {
        const { user } = this.props;
        let initialRoute = 'Landing';

        if (user && user.uid) {
            initialRoute = 'Home';
        }

        this.setTabBarVisibility(initialRoute);

        return initialRoute;
    };

    renderLandingScreen = () => (
        <Stack.Screen
            name='Landing'
            component={LandingScreen}
            options={() => ({
                headerTitle: () => <Logo />,
                animationEnabled: false,
            })}
        />
    );

    renderCreateAccountScreen = (t) => (
        <Stack.Screen
            name='CreateAccount'
            component={CreateAccountScreen}
            options={{
                headerTitle: t('label.nav.createAccount'),
            }}
        />
    );

    renderSignInScreen = (t) => (
        <Stack.Screen
            name='SignIn'
            component={SignInScreen}
            options={{
                headerTitle: t('label.nav.signIn'),
            }}
        />
    );

    renderHomeScreen = () => (
        <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={() => ({
                animationEnabled: false,
            })}
        />
    );

    renderHikeScreen = () => (
        <Stack.Screen name='Hike' component={HikeScreen} />
    );

    renderLocationPermissionScreen = (t) => (
        <Stack.Screen
            name='LocationPermission'
            component={LocationPermissionScreen}
            options={{
                headerTitle: t('label.nav.locationPermission'),
            }}
        />
    );

    renderSearchScreen = () => (
        <Stack.Screen
            name='Search'
            component={SearchScreen}
            options={{
                headerShown: true,
                animationEnabled: false,
                headerLeft: () => null,
                headerRight: () => null,
            }}
        />
    );

    renderReviewScreen = (t) => (
        <Stack.Screen
            name='Review'
            component={ReviewScreen}
            options={{
                headerTitle: t('label.nav.review'),
            }}
        />
    );

    setScreenOptions = () => {
        const { theme } = this.props;
        return screenOptions(theme.colors.headerStyle);
    };

    render() {
        const { user, t, focusedStack, stackName } = this.props;
        const initialRoute = this.getInitialRoute();
        const enableToast = stackName === focusedStack;

        if (user && initialRoute) {
            return (
                <>
                    <Stack.Navigator
                        initialRouteName={initialRoute}
                        screenOptions={({ route, navigation }) =>
                            this.setScreenOptions(route, navigation)
                        }
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
                        {this.renderReviewScreen(t)}
                    </Stack.Navigator>
                    {enableToast && <ToastProvider />}
                </>
            );
        }

        return <SplashImage />;
    }
}

HomeStack.propTypes = propTypes;
HomeStack.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(HomeStack)));
