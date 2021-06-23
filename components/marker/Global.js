import React from 'react';
import { View, ImageBackground, LayoutAnimation } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { defaultProps } from '@constants/states/HikeMapMarker';
import { colors, fontSizes, fontWeights } from '@constants/Index';
import { withTheme } from '@utils/Themes';
import { markerBgDefault, markerBgDark } from '@constants/Images';
import { presets } from '@constants/Animation';

const propTypes = {
    distance: PropTypes.number,
};

class GlobalMarker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        LayoutAnimation.configureNext(presets.spring);
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

    render() {
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
    }
}

GlobalMarker.propTypes = propTypes;
GlobalMarker.defaultProps = defaultProps;

export default withTheme(GlobalMarker);

const MarkerLabel = styled.Text`
    font-size: ${fontSizes.extraSmall}px;
    color: ${colors.white};
    font-weight: ${fontWeights.bold};
    text-align: center;
    padding-top: 10px;
`;
