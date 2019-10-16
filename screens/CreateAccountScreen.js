import React from 'react';
import styled from 'styled-components';
import { NavigationActions, StackActions } from 'react-navigation';
import firebase from 'firebase';
import InputButton from '../components/InputButton';
import InputLabelGroup from '../components/InputLabelGroup';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

let inputs = [
    {
        keyboardType: 'default',
        placeholder: 'Name',
        name: 'name',
        autoCorrect: false,
        textContentType: 'name',
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

class CreateAccountScreen extends React.Component {
    constructor(props) {
        super(props);

        inputs = inputs.map((input) => ({
            ref: React.createRef(),
            ...input,
        }));
    }

    setValue(name, text) {
        this.setState({ [name]: text });
    }

    handleCreateAccount = async () => {
        const { email, password } = this.state;
        const { navigation } = this.props;

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                if (response) {
                    navigation.dispatch(resetAction);
                }
            });
    };

    static navigationOptions = {
        headerTitle: 'Create Account',
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
                <InputButton
                    text='Create Account'
                    action={this.handleCreateAccount}
                />
            </RootView>
        );
    }
}

export default CreateAccountScreen;

const RootView = styled.View`
    flex: 1;
`;
