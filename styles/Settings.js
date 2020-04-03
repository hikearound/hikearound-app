import styled from 'styled-components';
import { colors, fontSizes, spacing } from '../constants/Index';

export const ItemContainer = styled.View`
    border-color: ${colors.lightGray};
    border-top-width: 1px;
    padding: ${spacing.small}px 0;
`;

export const ItemText = styled.Text`
    color: ${(props) => props.textColor || props.theme.text};
    font-size: ${fontSizes.large}px;
`;

export default { ItemContainer, ItemText };
