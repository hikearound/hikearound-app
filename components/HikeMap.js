import React from 'react';
import { LayoutAnimation } from 'react-native';
import styled from 'styled-components';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
    colors,
    borderRadius,
} from '../constants/Index';

const DEFAULT_MAP_HEIGHT = 200;

class HikeMap extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            mapHeight: DEFAULT_MAP_HEIGHT,
        };
    }

    componentWillMount = async () => {
        const { fullHeight } = this.props;
        if (fullHeight) {
            this.setState({
                mapHeight: '100%',
            });
        }
    }

    render() {
        const {
            coordinates,
            mapRef,
            region,
        } = this.props;
        const { mapHeight } = this.state;

        LayoutAnimation.easeInEaseOut();

        if (region) {
            return (
                <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    style={{
                        height: mapHeight,
                        zIndex: 1,
                        overflow: 'hidden',
                        borderRadius: parseInt(borderRadius.medium, 10),
                    }}
                    mapType='terrain'
                    showsUserLocation
                    loadingEnabled
                    initialRegion={region}
                    showsMyLocationButton={false}
                    showsPointsOfInterest={false}
                    showsCompass={false}
                >
                    <MapView.Polyline
                        coordinates={coordinates}
                        strokeColor={colors.purple}
                        strokeWidth={4}
                    />
                </MapView>
            );
        }
        return (
            <EmptyMapView />
        );
    }
}

export default HikeMap;

const EmptyMapView = styled.View`
    border-color: ${colors.mediumGray};
    height: ${(props) => (props.fullHeight ? '100%' : `${DEFAULT_MAP_HEIGHT}px`)};
`;
