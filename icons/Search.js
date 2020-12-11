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
    name: 'ios-search',
    size: 20,
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
