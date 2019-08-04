import React from 'react';
import styled from 'styled-components';
import FeedCardGradient from '../components/FeedCardGradient'
import { LayoutAnimation, Animated } from 'react-native';
import { spacing, colors, fontSizes, fontWeights } from '../constants/Index'

class FeedCard extends React.Component {
    render() {
        var CustomLayoutAnimation = {
            duration: 100,
            create: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity,
            },
            update: {
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        };
        // LayoutAnimation.configureNext(CustomLayoutAnimation);
        return (
            <Container>
                <Cover>
                    <Image source={this.props.image} resizeMode='cover'/>
                    <Title>{this.props.title}</Title>
                    <FeedCardGradient imageDidLoad={this.props.image.uri}/>
                </Cover>
                <Content>
                    <ContentItem>
                        <MetaDataType>Distance</MetaDataType>
                        <MetaData>{this.props.distance}m</MetaData>
                    </ContentItem>
                    <ContentItem>
                        <MetaDataType>Elevation</MetaDataType>
                        <MetaData>{this.props.elevation}ft</MetaData>
                    </ContentItem>
                    <ContentItem>
                        <MetaDataType>Route</MetaDataType>
                        <MetaData>{this.props.route}</MetaData>
                    </ContentItem>
                </Content>
            </Container>
        );
    }
}

export default FeedCard;

const Container = styled.View`
    background-color: #DEDEDE;
    width: 100%;
    border-radius: 6px;
    box-shadow: 0 4px 12px ${colors.transparentGray};
    border: 1px solid #E6E6E6;
`;

const Cover = styled.View`
    width: 100%;
    height: 175px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
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
    color: white;
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
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
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
    color: #333;
    font-size: 13px;
    font-weight: ${fontWeights.medium};
`;
