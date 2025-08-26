import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { connect } from 'react-redux';
import { updateMapData } from '@actions/Map';
import { getHikeRoute } from '@utils/Hike';
import GlobalMarker from '@components/marker/Global';
import ClusterMarker from '@components/marker/Cluster';
import { withTheme } from '@utils/Themes';
import { deltaMiles } from '@constants/Location';
import { defaultProps } from '@constants/states/GlobalMap';
import {
    filterMarkers,
    getMapMarkers,
    getClusterZoomAltitude,
} from '@utils/Map';
import { regions } from '@constants/Regions';

const propTypes = {
    dispatchMapData: PropTypes.func.isRequired,
    delta: PropTypes.number,
    mapRef: PropTypes.object,
    position: PropTypes.object.isRequired,
    markers: PropTypes.array,
    showHikeSheet: PropTypes.func,
    selectedCity: PropTypes.object,
    selectedRoute: PropTypes.string,
    routeCoordinates: PropTypes.array,
    latModifier: PropTypes.number,
    altitude: PropTypes.object,
    animationConfig: PropTypes.object,
    mapPadding: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        selectedCity: state.mapReducer.selectedCity,
        selectedRoute: state.mapReducer.selectedRoute,
        routeCoordinates: state.mapReducer.routeCoordinates,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchMapData: (mapData) => dispatch(updateMapData(mapData)),
    };
}

class GlobalMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            region: null,
            visibleMarkers: [],
            maybeUpdateRegion: false,
        };
    }

    componentDidMount() {
        const { delta, position } = this.props;
        this.setRegion(delta, position);
    }

    async componentDidUpdate(prevProps, prevState) {
        const { selectedCity, markers, position } = this.props;
        const { region, maybeUpdateRegion } = this.state;

        if (prevProps.selectedCity !== selectedCity && selectedCity) {
            this.animateToCity(selectedCity);
        }

        if (prevProps.position !== position && maybeUpdateRegion) {
            this.updateRegion();
        }

        if (prevProps.markers !== markers) {
            // Force immediate marker update
            this.setState({ visibleMarkers: markers }, () => {
                // Force a re-render of markers
                this.forceUpdate();
            });
        }

        if (prevState.region !== region) {
            await this.maybeAddMarkers();
        }
    }

    updateRegion = () => {
        const { altitude, animationConfig, delta, position } = this.props;
        const { latitude, longitude } = position.coords;

        this.animateToPoint({
            pitch: animationConfig.pitch,
            heading: animationConfig.heading,
            center: {
                latitude,
                longitude,
            },
            altitude: altitude.city,
        });

        this.setState({
            region: {
                latitude,
                latitudeDelta: delta,
                longitude,
                longitudeDelta: delta,
            },
            maybeUpdateRegion: false,
        });
    };

    animateToCity = (selectedCity) => {
        const { altitude, animationConfig, delta } = this.props;
        const { lat, lng } = selectedCity.geometry.location;

        this.animateToPoint({
            pitch: animationConfig.pitch,
            heading: animationConfig.heading,
            center: {
                latitude: lat,
                longitude: lng,
            },
            altitude: altitude.city,
        });

        this.setState({
            region: {
                latitude: lat,
                latitudeDelta: delta,
                longitude: lng,
                longitudeDelta: delta,
            },
        });
    };

    setInitialMarkers = () => {
        const { markers } = this.props;
        this.setState({ visibleMarkers: markers });
    };

    maybeAddMarkers = async () => {
        const { region, visibleMarkers } = this.state;

        const position = {
            coords: {
                latitude: region.latitude,
                longitude: region.longitude,
            },
        };

        const distance = deltaMiles.lat * region.latitudeDelta;
        const markers = await getMapMarkers(position, distance);
        const markerIds = new Set(visibleMarkers.map((marker) => marker.id));

        this.setState({
            visibleMarkers: [
                ...visibleMarkers,
                ...markers.filter((marker) => !markerIds.has(marker.id)),
            ],
        });
    };

    setRegion = (delta, position) => {
        if (Object.keys(position).length === 0) {
            this.setState({
                region: regions.sanFrancisco,
                maybeUpdateRegion: true,
            });
        }

        if ('coords' in position) {
            this.setState({
                region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: delta,
                    longitudeDelta: delta,
                },
            });
        }
    };

    animateToPoint = (camera) => {
        const { animationConfig, mapRef } = this.props;

        mapRef.current.animateCamera(camera, {
            duration: animationConfig.duration,
        });
    };

    markerPress = async (event) => {
        const {
            dispatchMapData,
            altitude,
            showHikeSheet,
            latModifier,
            animationConfig,
        } = this.props;
        const { coordinate, id } = event.nativeEvent;

        // Load hike route
        const routeCoordinates = await getHikeRoute(id);

        dispatchMapData({ 
            selectedHike: id, 
            selectedCity: null,
            selectedRoute: id,
            routeCoordinates,
        });
        showHikeSheet();

        this.animateToPoint({
            pitch: animationConfig.pitch,
            heading: animationConfig.heading,
            center: {
                latitude: coordinate.latitude - latModifier,
                longitude: coordinate.longitude,
            },
            altitude: altitude.hike,
        });
    };

    onRegionChange = (newRegion) => {
        const { region } = this.state;

        if (newRegion !== region) {
            this.setState({ region: newRegion });
        }
    };

    onRegionChangeComplete = (region) => {
        this.setState({ region });
    };

    onPress = () => {
        const { dispatchMapData } = this.props;
        
        Keyboard.dismiss();
        
        // Clear selected route when clicking away from markers
        dispatchMapData({
            selectedRoute: null,
            routeCoordinates: [],
        });
    };

    renderMarker = (marker, cluster, index) => {
        const { animationConfig, mapRef } = this.props;

        const key = index + marker.geometry.coordinates[0];
        const coordinate = {
            latitude: marker.geometry.coordinates[1],
            longitude: marker.geometry.coordinates[0],
        };

        if (marker.properties) {
            const altitude = getClusterZoomAltitude(
                cluster,
                marker.properties.cluster_id,
            );

            return (
                <ClusterMarker
                    key={key}
                    count={marker.properties.point_count}
                    altitude={altitude}
                    coordinate={coordinate}
                    animationConfig={animationConfig}
                    mapRef={mapRef}
                />
            );
        }

        return (
            <Marker
                key={key}
                identifier={marker.id}
                coordinate={coordinate}
                onPress={this.markerPress}
                tracksViewChanges={false}
                zIndex={1}
            >
                <GlobalMarker distance={marker.distance} />
            </Marker>
        );
    };

    render() {
        const { theme, mapPadding, mapRef, routeCoordinates } = this.props;
        const { region, visibleMarkers } = this.state;

        if (region) {
            const filteredMarkers = filterMarkers(region, visibleMarkers);

            return (
                <>
                    <MapView
                        ref={mapRef}
                        style={{ height: '100%', zIndex: -1 }}
                        initialRegion={region}
                        showsUserLocation
                        showsMyLocationButton
                        showsScale
                        showsPointsOfInterest={false}
                        showsCompass={false}
                        onRegionChange={this.onRegionChange}
                        onRegionChangeComplete={this.onRegionChangeComplete}
                        loadingBackgroundColor={theme.colors.mapViewBackground}
                        onPress={this.onPress}
                        mapPadding={mapPadding}
                    >
                        {filteredMarkers &&
                            filteredMarkers.markers.map((marker, index) =>
                                this.renderMarker(
                                    marker,
                                    filteredMarkers.cluster,
                                    index,
                                ),
                            )}
                        {routeCoordinates && routeCoordinates.length > 0 && (
                            <Polyline
                                coordinates={routeCoordinates}
                                strokeColor="#8A2BE2"
                                strokeWidth={3}
                                strokePattern={[]}
                            />
                        )}
                    </MapView>
                </>
            );
        }

        return null;
    }
}

GlobalMap.propTypes = propTypes;
GlobalMap.defaultProps = defaultProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withTheme(GlobalMap));
