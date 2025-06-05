import React from 'react';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import { settingsItems, colors } from '@constants/Index';
import { getSignInMethods } from '@utils/Auth';
import { auth } from '@lib/Fire';
import BaseSettingsItem from './BaseSettingsItem';

const propTypes = {
    item: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
};

const defaultProps = {
    isFirst: false,
    isLast: false,
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

        if (item.type === settingsItems.componentLibrary) {
            navigation.push('ComponentLibrary');
        }
    };

    render() {
        const { item, isFirst, isLast } = this.props;

        return (
            <BaseSettingsItem
                item={item}
                isFirst={isFirst}
                isLast={isLast}
                onPress={this.itemPress}
            >
                <MaterialIcons
                    name='arrow-forward-ios'
                    size={16}
                    color={colors.gray}
                    style={{
                        right: -5,
                        top: 15,
                        position: 'absolute',
                    }}
                />
            </BaseSettingsItem>
        );
    }
}

PushItem.propTypes = propTypes;
PushItem.defaultProps = defaultProps;

export default PushItem;
