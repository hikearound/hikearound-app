import React from 'react';
import styled from 'styled-components';
import { View, StyleSheet } from 'react-native';
import { fontWeights, fontSizes, colors } from '../constants/Index';

const FOOTER_STYLE = StyleSheet.create({
    visibleText: {
        display: 'flex',
    },
    hiddenText: {
        display: 'none',
    },
});

export default class FeedFooter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            footerVisibility: FOOTER_STYLE.hiddenText,
        };
    }

    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.setState({
                footerVisibility: FOOTER_STYLE.visibleText,
            });
        }, 500);
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
    background-color: ${colors.gray};
    opacity: 0.8;
    border-radius: 7px;
    height: 7px;
    width: 7px;
    margin: 6px auto -4px;
`;

const Container = styled.View`
    padding: 25px 0;
`;

const Text = styled.Text`
    color: ${colors.gray};
    font-size: ${fontSizes.small}px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
    text-align: center;
`;
