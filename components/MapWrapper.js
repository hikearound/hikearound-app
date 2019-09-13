import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import InfoBar from './InfoBar';
import HikeMap from './HikeMap';
import {
    spacing,
    colors,
    transparentColors,
    borderRadius,
} from '../constants/Index';

function mapStateToProps(state) {
    return {
        action: state.action,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showMapModal: () => dispatch({
            type: 'SHOW_MAP',
        }),
    };
}

class MapWrapper extends React.Component {
    mapPress = () => {
        const { showMapModal } = this.props;
        showMapModal();
    }

    render() {
        const {
            coordinates,
            region,
            distance,
            elevation,
            route,
        } = this.props;

        return (
            <MapViewWrapper>
                <InnerMapViewWrapper>
                    <HikeMap
                        mapRef={(ref) => { this.mapView = ref; }}
                        coordinates={coordinates}
                        region={region}
                    />
                    <InfoBar
                        distance={distance}
                        elevation={elevation}
                        route={route}
                    />
                    <TouchableOpacity
                        onPress={this.mapPress}
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            zIndex: 1,
                        }}
                    >
                        <MapOverlay />
                    </TouchableOpacity>
                </InnerMapViewWrapper>
                <GrayBlockView />
            </MapViewWrapper>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MapWrapper);

const MapViewWrapper = styled.View`
    flex: 1;
    height: 285px;
    background-color: ${colors.purple};
    padding: ${spacing.micro}px ${spacing.small}px;
`;

const InnerMapViewWrapper = styled.View`
    position: relative;
    background-color: ${colors.white};
    border-radius: ${borderRadius.medium}px;
    box-shadow: 0 4px 12px ${transparentColors.gray};
    z-index: 1;
`;

const GrayBlockView = styled.View`
    flex: 1;
    height: 165px;
    background-color: ${colors.ultraLightGray};
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
`;

const MapOverlay = styled.View`
    opacity: 0;
`;
