import React from 'react';
import PropTypes from 'prop-types';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import MapView from 'react-native-map-clustering';
import { updateMapData } from '../actions/Map';
import HikeMapMarker from './HikeMapMarker';
import { colors } from '../constants/Index';

const propTypes = {
    dispatchMapData: PropTypes.func.isRequired,
    mapType: PropTypes.string.isRequired,
    mapStyle: PropTypes.array.isRequired,
    mapPadding: PropTypes.object,
    delta: PropTypes.number,
    position: PropTypes.object.isRequired,
    duration: PropTypes.number,
    zoom: PropTypes.number,
    hikeData: PropTypes.array.isRequired,
    radius: PropTypes.number,
    latModifier: PropTypes.number,
};

const defaultProps = {
    mapPadding: { bottom: 35 },
    delta: 0.3,
    duration: 250,
    zoom: 14,
    radius: 32,
    latModifier: 0.0015,
};

function mapStateToProps(state) {
    return {
        mapType: state.mapReducer.mapType,
        mapStyle: state.mapReducer.mapStyle,
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
        this.state = { region: null };
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
            mapType,
            mapStyle,
            latModifier,
        } = this.props;
        const { coordinate, id } = event.nativeEvent;

        const camera = {
            center: {
                latitude: coordinate.latitude + latModifier,
                longitude: coordinate.longitude,
            },
            zoom,
        };

        dispatchMapData({ mapType, mapStyle, selectedHike: id });
        this.mapRef.current.animateCamera(camera, { duration });
    };

    assignRef = (ref, index) => {
        this[`marker${index}`] = ref;
    };

    render() {
        const { mapType, mapPadding, mapStyle, hikeData, radius } = this.props;
        const { region } = this.state;

        if (region) {
            return (
                <MapView
                    ref={this.mapRef}
                    customMapStyle={mapStyle}
                    provider={PROVIDER_GOOGLE}
                    style={{ height: '100%' }}
                    mapType={mapType}
                    initialRegion={region}
                    showsUserLocation
                    loadingEnabled
                    showsMyLocationButton={false}
                    showsPointsOfInterest={false}
                    showsCompass
                    onMapReady={this.onMapReady}
                    mapPadding={mapPadding}
                    clusterColor={colors.purple}
                    radius={radius}
                    animationEnabled={false}
                >
                    {hikeData.map(({ id, coordinates, distance }, index) => (
                        <HikeMapMarker
                            key={index}
                            identifier={id}
                            distance={distance}
                            markerRef={(ref) => this.assignRef(ref, index)}
                            coordinate={{
                                latitude: coordinates.startingLat,
                                longitude: coordinates.startingLng,
                            }}
                            onPress={this.markerPress}
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

export default connect(mapStateToProps, mapDispatchToProps)(GlobalMap);
