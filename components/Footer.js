import React from 'react';
import styled from 'styled-components';

export default class Footer extends React.Component {
    onPress = () => {
        this.props.onPress && this.props.onPress();
    };

    render() {
        const { onPress, style, ...props } = this.props;
        return (
            <Container>
                <Text></Text>
            </Container>
        );
    }
}

const Container = styled.View`
    padding-top: 15px;
`;

const Text = styled.Text`
    display: none;
`;
