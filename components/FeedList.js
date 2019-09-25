import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-navigation';
import FeedItem from './FeedItem';
import FeedFooter from './FeedFooter';

const propTypes = {
    onEndReached: PropTypes.func.isRequired,
    refreshControl: PropTypes.object.isRequired,
    hikes: PropTypes.array.isRequired,
};

class FeedList extends React.Component {
    renderItem = ({ item }) => (
        <FeedItem
            id={item.id}
            images={item.images}
            name={item.name}
            distance={item.distance}
            elevation={item.elevation}
            route={item.route}
            description={item.description}
        />
    )

    keyExtractor = (item) => item.key;

    render() {
        const { onEndReached, refreshControl, hikes } = this.props;

        return (
            <FlatList
                ref={(ref) => { this.listRef = ref; }}
                data={hikes}
                showsVerticalScrollIndicator={false}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                refreshControl={refreshControl}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.75}
                ListFooterComponent={() => <FeedFooter />}
            />
        );
    }
}

FeedList.propTypes = propTypes;

export default FeedList;
