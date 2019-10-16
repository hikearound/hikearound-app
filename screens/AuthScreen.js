import React from 'react';
import { AppLoading, SplashScreen } from 'expo';
import { NavigationActions, StackActions } from 'react-navigation';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';

function mapStateToProps() {
    return {};
}

function mapDispatchToProps() {
    return {};
}

class AuthScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isReady: false,
        };
    }

    componentWillMount() {
        SplashScreen.preventAutoHide();
        StatusBar.setBarStyle('light-content', true);
    }

    componentWillUnmount() {
        this.authSubscription();
    }

    getUserAuth = async () => {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            this.navToApp(user);
        });
    };

    finishLoading = () => {
        this.setState({ isReady: true });
    };

    navToApp = (user) => {
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

        SplashScreen.hide();
    };

    render() {
        const { isReady } = this.state;

        if (!isReady) {
            return (
                <AppLoading
                    startAsync={this.getUserAuth}
                    onFinish={this.finishLoading}
                    autoHideSplash={false}
                />
            );
        }
        return null;
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AuthScreen);
