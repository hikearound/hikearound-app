import React from 'react';
import styled from 'styled-components';
import { LinearGradient } from 'expo';
import colors from '../constants/Colors';
import spacing from '../constants/Spacing';
import fontSizes from '../constants/Fonts';

const Card = props => (
    <Container>
        <Cover>
            <Image source={props.image} resizeMode='cover' />
            <Title>{props.title}</Title>
            <LinearGradient
                colors={['rgba(0,0,0,0.6)', 'transparent']}
                start={{ x: 1, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: 100,
              }}></LinearGradient>
        </Cover>
        <Content>
            <ContentItem>
                <MetaDataType>Distance</MetaDataType>
                <MetaData>{props.distance}m</MetaData>
            </ContentItem>
            <ContentItem>
                <MetaDataType>Elevation</MetaDataType>
                <MetaData>{props.elevation}ft</MetaData>
            </ContentItem>
            <ContentItem>
                <MetaDataType>Route</MetaDataType>
                <MetaData>{props.route}</MetaData>
            </ContentItem>
        </Content>
    </Container>
);

export default Card;

const Container = styled.View`
    background-color: #FFF;
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
    left: 15px;
    bottom: 15px;
    z-index: 1;
`;

const Content = styled.View`
    flex-direction: row;
    align-items: center;
    position: relative;
    margin: 10px 15px;
`;

const ContentItem = styled.View`
    flex-direction: column;
    flex-grow: 1;
`;

const MetaDataType = styled.Text`
    color: #9C9C9C;
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
`;

const MetaData = styled.Text`
    padding-top: 1px;
    color: #333;
    font-size: 13px;
    font-weight: 500;
`;
