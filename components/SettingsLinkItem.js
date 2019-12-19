import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity, StatusBar } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { colors, spacing, fontSizes, opacities } from '../constants/Index';

const browserSettings = {
    toolbarColor: colors.white,
    controlsColor: colors.black,
    enableBarCollapsing: true,
};

const propTypes = {
    item: PropTypes.string.isRequired,
};

class SettingsLinkItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            browserResult: null,
        };
    }

    componentDidUpdate() {
        const { browserResult } = this.state;

        if (browserResult.type === 'cancel') {
            StatusBar.setBarStyle('light-content', true);
        }
    }

    itemPress = async () => {
        const { item } = this.props;
        const baseUrl = 'https://tryhikearound.com';
        let itemUrl = `${baseUrl}/privacy`;

        if (item === 'Terms of service') {
            itemUrl = `${baseUrl}/terms`;
        }

        const browserResult = await WebBrowser.openBrowserAsync(
            itemUrl,
            browserSettings,
        );

        this.setState({ browserResult });
    };

    render() {
        const { item } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={this.itemPress}
            >
                <ItemContainer>
                    <ItemText key={item.key}>{item}</ItemText>
                </ItemContainer>
            </TouchableOpacity>
        );
    }
}

SettingsLinkItem.propTypes = propTypes;

export default SettingsLinkItem;

const ItemContainer = styled.View`
    border-color: ${colors.lightGray};
    border-top-width: 1px;
    padding: ${spacing.small}px 0;
`;

const ItemText = styled.Text`
    color: ${colors.black};
    font-size: ${fontSizes.large}px;
`;
