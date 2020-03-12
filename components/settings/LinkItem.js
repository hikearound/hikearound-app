import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StatusBar } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { colors, opacities, settingsItems } from '../../constants/Index';
import { ItemContainer, ItemText } from '../../styles/Settings';

const baseUrl = 'https://tryhikearound.com';

const browserSettings = {
    toolbarColor: colors.white,
    enableBarCollapsing: true,
};

const propTypes = {
    item: PropTypes.object.isRequired,
};

class LinkItem extends React.Component {
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
        let itemUrl;

        if (item.type === settingsItems.termsOfService) {
            itemUrl = `${baseUrl}/terms`;
        } else if (item.type === settingsItems.privacyPolicy) {
            itemUrl = `${baseUrl}/privacy`;
        }

        return `${itemUrl}?contentOnly=true`;
    };

    render() {
        const { item } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={this.itemPress}
            >
                <ItemContainer>
                    <ItemText key={item.key}>{item.name}</ItemText>
                </ItemContainer>
            </TouchableOpacity>
        );
    }
}

LinkItem.propTypes = propTypes;

export default LinkItem;
