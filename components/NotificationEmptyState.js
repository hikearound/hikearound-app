import React from 'react';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import { fontSizes, spacing, fontWeights } from '../constants/Index';
import { withTheme } from '../utils/Themes';
import { BellEmptyState } from '../icons/Index';

class NotificationEmptyState extends React.PureComponent {
    render() {
        const { t } = this.props;

        return (
            <RootView>
                <BellEmptyState />
                <Title>{t('screen.notifications.empty.title')}</Title>
                <Description>
                    {t('screen.notifications.empty.description')}
                </Description>
            </RootView>
        );
    }
}

export default withTranslation()(withTheme(NotificationEmptyState));

const RootView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.rootBackground};
    width: 100%;
`;

const Title = styled.Text`
    margin-top: ${spacing.micro}px;
    color: ${(props) => props.theme.onboardTitle};
    font-size: ${fontSizes.extraLarge}px;
    font-weight: ${fontWeights.medium};
`;

const Description = styled.Text`
    margin-top: ${spacing.micro}px;
    color: ${(props) => props.theme.onboardDescription};
    font-size: ${fontSizes.medium}px;
    text-align: center;
    padding: 0 ${spacing.large}px;
`;
