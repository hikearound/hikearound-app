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
        const { navigation } = this.props;

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
                Alert.alert('Error', error.message);
                this.setState({ loading: false });
            })
            .then((response) => {
                if (response) {
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
                    <InputButton text={t('signIn')} action={this.handleLogin} />
                    <LoadingOverlay loading={loading} />
                </ScrollView>
            </RootView>
        );
    }
}

export default withTranslation()(withTheme(SignInScreen));
