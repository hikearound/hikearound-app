import React from 'react';
import styled from 'styled-components';
import { Text, StyleSheet } from 'react-native';

export default class Footer extends React.Component {
    state = {
        footerVisibility: styles.hiddenText,
    };

    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.setState({
                footerVisibility: styles.visibleText,
            });
        }, 2500);
        this.timeout;
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        const { ...props } = this.props;
        return (
            <Container>
                <Text style={this.state.footerVisibility}></Text>
            </Container>
        );
    }
}

const Container = styled.View`
    padding-top: 15px;
`;

const styles = StyleSheet.create({
    visibleText: {},
    hiddenText: {
        display: 'none',
    },
});
