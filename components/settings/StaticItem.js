import React from 'react';
import PropTypes from 'prop-types';
import BaseSettingsItem from './BaseSettingsItem';

const propTypes = {
    item: PropTypes.object.isRequired,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
};

const defaultProps = {
    isFirst: false,
    isLast: false,
};

class StaticItem extends React.PureComponent {
    render() {
        const { item, isFirst, isLast } = this.props;
        return (
            <BaseSettingsItem item={item} isFirst={isFirst} isLast={isLast} />
        );
    }
}

StaticItem.propTypes = propTypes;
StaticItem.defaultProps = defaultProps;

export default StaticItem;
