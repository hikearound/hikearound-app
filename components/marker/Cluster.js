import React from 'react';
import { ImageBackground, LayoutAnimation } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Marker } from 'react-native-maps';
import { colors, fontSizes, fontWeights } from '../../constants/Index';
import { withTheme } from '../../utils/Themes';
import { clusterMarker } from '../../constants/Images';
import { presets } from '../../constants/Animation';

const propTypes = {
    animationConfig: PropTypes.object.isRequired,
    coordinate: PropTypes.object.isRequired,
    altitude: PropTypes.number.isRequired,
    mapRef: PropTypes.object.isRequired,
    tracksViewChanges: PropTypes.bool,
    count: PropTypes.number,
    size: PropTypes.number,
};

const defaultProps = {
    count: 0,
    size: 45,
    tracksViewChanges: false,
};

class ClusterMarker extends React.Component {
    constructor(props) {
        super(props);
        LayoutAnimation.configureNext(presets.spring);
    }

    markerPress = () => {
        const { mapRef, animationConfig, coordinate, altitude } = this.props;

        const camera = {
            altitude,
            center: {
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
            },
            heading: 0,
            pitch: 0,
        };

        mapRef.current.animateCamera(camera, {
            duration: animationConfig.duration,
        });
    };

    render() {
        const { count, size, tracksViewChanges, coordinate } = this.props;
        return (
            <Marker
                coordinate={coordinate}
                onPress={this.markerPress}
                tracksViewChanges={tracksViewChanges}
            >
                <MarkerView>
                    <ImageBackground
                        source={clusterMarker}
                        style={{ width: size, height: size }}
                    >
                        <MarkerLabel>{count}</MarkerLabel>
                    </ImageBackground>
                </MarkerView>
            </Marker>
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
    padding-top: 14.5px;
`;
