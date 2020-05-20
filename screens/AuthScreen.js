import React from 'react';
import PropTypes from 'prop-types';
import { AppLoading, SplashScreen } from 'expo';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserData } from '../utils/User';
import { initializeUserData } from '../actions/User';
import { cacheImages } from '../utils/Image';
import { initializeLocalization } from '../utils/Localization';
import { initializeGeolocation } from '../utils/Location';
import { localImages } from '../constants/Images';

initializeLocalization();
initializeGeolocation();

const propTypes = {
    dispatchUserData: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        darkMode: state.userReducer.darkMode,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchUserData: (userData) => dispatch(initializeUserData(userData)),
    };
}

class AuthScreen extends React.Component {
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
            CommonActions.reset({
                index: 0,
                routes: [{ name: user ? 'Home' : 'Landing' }],
            }),
        );

        await this.cacheLocalImages();
        await this.getUserProfileData(user);

        SplashScreen.hide();
    };

    cacheLocalImages = async () => {
        cacheImages(localImages);
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
