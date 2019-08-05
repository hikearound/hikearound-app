import React from 'react';
import { TouchableOpacity } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialIcons } from '@expo/vector-icons';

const Sort = () => (
    <TouchableOpacity
        activeOpacity={0.4}
        style={{
            marginRight: 10,
            marginBottom: 2,
        }}
    >
        <MaterialIcons
            name='sort'
            size={30}
            color='#FFF'
        />
    </TouchableOpacity>
);

export default Sort;
