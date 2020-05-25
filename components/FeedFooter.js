import React from 'react';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import { fontWeights, fontSizes, spacing } from '../constants/Index';

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
    border-radius: 7px;
    height: 7px;
    width: 7px;
    margin: ${spacing.micro}px auto 0;
`;

const View = styled.View`
    padding: ${spacing.small}px;
    opacity: 0.7;
`;

const Text = styled.Text`
    color: ${(props) => props.theme.feedText};
    font-size: ${fontSizes.extraSmall}px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
    text-align: center;
`;
