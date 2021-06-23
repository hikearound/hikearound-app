import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connectStats } from 'react-instantsearch-native';
import { SearchStat, StatText } from '@styles/Search';

const propTypes = {
    nbHits: PropTypes.number.isRequired,
    hideBorder: PropTypes.bool,
    noResults: PropTypes.bool,
};

const defaultProps = {
    hideBorder: false,
    noResults: false,
};

class Stats extends React.PureComponent {
    renderLabel = () => {
        const { t, nbHits, noResults } = this.props;
        let label = t('screen.search.results.header', { count: nbHits });

        if (noResults) {
            label = t('screen.search.noResults.header');
        }

        return label;
    };

    render() {
        const { t, hideBorder } = this.props;

        return (
            <SearchStat hideBorder={hideBorder}>
                <StatText>{this.renderLabel(t)}</StatText>
            </SearchStat>
        );
    }
}

Stats.propTypes = propTypes;
Stats.defaultProps = defaultProps;

export default withTranslation()(connectStats(Stats));
