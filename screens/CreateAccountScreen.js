import React from 'react';
import { CommonActions } from '@react-navigation/native';
import { Alert, ScrollView, Keyboard } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import * as Location from 'expo-location';
import InputButton from '@components/InputButton';
import LoadingOverlay from '@components/LoadingOverlay';
import InputLabelGroup from '@components/InputLabelGroup';
import LegalText from '@components/LegalText';
import { updateUserData } from '@actions/User';
import { RootView } from '@styles/Screens';
import { withTheme } from '@utils/Themes';
import { mapCodeToTranslation } from '@utils/Localization';
import { createUserProfile } from '@utils/User';
import { getInputs } from '@utils/Inputs';
import { defaultState } from '@constants/states/CreateAccount';
import AppleAuthButton from '@components/auth/Apple';
import Header from '@components/Header';
import { getHeaderHeight } from '@utils/Navigation';

const headerHeight = getHeaderHeight();

const propTypes = {
    dispatchNewUserData: PropTypes.func.isRequired,
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchNewUserData: (userData) => dispatch(updateUserData(userData)),
    };
}

class CreateAccountScreen extends React.Component {
    constructor(props) {
        super(props);
        const { t } = this.props;
        const inputs = getInputs(t, 'createAccount');

        defaultState.inputs = inputs;
        this.state = defaultState;

        this.setLoading = this.setLoading.bind(this);
    }

    setValue(name, text) {
        this.setState({ [name]: text });
    }

    setNextScreen = async () => {
        const { status } = await Location.getForegroundPermissionsAsync();

        if (status === 'granted') {
            return 'Home';
        }

        return 'LocationPermission';
    };

    setLoading = (loading) => {
        Keyboard.dismiss();
        this.setState({ loading });
    };

    navigateToNextScreen = async () => {
        const { navigation } = this.props;
        const screen = await this.setNextScreen();

        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: screen }],
        });

        navigation.dispatch(resetAction);
    };

    finishCreatingProfile = async (response, name) => {
        const { dispatchNewUserData } = this.props;
        const { user } = response;

        await response.user.updateProfile({
            displayName: name,
        });

        await createUserProfile(
            this.navigateToNextScreen,
            dispatchNewUserData,
            user,
            name,
        );
    };

    handleCreateAccount = async () => {
        const { email, password, name } = this.state;

        this.setLoading(true);

        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                this.showErrorAlert(error);
                this.setLoading(false);
            })
            .then(async (response) => {
                if (response) {
                    this.finishCreatingProfile(response, name);
                }
            });
    };

    showErrorAlert = (error) => {
        const { t } = this.props;
        Alert.alert(t('error.label'), mapCodeToTranslation(t, error.code));
    };

    handleSubmitEditing = (index) => {
        if (index === 0) {
            this.emailInput.focus();
        } else if (index === 1) {
            this.passwordInput.focus();
        } else {
            this.handleCreateAccount();
        }
    };

    assignRef = (ref, name) => {
        this[`${name}Input`] = ref;
    };

    render() {
        const { loading, inputs } = this.state;
        const { t, dispatchNewUserData } = this.props;

        return (
            <RootView>
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    scrollEnabled={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <AppleAuthButton
                        type='SIGN_UP'
                        dispatchNewUserData={dispatchNewUserData}
                        setLoading={this.setLoading}
                    />
                    <Header
                        title={t('screen.createAccount.header')}
                        isLoggedOut
                    />
                    {inputs.map(
                        (
                            {
                                name,
                                placeholder,
                                keyboardType,
                                secureTextEntry,
                                autoCorrect,
                                autoCapitalize,
                                textContentType,
                                enablesReturnKeyAutomatically,
                                returnKeyType,
                                autoCompleteType,
                            },
                            index,
                        ) => (
                            <InputLabelGroup
                                key={index}
                                placeholder={placeholder}
                                keyboardType={keyboardType}
                                secureTextEntry={secureTextEntry}
                                autoCorrect={autoCorrect}
                                autoCapitalize={autoCapitalize}
                                onChangeText={(text) =>
                                    this.setValue(name, text, index)
                                }
                                labelName={placeholder}
                                textContentType={textContentType}
                                enablesReturnKeyAutomatically={
                                    enablesReturnKeyAutomatically
                                }
                                returnKeyType={returnKeyType}
                                onSubmitEditing={() =>
                                    this.handleSubmitEditing(index)
                                }
                                inputRef={(ref) => this.assignRef(ref, name)}
                                autoCompleteType={autoCompleteType}
                            />
                        ),
                    )}
                    <InputButton
                        text={t('label.nav.createAccount')}
                        action={this.handleCreateAccount}
                    />
                    <LegalText />
                    <LoadingOverlay
                        loading={loading}
                        topOffset={-headerHeight}
                    />
                </ScrollView>
            </RootView>
        );
    }
}

CreateAccountScreen.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(CreateAccountScreen)));
