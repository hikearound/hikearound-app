import styled from 'styled-components';
import { colors, fontSizes, spacing, fontWeights } from '../constants/Index';

export const ModalHeader = styled.View`
    background-color: ${(props) => props.theme.headerStyle};
    border-bottom-color: ${colors.gray};
    height: ${spacing.header}px;
    width: 100%;
    position: relative;
`;

export const ModalTitleText = styled.Text`
    text-align: center;
    color: ${colors.white};
    font-size: ${fontSizes.extraLarge}px;
    position: absolute;
    width: 100%
    text-align: center;
    bottom: ${spacing.small}px;
    font-weight: ${fontWeights.bold};
`;

export const ModalBody = styled.View`
    background-color: ${(props) => props.theme.rootBackground};
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export default { ModalHeader, ModalTitleText, ModalBody };
