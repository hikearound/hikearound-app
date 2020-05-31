import styled from 'styled-components';
import { fontSizes, spacing, fontWeights } from '../constants/Index';

export const RootView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.rootBackground};
    width: 100%;
`;

export const Title = styled.Text`
    margin-top: ${spacing.micro}px;
    color: ${(props) => props.theme.onboardTitle};
    font-size: ${fontSizes.extraLarge}px;
    font-weight: ${fontWeights.medium};
`;

export const Description = styled.Text`
    margin-top: ${spacing.micro}px;
    color: ${(props) => props.theme.onboardDescription};
    font-size: ${fontSizes.medium}px;
    text-align: center;
    padding: 0 ${spacing.large}px;
`;
