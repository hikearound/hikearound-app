import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { opacities, settingsItems } from '../../constants/Index';
import { ItemContainer, ItemText } from '../../styles/Settings';
import { logoutUser } from '../../utils/User';
import { withNavigation } from '../../utils/Navigation';

const propTypes = {
    item: PropTypes.object.isRequired,
};

class ActionItem extends React.Component {
    itemPress = async () => {
        const { item, navigation } = this.props;

        // console.log(item)
        if (item.type === settingsItems.logout) {
            logoutUser(navigation);
        }
    };

    render() {
        const { item } = this.props;

        return (
            <ItemContainer>
                <TouchableOpacity
                    activeOpacity={opacities.regular}
                    onPress={this.itemPress}
                >
                    <ItemText key={item.key}>{item.name}</ItemText>
                </TouchableOpacity>
            </ItemContainer>
        );
    }
}

ActionItem.propTypes = propTypes;

export default withNavigation(ActionItem);
