import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
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
import { Logo, Sort } from '../components/Index';

const Stack = createStackNavigator();

class HomeStack extends React.PureComponent {
    render() {
        return (
            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={defaultNavigationOptions}
                headerMode={headerMode}
                mode={mode}
            >
                <Stack.Screen name='Landing' component={LandingScreen} />
                <Stack.Screen name='SignIn' component={SignInScreen} />
                <Stack.Screen
                    name='Home'
                    component={HomeScreen}
                    options={(navigation) => ({
                        headerTitle: () => <Logo />,
                        // headerRight: () => <Sort route={route} />,
                        animationEnabled: false,
                        tabBarVisible: true,
                    })}
                />
                <Stack.Screen name='Hike' component={HikeScreen} />
                <Stack.Screen
                    name='CreateAccount'
                    component={CreateAccountScreen}
                />
            </Stack.Navigator>
        );
    }
}

export default HomeStack;
