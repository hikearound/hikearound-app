import React from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import { StatusBar } from 'react-native';
import firebase from 'firebase';

class AuthScreen extends React.Component {
    componentDidMount() {
        StatusBar.setBarStyle('light-content', true);
        this.getAuth();
    }

    componentWillUnmount() {
        this.authSubscription();
    }

    getAuth = async () => {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            this.dispatchNav(user);
        });
    };

    static navigationOptions = {
        header: null,
        headerBackTitle: null,
    };

    dispatchNav(user) {
        const { navigation } = this.props;
        navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: user ? 'Home' : 'Landing',
                    }),
                ],
            }),
        );
    }

    render() {
        return null;
    }
}

export default AuthScreen;
