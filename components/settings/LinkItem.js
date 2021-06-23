import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { opacities, settingsItems } from '@constants/Index';
import { ItemContainer, ItemText } from '@styles/Settings';
import { baseUrl } from '@constants/Common';

const propTypes = {
    item: PropTypes.object.isRequired,
};

class LinkItem extends React.Component {
    onPress = async () => {
        const { item } = this.props;
        WebBrowser.openBrowserAsync(this.buildUrl(item));
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
            <ItemContainer>
                <TouchableOpacity
                    activeOpacity={opacities.regular}
                    onPress={this.onPress}
                >
                    <ItemText key={item.key}>{item.name}</ItemText>
                </TouchableOpacity>
            </ItemContainer>
        );
    }
}

LinkItem.propTypes = propTypes;

export default LinkItem;
