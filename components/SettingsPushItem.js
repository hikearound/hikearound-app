import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { opacities } from '../constants/Index';
import { ItemContainer, ItemText } from './SettingsItem';

const propTypes = {
    item: PropTypes.string.isRequired,
};

class SettingsPushItem extends React.Component {
    itemPress = async () => {
        const { item, navigation } = this.props;

        if (item === 'Email & Push Notifications') {
            navigation.push('NotificationSettings');
        }
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

SettingsPushItem.propTypes = propTypes;

export default SettingsPushItem;
