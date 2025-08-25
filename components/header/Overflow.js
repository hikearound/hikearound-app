import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, opacities } from '@constants/Index';

const propTypes = {
    onPress: PropTypes.func.isRequired,
};

const Overflow = ({ onPress }) => (
    <TouchableOpacity
        activeOpacity={opacities.regular}
        style={{
            marginRight: 12,
        }}
        onPress={onPress}
    >
        <Ionicons
            name='ios-ellipsis-horizontal'
            size={26}
            color={colors.white}
        />
    </TouchableOpacity>
);

Overflow.propTypes = propTypes;

export default Overflow;
