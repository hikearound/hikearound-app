import React from 'react';
import { ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fontSizes, fontWeights } from '../../constants/Index';
import { withTheme } from '../../utils/Themes';
import { clusterMarker } from '../../constants/Images';

const propTypes = {
    count: PropTypes.number,
    size: PropTypes.number,
};

const defaultProps = {
    count: 0,
    size: 45,
};

class ClusterMarker extends React.PureComponent {
    render() {
        const { count, size } = this.props;

        return (
            <MarkerView>
                <ImageBackground
                    source={clusterMarker}
                    style={{ width: size, height: size }}
                >
                    <MarkerLabel>{count}</MarkerLabel>
                </ImageBackground>
            </MarkerView>
        );
    }
}

ClusterMarker.propTypes = propTypes;
ClusterMarker.defaultProps = defaultProps;

export default withTheme(ClusterMarker);

const MarkerView = styled.View`
    display: flex;
`;

const MarkerLabel = styled.Text`
    font-size: ${fontSizes.extraSmall}px;
    color: ${colors.white};
    font-weight: ${fontWeights.bold};
    text-align: center;
    padding-top: 14px;
`;
