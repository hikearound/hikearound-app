import React from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import firebase from 'firebase';

class AuthScreen extends React.Component {
    static navigationOptions = {
        header: null,
        headerBackTitle: null,
    };

    componentDidMount() {
        this.getAuth();
    }

    componentWillUnmount() {
        this.authSubscription();
    }

    getAuth = async () => {
        this.authSubscription = firebase
            .auth()
            .onAuthStateChanged((user) => {
                this.dispatchNav(user);
        });
    };

    dispatchNav(user) {
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: user ? 'Home' : 'Landing'
            })],
        }));
    };

    render() {
        return null;
    }
}

export default AuthScreen;
