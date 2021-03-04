import styled from 'styled-components';
import { fontSizes, fontWeights, spacing } from '../constants/Index';

export const Title = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.medium}px;
    font-weight: ${fontWeights.bold};
    display: flex;
`;

export const Subtitle = styled.Text`
    color: ${(props) => props.theme.notifText};
    font-size: ${fontSizes.medium}px;
    display: flex;
    padding-top: 2px;
`;

export const Timestamp = styled.Text`
    color: ${(props) => props.theme.timestampText};
    font-size: ${fontSizes.small}px;
    display: flex;
    padding-top: 4px;
    padding-bottom: ${spacing.tiny}px;
    text-transform: ${(props) => (props.capitalize ? 'capitalize' : 'none')};
`;

export const NotificationWrapper = styled.View`
    display: flex;
    flex-direction: row;
    margin-left: ${spacing.small}px;
    margin-top: ${spacing.small}px;
`;

export const NotificationBody = styled.View`
    display: flex;
    flex-direction: column;
    margin-left: ${spacing.tiny}px;
    padding-right: 60px;
    border-color: ${(props) => props.theme.modalButtonBorder};
    border-bottom-width: 1px;
`;
