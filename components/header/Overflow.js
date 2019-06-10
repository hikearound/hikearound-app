import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class Overflow extends React.Component {
    render() {
        const { ...props } = this.props;
        return (
            <TouchableOpacity
                activeOpacity={0.4}
                style={{
                    marginRight: 12,
                }}
                onPress={this.props.navigation.getParam('showActionSheet')}>
                <Ionicons
                    name='ios-more'
                    size={32}
                    color='#FFF'
                />
            </TouchableOpacity>
        );
    }
}

export default Overflow;
