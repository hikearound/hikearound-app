import React from 'react';
import PropTypes from 'prop-types';
import { AppLoading, SplashScreen } from 'expo';
import { NavigationActions, StackActions } from 'react-navigation';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserData } from '../utils/User';
import { initializeUserData } from '../actions/User';

const propTypes = {
    dispatchUserData: PropTypes.func.isRequired,
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchUserData: (userData) => dispatch(initializeUserData(userData)),
    };
}

class AuthScreen extends React.Component {
    constructor(props) {
        super(props);
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

    finishLoading = () => {};

    navToApp = async (user) => {
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

        await this.getUserProfileData(user);
        SplashScreen.hide();
    };

    getUserProfileData = async (user) => {
        const { dispatchUserData } = this.props;

        if (user) {
            const userData = await getUserData();
            dispatchUserData(userData.data());
        }
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <AppLoading
                    startAsync={this.getUserAuth}
                    onFinish={this.finishLoading}
                    autoHideSplash={false}
                />
            </SafeAreaView>
        );
    }
}

AuthScreen.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AuthScreen);
