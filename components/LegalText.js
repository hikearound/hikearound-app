import React from 'react';
import styled from 'styled-components';
import TextLink from './TextLink';
import { withTheme } from '../utils/Themes';
import { colors, fontSizes, spacing } from '../constants/Index';

class LegalText extends React.PureComponent {
    renderTermsOfServiceLink = () => {
        return (
            <TextLink
                url='https://www.tryhikearound.com/terms?contentOnly=true'
                text='Terms of Service'
            />
        );
    };

    renderPrivacyPolicyLink = () => {
        return (
            <TextLink
                url='https://www.tryhikearound.com/privacy?contentOnly=true'
                text='Privacy Policy'
            />
        );
    };

    render() {
        return (
            <>
                <Text>
                    By clicking &apos;Create Account&apos; you agree to
                    Hikearound&apos;s {this.renderTermsOfServiceLink()} and{' '}
                    {this.renderPrivacyPolicyLink()}.
                </Text>
            </>
        );
    }
}

export default withTheme(LegalText);

const Text = styled.Text`
    color: ${colors.grayMedium};
    font-size: ${fontSizes.small}px;
    margin: ${spacing.small}px;
`;
