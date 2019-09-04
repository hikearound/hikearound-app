import React from 'react';
import styled from 'styled-components';
import {
    colors,
    fontSizes,
    spacing,
    fontWeights,
} from '../constants/Index';

const Subtitle = ({ text }) => (
    <SubtitleView>
        <SubtitleText>{text}</SubtitleText>
    </SubtitleView>
);

export default Subtitle;

const SubtitleView = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: ${colors.borderGray};
    margin: ${spacing.medium}px 0 ${spacing.tiny}px 0;
`;

const SubtitleText = styled.Text`
    color: ${colors.mediumGray};
    font-weight: ${fontWeights.medium};
    font-size: ${fontSizes.small}px;
    margin-bottom: 3px;
    text-transform: uppercase;
`;
