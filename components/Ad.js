import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as FacebookAds from 'expo-ads-facebook';
import { withTranslation } from 'react-i18next';

const { AdTriggerView, AdMediaView, AdIconView, withNativeAd } = FacebookAds;

const propTypes = {
    nativeAd: PropTypes.object.isRequired,
    mediaHeight: PropTypes.number,
};

const defaultProps = {
    mediaHeight: 125,
};

class Ad extends React.PureComponent {
    render() {
        const { nativeAd, mediaHeight, t } = this.props;
        const { bodyText, advertiserName, callToActionText, headline } =
            nativeAd;

        return (
            <AdWrapper>
                <AdMediaView style={{ display: 'flex', height: mediaHeight }} />
                <AdIconView />
                <AdTriggerView>
                    <Promoted>
                        {t('ad.promoted', { name: advertiserName })}
                    </Promoted>
                    <Headline>{headline}</Headline>
                    <BodyText>{bodyText}</BodyText>
                    <CtaText>{callToActionText}</CtaText>
                </AdTriggerView>
            </AdWrapper>
        );
    }
}

Ad.propTypes = propTypes;
Ad.defaultProps = defaultProps;

export default withTranslation()(withNativeAd(Ad));

const AdWrapper = styled.View`
    display: flex;
`;

const Promoted = styled.Text`
    display: flex;
`;

const BodyText = styled.Text`
    display: flex;
`;

const CtaText = styled.Text`
    display: flex;
`;

const Headline = styled.Text`
    display: flex;
`;
