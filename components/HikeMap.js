import React from 'react';
import PropTypes from 'prop-types';
import { LayoutAnimation } from 'react-native';
import styled from 'styled-components';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import { colors, borderRadius } from '../constants/Index';
import { defaultProps } from '../constants/states/HikeMap';

const propTypes = {
    mapRef: PropTypes.func.isRequired,
    mapType: PropTypes.string.isRequired,
    mapStyle: PropTypes.array.isRequired,
    coordinates: PropTypes.array,
    region: PropTypes.object,
    maxZoom: PropTypes.number,
    fullHeight: PropTypes.bool,
    mapPadding: PropTypes.object,
    mapHeight: PropTypes.number,
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

class HikeMap extends React.Component {
    constructor(props) {
        super(props);
        const { maxZoom, fullHeight } = this.props;
        this.state = {
            mapDidLoad: false,
            maxZoom,
            fullHeight,
        };
    }

    onMapReady = () => {
        this.setState({
            maxZoom: 20,
            mapDidLoad: true,
        });
    };

    render() {
        const {
            coordinates,
            mapRef,
            region,
            mapType,
            mapPadding,
            mapStyle,
            mapHeight,
        } = this.props;
        const { maxZoom, fullHeight, mapDidLoad } = this.state;

        if (!fullHeight && !mapDidLoad) {
            LayoutAnimation.easeInEaseOut();
        }

        if (region) {
            return (
                <MapView
                    ref={mapRef}
                    customMapStyle={mapStyle}
                    provider={PROVIDER_GOOGLE}
                    style={{
                        height: fullHeight ? '100%' : mapHeight,
                        zIndex: 1,
                        overflow: 'hidden',
                        borderRadius: parseInt(borderRadius.medium, 10),
                    }}
                    mapType={mapType}
                    showsUserLocation
                    loadingEnabled
                    initialRegion={region}
                    showsMyLocationButton={false}
                    showsPointsOfInterest={false}
                    showsCompass={false}
                    maxZoomLevel={maxZoom}
                    onMapReady={this.onMapReady}
                    mapPadding={mapPadding}
                >
                    <MapView.Polyline
                        coordinates={coordinates}
                        strokeColor={colors.purple}
                        strokeWidth={4}
                    />
                </MapView>
            );
        }
        return <EmptyMapView fullHeight={fullHeight} mapHeight={mapHeight} />;
    }
}

HikeMap.propTypes = propTypes;
HikeMap.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(HikeMap);

const EmptyMapView = styled.View`
    border-color: ${colors.grayMedium};
    border-radius: ${borderRadius.medium}px;
    height: ${(props) => (props.fullHeight ? '100%' : `${props.mapHeight}px`)};
    background-color: ${(props) => props.theme.loadingPrimary};
`;
