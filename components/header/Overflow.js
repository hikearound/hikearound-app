import React from 'react';
import { TouchableOpacity } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';

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
            color='#FFF'
        />
    </TouchableOpacity>
);

export default Overflow;
