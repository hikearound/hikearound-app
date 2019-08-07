import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../constants/Index';

const Settings = ({ navigation }) => (
    <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => {
            navigation.push('Settings');
        }}
        style={{
            marginRight: parseInt(spacing.tiny, 10),
            marginTop: 6,
        }}
    >
        <Ionicons
            name='ios-settings'
            size={28}
            color={colors.white}
        />
    </TouchableOpacity>
);

export default Settings;
