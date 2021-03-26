import React from 'react';
import { CommonActions } from '@react-navigation/native';
import { Alert, ScrollView, Keyboard } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import InputButton from '../components/InputButton';
import LoadingOverlay from '../components/LoadingOverlay';
import InputLabelGroup from '../components/InputLabelGroup';
import LegalText from '../components/LegalText';
import { updateUserData } from '../actions/User';
import { RootView } from '../styles/Screens';
import { withTheme } from '../utils/Themes';
import { mapCodeToTranslation } from '../utils/Localization';
import { createUserProfile } from '../utils/User';
import { getPermissionStatus } from '../utils/Permissions';
import { getInputs } from '../utils/Inputs';
import { defaultState } from '../constants/states/CreateAccount';
import { logEvent } from '../utils/Analytics';
import AppleAuthButton from '../components/auth/Apple';
import Header from '../components/Header';
import { getHeaderHeight } from '../utils/Navigation';

const headerHeight = getHeaderHeight();

const propTypes = {
    dispatchUserData: PropTypes.func.isRequired,
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchUserData: (uid, userData) =>
            dispatch(updateUserData(uid, userData)),
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
        const status = await getPermissionStatus('location');

        if (status === 'granted') {
            return 'Home';
        }

        return 'LocationPermission';
    };

    setLoading = (loading) => {
        Keyboard.dismiss();
        this.setState({ loading });
    };

    logEvent = () => {
        logEvent('sign_up', {});
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

    createProfile = async (response) => {
        const { dispatchUserData } = this.props;
        const { name } = this.state;

        createUserProfile(dispatchUserData, response, name);
    };

    createAccountSuccessful = async (response) => {
        this.createProfile(response);
        this.logEvent();
        this.navigateToNextScreen();
    };

    handleCreateAccount = async () => {
        const { email, password } = this.state;

        this.setLoading(true);

        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                this.showErrorAlert(error);
                this.setLoading(false);
            })
            .then((response) => {
                if (response) {
                    this.createAccountSuccessful(response);
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
        const { t, dispatchUserData } = this.props;

        return (
            <RootView>
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    scrollEnabled={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <AppleAuthButton
                        type='SIGN_UP'
                        dispatchUserData={dispatchUserData}
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
