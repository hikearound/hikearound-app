import React from 'react';
import PropTypes from 'prop-types';
import { ItemContainer, ItemText } from './Item';

const propTypes = {
    item: PropTypes.string.isRequired,
};

class SettingsItem extends React.PureComponent {
    render() {
        const { item } = this.props;
        return (
            <ItemContainer>
                <ItemText key={item.key}>{item}</ItemText>
            </ItemContainer>
        );
    }
}

SettingsItem.propTypes = propTypes;

export default SettingsItem;
