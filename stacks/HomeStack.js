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

const Stack = createStackNavigator();

class HomeStack extends React.PureComponent {
    render() {
        return (
            <Stack.Navigator
                initialRouteName='Auth'
                screenOptions={screenOptions}
                headerMode={headerMode}
                mode={mode}
            >
                <Stack.Screen
                    name='Auth'
                    component={AuthScreen}
                    options={{
                        tabBarVisible: false,
                    }}
                />
                <Stack.Screen
                    name='Landing'
                    component={LandingScreen}
                    options={() => ({
                        headerTitle: () => <Logo />,
                        animationEnabled: false,
                    })}
                />
                <Stack.Screen
                    name='SignIn'
                    component={SignInScreen}
                    options={{
                        headerTitle: 'Sign In',
                    }}
                />
                <Stack.Screen
                    name='Home'
                    component={HomeScreen}
                    options={() => ({
                        headerTitle: () => <Logo />,
                        animationEnabled: false,
                    })}
                />
                <Stack.Screen name='Hike' component={HikeScreen} />
                <Stack.Screen
                    name='CreateAccount'
                    component={CreateAccountScreen}
                    options={{
                        headerTitle: 'Create Account',
                    }}
                />
            </Stack.Navigator>
        );
    }
}

export default HomeStack;
