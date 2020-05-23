import React from 'react';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import { fontSizes, spacing } from '../constants/Index';
import { BellEmptyState } from '../icons/Index';
import { withTheme } from '../utils/Themes';

class NotificationEmptyState extends React.PureComponent {
    render() {
        const { theme, t } = this.props;

        return (
            <RootView>
                <BellEmptyState fill={theme.colors.emptyStateFill} />
                <EmptyStateText>
                    {t('screen.notifications.empty')}
                </EmptyStateText>
            </RootView>
        );
    }
}

export default withTranslation()(withTheme(NotificationEmptyState));

const RootView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const EmptyStateText = styled.Text`
    margin-top: ${spacing.micro}px;
    color: ${(props) => props.theme.emptyStateFill};
    font-size: ${fontSizes.medium}px;
`;
