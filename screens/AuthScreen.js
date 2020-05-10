import React from 'react';
import PropTypes from 'prop-types';
import { AppLoading, SplashScreen } from 'expo';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getUserData } from '../utils/User';
import { initializeUserData } from '../actions/User';
import { cacheImages } from '../utils/Image';
import { localImages } from '../constants/Images';
import { enTranslations, esTranslations } from '../constants/Translations';

i18n.use(initReactI18next).init({
    resources: {
        en: enTranslations,
        es: esTranslations,
    },
    lng: Localization.locale,
    fallbackLng: 'en',

    interpolation: {
        escapeValue: false,
    },
});

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
        // await setTranslations();

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
