import React from 'react';
import styled from 'styled-components';

class ProfileScreen extends React.Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#935DFF',
            height: 60,
        },
        headerTintColor: '#FFF',
        headerTitle: 'You',
        headerTitleStyle: {
            fontSize: 22,
        },
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
