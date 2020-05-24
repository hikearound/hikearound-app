import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { connectStateResults } from 'react-instantsearch-native';

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
        return <Text>Empty State</Text>;
    };

    renderNoResultsState = () => {
        return <Text>No results</Text>;
    };

    renderResults = (children) => {
        return children;
    };

    render() {
        const { searchState, searchResults, children } = this.props;

        if (searchState && !searchState.query) {
            return this.renderEmptyState();
        }
        if (searchResults && searchResults.nbHits !== 0) {
            return this.renderResults(children);
        }

        return this.renderNoResultsState();
    }
}

StateResults.propTypes = propTypes;
StateResults.defaultProps = defaultProps;

export default connectStateResults(StateResults);
