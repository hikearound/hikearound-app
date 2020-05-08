import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Marker } from 'react-native-maps';
import { colors, fontSizes, fontWeights } from '../constants/Index';

const propTypes = {
    distance: PropTypes.number,
    size: PropTypes.number,
    identifier: PropTypes.string.isRequired,
    coordinate: PropTypes.object,
    markerRef: PropTypes.func,
    onPress: PropTypes.func,
};

const defaultProps = {
    distance: 0,
    size: 40,
    coordinate: {},
    markerRef: () => {},
    onPress: () => {},
};

class HikeMapMarker extends React.PureComponent {
    renderMarkerIcon = () => {
        const { distance, size } = this.props;

        return (
            <MapMarker size={size}>
                <MarkerLabel>{distance}m</MarkerLabel>
            </MapMarker>
        );
    };

    render() {
        const { identifier, coordinate, markerRef, onPress } = this.props;

        return (
            <Marker
                ref={markerRef}
                identifier={identifier}
                coordinate={coordinate}
                onPress={onPress}
            >
                {this.renderMarkerIcon()}
            </Marker>
        );
    }
}

HikeMapMarker.propTypes = propTypes;
HikeMapMarker.defaultProps = defaultProps;

export default HikeMapMarker;

const MapMarker = styled.View`
    height: ${(props) => props.size}px;
    width: ${(props) => props.size}px;
    border-radius: ${(props) => props.size}px;
    background: ${colors.purple};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MarkerLabel = styled.Text`
    font-size: ${fontSizes.small}px;
    color: ${colors.white};
    font-weight: ${fontWeights.medium};
`;
