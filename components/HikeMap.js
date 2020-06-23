import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MapView from 'react-native-maps';
import { colors, borderRadius } from '../constants/Index';
import { defaultProps } from '../constants/states/HikeMap';
import { withTheme } from '../utils/Themes';
import GenericMapMarker from './GenericMapMarker';

const propTypes = {
    mapRef: PropTypes.func.isRequired,
    coordinates: PropTypes.array,
    region: PropTypes.object,
    maxZoom: PropTypes.number,
    fullHeight: PropTypes.bool,
    mapHeight: PropTypes.number,
    startingCoordinates: PropTypes.object,
};

class HikeMap extends React.Component {
    constructor(props) {
        super(props);
        const { maxZoom, fullHeight } = this.props;
        this.state = { maxZoom, fullHeight };
    }

    onMapReady = () => {};

    render() {
        const {
            coordinates,
            startingCoordinates,
            mapRef,
            region,
            mapHeight,
            theme,
        } = this.props;
        const { maxZoom, fullHeight, markerZoom } = this.state;

        if (region) {
            return (
                <MapView
                    ref={mapRef}
                    provider={null}
                    style={{
                        height: fullHeight ? '100%' : mapHeight,
                        zIndex: 1,
                        overflow: 'hidden',
                        borderRadius: parseInt(borderRadius.medium, 10),
                    }}
                    showsUserLocation
                    initialRegion={region}
                    showsMyLocationButton={false}
                    showsPointsOfInterest={false}
                    showsCompass={false}
                    maxZoomLevel={maxZoom}
                    onMapReady={this.onMapReady}
                    loadingIndicatorColor={theme.colors.loadingSpinner}
                    loadingBackgroundColor={theme.colors.mapViewBackground}
                >
                    {startingCoordinates && (
                        <GenericMapMarker
                            coordinate={{
                                latitude: startingCoordinates.lat,
                                longitude: startingCoordinates.lng,
                            }}
                            tracksViewChanges={false}
                            markerZoom={markerZoom}
                        />
                    )}
                    <MapView.Polyline
                        coordinates={coordinates}
                        strokeColor={colors.purple}
                        strokeWidth={2}
                    />
                </MapView>
            );
        }
        return <EmptyMapView fullHeight={fullHeight} mapHeight={mapHeight} />;
    }
}

HikeMap.propTypes = propTypes;
HikeMap.defaultProps = defaultProps;

export default withTheme(HikeMap);

const EmptyMapView = styled.View`
    border-color: ${colors.grayMedium};
    border-radius: ${borderRadius.medium}px;
    height: ${(props) => (props.fullHeight ? '100%' : `${props.mapHeight}px`)};
    background-color: ${(props) => props.theme.loadingPrimary};
`;
