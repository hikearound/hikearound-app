import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { colors, spacing, fontSizes, opacities } from '../constants/Index';

const browserSettings = {
    toolbarColor: colors.purple,
    controlsColor: colors.white,
    enableBarCollapsing: false,
};

const propTypes = {
    item: PropTypes.string.isRequired,
};

class SettingsLinkItem extends React.PureComponent {
    itemPress = async () => {
        const { item } = this.props;
        const baseUrl = 'https://tryhikearound.com';
        let itemUrl = `${baseUrl}/privacy`;

        if (item === 'Terms of service') {
            itemUrl = `${baseUrl}/terms`;
        }

        WebBrowser.openBrowserAsync(itemUrl, browserSettings);
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
