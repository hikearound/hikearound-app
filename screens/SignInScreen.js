import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StackActions } from '@react-navigation/native';
import { NavigationActions } from '@react-navigation/compat';
import { Alert, StatusBar, ScrollView } from 'react-native';
import firebase from 'firebase';
import InputButton from '../components/InputButton';
import LoadingOverlay from '../components/LoadingOverlay';
import InputLabelGroup from '../components/InputLabelGroup';
import { RootView } from '../styles/Screens';
import { withTheme } from '../hooks/Themes';

const signInInputs = [
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

class SignInScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loading: false,
        };
    }

    componentDidMount() {
        StatusBar.setBarStyle('light-content', true);
    }

    setValue(name, text) {
        this.setState({ [name]: text });
    }

    handleLogin = async () => {
        const { email, password } = this.state;
        const { navigation } = this.props;

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })],
        });

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

    render() {
        const { loading } = this.state;
        const { theme } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <RootView>
                    <ScrollView
                        keyboardShouldPersistTaps='handled'
                        scrollEnabled={false}
                        contentContainerStyle={{ flexGrow: 1 }}
                    >
                        {signInInputs.map(
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
                                    onChangeText={(text) =>
                                        this.setValue(name, text, index)
                                    }
                                    labelName={placeholder}
                                    textContentType={textContentType}
                                    autoFocus={index === 0}
                                />
                            ),
                        )}
                        <InputButton text='Sign In' action={this.handleLogin} />
                        <LoadingOverlay loading={loading} />
                    </ScrollView>
                </RootView>
            </ThemeProvider>
        );
    }
}

export default withTheme(SignInScreen);
