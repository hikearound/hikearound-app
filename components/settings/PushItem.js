import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { opacities, settingsItems } from '../../constants/Index';
import { ItemContainer, ItemText } from '../../styles/Settings';

const propTypes = {
    item: PropTypes.object.isRequired,
};

class PushItem extends React.Component {
    itemPress = async () => {
        const { navigation, item } = this.props;

        if (item.type === settingsItems.notificationScreen) {
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
                    <ItemText key={item.key}>{item.name}</ItemText>
                </ItemContainer>
            </TouchableOpacity>
        );
    }
}

PushItem.propTypes = propTypes;

export default PushItem;
