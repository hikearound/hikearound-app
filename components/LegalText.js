import React from 'react';
import styled from 'styled-components';
import { Trans, withTranslation } from 'react-i18next';
import TextLink from './TextLink';
import { withTheme } from '../utils/Themes';
import { colors, fontSizes, spacing } from '../constants/Index';

class LegalText extends React.PureComponent {
    renderTermsOfServiceLink = (t) => {
        return (
            <TextLink
                url='https://www.tryhikearound.com/terms?contentOnly=true'
                text={t('label.common.terms')}
            />
        );
    };

    renderPrivacyPolicyLink = (t) => {
        return (
            <TextLink
                url='https://www.tryhikearound.com/privacy?contentOnly=true'
                text={t('label.common.privacy')}
            />
        );
    };

    render() {
        const { t } = this.props;
        const createAccount = t('label.nav.createAccount');
        const appName = t('common.appName', { count: 0 });

        return (
            <Text>
                <Trans i18nKey='screen.createAccount.legal'>
                    {/* eslint-disable-next-line */}
                    By clicking {{ createAccount }}, you agree to {{ appName }} {this.renderTermsOfServiceLink(t)} and {this.renderPrivacyPolicyLink(t)}.
                </Trans>
            </Text>
        );
    }
}

export default withTranslation()(withTheme(LegalText));

const Text = styled.Text`
    color: ${colors.grayMedium};
    font-size: ${fontSizes.small}px;
    margin: ${spacing.small}px;
`;
