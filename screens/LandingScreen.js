import React from 'react';
import styled from 'styled-components';
import {
    TouchableOpacity,
} from 'react-native';

class LandingScreen extends React.Component {
    static navigationOptions = {};

    render() {
        return (
            <Container>
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.push('SignIn');
                }}>
                <Text>Landing Screen</Text>
            </TouchableOpacity>
            </Container>
        );
    }
}

export default LandingScreen;

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Text = styled.Text``;
