import styled from 'styled-components';
import { colors, fontSizes } from '../constants/Index';

export const ItemContainer = styled.View`
    border-color: ${colors.grayUltraLight};
    border-top-width: 1px;
`;

export const ItemText = styled.Text`
    color: ${(props) => props.textColor || props.theme.text};
    font-size: ${fontSizes.large}px;
    padding: 12px 0;
`;

export default { ItemContainer, ItemText };
