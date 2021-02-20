import React from 'react';
import { CommonActions } from '@react-navigation/native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import firebase from 'firebase';
import { Alert } from 'react-native';
import { withTranslation } from 'react-i18next';
import { spacing } from '../../constants/Index';
import { getScreenWidth } from '../../utils/Screen';
import { withTheme } from '../../utils/Themes';
import { logEvent } from '../../utils/Analytics';
import { withNavigation } from '../../utils/Navigation';
import { createUserProfile } from '../../utils/User';
import { mapCodeToTranslation } from '../../utils/Localization';
import store from '../../store/Store';

const { FULL_NAME, EMAIL } = AppleAuthentication.AppleAuthenticationScope;
const { WHITE, BLACK } = AppleAuthentication.AppleAuthenticationButtonStyle;

const nonce = 'APPLE_SIGN_IN';

const propTypes = {
    type: PropTypes.string.isRequired,
    dispatchUserData: PropTypes.func,
    cornerRadius: PropTypes.number,
    height: PropTypes.number,
};

const defaultProps = {
    cornerRadius: 0,
    height: 42,
    dispatchUserData: () => {},
};

class AppleAuthButton extends React.PureComponent {
    getButtonType = () => {
        const { type } = this.props;
        return AppleAuthentication.AppleAuthenticationButtonType[type];
    };

    logEvent = () => {
        const { type } = this.props;
        logEvent(type.toLowerCase(), {});
    };

    maybeCreateUserProfile = (response, fullName) => {
        const { dispatchUserData, type } = this.props;
        const state = store.getState();

        let formattedName = state.userReducer.name;

        if (fullName.givenName && fullName.familyName) {
            formattedName = `${fullName.givenName} ${fullName.familyName}`;
        }

        if (type === 'SIGN_UP') {
            createUserProfile(dispatchUserData, formattedName);
            response.user.updateProfile({ displayName: formattedName });
        }
    };

    handleLogin = async (credential) => {
        const { navigation, t } = this.props;
        const { identityToken, fullName } = credential;

        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });

        const authCredential = new firebase.auth.OAuthProvider(
            'apple.com',
        ).credential({
            idToken: identityToken,
            rawNonce: nonce,
        });

        await firebase
            .auth()
            .signInWithCredential(authCredential)
            .catch((error) => {
                Alert.alert(
                    t('error.label'),
                    mapCodeToTranslation(t, error.code),
                );
            })
            .then((response) => {
                if (response) {
                    this.logEvent();
                    this.maybeCreateUserProfile(response, fullName);
                    navigation.dispatch(resetAction);
                }
            });
    };

    getButtonStyle = () => {
        const { theme } = this.props;

        if (theme.dark) {
            return BLACK;
        }

        return WHITE;
    };

    onPress = async () => {
        const hashedNonce = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            nonce,
        );

        const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [FULL_NAME, EMAIL],
            nonce: hashedNonce,
        });

        this.handleLogin(credential);
    };

    render() {
        const { cornerRadius, height } = this.props;

        return (
            <ButtonWrapper>
                <AppleAuthentication.AppleAuthenticationButton
                    buttonType={this.getButtonType()}
                    buttonStyle={this.getButtonStyle()}
                    cornerRadius={cornerRadius}
                    style={{ width: getScreenWidth(), height }}
                    onPress={this.onPress}
                />
            </ButtonWrapper>
        );
    }
}

export default withTheme(withTranslation()(withNavigation(AppleAuthButton)));

AppleAuthButton.propTypes = propTypes;
AppleAuthButton.defaultProps = defaultProps;

const ButtonWrapper = styled.View`
    margin-top: ${spacing.medium}px;
    margin-bottom: ${spacing.medium}px;
    border-color: ${(props) => props.theme.itemBorder};
    border-top-width: 1px;
    border-bottom-width: 1px;
`;
