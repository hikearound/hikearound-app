import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { updateMapData } from '../../actions/Map';
import GlobalMarker from '../marker/Global';
import { withTheme } from '../../utils/Themes';
import { colors } from '../../constants/Index';
import { deltaMiles } from '../../constants/Location';
import { pageFeed } from '../../utils/Feed';

const propTypes = {
    dispatchMapData: PropTypes.func.isRequired,
    delta: PropTypes.number,
    position: PropTypes.object.isRequired,
    duration: PropTypes.number,
    markers: PropTypes.array.isRequired,
    latModifier: PropTypes.number,
    hikeAlt: PropTypes.number,
    cityAlt: PropTypes.number,
    showHikeSheet: PropTypes.func.isRequired,
    selectedCity: PropTypes.object,
    pageSize: PropTypes.number.isRequired,
    sortDirection: PropTypes.string.isRequired,
    radius: PropTypes.number,
};

const defaultProps = {
    delta: 0.5,
    duration: 1000,
    latModifier: 0.018,
    hikeAlt: 20000,
    cityAlt: 160000,
    selectedCity: null,
    radius: 22,
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
            tracksViewChanges: false,
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

        if (prevProps.selectedCity !== selectedCity) {
            if (selectedCity) {
                this.animateToCity(selectedCity);
            }
        }

        if (prevProps.markers !== markers) {
            this.setInitialMarkers();
        }

        if (prevState.region !== region) {
            await this.maybeAddMarkers();
        }
    }

    animateToCity = (selectedCity) => {
        const { cityAlt } = this.props;
        const { lat, lng } = selectedCity.geometry.location;

        this.animateToPoint({
            center: {
                latitude: lat,
                longitude: lng,
            },
            altitude: cityAlt,
        });
    };

    setInitialMarkers = () => {
        const { markers } = this.props;
        this.setState({ visibleMarkers: markers });
    };

    maybeAddMarkers = async () => {
        const { pageSize, sortDirection } = this.props;
        const { region, visibleMarkers } = this.state;

        const position = {
            coords: {
                latitude: region.latitude,
                longitude: region.longitude,
            },
        };

        const { data } = await pageFeed(
            pageSize,
            null,
            position,
            sortDirection,
            deltaMiles.lat * region.latitudeDelta,
        );

        const markerIds = new Set(visibleMarkers.map((marker) => marker.id));

        this.setState({
            visibleMarkers: [
                ...visibleMarkers,
                ...data.filter((marker) => !markerIds.has(marker.id)),
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
        const { duration } = this.props;
        this.mapRef.current.animateCamera(camera, { duration });
    };

    markerPress = (event) => {
        const {
            dispatchMapData,
            latModifier,
            hikeAlt,
            showHikeSheet,
        } = this.props;
        const { coordinate, id } = event.nativeEvent;

        dispatchMapData({ selectedHike: id, selectedCity: null });
        showHikeSheet();

        this.animateToPoint({
            center: {
                latitude: coordinate.latitude - latModifier,
                longitude: coordinate.longitude,
            },
            altitude: hikeAlt,
        });
    };

    onRegionChange = () => {
        this.setState({ tracksViewChanges: true });
    };

    onRegionChangeComplete = (region) => {
        this.setState({ tracksViewChanges: false, region });
    };

    onPress = () => {
        Keyboard.dismiss();
    };

    assignRef = (ref, index) => {
        this[`marker${index}`] = ref;
    };

    render() {
        const { theme, radius } = this.props;
        const { region, tracksViewChanges, visibleMarkers } = this.state;

        if (region) {
            return (
                <MapView
                    ref={this.mapRef}
                    style={{ height: '100%', zIndex: -1 }}
                    initialRegion={region}
                    showsUserLocation
                    showsMyLocationButton={false}
                    showsPointsOfInterest={false}
                    showsCompass
                    onRegionChange={this.onRegionChange}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                    loadingIndicatorColor={theme.colors.loadingSpinner}
                    loadingBackgroundColor={theme.colors.mapViewBackground}
                    clusterColor={colors.purple}
                    radius={radius}
                    animationEnabled={false}
                    onPress={this.onPress}
                >
                    {visibleMarkers.map(
                        ({ id, coordinates, distance }, index) => (
                            <GlobalMarker
                                key={id}
                                identifier={id}
                                distance={distance}
                                markerRef={(ref) => this.assignRef(ref, index)}
                                coordinate={{
                                    latitude: coordinates.center.lat,
                                    longitude: coordinates.center.lng,
                                }}
                                onPress={this.markerPress}
                                tracksViewChanges={tracksViewChanges}
                            />
                        ),
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
