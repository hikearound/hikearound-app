import styled from 'styled-components';
import { fontSizes, borderRadius } from '../constants/Index';

export const Pill = styled.View`
    margin-left: 6px;
    background-color: ${(props) => props.theme.sheetBackground};
    border-radius: ${borderRadius.medium}px;
    border-width: 1px;
    border-color: ${(props) => props.theme.pillBorder};
`;

export const Text = styled.Text`
    color: ${(props) => props.theme.metaDataText};
    font-size: ${fontSizes.extraSmall}px;
    padding: 3px 6px;
`;
