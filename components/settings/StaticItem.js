import React from 'react';
import PropTypes from 'prop-types';
import { ItemContainer, ItemText } from '@styles/Settings';

const propTypes = {
    item: PropTypes.object.isRequired,
};

class StaticItem extends React.PureComponent {
    render() {
        const { item } = this.props;
        return (
            <ItemContainer>
                <ItemText key={item.key}>{item.name}</ItemText>
            </ItemContainer>
        );
    }
}

StaticItem.propTypes = propTypes;

export default StaticItem;
