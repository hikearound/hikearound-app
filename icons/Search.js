import React from 'react';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/Index';

const propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    size: PropTypes.number,
    fill: PropTypes.string,
};

const defaultProps = {
    style: {
        display: 'flex',
        marginLeft: 8,
        marginTop: 5,
    },
    name: 'md-search',
    size: 22,
    fill: colors.gray,
};

class SearchIcon extends React.PureComponent {
    render() {
        const { style, name, size, fill } = this.props;
        return <Ionicons name={name} size={size} color={fill} style={style} />;
    }
}

SearchIcon.propTypes = propTypes;
SearchIcon.defaultProps = defaultProps;

export default SearchIcon;
