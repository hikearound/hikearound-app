import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

const propTypes = {
    count: PropTypes.number,
};

const defaultProps = {
    count: 0,
};

const Style = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    bubble: {
        flex: 0,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#ffbbbb',
        padding: 4,
        borderRadius: 4,
        borderColor: '#ffbbbb',
        borderWidth: 1,
    },
    count: {
        color: '#fff',
        fontSize: 13,
    },
});

class ClusterMarker extends React.PureComponent {
    render() {
        const { count } = this.props;

        return (
            <View style={Style.container}>
                <View style={Style.bubble}>
                    <Text style={Style.count}>{count}</Text>
                </View>
            </View>
        );
    }
}

ClusterMarker.propTypes = propTypes;
ClusterMarker.defaultProps = defaultProps;

export default ClusterMarker;
