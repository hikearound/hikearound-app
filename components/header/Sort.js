import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

class Sort extends React.Component {
    render() {
        const { ...props } = this.props;
        return (
            <TouchableOpacity
                activeOpacity={0.4}
                style={{
                    marginRight: 10,
                    marginBottom: 2,
                }}>
                <MaterialIcons
                    name='sort'
                    size={30}
                    color='#FFF'
                />
            </TouchableOpacity>
        );
    }
}

export default Sort;
