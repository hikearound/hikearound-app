import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { opacities } from '../../constants/Index';
import { ItemContainer, ItemText } from './Item';

const propTypes = {
    item: PropTypes.string.isRequired,
};

class PushItem extends React.Component {
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

PushItem.propTypes = propTypes;

export default PushItem;
