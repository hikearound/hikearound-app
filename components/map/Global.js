import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { updateMapData } from '../../actions/Map';
import GlobalMarker from '../marker/Global';
import ClusterMarker from '../marker/Cluster';
import { withTheme } from '../../utils/Themes';
import { deltaMiles } from '../../constants/Location';
import { defaultProps } from '../../constants/states/GlobalMap';
import { filterMarkers, getMapMarkers } from '../../utils/Map';

const propTypes = {
    dispatchMapData: PropTypes.func.isRequired,
    delta: PropTypes.number,
    position: PropTypes.object.isRequired,
    markers: PropTypes.array.isRequired,
    showHikeSheet: PropTypes.func.isRequired,
    selectedCity: PropTypes.object,
    latModifier: PropTypes.number,
    altitude: PropTypes.object,
    animationConfig: PropTypes.object,
    mapPadding: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        selectedCity: state.mapReducer.selectedCity,
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
        };

        this.mapRef = React.createRef();
    }

    componentDidMount() {
        const { delta, position } = this.props;
        this.setRegion(delta, position);
    }

    async componentDidUpdate(prevProps, prevState) {
        const { selectedCity, markers } = this.props;
        const { region } = this.state;

        if (prevProps.selectedCity !== selectedCity && selectedCity) {
            this.animateToCity(selectedCity);
        }

        if (prevProps.markers !== markers) {
            this.setInitialMarkers();
        }

        if (prevState.region !== region) {
            await this.maybeAddMarkers();
        }
    }

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
        const { animationConfig } = this.props;

        this.mapRef.current.animateCamera(camera, {
            duration: animationConfig.duration,
        });
    };

    markerPress = (event) => {
        const {
            dispatchMapData,
            altitude,
            showHikeSheet,
            latModifier,
            animationConfig,
        } = this.props;
        const { coordinate, id } = event.nativeEvent;

        dispatchMapData({ selectedHike: id, selectedCity: null });
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
        Keyboard.dismiss();
    };

    renderMarker = (marker, index) => {
        const key = index + marker.geometry.coordinates[0];
        const coordinate = {
            latitude: marker.geometry.coordinates[1],
            longitude: marker.geometry.coordinates[0],
        };

        if (marker.properties) {
            return (
                <Marker
                    key={key}
                    coordinate={coordinate}
                    tracksViewChanges={false}
                >
                    <ClusterMarker count={marker.properties.point_count} />
                </Marker>
            );
        }

        return (
            <Marker
                key={key}
                identifier={marker.id}
                coordinate={coordinate}
                onPress={this.markerPress}
                tracksViewChanges={false}
            >
                <GlobalMarker distance={marker.distance} />
            </Marker>
        );
    };

    render() {
        const { theme, mapPadding } = this.props;
        const { region, visibleMarkers } = this.state;

        if (region) {
            const filteredMarkers = filterMarkers(region, visibleMarkers);

            return (
                <MapView
                    ref={this.mapRef}
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
                            this.renderMarker(marker, index),
                        )}
                </MapView>
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