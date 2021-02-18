import React from 'react';
import firebase from 'firebase';
import { ScrollView, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { withTranslation } from 'react-i18next';
import styled from 'styled-components';
import { RootView } from '../../styles/Screens';
import { withTheme, SetBarStyle } from '../../utils/Themes';
import LoadingOverlay from '../../components/LoadingOverlay';
import InputLabelGroup from '../../components/InputLabelGroup';
import { getInputs } from '../../utils/Inputs';
import { spacing, opacities, timings } from '../../constants/Index';
import { auth } from '../../lib/Fire';
import { mapCodeToTranslation } from '../../utils/Localization';
import HeaderText from '../../styles/Header';

class PasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        const { t } = this.props;
        const inputs = getInputs(t, 'changePassword');

        this.state = {
            inputs,
            currentPassword: '',
            newPassword: '',
            loading: false,
            saveButtonDisabled: true,
        };

        this.setNavigationOptions();
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.currentPasswordInput.focus();
        }, timings.mediumShort);
    };

    async setValue(name, text) {
        await this.setState({ [name]: text });
        this.maybeToggleSaveButton();
    }

    maybeToggleSaveButton = () => {
        const { currentPassword, newPassword } = this.state;

        let saveButtonDisabled = true;
        if (currentPassword && newPassword) {
            saveButtonDisabled = false;
        }

        this.setState({ saveButtonDisabled });
        this.setNavigationOptions();
    };

    setNavigationOptions = () => {
        const { navigation } = this.props;

        navigation.setOptions({
            headerRight: () => this.renderSubmitButton(),
        });
    };

    assignRef = (ref, name) => {
        this[`${name}Input`] = ref;
    };

    handleSubmitEditing = (index) => {
        if (index === 0) {
            this.newPasswordInput.focus();
        } else {
            this.handleUpdatePassword();
        }
    };

    handleUpdatePassword = async () => {
        const { currentPassword, newPassword } = this.state;
        const user = auth.currentUser;

        Keyboard.dismiss();
        this.setState({ loading: true });

        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            currentPassword,
        );

        user.reauthenticateWithCredential(credential)
            .then(() => {
                user.updatePassword(newPassword)
                    .then(() => {
                        this.renderSuccessAlert();
                    })
                    .catch((error) => {
                        this.renderErrorAlert(error);
                    });
            })
            .catch((error) => {
                this.renderErrorAlert(error);
            });
    };

    renderSuccessAlert = () => {
        const { t, navigation } = this.props;

        const title = t('alert.password.success.title');
        const message = t('alert.password.success.body');
        const options = [
            {
                text: t('label.common.ok'),
                onPress: () => navigation.goBack(),
            },
        ];

        Alert.alert(title, message, options);
        this.setState({ loading: false });
    };

    renderErrorAlert = (error) => {
        const { t } = this.props;

        const title = t('error.label');
        const message = mapCodeToTranslation(t, error.code);

        Alert.alert(title, message);
        this.setState({ loading: false });
    };

    renderSubmitButton() {
        const { t } = this.props;
        const { saveButtonDisabled } = this.state;

        return (
            <TouchableOpacity
                disabled={saveButtonDisabled}
                activeOpacity={opacities.regular}
                onPress={() => this.handleUpdatePassword()}
            >
                <Text disabled={saveButtonDisabled}>
                    {t('label.modal.save')}
                </Text>
            </TouchableOpacity>
        );
    }

    render() {
        const { loading, inputs } = this.state;

        return (
            <RootView>
                <SetBarStyle barStyle='light-content' />
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
                                labelPadding
                            />
                        ),
                    )}
                    <LoadingOverlay loading={loading} />
                </ScrollView>
            </RootView>
        );
    }
}

export default withTranslation()(withTheme(PasswordScreen));

const Text = styled(HeaderText)`
    margin-right: ${spacing.micro}px;
`;
