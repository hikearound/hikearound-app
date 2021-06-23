import styled from 'styled-components';
import { fontSizes, spacing, fontWeights } from '@constants/Index';

export const SearchStat = styled.View`
    padding: ${spacing.tiny}px;
    border-bottom-width: 1px;
    border-bottom-width: ${(props) => (props.hideBorder ? 0 : '1px')};
    border-bottom-color: ${(props) => props.theme.itemBorder};
`;

export const StatText = styled.Text`
    color: ${(props) => props.theme.feedText};
    font-size: ${fontSizes.extraSmall}px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
`;
