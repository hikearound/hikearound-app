import React from 'react';
import styled from 'styled-components';
import { spacing, colors, fontSizes, fontWeights } from '../constants/Index'

const InfoBar = props => (
    <CardContent>
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
    </CardContent>
);

export default InfoBar;

const CardContent = styled.View`
    flex-direction: row;
    align-items: center;
    position: relative;
    padding: ${spacing.tiny}px ${spacing.small}px;
    margin-top: -4px;
    z-index: 2;
    background-color: ${colors.white};
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
