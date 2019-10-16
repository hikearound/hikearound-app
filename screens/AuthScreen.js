import React from 'react';
import { AppLoading, SplashScreen } from 'expo';
import PropTypes from 'prop-types';
import { NavigationActions, StackActions } from 'react-navigation';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { getAvatarUri, getUserData } from '../utils/User';
import { initializeUserData, initializeAvatar } from '../actions/User';

const propTypes = {
    dispatchUserData: PropTypes.func.isRequired,
    dispatchAvatar: PropTypes.func.isRequired,
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchUserData: (userData) => dispatch(initializeUserData(userData)),
        dispatchAvatar: (avatarUri) => dispatch(initializeAvatar(avatarUri)),
    };
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
            this.getUserProfileData(user);
        });
    };

    getUserProfileData = async (user) => {
        const { dispatchUserData, dispatchAvatar } = this.props;

        if (user) {
            const avatarUri = await getAvatarUri();
            const userData = await getUserData();

            dispatchUserData(userData.data());
            dispatchAvatar(avatarUri);
        }

        this.navToApp(user);
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

AuthScreen.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AuthScreen);
