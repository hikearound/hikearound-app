import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MapView from 'react-native-map-clustering';
import { updateMapData } from '../actions/Map';
import HikeMapMarker from './HikeMapMarker';
import { colors } from '../constants/Index';

const propTypes = {
    dispatchMapData: PropTypes.func.isRequired,
    delta: PropTypes.number,
    position: PropTypes.object.isRequired,
    duration: PropTypes.number,
    zoom: PropTypes.number,
    hikeData: PropTypes.array.isRequired,
    radius: PropTypes.number,
    googleLatModifier: PropTypes.number,
    appleLatModifier: PropTypes.number,
    altitude: PropTypes.number,
};

const defaultProps = {
    delta: 1,
    duration: 250,
    zoom: 14,
    radius: 32,
    googleLatModifier: 0.0015,
    appleLatModifier: 0.0001,
    altitude: 1000,
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
            googleLatModifier,
            appleLatModifier,
            altitude,
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
        this.mapRef.current.animateCamera(camera, { duration });
    };

    assignRef = (ref, index) => {
        this[`marker${index}`] = ref;
    };

    render() {
        const { hikeData, radius } = this.props;
        const { region } = this.state;

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
