import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Marker } from 'react-native-maps';
import { defaultProps } from '../constants/states/HikeMapMarker';
import { colors, fontSizes, fontWeights } from '../constants/Index';

const propTypes = {
    distance: PropTypes.number,
    size: PropTypes.number,
    identifier: PropTypes.string.isRequired,
    coordinate: PropTypes.object,
    markerRef: PropTypes.func,
    onPress: PropTypes.func,
};

class HikeMapMarker extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tracksViewChanges: false };
    }

    componentDidUpdate(prevProps) {
        const { tracksViewChanges } = this.state;
        const { coordinate } = this.props;

        if (prevProps.coordinate !== coordinate) {
            this.toggleTrackViewChanges(true);
        } else if (tracksViewChanges) {
            this.toggleTrackViewChanges(false);
        }
    }

    toggleTrackViewChanges = (state) => {
        this.setState({ tracksViewChanges: state });
    };

    getShortDistance = () => {
        const { distance } = this.props;
        return Math.round(distance * 10) / 10;
    };

    renderMarkerIcon = () => {
        const { size } = this.props;
        const shortDistance = this.getShortDistance();

        return (
            <MapMarker size={size}>
                <MarkerLabel>{shortDistance}m</MarkerLabel>
            </MapMarker>
        );
    };

    render() {
        const { identifier, coordinate, markerRef, onPress } = this.props;
        const { tracksViewChanges } = this.state;

        return (
            <Marker
                ref={markerRef}
                identifier={identifier}
                coordinate={coordinate}
                onPress={onPress}
                tracksViewChanges={tracksViewChanges}
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
