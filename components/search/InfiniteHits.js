import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList } from 'react-native';
import { connectInfiniteHits } from 'react-instantsearch-native';
import Highlight from './Highlight';

const propTypes = {
    hits: PropTypes.array.isRequired,
    refine: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
};

class InfiniteHits extends React.Component {
    onEndReached = () => {
        const { hasMore, refine } = this.props;
        if (hasMore) {
            refine();
        }
    };

    renderRow = ({ item }) => {
        return (
            <View>
                <Highlight attribute='name' hit={item} />
                <Text>{item.city}</Text>
            </View>
        );
    };

    render() {
        const { hits, hasMore, refine } = this.props;

        if (hits.length > 0) {
            return (
                <FlatList
                    keyExtractor={(item) => item.objectID}
                    data={hits}
                    renderItem={this.renderRow}
                    onEndReached={() => hasMore && refine()}
                />
            );
        }

        return null;
    }
}

InfiniteHits.propTypes = propTypes;

export default connectInfiniteHits(InfiniteHits);
