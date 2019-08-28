import React from 'react';
import {
    StyleSheet, LayoutAnimation,
} from 'react-native';
import styled from 'styled-components';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
    colors,
    borderRadius,
} from '../constants/Index';

const MAP_HEIGHT = 200;

class HikeMap extends React.Component {
    render() {
        const {
            coordinates,
            mapRef,
            region,
        } = this.props;

        LayoutAnimation.easeInEaseOut();

        if (region) {
            return (
                <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    mapType='terrain'
                    showsUserLocation
                    loadingEnabled
                    initialRegion={region}
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
        return (
            <EmptyMapView />
        );
    }
}

export default HikeMap;

const styles = StyleSheet.create({
    map: {
        height: MAP_HEIGHT,
        zIndex: 1,
        overflow: 'hidden',
        borderRadius: parseInt(borderRadius.medium, 10),
    },
});

const EmptyMapView = styled.View`
    border-color: ${colors.mediumGray};
    height: ${MAP_HEIGHT}px;
`;
