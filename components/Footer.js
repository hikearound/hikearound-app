import React from 'react';
import styled from 'styled-components';

export default class Footer extends React.Component {
    render() {
        const { ...props } = this.props;
        // console.log(this.props.refreshControl.props.refreshing);
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
