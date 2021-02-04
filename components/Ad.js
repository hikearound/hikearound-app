import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as FacebookAds from 'expo-ads-facebook';

const { AdTriggerView, AdMediaView, withNativeAd } = FacebookAds;

const propTypes = {
    nativeAd: PropTypes.object.isRequired,
};

class Ad extends React.PureComponent {
    render() {
        const { nativeAd } = this.props;
        const { bodyText } = nativeAd;

        return (
            <AdWrapper>
                <AdMediaView />
                <AdTriggerView>
                    <BodyText>{bodyText}</BodyText>
                </AdTriggerView>
            </AdWrapper>
        );
    }
}

Ad.propTypes = propTypes;

export default withNativeAd(Ad);

const AdWrapper = styled.View`
    display: flex;
`;

const BodyText = styled.Text`
    display: flex;
`;
