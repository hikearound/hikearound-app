import React from 'react';
import styled from 'styled-components';
import { colors, fontSizes, spacing } from '../constants/Index';
import { BellEmptyState } from '../icons/Index';

class NotificationScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Notifications',
    };

    render() {
        return (
            <Container>
                <BellEmptyState />
                <Text>No new notifications</Text>
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

const Text = styled.Text`
    margin-top: ${spacing.micro}px;
    color: ${colors.mediumGray};
    font-size: ${fontSizes.medium}px;
`;
