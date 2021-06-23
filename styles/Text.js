import styled from 'styled-components';
import { fontSizes, fontWeights, colors, spacing } from '@constants/Index';

export const ActionText = styled.Text`
    color: ${colors.purple};
    font-size: ${fontSizes.medium}px;
    margin-top: 2px;
`;

export const DescriptionText = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.medium}px;
`;

export const TitleText = styled.Text`
    color: ${(props) => props.theme.text};
    font-weight: ${fontWeights.bold};
    font-size: ${fontSizes.big}px;
    line-height: ${fontSizes.big}px;
    padding-top: ${spacing.micro}px;
    width: 80%;
`;

export const LocationText = styled.Text`
    color: ${colors.grayMedium};
    font-size: ${fontSizes.large}px;
`;
