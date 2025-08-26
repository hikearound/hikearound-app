import React from 'react';
import { Trans, withTranslation } from 'react-i18next';
import TextLink from '@components/TextLink';
import { withTheme } from '@utils/Themes';
import { SubText } from '@styles/Screens';

class LegalText extends React.PureComponent {
    renderTermsOfServiceLink = (t) => (
        <TextLink
            url='https://www.tryhikearound.com/terms?contentOnly=true'
            text={t('label.common.terms')}
        />
    );

    renderPrivacyPolicyLink = (t) => (
        <TextLink
            url='https://www.tryhikearound.com/privacy?contentOnly=true'
            text={t('label.common.privacy')}
        />
    );

    render() {
        const { t } = this.props;
        const createAccount = t('label.nav.createAccount');
        const appName = t('common.appName', { count: 0 });

        return (
            <SubText>
                <Trans i18nKey='screen.createAccount.legal'>
                    {/* eslint-disable-next-line */}
                    By clicking {{ createAccount }}, you agree to {{ appName }}{' '}
                    {this.renderTermsOfServiceLink(t)} and{' '}
                    {this.renderPrivacyPolicyLink(t)}.
                </Trans>
            </SubText>
        );
    }
}

export default withTranslation()(withTheme(LegalText));
