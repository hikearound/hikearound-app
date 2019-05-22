import React from 'react';
import styled from 'styled-components';

class NotificationScreen extends React.Component {
    static navigationOptions = {
        header: null
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
