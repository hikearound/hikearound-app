import React from 'react';
import styled from 'styled-components';
import FeedCardGradient from './FeedCardGradient';
import {
    spacing,
    colors,
    transparentColors,
    fontWeights,
    fontSizes,
    borderRadius,
} from '../constants/Index';

const FeedCard = ({
    image, title, distance, elevation, route,
}) => (
    <Container>
        <Cover>
            <Image source={image} resizeMode='cover' />
            <Title>{title}</Title>
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
);

export default FeedCard;

const Container = styled.View`
    background-color: #DEDEDE;
    width: 100%;
    border-radius: ${borderRadius.medium}px;
    box-shadow: 0 4px 12px ${transparentColors.gray};
`;

const Cover = styled.View`
    width: 100%;
    height: 175px;
    border-top-left-radius: ${borderRadius.medium}px;
    border-top-right-radius: ${borderRadius.medium}px;
    overflow: hidden;
`;

const Image = styled.Image`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const Title = styled.Text`
    color: ${colors.white};
    font-size: 20px;
    font-weight: bold;
    width: 65%;
    position: absolute;
    left: ${spacing.small}px;
    bottom: ${spacing.small}px;
    z-index: 1;
`;

const Content = styled.View`
    background-color: ${colors.white};
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
    color: #9C9C9C;
    font-size: 12px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
`;

const MetaData = styled.Text`
    padding-top: 1px;
    color: ${colors.black};
    font-size: ${fontSizes.small};
    font-weight: ${fontWeights.medium};
`;
