import React from 'react';
import styled from 'styled-components';

class NotificationScreen extends React.Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#935DFF',
            height: 60,
        },
        headerTintColor: '#FFF',
        headerTitle: 'Notifications',
        headerTitleStyle: {
            fontSize: 22,
        },
    };

    render() {
        return (
            <Container>
                <Text>Notifications Screen</Text>
            </Container>
        );
    }
}

export default NotificationScreen;

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Text = styled.Text``;
