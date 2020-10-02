import styled from 'styled-components';
import { fontSizes, spacing, fontWeights } from '../constants/Index';

export const SheetPadding = styled.View`
    background-color: ${(props) => props.theme.sheetBackground};
    z-index: 101;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 30px;
`;

export const Header = styled.View`
    display: flex;
    flex-direction: row;
    margin-bottom: ${spacing.large}px;
    margin-left: ${spacing.tiny}px;
    margin-top: ${spacing.tiny}px;
`;

export const HeaderItem = styled.View`
    display: flex;
    margin-right: ${spacing.large}px;
`;

export const HeaderLabel = styled.Text`
    font-size: ${fontSizes.small}px;
    color: ${(props) => props.theme.sheetDataLabel};
`;

export const HeaderSubtext = styled.Text`
    font-size: ${fontSizes.extraLarge}px;
    font-weight: ${fontWeights.medium};
    color: ${(props) => props.theme.text};
`;
