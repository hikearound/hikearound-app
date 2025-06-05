import styled from 'styled-components';
import { fontSizes, spacing, colors } from '@constants/Index';

export const BorderView = styled.View`
    position: absolute;
    bottom: 0;
    left: ${spacing.small}px;
    right: 0;
    height: 1px;
    background-color: ${colors.grayUltraLight};
    z-index: 1;
`;

export const ItemContainer = styled.View`
    background-color: ${colors.white};
    margin: 0 15px;
    padding: 0 ${spacing.small}px;
    position: relative;
    min-height: 50px;
    ${(props) =>
        props.isFirst &&
        `
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    `}
    ${(props) =>
        props.isLast &&
        `
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    `}
`;

export const ItemText = styled.Text`
    color: ${(props) => props.textColor || colors.blackText};
    font-size: ${fontSizes.large}px;
    padding: 14px 0;
    font-weight: 400;
`;

export const SectionHeader = styled.Text`
    color: ${colors.grayDark};
    font-size: ${fontSizes.small}px;
    font-weight: 400;
    text-transform: uppercase;
    padding: ${spacing.small}px ${spacing.medium}px 10px;
    margin-top: 15px;
    margin-left: ${spacing.tiny}px;
    letter-spacing: 0.5px;
`;

export const SectionContainer = styled.View`
    display: flex;
    background-color: ${colors.white};
    border-radius: 10px;
    overflow: hidden;
`;

export const RootContainer = styled.View`
    flex: 1;
    background-color: ${colors.grayUltraLight};
`;
