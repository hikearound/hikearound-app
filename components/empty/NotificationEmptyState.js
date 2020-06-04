import React from 'react';
import { withTranslation } from 'react-i18next';
import { withTheme } from '../../utils/Themes';
import { BellEmptyState } from '../../icons/Index';
import { RootView, Title, Description } from '../../styles/Callouts';

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
