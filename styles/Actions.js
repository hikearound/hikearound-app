import styled from 'styled-components';
import {
    fontSizes,
    spacing,
    fontWeights,
    colors,
    borderRadius,
} from '@constants/Index';

export const Text = styled.Text`
    color: ${(props) => (props.primary ? colors.white : props.theme.text)};
    font-size: ${fontSizes.large}px;
    font-weight: ${fontWeights.medium};
    text-align: center;
`;

export const Button = styled.View`
    border: 1px;
    border-color: ${(props) => props.theme.itemBorder};
    border-radius: ${borderRadius.medium}px;
    padding: ${spacing.tiny}px;
    margin-top: ${spacing.tiny}px;
    background-color: ${(props) =>
        props.primary ? colors.purple : props.theme.sheetBackground};
`;

export const ActionWrapper = styled.View`
    margin-top: ${spacing.tiny}px;
`;
