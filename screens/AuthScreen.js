import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import styled from 'styled-components';
import firebase from 'firebase';

class AuthScreen extends React.Component {
    static navigationOptions = {
        header: null,
        headerBackTitle: null,
    };

    constructor(props) {
        super(props);
        this.getAuth();
    }

    componentDidMount() {
        StatusBar.setBarStyle('light-content', true);
    }

    componentWillUnmount() {
        this.authSubscription();
    }

    getAuth() {
        this.authSubscription = firebase
            .auth()
            .onAuthStateChanged((user) => {
                this.setState(
                    {
                        loading: false,
                        user,
                    },
                    this.dispatchNav,
                );
        });
    };

    dispatchNav() {
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: this.state.user ? 'Home' : 'Landing'
            })],
        }));
    };

    render() {
        return (
            <RootView/>
        );
    }
}

export default AuthScreen;

const RootView = styled.View`
    flex: 1;
`;
