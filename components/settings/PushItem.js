import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
    opacities,
    settingsItems,
    colors,
    spacing,
} from '../../constants/Index';
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

        if (item.type === settingsItems.passwordScreen) {
            navigation.push('Password');
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
                    <MaterialIcons
                        name='arrow-forward-ios'
                        size={20}
                        color={colors.gray}
                        style={{
                            right: parseInt(spacing.tiny, 10),
                            top: 11,
                            position: 'absolute',
                        }}
                    />
                </TouchableOpacity>
            </ItemContainer>
        );
    }
}

PushItem.propTypes = propTypes;

export default PushItem;
