import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

class SignInScreen extends React.Component {
    static navigationOptions = {};

    render() {
        return (
            <Container>
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.dispatch(resetAction);
                }}>
                <Text>Sign-In Screen</Text>
            </TouchableOpacity>
            </Container>
        );
    }
}

export default SignInScreen;

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Text = styled.Text``;
