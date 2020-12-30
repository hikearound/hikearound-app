import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { opacities } from '../../constants/Index';
import { withTheme } from '../../utils/Themes';

const propTypes = {
    onPress: PropTypes.func,
    iconSize: PropTypes.number,
};

const defaultProps = {
    onPress: () => {},
    iconSize: 25,
};

const Overflow = ({ onPress, iconSize, theme }) => {
    return (
        <TouchableOpacity
            activeOpacity={opacities.regular}
            style={{
                position: 'absolute',
                right: 0,
                bottom: -1,
            }}
            onPress={onPress}
        >
            <Ionicons
                name='ios-ellipsis-horizontal'
                size={iconSize}
                color={theme.colors.overflowFill}
            />
        </TouchableOpacity>
    );
};

Overflow.propTypes = propTypes;
Overflow.defaultProps = defaultProps;

export default withTheme(Overflow);
