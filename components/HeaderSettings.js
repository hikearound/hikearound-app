import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class HeaderOverflow extends React.Component {
    render() {
        const { ...props } = this.props;
        return (
            <TouchableOpacity
                activeOpacity={0.4}
                style={{
                    marginRight: 15,
                    marginTop: 6,
                }}>
                <Ionicons
                    name='ios-settings'
                    size={28}
                    color='#FFF'
                />
            </TouchableOpacity>
        );
    }
}

export default HeaderOverflow;
