import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
    NavigationActions,
    StackActions,
    ThemeContext,
} from 'react-navigation';
import { Alert } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { themes } from '../constants/Themes';
import InputButton from '../components/InputButton';
import LoadingOverlay from '../components/LoadingOverlay';
import InputLabelGroup from '../components/InputLabelGroup';
import { updateUserData } from '../actions/User';
import { RootView } from '../styles/Screens';

const createAccountInputs = [
    {
        placeholder: 'Name',
        name: 'name',
        autoCorrect: false,
        textContentType: 'name',
        autoCapitalize: 'words',
    },
    {
        keyboardType: 'email-address',
        placeholder: 'Email',
        name: 'email',
        autoCorrect: false,
        autoCapitalize: 'none',
        textContentType: 'emailAddress',
    },
    {
        placeholder: 'Password',
        name: 'password',
        secureTextEntry: true,
        textContentType: 'password',
    },
];

const propTypes = {
    dispatchUserData: PropTypes.func.isRequired,
    map: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    darkMode: PropTypes.bool.isRequired,
    emailNotifs: PropTypes.object.isRequired,
    pushNotifs: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        map: state.userReducer.map,
        location: state.userReducer.location,
        darkMode: state.userReducer.darkMode,
        emailNotifs: state.userReducer.emailNotifs,
        pushNotifs: state.userReducer.pushNotifs,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchUserData: (userData) => dispatch(updateUserData(userData)),
    };
}

class CreateAccountScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Create Account',
    };

    static contextType = ThemeContext;

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            loading: false,
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
            emailNotifs,
            pushNotifs,
        } = this.props;

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })],
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
                        emailNotifs,
                        pushNotifs,
                    });
                    navigation.dispatch(resetAction);
                }
            });
    };

    render() {
        const { loading } = this.state;
        const theme = themes[this.context];

        return (
            <ThemeProvider theme={theme}>
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
                            />
                        ),
                    )}
                    <InputButton
                        text='Create Account'
                        action={this.handleCreateAccount}
                    />
                    <LoadingOverlay loading={loading} />
                </RootView>
            </ThemeProvider>
        );
    }
}

CreateAccountScreen.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateAccountScreen);
