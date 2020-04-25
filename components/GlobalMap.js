import React from 'react';
import PropTypes from 'prop-types';
import { LayoutAnimation } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const propTypes = {
    mapType: PropTypes.string,
};

const defaultProps = {
    mapType: 'terrain',
};

class HikeMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mapDidLoad: false,
        };
    }

    onMapReady = () => {
        // todo
    };

    render() {
        const { mapType } = this.props;
        const { mapDidLoad } = this.state;

        if (!mapDidLoad) {
            LayoutAnimation.easeInEaseOut();
        }

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
