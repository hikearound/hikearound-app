import React from 'react';
import { Alert, ScrollView, Keyboard } from 'react-native';
import firebase from 'firebase';
import { withTranslation } from 'react-i18next';
import InputButton from '@components/InputButton';
import LoadingOverlay from '@components/LoadingOverlay';
import InputLabelGroup from '@components/InputLabelGroup';
import { RootView } from '@styles/Screens';
import { withTheme } from '@utils/Themes';
import { getInputs } from '@utils/Inputs';
import { defaultState } from '@constants/states/SignIn';
import { mapCodeToTranslation } from '@utils/Localization';
import ResetPasswordModal from '@components/modal/ResetPasswordModal';
import PasswordReset from '@components/PasswordReset';
import { logEvent } from '@utils/Analytics';
import AppleAuthButton from '@components/auth/Apple';
import Header from '@components/Header';
import { getHeaderHeight } from '@utils/Navigation';

const headerHeight = getHeaderHeight();

class SignInScreen extends React.Component {
    constructor(props) {
        super(props);
        const { t } = this.props;
        const inputs = getInputs(t, 'signIn');

        defaultState.inputs = inputs;
        this.state = defaultState;

        this.setLoading = this.setLoading.bind(this);
    }

    setValue(name, text) {
        this.setState({ [name]: text });
    }

    setLoading = (loading) => {
        Keyboard.dismiss();
        this.setState({ loading });
    };

    logEvent = () => {
        logEvent('sign_in', {});
    };

    navigateToNextScreen = async () => {
        const { navigation } = this.props;

        navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }],
        });
    };

    signInSuccessful = () => {
        this.logEvent();
        this.navigateToNextScreen();
    };

    handleLogin = async () => {
        const { email, password } = this.state;

        this.setLoading(true);

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch((error) => {
                this.showErrorAlert(error);
                this.setLoading(false);
            })
            .then((response) => {
                if (response) {
                    this.signInSuccessful();
                }
            });
    };

    showErrorAlert = (error) => {
        const { t } = this.props;
        Alert.alert(t('error.label'), mapCodeToTranslation(t, error.code));
    };

    handleSubmitEditing = (index) => {
        if (index === 0) {
            this.passwordInput.focus();
        } else {
            this.handleLogin();
        }
    };

    assignRef = (ref, name) => {
        this[`${name}Input`] = ref;
    };

    render() {
        const { loading, inputs } = this.state;
        const { t } = this.props;

        return (
            <RootView>
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    scrollEnabled={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <AppleAuthButton
                        type='SIGN_IN'
                        setLoading={this.setLoading}
                    />
                    <Header title={t('screen.signIn.header')} isLoggedOut />
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
                        text={t('label.nav.signIn')}
                        action={this.handleLogin}
                    />
                    <PasswordReset />
                    <LoadingOverlay
                        loading={loading}
                        topOffset={-headerHeight}
                    />
                </ScrollView>
                <ResetPasswordModal />
            </RootView>
        );
    }
}

export default withTranslation()(withTheme(SignInScreen));
