import React from 'react';
import styled from 'styled-components';
import { fontWeights, fontSizes, spacing } from '../constants/Index';

class FeedHeader extends React.PureComponent {
    render() {
        return (
            <View>
                <Text>Hikes Near San Francisco</Text>
            </View>
        );
    }
}

export default FeedHeader;

const View = styled.View`
    padding: ${spacing.tiny}px;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme.itemBorder};
`;

const Text = styled.Text`
    color: ${(props) => props.theme.headerText};
    font-size: ${fontSizes.extraSmall}px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
`;
