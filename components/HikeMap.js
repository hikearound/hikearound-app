import React from 'react';
import { LayoutAnimation } from 'react-native';
import styled from 'styled-components';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
    colors,
    borderRadius,
} from '../constants/Index';

const DEFAULT_MAP_HEIGHT = 200;

class HikeMap extends React.Component {
    render() {
        const {
            coordinates,
            mapRef,
            region,
            mapHeight,
        } = this.props;

        LayoutAnimation.easeInEaseOut();

        if (region) {
            return (
                <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    style={{
                        height: mapHeight,
                        zIndex: 1,
                        overflow: 'hidden',
                        borderRadius: parseInt(borderRadius.medium, 10),
                    }}
                    mapType='terrain'
                    showsUserLocation
                    loadingEnabled
                    initialRegion={region}
                    showsMyLocationButton={false}
                    showsPointsOfInterest={false}
                    showsCompass={false}
                    maxZoomLevel={12.5}
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

HikeMap.defaultProps = {
    maxZoom: 20,
    mapHeight: DEFAULT_MAP_HEIGHT,
};

const EmptyMapView = styled.View`
    border-color: ${colors.mediumGray};
    height: ${(props) => (props.fullHeight ? '100%' : `${DEFAULT_MAP_HEIGHT}px`)};
`;
