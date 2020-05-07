import React from 'react';
import PropTypes from 'prop-types';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { connect } from 'react-redux';

const propTypes = {
    mapType: PropTypes.string.isRequired,
    mapStyle: PropTypes.array.isRequired,
    mapPadding: PropTypes.object,
    delta: PropTypes.number,
    position: PropTypes.object.isRequired,
    duration: PropTypes.number,
};

const defaultProps = {
    mapPadding: { bottom: 35 },
    delta: 0.05,
    duration: 250,
};

const hikeMarkers = [
    {
        latlng: {
            latitude: 37.7784649,
            longitude: -122.4258831,
        },
    },
];

function mapStateToProps(state) {
    return {
        mapType: state.mapReducer.mapType,
        mapStyle: state.mapReducer.mapStyle,
    };
}

function mapDispatchToProps() {
    return {};
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

    markerPress = (e) => {
        const { duration } = this.props;
        const { latitude, longitude } = e.nativeEvent.coordinate;
        const camera = { center: { latitude, longitude } };

        this.mapView.animateCamera(camera, { duration });
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
                    style={{
                        height: '100%',
                        zIndex: 1,
                        overflow: 'hidden',
                    }}
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
                    {hikeMarkers.map(({ latlng }, index) => (
                        <Marker
                            key={index}
                            ref={(marker) => {
                                this.marker = marker;
                            }}
                            coordinate={latlng}
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
