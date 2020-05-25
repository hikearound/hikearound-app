import React from 'react';
import PropTypes from 'prop-types';
import { LayoutAnimation } from 'react-native';
import styled from 'styled-components';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { colors, borderRadius } from '../constants/Index';
import { defaultProps } from '../constants/states/HikeMap';

const propTypes = {
    mapRef: PropTypes.func.isRequired,
    coordinates: PropTypes.array,
    region: PropTypes.object,
    maxZoom: PropTypes.number,
    fullHeight: PropTypes.bool,
    mapHeight: PropTypes.number,
};

function mapStateToProps() {
    return {};
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
            mapDidLoad: true,
        });
    };

    render() {
        const { coordinates, mapRef, region, mapHeight } = this.props;
        const { maxZoom, fullHeight, mapDidLoad } = this.state;

        if (!fullHeight && !mapDidLoad) {
            LayoutAnimation.easeInEaseOut();
        }

        if (region) {
            return (
                <MapView
                    ref={mapRef}
                    provider={null}
                    style={{
                        height: fullHeight ? '100%' : mapHeight,
                        zIndex: 1,
                        overflow: 'hidden',
                        borderRadius: parseInt(borderRadius.medium, 10),
                    }}
                    showsUserLocation
                    initialRegion={region}
                    showsMyLocationButton={false}
                    showsPointsOfInterest={false}
                    showsCompass={false}
                    maxZoomLevel={maxZoom}
                    onMapReady={this.onMapReady}
                >
                    <MapView.Polyline
                        coordinates={coordinates}
                        strokeColor={colors.purple}
                        strokeWidth={3}
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
