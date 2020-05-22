import React from 'react';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/Index';

const propTypes = {
    size: PropTypes.number,
    fill: PropTypes.string,
};

const defaultProps = {
    size: 32,
    fill: colors.white,
};

class MapIcon extends React.PureComponent {
    render() {
        const { size, fill } = this.props;
        return <MaterialIcons name='map' size={size} color={fill} />;
    }
}

MapIcon.propTypes = propTypes;
MapIcon.defaultProps = defaultProps;

export default MapIcon;
