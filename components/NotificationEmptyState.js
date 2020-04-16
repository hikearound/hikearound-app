import React from 'react';
import styled from 'styled-components';
import { fontSizes, spacing } from '../constants/Index';
import { BellEmptyState } from '../icons/Index';
import { withTheme } from '../utils/Themes';

class NotificationEmptyState extends React.PureComponent {
    render() {
        const { theme } = this.props;

        return (
            <RootView>
                <BellWrapper>
                    <BellEmptyState fill={theme.colors.emptyStateFill} />
                </BellWrapper>
                <EmptyStateText>No new notifications</EmptyStateText>
            </RootView>
        );
    }
}

export default withTheme(NotificationEmptyState);

const RootView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const BellWrapper = styled.View`
    opacity: 0.8;
`;

const EmptyStateText = styled.Text`
    margin-top: ${spacing.micro}px;
    color: ${(props) => props.theme.emptyStateFill};
    font-size: ${fontSizes.medium}px;
`;
