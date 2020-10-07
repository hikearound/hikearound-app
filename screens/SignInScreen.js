import React from 'react';
import { CommonActions } from '@react-navigation/native';
import { Alert, ScrollView, Keyboard } from 'react-native';
import firebase from 'firebase';
import { withTranslation } from 'react-i18next';
import InputButton from '../components/InputButton';
import LoadingOverlay from '../components/LoadingOverlay';
import InputLabelGroup from '../components/InputLabelGroup';
import { RootView } from '../styles/Screens';
import { withTheme } from '../utils/Themes';
import { getInputs } from '../utils/Inputs';
import { defaultState } from '../constants/states/SignIn';
import { mapCodeToTranslation } from '../utils/Localization';
import ResetPasswordModal from '../components/modal/ResetPasswordModal';
import PasswordReset from '../components/PasswordReset';
import { logEvent } from '../utils/Analytics';

class SignInScreen extends React.Component {
    constructor(props) {
        super(props);
        const { t } = this.props;
        const inputs = getInputs(t, 'signIn');

        defaultState.inputs = inputs;
        this.state = defaultState;
    }

    setValue(name, text) {
        this.setState({ [name]: text });
    }

    handleLogin = async () => {
        const { email, password } = this.state;
        const { navigation, t } = this.props;

        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });

        Keyboard.dismiss();
        this.setState({ loading: true });

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch((error) => {
                Alert.alert(
                    t('error.label'),
                    mapCodeToTranslation(t, error.code),
                );
                this.setState({ loading: false });
            })
            .then((response) => {
                if (response) {
                    logEvent('sign_in', {});
                    navigation.dispatch(resetAction);
                }
            });
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
                                autoFocus={index === 0}
                                enablesReturnKeyAutomatically={
                                    enablesReturnKeyAutomatically
                                }
                                returnKeyType={returnKeyType}
                                onSubmitEditing={() =>
                                    this.handleSubmitEditing(index)
                                }
                                inputRef={(ref) => this.assignRef(ref, name)}
                            />
                        ),
                    )}
                    <InputButton
                        text={t('label.nav.signIn')}
                        action={this.handleLogin}
                    />
                    <PasswordReset />
                    <LoadingOverlay loading={loading} />
                </ScrollView>
                <ResetPasswordModal
                    animationType='push'
                    modalAction='showResetPassword'
                    transparent
                    hideStatusBar={false}
                    fullScreen={false}
                />
            </RootView>
        );
    }
}

export default withTranslation()(withTheme(SignInScreen));
