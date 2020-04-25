import React from 'react';
import PropTypes from 'prop-types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const propTypes = {
    mapType: PropTypes.string,
};

const defaultProps = {
    mapType: 'terrain',
};

class HikeMap extends React.Component {
    onMapReady = () => {
        // todo
    };

    render() {
        const { mapType } = this.props;

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
                showsUserLocation
                loadingEnabled
                showsMyLocationButton={false}
                showsPointsOfInterest={false}
                showsCompass={false}
                onMapReady={this.onMapReady}
            />
        );
    }
}

HikeMap.propTypes = propTypes;
HikeMap.defaultProps = defaultProps;

export default HikeMap;
