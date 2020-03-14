import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, opacities } from '../../constants/Index';

const propTypes = {
    onPress: PropTypes.func.isRequired,
};

const Sort = ({ onPress }) => (
    <TouchableOpacity
        activeOpacity={opacities.regular}
        style={{
            marginRight: parseInt(spacing.tiny, 10),
            marginBottom: 2,
        }}
        onPress={onPress}
    >
        <MaterialIcons name='sort' size={30} color={colors.white} />
    </TouchableOpacity>
);

Sort.propTypes = propTypes;

export default Sort;
