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
import { getCreateAccountInputs } from '../constants/Inputs';

const propTypes = {
    dispatchUserData: PropTypes.func.isRequired,
    map: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    darkMode: PropTypes.bool.isRequired,
    notifs: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        map: state.userReducer.map,
        location: state.userReducer.location,
        darkMode: state.userReducer.darkMode,
        notifs: state.userReducer.notifs,
    };
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

        const createAccountInputs = getCreateAccountInputs(
            t('name'),
            t('email'),
            t('password'),
        );

        this.state = {
            email: '',
            password: '',
            name: '',
            loading: false,
            createAccountInputs,
        };
    }

    setValue(name, text) {
        this.setState({ [name]: text });
    }

    handleCreateAccount = async () => {
        const { email, password, name } = this.state;
        const {
            navigation,
            dispatchUserData,
            location,
            darkMode,
            map,
            notifs,
        } = this.props;

        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });

        this.setState({ loading: true });

        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                Alert.alert('Error', error.message);
                this.setState({ loading: false });
            })
            .then((response) => {
                if (response) {
                    response.user.updateProfile({
                        displayName: name,
                    });
                    dispatchUserData({
                        name,
                        location,
                        darkMode,
                        map,
                        notifs,
                    });
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
        const { loading, createAccountInputs } = this.state;
        const { t } = this.props;

        return (
            <RootView>
                {createAccountInputs.map(
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
                    text={t('createAccount')}
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
