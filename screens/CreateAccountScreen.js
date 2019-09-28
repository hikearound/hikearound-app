import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import { CreateAccountInputGroup } from '../components/Index';

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
    },
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
    {
        placeholder: 'Repeat Password',
        name: 'passwordCopy',
        secureTextEntry: true,
    },
];

function mapStateToProps(state) {
    return { action: state.action };
}

class CreateAccountScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Create Account',
        headerBackTitle: null,
    };

    constructor(props) {
        super(props);

        inputs = inputs.map((input) => ({
            ref: React.createRef(),
            ...input,
        }));
    }

    render() {
        return (
            <RootView>
                <CreateAccountInputGroup
                    inputs={inputs}
                    resetAction={resetAction}
                    passwordLinkDisplay='none'
                    continueText='Continue'
                />
            </RootView>
        );
    }
}

export default connect(mapStateToProps)(CreateAccountScreen);

const RootView = styled.View`
    flex: 1;
    margin-top: 26px;
`;
