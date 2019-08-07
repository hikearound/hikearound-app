import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing } from '../../constants/Index';

const Sort = () => (
    <TouchableOpacity
        activeOpacity={0.4}
        style={{
            marginRight: parseInt(spacing.tiny, 10),
            marginBottom: 2,
        }}
    >
        <MaterialIcons
            name='sort'
            size={30}
            color={colors.white}
        />
    </TouchableOpacity>
);

export default Sort;
