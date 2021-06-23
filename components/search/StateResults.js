import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connectStateResults } from 'react-instantsearch-native';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import Stats from '@components/search/Stats';
import { fontSizes, spacing } from '@constants/Index';
import { SearchStat, StatText } from '@styles/Search';

const propTypes = {
    searchState: PropTypes.object.isRequired,
    searchResults: PropTypes.object,
    children: PropTypes.object.isRequired,
};

const defaultProps = {
    searchResults: {},
};

class StateResults extends React.PureComponent {
    renderEmptyState = () => {
        const { t } = this.props;

        return (
            <View>
                <SearchStat>
                    <StatText>{t('screen.search.empty.header')}</StatText>
                </SearchStat>
                <SearchLabel>{t('screen.search.empty.label')}</SearchLabel>
            </View>
        );
    };

    renderNoResults = () => {
        const { t } = this.props;
        const label = t('screen.search.noResults.label');

        return (
            <View>
                <Stats noResults />
                <SearchLabel>{label}</SearchLabel>
            </View>
        );
    };

    renderResults = (children) => children;

    render() {
        const { searchState, searchResults, children } = this.props;
        const showEmptyState = searchState && !searchState.query;
        const showResults = searchResults && searchResults.nbHits !== 0;

        if (showEmptyState) {
            return this.renderEmptyState();
        }

        if (showResults) {
            return this.renderResults(children);
        }

        return this.renderNoResults();
    }
}

StateResults.propTypes = propTypes;
StateResults.defaultProps = defaultProps;

export default withTranslation()(connectStateResults(StateResults));

const SearchLabel = styled.Text`
    padding: ${spacing.tiny}px;
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.small}px;
`;
