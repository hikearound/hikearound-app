import styled from 'styled-components';
import { fontSizes, fontWeights, colors, spacing } from '@constants/Index';

export const View = styled.View`
    border-color: ${(props) => props.theme.itemBorder};
    border-top-width: ${(props) => (props.showTopBorder ? `1px` : 0)};
    border-bottom-width: ${(props) => (props.showBottomBorder ? `1px` : 0)};
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

export const HeaderContainer = styled.View`
    padding-bottom: 4px;
    margin-top: ${spacing.tiny}px;
    border-color: ${(props) => props.theme.itemBorder};
    border-bottom-width: ${(props) => (props.showBottomBorder ? `1px` : 0)};
`;

export const HeaderText = styled.Text`
    color: ${colors.grayMedium};
    font-size: ${fontSizes.small}px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
`;

export const EmptyContainer = styled.View`
    border-color: ${(props) => props.theme.itemBorder};
    border-top-width: 1px;
    padding: ${spacing.small}px 0;
`;

export const EmptyContainerText = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.medium}px;
`;

export const TopBorder = styled.View`
    border-color: ${(props) => props.theme.itemBorder};
    border-top-width: 1px;
    padding-top: ${spacing.tiny}px;
`;
