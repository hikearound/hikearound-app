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
import { screenOptions } from '@constants/Navigation';
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
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
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
        const { navigation, dispatchFocusedStack, stackName, route } = this.props;

        this.unsubscribe = navigation.addListener('focus', () => {
            dispatchFocusedStack(stackName);
        });

        // Initial route setup handled by TabNavigator
    }

    componentDidUpdate(prevProps) {
        const { user } = this.props;
        
        // Log auth state changes but don't manually navigate
        // The Stack Navigator will re-render with correct initialRouteName based on user state
        if (prevProps.user !== user) {
            console.log('HomeStack - User changed from', prevProps.user ? 'user exists' : 'null', 'to', user ? `${user.email}` : 'null');
            
            if (user && user.uid && !user.loggedOut) {
                console.log('HomeStack - User authenticated, Stack will show HomeScreen');
            } else if (prevProps.user && prevProps.user.uid && (!user || user.loggedOut)) {
                console.log('HomeStack - User logged out, Stack will show Landing');
            }
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }


    getInitialRoute = () => {
        const { user } = this.props;
        
        // If user exists and has uid (authenticated user)
        if (user && user.uid && !user.loggedOut) {
            return 'HomeScreen';
        }
        
        // Default to landing for unauthenticated users or logged out users
        return 'Landing';
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
            name='HomeScreen'
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
        const enableToast = stackName === focusedStack;

        // Show splash while waiting for auth state to be determined
        if (user === null) {
            return <SplashImage />;
        }

        // Determine the initial route based on current auth state
        const initialRoute = this.getInitialRoute();

        return (
            <>
                <Stack.Navigator
                    initialRouteName={initialRoute}
                    screenOptions={({ route, navigation }) =>
                        this.setScreenOptions(route, navigation)
                    }
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
}

HomeStack.propTypes = propTypes;
HomeStack.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(HomeStack)));
