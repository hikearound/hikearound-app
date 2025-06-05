import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { opacities } from '@constants/Index';
import { ItemContainer, ItemText, BorderView } from '@styles/Settings';

const propTypes = {
    item: PropTypes.object.isRequired,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
    onPress: PropTypes.func,
    children: PropTypes.node,
    textColor: PropTypes.string,
};

const defaultProps = {
    isFirst: false,
    isLast: false,
    onPress: null,
    children: null,
    textColor: null,
};

class BaseSettingsItem extends React.PureComponent {
    render() {
        const { item, isFirst, isLast, onPress, children, textColor } =
            this.props;

        const content = (
            <>
                <ItemText key={item.key} textColor={textColor}>
                    {item.name}
                </ItemText>
                {children}
            </>
        );

        return (
            <ItemContainer isFirst={isFirst} isLast={isLast}>
                {onPress ? (
                    <TouchableOpacity
                        activeOpacity={opacities.regular}
                        onPress={onPress}
                    >
                        {content}
                    </TouchableOpacity>
                ) : (
                    content
                )}
                {!isLast && <BorderView />}
            </ItemContainer>
        );
    }
}

BaseSettingsItem.propTypes = propTypes;
BaseSettingsItem.defaultProps = defaultProps;

export default BaseSettingsItem;
