import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import { fontWeights, fontSizes, spacing } from '../constants/Index';

const propTypes = {
    city: PropTypes.string.isRequired,
};

class FeedHeader extends React.PureComponent {
    render() {
        const { t, city } = this.props;
        return (
            <View>
                <Text>{t('feed.header', { cityName: city })}</Text>
            </View>
        );
    }
}

FeedHeader.propTypes = propTypes;

export default withTranslation()(FeedHeader);

const View = styled.View`
    padding: ${spacing.tiny}px;
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.theme.itemBorder};
`;

const Text = styled.Text`
    color: ${(props) => props.theme.feedText};
    font-size: ${fontSizes.extraSmall}px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
`;
