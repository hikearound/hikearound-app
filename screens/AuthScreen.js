import React from 'react';
import { AppLoading } from 'expo';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cacheImages } from '../utils/Image';
import { initializeLocalization } from '../utils/Localization';
import { initializeGeolocation } from '../utils/Location';
import { localImages } from '../constants/Images';

initializeLocalization();
initializeGeolocation();

function mapStateToProps(state) {
    return {
        darkMode: state.userReducer.darkMode,
    };
}

function mapDispatchToProps() {
    return {};
}

class AuthScreen extends React.Component {
    componentWillUnmount() {
        this.authSubscription();
    }

    getUserAuth = async () => {
        this.authSubscription = await firebase
            .auth()
            .onAuthStateChanged((user) => {
                this.navToApp(user);
            });
    };

    finishLoading = () => {};

    navToApp = async (user) => {
        const { navigation } = this.props;

        await this.cacheLocalImages();

        await navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: user ? 'Home' : 'Landing' }],
            }),
        );
    };

    cacheLocalImages = async () => {
        cacheImages(localImages);
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
