import React from 'react';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import { fontWeights, fontSizes, spacing } from '@constants/Index';

const circleSize = '7px';

class FeedFooter extends React.PureComponent {
    render() {
        const { t } = this.props;

        return (
            <View>
                <Text>{t('feed.footer')}</Text>
                <Circle />
            </View>
        );
    }
}

export default withTranslation()(FeedFooter);

const Circle = styled.View`
    background-color: ${(props) => props.theme.feedText};
    opacity: 0.8;
    border-radius: ${circleSize};
    height: ${circleSize};
    width: ${circleSize};
    margin: 4px auto 0;
`;

const View = styled.View`
    padding: ${spacing.small}px 0 ${spacing.medium}px 0;
`;

const Text = styled.Text`
    color: ${(props) => props.theme.feedText};
    font-size: ${fontSizes.extraSmall}px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
    text-align: center;
`;
