import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import styled from 'styled-components';
import firebase from 'firebase';

class AuthLoadingScreen extends React.Component {
    static navigationOptions = {
        header: null,
        headerBackTitle: null,
    };

    state = {
        loading: true,
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
            <RootView>
                <ActivityIndicator />
                <StatusBar hidden={true}/>
            </RootView>
        );
    }
}

export default AuthLoadingScreen;

const RootView = styled.View`
    flex: 1;
`;
