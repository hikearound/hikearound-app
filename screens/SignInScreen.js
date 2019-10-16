import React from 'react';
import styled from 'styled-components';
import { NavigationActions, StackActions } from 'react-navigation';
import { Alert, StatusBar } from 'react-native';
import firebase from 'firebase';
import InputButton from '../components/InputButton';
import InputLabelGroup from '../components/InputLabelGroup';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

let inputs = [
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

        inputs = inputs.map((input) => ({
            ref: React.createRef(),
            ...input,
        }));
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

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch((error) => {
                Alert.alert('Error', error.message);
            })
            .then((response) => {
                if (response) {
                    navigation.dispatch(resetAction);
                }
            });
    };

    static navigationOptions = {
        headerTitle: 'Sign In',
        headerBackTitle: null,
    };

    render() {
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
                            ref,
                        },
                        index,
                    ) => (
                        <InputLabelGroup
                            key={`input_${index}`}
                            ref={ref}
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
                <InputButton text='Sign In' action={this.handleLogin} />
            </RootView>
        );
    }
}

export default SignInScreen;

const RootView = styled.View`
    flex: 1;
`;
