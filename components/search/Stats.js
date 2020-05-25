import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import { connectStats } from 'react-instantsearch-native';
import { fontWeights, fontSizes, spacing } from '../../constants/Index';

const propTypes = {
    nbHits: PropTypes.number.isRequired,
    hideBorder: PropTypes.bool,
    emptyState: PropTypes.bool,
    noResults: PropTypes.bool,
};

const defaultProps = {
    hideBorder: false,
    emptyState: false,
    noResults: false,
};

class Stats extends React.PureComponent {
    renderLabel = () => {
        const { t, nbHits, emptyState, noResults } = this.props;
        let label = t('screen.search.results.header', { count: nbHits });

        if (emptyState) {
            label = t('screen.search.emptyState.header');
        }
        if (noResults) {
            label = t('screen.search.noResults.header');
        }

        return label;
    };

    render() {
        const { t, hideBorder } = this.props;

        return (
            <View hideBorder={hideBorder}>
                <Text>{this.renderLabel(t)}</Text>
            </View>
        );
    }
}

Stats.propTypes = propTypes;
Stats.defaultProps = defaultProps;

export default withTranslation()(connectStats(Stats));

const View = styled.View`
    padding: ${spacing.tiny}px;
    border-bottom-width: 1px;
    border-bottom-width: ${(props) => (props.hideBorder ? 0 : '1px')};
    border-bottom-color: ${(props) => props.theme.itemBorder};
`;

const Text = styled.Text`
    color: ${(props) => props.theme.feedText};
    font-size: ${fontSizes.extraSmall}px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
`;
