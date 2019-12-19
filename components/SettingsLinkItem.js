import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StatusBar } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { colors, opacities } from '../constants/Index';
import { ItemContainer, ItemText } from './SettingsItem';

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
            browserResult: {
                type: null,
            },
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
        const itemUrl = this.buildUrl(item);
        const browserResult = await WebBrowser.openBrowserAsync(
            itemUrl,
            browserSettings,
        );
        this.setState({ browserResult });
    };

    buildUrl = (item) => {
        const baseUrl = 'https://tryhikearound.com';
        let itemUrl = `${baseUrl}/privacy`;

        if (item === 'Terms of Service') {
            itemUrl = `${baseUrl}/terms`;
        }
        itemUrl = `${itemUrl}?contentOnly=true`;

        return itemUrl;
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
