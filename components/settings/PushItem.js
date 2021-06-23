import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { opacities, settingsItems, colors, spacing } from '@constants/Index';
import { ItemContainer, ItemText } from '@styles/Settings';
import { getSignInMethods } from '@utils/Auth';
import { auth } from '@lib/Fire';

const propTypes = {
    item: PropTypes.object.isRequired,
};

class PushItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: false,
        };
    }

    componentDidMount = async () => {
        this.maybeDisableInputs();
    };

    maybeDisableInputs = async () => {
        const user = auth.currentUser;
        const providers = await getSignInMethods(user.email);

        if (!providers.includes('password')) {
            await this.setState({ disabled: true });
        }
    };

    itemPress = async () => {
        const { navigation, item } = this.props;
        const { disabled } = this.state;

        if (item.type === settingsItems.notificationScreen) {
            navigation.push('NotificationSettings');
        }

        if (item.type === settingsItems.passwordScreen) {
            navigation.push('Password', { disabled });
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
