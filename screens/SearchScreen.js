import React from 'react';
import { withTranslation } from 'react-i18next';
import { InstantSearch } from 'react-instantsearch-native';
import PropTypes from 'prop-types';
import SearchBox from '../components/search/SearchBox';
import StateResults from '../components/search/StateResults';
import { withTheme, SetBarStyle } from '../utils/Themes';
import InfiniteHits from '../components/search/InfiniteHits';
import { RootView } from '../styles/Screens';
import { searchClient } from '../constants/Search';

const propTypes = {
    searchState: PropTypes.object,
};

const defaultProps = {
    searchState: {},
};

class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        const { searchState } = this.props;

        this.state = { searchState };
    }

    onSearchStateChange = (nextState) => {
        const { searchState } = this.state;

        this.setState({
            searchState: { ...searchState, ...nextState },
        });
    };

    renderSearchBox = () => <SearchBox />;

    renderSearchResults = () => (
        <StateResults>
            <InfiniteHits />
        </StateResults>
    );

    render() {
        const { searchState } = this.state;

        return (
            <RootView>
                <SetBarStyle barStyle='light-content' />
                <InstantSearch
                    searchClient={searchClient}
                    indexName='hikes'
                    searchState={searchState}
                    onSearchStateChange={this.onSearchStateChange}
                >
                    {this.renderSearchBox()}
                    {this.renderSearchResults()}
                </InstantSearch>
            </RootView>
        );
    }
}

SearchScreen.propTypes = propTypes;
SearchScreen.defaultProps = defaultProps;

export default withTranslation()(withTheme(SearchScreen));
