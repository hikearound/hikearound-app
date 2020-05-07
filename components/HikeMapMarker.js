import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fontSizes, fontWeights } from '../constants/Index';

const propTypes = {
    distance: PropTypes.number,
    size: PropTypes.number,
};

const defaultProps = {
    distance: 0,
    size: 40,
};

class HikeMapMarker extends React.PureComponent {
    render() {
        const { distance, size } = this.props;

        return (
            <MapMarker size={size}>
                <MarkerLabel>{distance}m</MarkerLabel>
            </MapMarker>
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
