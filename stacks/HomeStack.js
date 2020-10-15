import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withTranslation } from 'react-i18next';
import { auth } from '../lib/Fire';
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

const Stack = createStackNavigator();
const tabBarScreens = ['Home', 'Hike', 'Search'];

class HomeStack extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initialRoute: null,
        };
    }

    async componentDidMount() {
        const { navigation, route } = this.props;

        if (route.state) {
            const { name } = route.state.routes[0];

            if (name === 'Landing') {
                navigation.setOptions({ tabBarVisible: false });
            }
        }

        await this.setInitialRoute();
    }

    componentDidUpdate() {
        const { navigation, route } = this.props;
        let tabBarVisible = false;

        if (route.state) {
            if (route.state.routes[0].name === 'Landing') {
                navigation.setOptions({ tabBarVisible });
            } else {
                const { name } = route.state.routes[route.state.index];
                tabBarVisible = true;

                if (tabBarScreens.includes(name)) {
                    tabBarVisible = true;
                }
            }
        }

        navigation.setOptions({ tabBarVisible });
    }

    componentWillUnmount() {
        this.authSubscription();
    }

    setInitialRoute = async () => {
        this.authSubscription = await auth.onAuthStateChanged((user) => {
            let initialRoute = 'Landing';

            if (user) {
                initialRoute = 'Home';
            }

            this.setState({ initialRoute });
        });
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
        const { theme, t } = this.props;
        const { initialRoute } = this.state;

        if (initialRoute) {
            return (
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
            );
        }
        return null;
    }
}

export default withTranslation()(withTheme(HomeStack));
