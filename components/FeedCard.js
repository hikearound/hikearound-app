import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image } from 'react-native-expo-image-cache';
import FeedCardGradient from './FeedCardGradient';
import InfoBar from './InfoBar';
import {
    spacing,
    colors,
    transparentColors,
    fontSizes,
    borderRadius,
} from '../constants/Index';
import { withTheme } from '../utils/Themes';

const propTypes = {
    image: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    elevation: PropTypes.number.isRequired,
    route: PropTypes.string.isRequired,
};

class FeedCard extends React.PureComponent {
    render() {
        const { image, name, distance, elevation, route } = this.props;

        return (
            <View>
                <Cover>
                    <Image
                        uri={image.uri}
                        resizeMode='cover'
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                        }}
                    />
                    <HikeName>{name}</HikeName>
                    <FeedCardGradient imageDidLoad={image.uri} />
                </Cover>
                <InfoBar
                    distance={distance}
                    elevation={elevation}
                    route={route}
                />
            </View>
        );
    }
}

FeedCard.propTypes = propTypes;

export default withTheme(FeedCard);

const View = styled.View`
    background-color: ${(props) => props.theme.cardBackground};
    width: 100%;
    border-radius: ${borderRadius.medium}px;
    box-shadow: 0 4px 4px ${transparentColors.grayLight};
`;

const Cover = styled.View`
    width: 100%;
    height: 175px;
    border-top-left-radius: ${borderRadius.medium}px;
    border-top-right-radius: ${borderRadius.medium}px;
    overflow: hidden;
`;

const HikeName = styled.Text`
    color: ${colors.white};
    font-size: ${fontSizes.big}px;
    font-weight: bold;
    width: 65%;
    position: absolute;
    left: ${spacing.tiny}px;
    bottom: 12px;
    z-index: 1;
`;
