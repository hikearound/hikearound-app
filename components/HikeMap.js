import React from 'react';
import {
    StyleSheet,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
    colors,
    borderRadius,
} from '../constants/Index';

class HikeMap extends React.Component {
    render() {
        const {
            coordinates,
            mapRef,
        } = this.props;

        return (
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                mapType='terrain'
                showsUserLocation
                showsMyLocationButton={false}
                showsPointsOfInterest={false}
                showsCompass={false}
            >
                <MapView.Polyline
                    coordinates={coordinates}
                    strokeColor={colors.purple}
                    strokeWidth={4}
                />
            </MapView>
        );
    }
}

export default HikeMap;

const styles = StyleSheet.create({
    map: {
        height: 200,
        zIndex: 1,
        overflow: 'hidden',
        borderRadius: parseInt(borderRadius.medium, 10),
    },
});
