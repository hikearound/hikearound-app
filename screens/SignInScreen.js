import React from 'react';
import styled from 'styled-components';
import {
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import { spacing, colors, fontSizes, fontWeights } from '../constants/Index'
import { InputGroup } from '../components/Index'

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

let inputs = [
    {
        keyboardType: 'email-address',
        placeholder: 'Email',
        autoCorrect: false,
        autoCapitalize: 'none',
    },
    {
        placeholder: 'Password',
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

    render() {
        return (
            <RootView>
                <InputGroup
                    inputs={inputs}
                    resetAction={resetAction}/>
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
