import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { opacities, settingsItems } from '../../constants/Index';
import { ItemContainer, ItemText } from '../../styles/Settings';
import { logoutUser } from '../../utils/User';

const propTypes = {
    item: PropTypes.object.isRequired,
};

class ActionItem extends React.Component {
    itemPress = async () => {
        const { item } = this.props;

        if (item.type === settingsItems.logout) {
            logoutUser();
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

ActionItem.propTypes = propTypes;

export default ActionItem;
