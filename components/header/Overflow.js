import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/Index';

const Overflow = ({ navigation }) => (
    <TouchableOpacity
        activeOpacity={0.4}
        style={{
            marginRight: 12,
        }}
        onPress={navigation.getParam('showActionSheet')}
    >
        <Ionicons
            name='ios-more'
            size={32}
            color={colors.white}
        />
    </TouchableOpacity>
);

export default Overflow;
