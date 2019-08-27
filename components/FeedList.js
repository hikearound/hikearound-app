import React from 'react';
import { FlatList } from 'react-navigation';
import FeedItem from './FeedItem';
import FeedFooter from './FeedFooter';

/* eslint-disable react/jsx-props-no-spreading */

class FeedList extends React.Component {
    renderItem = ({ item }) => <FeedItem {...item} />;

    keyExtractor = (item) => item.key;

    render() {
        const { ...props } = this.props;
        return (
            <FlatList
                ref={(ref) => { this.listRef = ref; }}
                showsVerticalScrollIndicator={false}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                ListFooterComponent={({ item }) => <FeedFooter {...item} />}
                {...props}
            />
        );
    }
    // render() {
    //     const { onEndReached, ...props } = this.props;
    //     return (
    //         <FlatList
    //             keyExtractor={this.keyExtractor}
    //             renderItem={this.renderItem}
    //             onEndReached={onEndReached}
    //             onEndReachedThreshold={0.5}
    //             {...props}
    //         />
    //     );
    // }
}

export default FeedList;
