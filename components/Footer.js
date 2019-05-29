import React from 'react';
import styled from 'styled-components';
import { View, StyleSheet } from 'react-native';

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
        this.timeout;
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        const { ...props } = this.props;
        return (
            <Container>
                <View style={this.state.footerVisibility}>
                    <Text>New Hikes Every Week</Text>
                    <Circle/>
                </View>
            </Container>
        );
    }
}

const Circle = styled.View`
    background-color: #E6E6E6;
    border-radius: 8px;
    height: 8px;
    width: 8px;
    margin: 7px auto 0;
`;

const Container = styled.View`
    padding: 20px 0;
`;

const Text = styled.Text`
    color: #DADADA;
    font-size: 13px;
    font-weight: 500;
    text-transform: uppercase;
    text-align: center;
`;

const styles = StyleSheet.create({
    visibleText: {},
    hiddenText: {
        display: 'none',
    },
});
