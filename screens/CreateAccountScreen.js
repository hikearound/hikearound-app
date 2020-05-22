import React from 'react';
import { CommonActions } from '@react-navigation/native';
import { Alert } from 'react-native';
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

const propTypes = {
    dispatchUserData: PropTypes.func.isRequired,
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchUserData: (userData) => dispatch(updateUserData(userData)),
    };
}

class CreateAccountScreen extends React.Component {
    constructor(props) {
        super(props);
        const { t } = this.props;
        const inputs = getInputs(t, 'createAccount');

        defaultState.inputs = inputs;
        this.state = defaultState;
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

    handleCreateAccount = async () => {
        const { email, password, name } = this.state;
        const { navigation, dispatchUserData, t } = this.props;
        const screen = await this.setNextScreen();

        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: screen }],
        });

        this.setState({ loading: true });

        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                Alert.alert(
                    t('error.label'),
                    mapCodeToTranslation(t, error.code),
                );
                this.setState({ loading: false });
            })
            .then((response) => {
                if (response) {
                    createUserProfile(dispatchUserData, name);
                    response.user.updateProfile({ displayName: name });
                    navigation.dispatch(resetAction);
                }
            });
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
        const { t } = this.props;

        return (
            <RootView>
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
                        />
                    ),
                )}
                <InputButton
                    text={t('label.nav.createAccount')}
                    action={this.handleCreateAccount}
                />
                <LegalText />
                <LoadingOverlay loading={loading} />
            </RootView>
        );
    }
}

CreateAccountScreen.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTranslation()(withTheme(CreateAccountScreen)));
