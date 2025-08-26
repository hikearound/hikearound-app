import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MapView, { PROVIDER_APPLE, Polyline, Marker } from 'react-native-maps';
import { colors, borderRadius } from '@constants/Index';
import { defaultProps } from '@constants/states/HikeMap';
import { withTheme } from '@utils/Themes';
import HikeMarker from '@components/marker/Hike';

const propTypes = {
    coordinates: PropTypes.array,
    region: PropTypes.object,
    maxZoom: PropTypes.number,
    fullHeight: PropTypes.bool,
    mapHeight: PropTypes.number,
    startingCoordinates: PropTypes.object,
    mapPadding: PropTypes.object,
    showUserLocation: PropTypes.bool,
    mapRef: PropTypes.object,
    mapBorderRadius: PropTypes.number,
    mapType: PropTypes.string,
    showsMyLocationButton: PropTypes.bool,
    chartPosition: PropTypes.number,
    isDragging: PropTypes.bool,
};

class HikeMap extends React.Component {
    constructor(props) {
        super(props);
        const { maxZoom, fullHeight } = this.props;

        this.state = {
            maxZoom,
            fullHeight,
            position: {},
        };
    }

    onMapReady = () => {};

    mapPress = (e) => {
        const { position } = e.nativeEvent;
        this.setState({ position });
    };

    getPositionMarkerCoordinate = () => {
        const { coordinates, chartPosition, isDragging } = this.props;
        
        console.log('HikeMap chartPosition:', chartPosition, 'coordinates length:', coordinates?.length, 'isDragging:', isDragging);
        
        if (!coordinates || coordinates.length === 0 || chartPosition === undefined || !isDragging) {
            return null;
        }

        // Calculate the index along the route based on chartPosition (0-1)
        const index = Math.round(chartPosition * (coordinates.length - 1));
        const clampedIndex = Math.max(0, Math.min(coordinates.length - 1, index));
        
        console.log('Calculated coordinate index:', clampedIndex, 'coordinate:', coordinates[clampedIndex]);
        
        return coordinates[clampedIndex];
    };

    render() {
        const {
            coordinates,
            mapBorderRadius,
            startingCoordinates,
            region,
            mapHeight,
            theme,
            mapPadding,
            showUserLocation,
            mapRef,
            mapType,
            showsMyLocationButton,
        } = this.props;
        const { maxZoom, fullHeight, position } = this.state;

        if (region) {
            return (
                <>
                    <MapView
                        ref={mapRef}
                        provider={PROVIDER_APPLE}
                        style={{
                            height: fullHeight ? '100%' : mapHeight,
                            zIndex: 1,
                            overflow: 'hidden',
                            borderRadius: mapBorderRadius,
                        }}
                        showsUserLocation={showUserLocation}
                        initialRegion={region}
                        showsMyLocationButton={showsMyLocationButton}
                        showsPointsOfInterest={false}
                        showsCompass={false}
                        maxZoomLevel={maxZoom}
                        onMapReady={this.onMapReady}
                        loadingIndicatorColor={theme.colors.loadingSpinner}
                        loadingBackgroundColor={theme.colors.mapViewBackground}
                        onPress={this.mapPress}
                        mapPadding={mapPadding}
                        mapType={mapType}
                        showsScale
                    >
                        {startingCoordinates && (
                            <HikeMarker
                                coordinate={{
                                    latitude: startingCoordinates.lat,
                                    longitude: startingCoordinates.lng,
                                }}
                                tracksViewChanges={false}
                                position={position}
                            />
                        )}
                        <Polyline
                            coordinates={coordinates}
                            strokeColor={colors.purple}
                            strokeWidth={2}
                        />
                        {this.getPositionMarkerCoordinate() && (
                            <Marker
                                coordinate={this.getPositionMarkerCoordinate()}
                                anchor={{ x: 0.5, y: 0.5 }}
                            >
                                <PositionMarker />
                            </Marker>
                        )}
                    </MapView>
                </>
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

const PositionMarker = styled.View`
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background-color: #935DFF;
    border: 2px solid white;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.3;
    shadow-radius: 3px;
    elevation: 5;
`;
