import React from 'react';
import styled from 'styled-components';
import { NavigationActions, StackActions } from 'react-navigation';
import { StatusBar } from 'react-native';
import { SignInInputGroup } from '../components/Index';

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
    },
    {
        placeholder: 'Password',
        name: 'password',
        secureTextEntry: true,
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

    static navigationOptions = {
        headerTitle: 'Sign In',
        headerBackTitle: null,
    };

    render() {
        const { navigation } = this.props;
        return (
            <RootView>
                <SignInInputGroup
                    inputs={inputs}
                    resetAction={resetAction}
                    passwordLinkDisplay='flex'
                    continueText='Continue'
                    navigation={navigation}
                />
            </RootView>
        );
    }
}

export default SignInScreen;

const RootView = styled.View`
    flex: 1;
`;
