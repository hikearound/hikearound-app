import React from 'react';
import PropTypes from 'prop-types';
import * as WebBrowser from 'expo-web-browser';
import { settingsItems } from '@constants/Index';
import { baseUrl } from '@constants/Common';
import BaseSettingsItem from './BaseSettingsItem';

const propTypes = {
    item: PropTypes.object.isRequired,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
};

const defaultProps = {
    isFirst: false,
    isLast: false,
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
        const { item, isFirst, isLast } = this.props;
        return (
            <BaseSettingsItem
                item={item}
                isFirst={isFirst}
                isLast={isLast}
                onPress={this.onPress}
            />
        );
    }
}

LinkItem.propTypes = propTypes;
LinkItem.defaultProps = defaultProps;

export default LinkItem;
