import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, opacities } from '../../constants/Index';

const Settings = ({ navigation }) => (
    <TouchableOpacity
        activeOpacity={opacities.regular}
        onPress={() => {
            navigation.push('Settings');
        }}
        style={{
            marginRight: 8,
            marginTop: -1,
        }}
    >
        <Ionicons name='ios-settings-sharp' size={24} color={colors.white} />
    </TouchableOpacity>
);

export default Settings;
