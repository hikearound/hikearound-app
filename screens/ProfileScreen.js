import React from 'react';
import styled from 'styled-components';
import { colors, fontSizes, fontWeights } from '../constants/Index'

class ProfileScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'You',
    };

    render() {
        return (
            <Container>
                <Text>Profile Screen</Text>
            </Container>
        );
    }
}

export default ProfileScreen;

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Text = styled.Text``;
