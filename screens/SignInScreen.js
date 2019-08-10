import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
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

function mapStateToProps(state) {
    return { action: state.action };
}

class SignInScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Sign In',
        headerBackTitle: null,
    };

    constructor(props) {
        super(props);

        inputs = inputs.map(input => ({
            ref: React.createRef(),
            ...input,
        }));
    }

    componentDidMount() {
        StatusBar.setBarStyle(
            'light-content', true,
        );
    }

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
export default connect(
    mapStateToProps,
)(SignInScreen);

const RootView = styled.View`
    flex: 1;
    margin-top: 26px;
`;
