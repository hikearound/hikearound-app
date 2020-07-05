import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { colors } from '../constants/Index';

const propTypes = {
    type: PropTypes.string,
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

const defaultProps = {
    type: 'browser',
};

class TextLink extends React.PureComponent {
    handlePress = () => {
        const { type, url } = this.props;

        if (type === 'browser') {
            this.handleOpenWithWebBrowser(url);
        } else {
            this.handleOpenWithLinking(url);
        }
    };

    handleOpenWithLinking = (url) => {
        Linking.openURL(url);
    };

    handleOpenWithWebBrowser = (url) => {
        WebBrowser.openBrowserAsync(url);
    };

    render() {
        const { text } = this.props;
        return <Text onPress={this.handlePress}>{text}</Text>;
    }
}

TextLink.propTypes = propTypes;
TextLink.defaultProps = defaultProps;

export default TextLink;

const Text = styled.Text`
    color: ${colors.purple};
`;
