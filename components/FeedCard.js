import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Image } from 'react-native-expo-image-cache';
import FeedCardGradient from './FeedCardGradient';
import {
    spacing,
    colors,
    transparentColors,
    fontWeights,
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
        const { image, name, distance, elevation, route, theme } = this.props;

        return (
            <ThemeProvider theme={theme.colors}>
                <Container>
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
                    <Content>
                        <ContentItem>
                            <MetaDataType>Distance</MetaDataType>
                            <MetaData>
                                {distance}
                                {'m'}
                            </MetaData>
                        </ContentItem>
                        <ContentItem>
                            <MetaDataType>Elevation</MetaDataType>
                            <MetaData>
                                {elevation}
                                {'ft'}
                            </MetaData>
                        </ContentItem>
                        <ContentItem>
                            <MetaDataType>Route</MetaDataType>
                            <MetaData>{route}</MetaData>
                        </ContentItem>
                    </Content>
                </Container>
            </ThemeProvider>
        );
    }
}

FeedCard.propTypes = propTypes;

export default withTheme(FeedCard);

const Container = styled.View`
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
    left: ${spacing.small}px;
    bottom: ${spacing.small}px;
    z-index: 1;
`;

const Content = styled.View`
    background-color: ${(props) => props.theme.infoBarBackground};
    flex-direction: row;
    align-items: center;
    position: relative;
    padding: ${spacing.tiny}px ${spacing.small}px;
    border-bottom-left-radius: ${borderRadius.medium}px;
    border-bottom-right-radius: ${borderRadius.medium}px;
`;

const ContentItem = styled.View`
    flex-direction: column;
    flex-grow: 1;
`;

const MetaDataType = styled.Text`
    color: ${(props) => props.theme.metaDataTypeText};
    font-size: ${fontSizes.small}px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
`;

const MetaData = styled.Text`
    padding-top: 1px;
    color: ${(props) => props.theme.metaDataText};
    font-size: ${fontSizes.small}px;
    font-weight: ${fontWeights.medium};
`;
