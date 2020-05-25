import React from 'react';
import { withTranslation } from 'react-i18next';
import { InstantSearch } from 'react-instantsearch-native';
import PropTypes from 'prop-types';
import SearchBox from '../components/search/SearchBox';
import StateResults from '../components/search/StateResults';
import { withTheme } from '../utils/Themes';
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

        this.state = {
            searchState: searchState || {},
        };
    }

    onSearchStateChange = (nextState) => {
        const { searchState } = this.state;

        this.setState({
            searchState: { ...searchState, ...nextState },
        });
    };

    renderModalHeader = () => {
        return <SearchBox />;
    };

    renderModalBody = () => {
        return (
            <StateResults>
                <InfiniteHits />
            </StateResults>
        );
    };

    render() {
        const { searchState } = this.state;
        const { t } = this.props;

        return (
            <RootView>
                <InstantSearch
                    searchClient={searchClient}
                    indexName='hikes'
                    searchState={searchState}
                    onSearchStateChange={this.onSearchStateChange}
                >
                    {this.renderModalHeader(t)}
                    {this.renderModalBody()}
                </InstantSearch>
            </RootView>
        );
    }
}

SearchScreen.propTypes = propTypes;
SearchScreen.defaultProps = defaultProps;

export default withTranslation()(withTheme(SearchScreen));
