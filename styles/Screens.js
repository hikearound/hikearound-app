import styled from 'styled-components';
import { colors, fontSizes, spacing, fontWeights } from '../constants/Index';

export const RootView = styled.View`
    flex: 1;
    background-color: ${(props) => props.theme.rootBackground};
`;

export const StyledRootView = styled(RootView)`
    padding-left: ${spacing.small}px;
`;

export const HeaderContainer = styled.View`
    padding-bottom: 4px;
    margin-top: ${spacing.small}px;
`;

export const HeaderText = styled.Text`
    color: ${colors.grayMedium};
    font-size: ${fontSizes.extraSmall}px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
`;
