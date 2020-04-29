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
            marginRight: parseInt(spacing.micro, 10),
            marginTop: -1,
        }}
    >
        <Ionicons name='ios-settings' size={26} color={colors.white} />
    </TouchableOpacity>
);

export default Settings;
