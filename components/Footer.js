import React from 'react';
import styled from 'styled-components';
import { View, StyleSheet } from 'react-native';
import { fontWeights, fontSizes } from '../constants/Index';

export default class Footer extends React.Component {
    state = {
        footerVisibility: styles.hiddenText,
    };

    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.setState({
                footerVisibility: styles.visibleText,
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        const { footerVisibility } = this.state;
        return (
            <Container>
                <View style={footerVisibility}>
                    <Text>New Hikes Every Week</Text>
                    <Circle />
                </View>
            </Container>
        );
    }
}

const Circle = styled.View`
    background-color: #E6E6E6;
    border-radius: 7px;
    height: 7px;
    width: 7px;
    margin: 6px auto -4px;
`;

const Container = styled.View`
    padding: 25px 0;
`;

const Text = styled.Text`
    color: #DADADA;
    font-size: ${fontSizes.small}px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
    text-align: center;
`;

const styles = StyleSheet.create({
    visibleText: {},
    hiddenText: {
        display: 'none',
    },
});
