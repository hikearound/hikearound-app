import styled from 'styled-components';
import { fontSizes, fontWeights, colors, spacing } from '../constants/Index';

export const View = styled.View`
    border-color: ${(props) => props.theme.itemBorder};
    border-top-width: 1px;
    padding: ${spacing.small}px 0;
    padding-left: ${(props) =>
        props.shouldHighlight ? `${spacing.tiny}px` : 0};
`;

export const Name = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.large}px;
    font-weight: ${fontWeights.bold};
`;

export const MetaData = styled.Text`
    color: ${colors.grayMedium};
    font-size: ${fontSizes.medium}px;
`;
