import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { updateMapData } from '../actions/Map';
import HikeMapMarker from './HikeMapMarker';
import { withTheme } from '../utils/Themes';

const propTypes = {
    dispatchMapData: PropTypes.func.isRequired,
    delta: PropTypes.number,
    position: PropTypes.object.isRequired,
    duration: PropTypes.number,
    zoom: PropTypes.number,
    hikeData: PropTypes.array.isRequired,
    googleLatModifier: PropTypes.number,
    appleLatModifier: PropTypes.number,
    altitude: PropTypes.number,
    showHikeSheet: PropTypes.func.isRequired,
};

const defaultProps = {
    delta: 0.5,
    duration: 1000,
    zoom: 14,
    googleLatModifier: 0.0015,
    appleLatModifier: 0.0001,
    altitude: 20000,
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchMapData: (mapData) => dispatch(updateMapData(mapData)),
    };
}

class GlobalMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = { region: null, tracksViewChanges: false };
        this.mapRef = React.createRef();
    }

    async componentDidMount() {
        this.setRegion();
    }

    setRegion = () => {
        const { delta, position } = this.props;

        this.setState({
            region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: delta,
                longitudeDelta: delta,
            },
        });
    };

    markerPress = (event) => {
        const {
            duration,
            zoom,
            dispatchMapData,
            googleLatModifier,
            appleLatModifier,
            altitude,
            showHikeSheet,
        } = this.props;
        const { coordinate, id } = event.nativeEvent;

        let latitude = coordinate.latitude + googleLatModifier;
        latitude = coordinate.latitude - appleLatModifier;

        const camera = {
            center: {
                latitude,
                longitude: coordinate.longitude,
            },
            altitude,
            zoom,
        };

        dispatchMapData({ selectedHike: id });
        showHikeSheet();

        this.mapRef.current.animateCamera(camera, { duration });
    };

    onRegionChange = () => {
        this.setState({ tracksViewChanges: true });
    };

    onRegionChangeComplete = (region) => {
        this.setState({ tracksViewChanges: false });
    };

    assignRef = (ref, index) => {
        this[`marker${index}`] = ref;
    };

    render() {
        const { hikeData, theme } = this.props;
        const { region, tracksViewChanges } = this.state;

        if (region) {
            return (
                <MapView
                    ref={this.mapRef}
                    style={{ height: '100%' }}
                    initialRegion={region}
                    showsUserLocation
                    showsMyLocationButton={false}
                    showsPointsOfInterest={false}
                    showsCompass
                    animationEnabled={false}
                    onRegionChange={this.onRegionChange}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                    loadingIndicatorColor={theme.colors.loadingSpinner}
                    loadingBackgroundColor={theme.colors.mapViewBackground}
                >
                    {hikeData.map(({ id, coordinates, distance }, index) => (
                        <HikeMapMarker
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
                    ))}
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
