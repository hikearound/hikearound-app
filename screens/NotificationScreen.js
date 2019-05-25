import React from 'react';
import styled from 'styled-components';
import colors from '../constants/Colors';
import spacing from '../constants/Spacing';
import fontSizes from '../constants/Fonts';

class NotificationScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Notifications',
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
