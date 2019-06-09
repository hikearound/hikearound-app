import React from 'react';
import styled from 'styled-components';
import { spacing, colors, fontSizes, fontWeights } from '../constants/Index'

class SettingsScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Settings',
    };

    render() {
        return (
            <Container>
                <Text>Settings Screen</Text>
            </Container>
        );
    }
}

export default SettingsScreen;

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Text = styled.Text``;
