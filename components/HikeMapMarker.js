import React from 'react';
import { View, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Marker } from 'react-native-maps';
import { defaultProps } from '../constants/states/HikeMapMarker';
import { colors, fontSizes, fontWeights } from '../constants/Index';
import { withTheme } from '../utils/Themes';
import { markerBgDefault, markerBgDark } from '../constants/Images';

const propTypes = {
    distance: PropTypes.number,
    identifier: PropTypes.string.isRequired,
    coordinate: PropTypes.object,
    markerRef: PropTypes.func,
    onPress: PropTypes.func,
    offset: PropTypes.object,
    tracksViewChanges: PropTypes.bool.isRequired,
};

class HikeMapMarker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.setMarkerStyle();
    }

    async componentDidUpdate(prevProps) {
        const { theme } = this.props;

        if (prevProps.theme.dark !== theme.dark) {
            this.setMarkerStyle();
        }
    }

    setMarkerStyle = () => {
        const { theme } = this.props;
        let bgImage = markerBgDefault;

        if (theme.dark) {
            bgImage = markerBgDark;
        }

        this.setState({ bgImage });
    };

    getShortDistance = () => {
        const { distance } = this.props;
        return Math.round(distance * 10) / 10;
    };

    renderMarkerIcon = () => {
        const shortDistance = this.getShortDistance();
        const { bgImage } = this.state;

        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <ImageBackground
                    source={bgImage}
                    style={{ width: 38, height: 44 }}
                >
                    <MarkerLabel>{shortDistance.toFixed(1)}</MarkerLabel>
                </ImageBackground>
            </View>
        );
    };

    render() {
        const {
            identifier,
            coordinate,
            markerRef,
            onPress,
            offset,
            tracksViewChanges,
        } = this.props;

        return (
            <View>
                <Marker
                    key={identifier || Math.random()}
                    ref={markerRef}
                    identifier={identifier}
                    coordinate={coordinate}
                    onPress={onPress}
                    tracksViewChanges={tracksViewChanges}
                    centerOffset={offset}
                >
                    {this.renderMarkerIcon()}
                </Marker>
            </View>
        );
    }
}

HikeMapMarker.propTypes = propTypes;
HikeMapMarker.defaultProps = defaultProps;

export default withTheme(HikeMapMarker);

const MarkerLabel = styled.Text`
    font-size: ${fontSizes.extraSmall}px;
    color: ${colors.white};
    font-weight: ${fontWeights.bold};
    text-align: center;
    padding-top: 10px;
`;
