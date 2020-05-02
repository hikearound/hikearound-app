import React from 'react';
import PropTypes from 'prop-types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';

const propTypes = {
    mapType: PropTypes.string.isRequired,
    mapStyle: PropTypes.array.isRequired,
    mapPadding: PropTypes.object,
    delta: PropTypes.number,
    position: PropTypes.object.isRequired,
};

const defaultProps = {
    mapPadding: { bottom: 45 },
    delta: 0.05,
};

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
                />
            );
        }
        return null;
    }
}

GlobalMap.propTypes = propTypes;
GlobalMap.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(GlobalMap);
