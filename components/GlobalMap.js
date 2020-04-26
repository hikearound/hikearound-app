import React from 'react';
import { LayoutAnimation } from 'react-native';
import PropTypes from 'prop-types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const propTypes = {
    mapType: PropTypes.string,
    delta: PropTypes.number,
};

const defaultProps = {
    mapType: 'terrain',
    delta: 0.05,
};

class HikeMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            region: null,
        };
    }

    async componentDidMount() {
        await this.getCurrentPosition();
    }

    onMapReady = () => {
        // todo
    };

    getCurrentPosition = async () => {
        const { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        const position = await Location.getCurrentPositionAsync({});
        this.setRegion(position);
    };

    setRegion = (position) => {
        const { delta } = this.props;

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
        const { mapType } = this.props;
        const { region } = this.state;

        LayoutAnimation.easeInEaseOut();

        if (region) {
            return (
                <MapView
                    ref={(ref) => {
                        this.mapView = ref;
                    }}
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
                    showsCompass={false}
                    onMapReady={this.onMapReady}
                />
            );
        }
        return null;
    }
}

HikeMap.propTypes = propTypes;
HikeMap.defaultProps = defaultProps;

export default HikeMap;
