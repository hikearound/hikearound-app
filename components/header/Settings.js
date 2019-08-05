import React from 'react';
import { TouchableOpacity } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';

const Settings = ({ navigation }) => (
    <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => {
            navigation.push('Settings');
        }}
        style={{
            marginRight: 10,
            marginTop: 6,
        }}
    >
        <Ionicons
            name='ios-settings'
            size={28}
            color='#FFF'
        />
    </TouchableOpacity>
);

export default Settings;
