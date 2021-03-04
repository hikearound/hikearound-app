import styled from 'styled-components';
import { fontSizes, fontWeights, colors, spacing } from '../constants/Index';

export const Name = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.medium}px;
    font-weight: ${fontWeights.bold};
    display: flex;
`;

export const Timestamp = styled.Text`
    color: ${colors.grayDark};
    font-size: ${fontSizes.small}px;
    display: flex;
`;

export const Info = styled.View`
    display: flex;
    flex-direction: column;
    padding-left: 8px;
    padding-top: 2px;
`;

export const Header = styled.View`
    display: flex;
    flex-direction: row;
`;

export const Body = styled.View`
    display: flex;
`;

export const Rating = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.medium}px;
    display: flex;
    flex: 1;
`;

export const Review = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.medium}px;
    display: flex;
    flex: 1;
`;

export const ReviewItem = styled.View`
    display: flex;
    flex-direction: column;
    border-color: ${(props) => props.theme.itemBorder};
    border-top-width: ${(props) => (props.shouldShowBorder ? '1px' : 0)};
    padding: ${spacing.tiny}px 0;
`;

export const StarWrapper = styled.View`
    display: flex;
    width: 50px;
    margin: 3px 0 2px 0;
`;

export const ActionBarWrapper = styled.View`
    display: flex;
`;

export const TextWrapper = styled.View`
    display: flex;
    min-height: ${(props) => (props.includeMinHeight ? '35px' : 0)};
`;
