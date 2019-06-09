import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class Settings extends React.Component {
    render() {
        const { ...props } = this.props;
        return (
            <TouchableOpacity
                activeOpacity={0.4}
                onPress={() => {
                    this.props.navigation.push('Settings');
                }}
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

export default Settings;
