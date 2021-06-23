import styled from 'styled-components';
import { fontSizes, fontWeights, colors } from '@constants/Index';

export const HighlightedText = styled.Text`
    color: ${(props) =>
        props.showHighlight ? colors.purple : props.theme.text};
    font-weight: ${(props) =>
        props.showHighlight ? fontWeights.bold : fontWeights.bold};
    font-size: ${fontSizes.large}px;
`;

export const HighlightedSubText = styled.Text`
    color: ${(props) =>
        props.showHighlight ? colors.purple : colors.grayMedium};
`;
