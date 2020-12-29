import styled from 'styled-components';
import { colors, fontSizes, spacing, fontWeights } from '../constants/Index';
import { getHeaderHeight } from '../utils/Navigation';

const headerHeight = getHeaderHeight();

export const ModalHeader = styled.View`
    background-color: ${(props) => props.theme.headerStyle};
    border-bottom-color: ${colors.gray};
    height: ${headerHeight}px;
    width: 100%;
    position: relative;
    z-index: 1;
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
    padding: ${(props) => (props.includePadding ? `${spacing.small}px` : 0)};
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const PageSheetModalHeader = styled(ModalHeader)`
    height: 55px;
    margin-bottom: -${spacing.small}px;
    background-color: ${(props) => props.theme.rootBackground};
`;

export const PageSheetModalTitleText = styled(ModalTitleText)`
    color: ${(props) => props.theme.text};
`;
