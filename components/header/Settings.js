import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, opacities } from '../../constants/Index';

const Settings = ({ navigation }) => (
    <TouchableOpacity
        activeOpacity={opacities.regular}
        onPress={() => {
            navigation.push('Settings');
        }}
        style={{
            marginRight: parseInt(spacing.tiny, 10),
        }}
    >
        <Ionicons name='ios-settings' size={28} color={colors.white} />
    </TouchableOpacity>
);

export default Settings;
