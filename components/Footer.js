import React from 'react';
import styled from 'styled-components';
import { Text, StyleSheet } from 'react-native';

export default class Footer extends React.Component {
    state = {
        showFooter: styles.hiddenText,
    };

    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.setState({
                showFooter: styles.visibleText,
            });
        }, 5000);
        this.timeout;
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        const { ...props } = this.props;
        return (
            <Container>
                <Text style={this.state.showFooter}>Test</Text>
            </Container>
        );
    }
}

const Container = styled.View`
    padding-top: 15px;
`;

const styles = StyleSheet.create({
    visibleText: {
        display: 'flex',
    },
    hiddenText: {
        display: 'none',
    },
});
