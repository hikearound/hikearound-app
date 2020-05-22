import React from 'react';
import PropTypes from 'prop-types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import { updateMapData } from '../actions/Map';
import HikeMapMarker from './HikeMapMarker';

const propTypes = {
    dispatchMapData: PropTypes.func.isRequired,
    mapType: PropTypes.string.isRequired,
    mapStyle: PropTypes.array.isRequired,
    mapPadding: PropTypes.object,
    delta: PropTypes.number,
    position: PropTypes.object.isRequired,
    duration: PropTypes.number,
    zoom: PropTypes.number,
};

const defaultProps = {
    mapPadding: { bottom: 35 },
    delta: 0.05,
    duration: 250,
    zoom: 14,
};

const hikeMarkers = [
    {
        hid: 'zvXj5WRBdxrlRTLm65SD',
        coordinate: {
            latitude: 37.7784649,
            longitude: -122.4258831,
        },
        distance: 2.3,
    },
];

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

        this.state = {
            region: null,
        };
    }

    async componentDidMount() {
        this.setRegion();
    }

    onMapReady = () => {
        // todo
    };

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
        } = this.props;
        const { coordinate, id } = event.nativeEvent;

        const camera = {
            center: {
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
            },
            zoom,
        };

        dispatchMapData({ mapType, mapStyle, selectedHike: id });
        this.mapView.animateCamera(camera, { duration });
    };

    assignRef = (ref, index) => {
        this[`marker${index}`] = ref;
    };

    render() {
        const { mapType, mapPadding, mapStyle } = this.props;
        const { region } = this.state;

        if (region) {
            return (
                <MapView
                    ref={(ref) => {
                        this.mapView = ref;
                    }}
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
                >
                    {hikeMarkers.map(({ hid, coordinate, distance }, index) => (
                        <HikeMapMarker
                            key={index}
                            identifier={hid}
                            distance={distance}
                            markerRef={(ref) => this.assignRef(ref, index)}
                            coordinate={coordinate}
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
