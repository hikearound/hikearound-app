import React from 'react';
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
    componentWillMount() {
        StatusBar.setBarStyle('light-content', true);
        this.getAuth();
    }

    componentWillUnmount() {
        this.authSubscription();
    }

    getAuth = async () => {
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

        this.dispatchNav(user);
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

AuthScreen.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AuthScreen);
