import React from 'react';
import firebase from 'firebase';
import { ScrollView, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import styled from 'styled-components';
import { RootView } from '../../styles/Screens';
import { withTheme, SetBarStyle } from '../../utils/Themes';
import LoadingOverlay from '../../components/LoadingOverlay';
import InputLabelGroup from '../../components/InputLabelGroup';
import { getInputs } from '../../utils/Inputs';
import { spacing, opacities, colors, fontSizes } from '../../constants/Index';
import { auth } from '../../lib/Fire';
import { mapCodeToTranslation } from '../../utils/Localization';

function mapStateToProps() {
    return {};
}

class PasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation, t } = this.props;
        const inputs = getInputs(t, 'changePassword');

        this.state = {
            inputs,
            currentPassword: '',
            newPassword: '',
            loading: false,
            saveButtonDisabled: true,
        };

        navigation.setOptions({
            headerRight: () => this.renderSubmitButton(),
        });
    }

    async setValue(name, text) {
        await this.setState({ [name]: text });
        this.maybeEnableSaveButton();
    }

    maybeEnableSaveButton = () => {
        const { navigation } = this.props;
        const { currentPassword, newPassword } = this.state;

        if (currentPassword && newPassword) {
            this.setState({ saveButtonDisabled: false });
        } else {
            this.setState({ saveButtonDisabled: true });
        }

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
        const { t, navigation } = this.props;
        const { currentPassword, newPassword } = this.state;
        const user = auth.currentUser;

        Keyboard.dismiss();

        if (currentPassword && newPassword) {
            this.setState({ loading: true });

            const credential = firebase.auth.EmailAuthProvider.credential(
                user.email,
                currentPassword,
            );

            user.reauthenticateWithCredential(credential)
                .then(() => {
                    user.updatePassword(newPassword)
                        .then(() => {
                            Alert.alert(
                                t('alert.password.success.title'),
                                t('alert.password.success.body'),
                                [
                                    {
                                        text: t('label.common.ok'),
                                        onPress: () => navigation.goBack(),
                                    },
                                ],
                            );
                            this.setState({ loading: false });
                        })
                        .catch((error) => {
                            Alert.alert(
                                t('error.label'),
                                mapCodeToTranslation(t, error.code),
                            );
                            this.setState({ loading: false });
                        });
                })
                .catch((error) => {
                    Alert.alert(
                        t('error.label'),
                        mapCodeToTranslation(t, error.code),
                    );
                    this.setState({ loading: false });
                });
        }
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
                                autoFocus={index === 0}
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

export default connect(mapStateToProps)(
    withTranslation()(withTheme(PasswordScreen)),
);

const Text = styled.Text`
    margin-right: ${spacing.micro}px;
    color: ${colors.white};
    font-size: ${fontSizes.large}px;
    opacity: ${(props) => (props.disabled ? '0.7' : '1')};
`;
